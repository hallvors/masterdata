const client = require('./sanityClient')

const fromSection = process.argv[2];
const toSection = process.argv[3];

const currentClient = client.sanityClientSkolestudio;
const level = 1;
const chapter = '6.';
// kDhfvHIeclVE3PyecWrZQ2 undre seg, utforske og lage spørsmål

const goals = [
//  { _ref: 'kDhfvHIeclVE3PyecWrZQ2', _type: 'reference', _key: String(parseInt(Math.random()*10e16))},
    //{ _ref: 'de673658-1ba2-4110-b2b7-2e55809c507e', _type: 'reference', _key: String(parseInt(Math.random()*10e16))},
    { _ref: '229508f3-1363-46f9-b22e-4c5f84eb632c', _type: 'reference', _key: String(parseInt(Math.random()*10e16))},
];

async function setData() {
    const docList = await currentClient.fetch('*[string::startsWith(chapterpage, $chpg) && level == $level]', {chpg: chapter, level:level});
    console.log(docList);

    const patch = {
        goals
    };

    for(let i = 0; i < docList.length; i++) {
        console.log( i + '/' + (docList.length - 1) + ' - will patch ' +docList[i].level + ' ' + docList[i].chapterpage + ' ' + docList[i]._id)
        const data = await currentClient.patch(docList[i]._id)
          .set(patch)
          .commit();
    }

  console.log('Done')
}

setData().catch(console.error);

// fri tekst svar - diverse rik tekst bokser - m lydinnspillingsalternativ: kDhfvHIeclVE3Pyeb4yE5q


