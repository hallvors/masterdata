// Generate statistics for level

const fs = require('fs');

const name = process.argv[2];
const level = parseInt(process.argv[3]);

if (!(level && name)) {
  throw new TypeError('input missing, needs level and work name')
}
const client = require('./sanityClient')['sanityClient' + name];

async function buildStats(){
  const matrix = [['']];
  const allAff = await client.fetch('*[_type == \'digital_affordance\'] | order(title)');
  const allChall = await client.fetch('*[_type == \'didactic_challenge\'] | order(title)');
  for (let i = 0; i < allAff.length; i++) {
      matrix[0].push(allAff[i].title);
      for (let j = 0; j < allChall.length; j++) {
        if (!matrix[j + 1]) {
          matrix[j+1] = [allChall[j].title];
        }
        try {
          const result = await client.fetch('count(*[_type == $type && level == $level && references($id1) && references($id2)])', {level, type: 'page_evaluation', id1: allAff[i]._id, id2: allChall[j]._id });
          console.log( allAff[i].title + ', ' + allChall[j].title + ': ' + result );
          matrix[j+1].push(result);
        } catch(err) {
          console.error(err);
          matrix[j+1].push('');
        }
      }
  }

  const writeStream = fs.createWriteStream(`data/xref-${name.toLowerCase()}-trinn-${level}.csv`);
  writeStream.write(
    matrix.map(line => line.join("\t")).join("\n")
  );  
}

buildStats().then(() => console.log('done'))