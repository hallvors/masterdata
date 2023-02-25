const client = require('./sanityClient');

const fromId = process.argv[2];
const toId = process.argv[3];

const currentClient = client.sanityClientAunivers;

async function setData() {
    const refDocs = await currentClient.fetch('*[references($id)]', {id: fromId});
    console.log('found ' + refDocs.length);

      // typically references are in evaluations, .affordance._ref or challenges[i].challenge._ref
    for (let i = 0; i < refDocs.length; i++) {
        let refDoc = refDocs[i];
        const patch = {evaluations: refDoc.evaluations}

        for (let j = 0; j < patch.evaluations.length; j++ ) {
          if (patch.evaluations[j].affordance._ref === fromId) {
            patch.evaluations[j].affordance._ref = toId;
          }
          for (let k = 0; k < patch.evaluations[j].challenges.length; k++){
            if ( patch.evaluations[j].challenges[k].challenge._ref === fromId) {
              console.log('will patch ref ' + j);
              console.log(fromId + ' => ' + toId);
              patch.evaluations[j].challenges[k].challenge._ref = toId;
            }
          }
        }
        const data = await currentClient.patch(refDoc._id)
          .set(patch)
          .commit();
        console.log(JSON.stringify(data, null, 2))

      }
    await currentClient.delete(fromId);
}

setData().catch(console.error);

