const client = require('./sanityClient')
const {Patch, Transaction} = require('@sanity/client');
const type = process.argv[2];
const { execSync } = require('node:child_process');
const fromClient = client.sanityClientSkolestudio;
const toClient = client.sanityClientAunivers;

// The Skolestudio dataset has the most up-to-date sets of affordances
// and challenges. We want to mirror both the descriptions, meta data and IDs

async function setData() {
    const newTypes = await fromClient.fetch('*[_type == $type]', {type});
    const oldTypes = await toClient.fetch('*[_type == $type]', {type});

    for (let i = 0; i<newTypes.length; i++) {
        let same = oldTypes.find(item => item._id === newTypes[i]._id)
        if (!same) {
            console.log('missing (by ID) ' + newTypes[i].title);
            let newDoc = await toClient.create(newTypes[i]);
            console.log(newDoc.title+ ', ' + newDoc._id);
            let oldTypeByTitle = oldTypes.find(item => item.title === newTypes[i].title);
            if (oldTypeByTitle) {
                console.log('will try to remap from old item with same title.. ' + newTypes[i].title)
                // change all references from old item to new item
                let oldId = oldTypeByTitle._id;
                let newId = newDoc._id;
                execSync(`node remap.js ${oldId} ${newId}`);
            }
        }
    }

    for (let i = 0; i < oldTypes.length; i++) {
        let lastIdx = oldTypes.findLastIndex(item => item.title === oldTypes[i].title);
        console.log({i, lastIdx})
        if (lastIdx !== i) {
            // duplicates
            let fromId;
            let toId;
            if (oldTypes[i]._createdAt < oldTypes[lastIdx]._createdAt) {
                fromId = oldTypes[i]._id;
                toId = oldTypes[lastIdx]._id;
                console.log(`remove: ${oldTypes[i]._createdAt}, keep: ${oldTypes[lastIdx]._createdAt}`)
            } else {
                fromId = oldTypes[lastIdx]._id;
                toId = oldTypes[i]._id;
                console.log(`remove: ${oldTypes[lastIdx]._createdAt}, keep: ${oldTypes[i]._createdAt}`)
            }
            let output = execSync(`node remap.js ${fromId} ${toId}`);
            console.log(output.toString('utf-8'));
        }
    }
}

setData().catch(console.error);

// fri tekst svar - diverse rik tekst bokser - m lydinnspillingsalternativ: kDhfvHIeclVE3Pyeb4yE5q



