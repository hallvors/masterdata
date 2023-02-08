const client = require('./sanityClient')
const {Patch, Transaction} = require('@sanity/client');
const type = process.argv[2];
const toSection = process.argv[3];
const { execSync } = require('node:child_process');
const fromClient = client.sanityClientSkolestudio;
const toClient = client.sanityClientSkolenMin;

// The Skolestudio dataset has the most up-to-date sets of affordances
// and challenges. We want to mirror both the descriptions, meta data and IDs

async function setData() {
    const newTypes = await fromClient.fetch('*[_type == $type]', {type});
    const oldTypes = await toClient.fetch('*[_type == $type]', {type});
    
    for (let i = 0; i<newTypes.length; i++) {
        let same = oldTypes.find(item => item._id === newTypes[i]._id)
        if (!same) {
            console.log('missing ' + newTypes[i].title);
            let newDoc = await toClient.create(newTypes[i]);
            console.log(newDoc);
        }
    }
}

setData().catch(console.error);

// fri tekst svar - diverse rik tekst bokser - m lydinnspillingsalternativ: kDhfvHIeclVE3Pyeb4yE5q



