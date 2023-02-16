const client = require('./sanityClient')

const fromSection = process.argv[2];
const toSection = process.argv[3];

const currentClient = client.sanityClientSkolestudio;
const toLevel = 7;
const fromLevel = 7;

async function setData() {
    const existingDoc = await currentClient.fetch('*[chapterpage == $chpg && level == $level][0]', {chpg: fromSection, level:fromLevel});
    console.log(existingDoc.evaluations)
    const patch = {
        evaluations: existingDoc.evaluations
    }
    const toDoc = await currentClient.fetch('*[chapterpage == $chpg && level == $level][0]', {chpg: toSection, level: toLevel});
    const data = await currentClient.patch(toDoc._id)
      .set(patch)
      .commit();

  console.log(JSON.stringify(data, null, 2))
}

setData().catch(console.error);

// fri tekst svar - diverse rik tekst bokser - m lydinnspillingsalternativ: kDhfvHIeclVE3Pyeb4yE5q


