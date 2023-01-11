
const createSanityClient = require('@sanity/client');
const sanityClient = createSanityClient({
    token: 'skAUKzIqAQD1UQJwc2ZciHn6rOpog9gDeKkZFi6UHD4oNy6IZX4AevhDX4n23h2boRo2KK8mOstIJUcIa7f4y9hlWWuqBfKVxX8oM2yJugx4SzkyIraMEMEXKni1RztUOnXRNulKzt2kutYVS3I4OApiFaHSgnWCXgX97nA9AOu1dLWpJsXx',
    projectId: 'fbbshc6p',
    dataset: 'aunivers',
    apiVersion: '2022-10-30',
    useCdn: false,
  });

module.exports = sanityClient
