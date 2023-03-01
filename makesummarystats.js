// Generate statistics for level

const type = process.argv[2];
const name = process.argv[3];

if (!(type && name)) {
  throw new TypeError('input missing, needs doc type and name')
}

const client = require('./sanityClient')[`sanityClient${name}`];
const fs = require('fs');


const levels = [1, 7];

async function buildStats(){
  const matrix = [['']];
  const docs = await client.fetch('*[_type == $type]', {type});
  console.log(docs.length);
  for (let i = 0; i < levels.length; i++) {
      matrix[0].push(levels[i]);
      for (let j = 0; j < docs.length; j++) {
        if (!matrix[j + 1]) {
          matrix[j+1] = [docs[j].title];
        }
        const result = await client.fetch('count(*[_type == $type && level == $level && references($id1)])', {level:levels[i], type: 'page_evaluation', id1: docs[j]._id });
        console.log( levels[i] + ', ' + docs[j].title + ': ' + result );
        matrix[j+1].push(result);
      }
  }

  const writeStream = fs.createWriteStream(`data-${type}-${name.toLowerCase()}.csv`);
  writeStream.write(
    matrix.map(line => line.join("\t")).join("\n")
  );  
}

buildStats().then(() => console.log('done'))