const client = require('./sanityClient')

const currentClient = client.sanityClientAunivers;
const level = 1;
const chapter = '';

async function setData() {
    const docList = await currentClient.fetch(`*[level == $level && 
      _type == 'page_evaluation' &&
       count(evaluations) > 0
       ]`, {level:level});

    for(let i = 0; i < docList.length; i++) {
      if (docList[i].requires_teacher) {
        continue;
      }
      if (docList[i].evaluations.find(evaluation => evaluation.challenges && evaluation.challenges.find(challenge => challenge.requires_teacher))) {
        console.log( i + '/' + (docList.length - 1) + ' - will patch ' +docList[i].level + ' ' + docList[i].chapterpage + ' ' + docList[i]._id)
        const data = await currentClient.patch(docList[i]._id)
          .set({requires_teacher: true})
          .commit();
      }
    }

  console.log('Done')
}

setData().catch(console.error);

// fri tekst svar - diverse rik tekst bokser - m lydinnspillingsalternativ: kDhfvHIeclVE3Pyeb4yE5q


