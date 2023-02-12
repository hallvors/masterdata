require('dotenv').config()

const createSanityClient = require('@sanity/client');
const sanityClient = createSanityClient({
    token: process.env.SANITY_TOKEN_AUNIVERS,
    projectId: 'fbbshc6p',
    dataset: 'aunivers',
    apiVersion: '2022-10-30',
    useCdn: false,
  });

sanityClient.sanityClientAunivers = sanityClient;
  
sanityClient.sanityClientSkolestudio = createSanityClient({
    token: process.env.SANITY_TOKEN_SKOLESTUDIO,
    projectId: '7xashn1s',
    dataset: 'skolestudio',
    apiVersion: '2022-10-30',
    useCdn: false,
  });

sanityClient.sanityClientSkolenMin = createSanityClient({
    token: process.env.SANITY_TOKEN_SKOLENMIN,
    projectId: 'fbbshc6p',
    dataset: 'skolen-cdu',
    apiVersion: '2022-10-30',
    useCdn: false,
  });


  
module.exports = sanityClient
