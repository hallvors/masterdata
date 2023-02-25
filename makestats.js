// Generate statistics for level

const client = require('./sanityClient').sanityClientSkolestudio;
const fs = require('fs');

const level = parseInt(process.argv[2]);

async function buildStats(){
  const matrix = [['']];
  const allAff = await client.fetch('*[_type == \'digital_affordance\']');
  const allChall = await client.fetch('*[_type == \'didactic_challenge\']');
  for (let i = 0; i < allAff.length; i++) {
      matrix[0].push(allAff[i].title);
      for (let j = 0; j < allChall.length; j++) {
        if (!matrix[j + 1]) {
          matrix[j+1] = [allChall[j].title];
        }
        const result = await client.fetch('count(*[_type == $type && level == $level && references($id1) && references($id2)])', {level, type: 'page_evaluation', id1: allAff[i]._id, id2: allChall[j]._id });
        console.log( allAff[i].title + ', ' + allChall[j].title + ': ' + result );
        matrix[j+1].push(result);
      }
  }

  const writeStream = fs.createWriteStream('data.csv');
  writeStream.write(
    matrix.map(line => line.join("\t")).join("\n")
  );  
}

buildStats().then(() => console.log('done'))