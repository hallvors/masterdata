const client = require('./sanityClient');

const id = process.argv[2];

const currentClient = client.sanityClientSkolenMin;

async function fixData() {
    const refDocs = await currentClient.fetch('*[references($id)]', { id: id });
    console.log('found ' + refDocs.length);

    // typically references are in evaluations, .affordance._ref or challenges[i].challenge._ref
    for (let i = 0; i < refDocs.length; i++) {
        let refDoc = refDocs[i];
        if (refDoc.evaluations) {
            const patch = {
                evaluations: refDoc.evaluations.map(evaluation => {
                    if (evaluation.challenges) {
                        let idx = evaluation.challenges.findIndex(item => item.challenge._ref === id)
                        if (idx > -1) {
                            evaluation.challenges.splice(idx, 1);
                        }
                    }
                    return evaluation;
                })
            }
            const data = await currentClient.patch(refDoc._id)
                .set(patch)
                .commit();
            console.log(JSON.stringify(data, null, 2))
        }

    }
}

fixData().catch(console.error);

