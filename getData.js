const client = require('./sanityClient')

const outputmaps = {
    didactic_challenge: item => ([item.title, item.category, item.description, item.source || '']).join('\t'),
    digital_affordance: item => ([item.title, item.description]).join('\t'),
}

async function getData() {
    const data = await client.fetch(`
    *[_type == $type]
  `, { type: process.argv[2] });

  console.log(data.map(outputmaps[process.argv[2]]).join('\n'))
}

getData().catch(console.error);