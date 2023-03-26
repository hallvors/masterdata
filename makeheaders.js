// Generate headers for a certain goal.. :)

const fs = require('fs');

const title = process.argv[2];

if (!(title)) {
  throw new TypeError('input missing, needs challenge title')
}

async function buildStats(){
  const client = require('./sanityClient');
  const works = ['SkolenMin', 'Skolestudio', 'Aunivers'];
  const results = {};
  for (let i = 0; i < works.length; i++ ) {
    const thisClient = client['sanityClient' + works[i]];
    const allAff = await thisClient.fetch('*[_type == \'digital_affordance\'] | order(title)');
    const theChall = await thisClient.fetch('*[_type == \'didactic_challenge\' && title == $title][0]', {title});
    for (let j = 0; j < allAff.length; j++) {
      const result = await thisClient.fetch('count(*[_type == $type && references($id1) && references($id2)])', {type: 'page_evaluation', id1: allAff[j]._id, id2: theChall._id });
      console.log( works[i] + ' - ' + allAff[j].title + ': ' + result );
      if (result > 0) {
          results[allAff[j].title]= (results[allAff[j].title] || []).concat([works[i]]);
      }
    }
  }
  console.log('\n\n\n\n');
  console.log(JSON.stringify(results, null, 2));
  console.log('\n\n\n\n');
  console.log(Object.keys(results).sort().map(result => result + ' for å ' + title.toLowerCase()).join('\n'));
}

buildStats().then(() => console.log('done'))