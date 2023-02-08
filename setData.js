const client = require('./sanityClient')

const fromSection = process.argv[2];
const toSection = process.argv[3];

const currentClient = client.sanityClientSkolestudio;

async function setData() {
    const existingDoc = await currentClient.fetch('*[chapterpage == $id][0]', {id: fromSection});
    console.log(existingDoc.evaluations)
    const patch = {
        evaluations: existingDoc.evaluations
    }
    const toDoc = await currentClient.fetch('*[chapterpage == $id][0]', {id: toSection});
    const data = await currentClient.patch(toDoc._id)
      .set(patch)
      .commit();

  console.log(JSON.stringify(data, null, 2))
}

setData().catch(console.error);

// fri tekst svar - diverse rik tekst bokser - m lydinnspillingsalternativ: kDhfvHIeclVE3Pyeb4yE5q


