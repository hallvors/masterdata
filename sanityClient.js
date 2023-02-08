
const createSanityClient = require('@sanity/client');
const sanityClient = createSanityClient({
    token: 'skAUKzIqAQD1UQJwc2ZciHn6rOpog9gDeKkZFi6UHD4oNy6IZX4AevhDX4n23h2boRo2KK8mOstIJUcIa7f4y9hlWWuqBfKVxX8oM2yJugx4SzkyIraMEMEXKni1RztUOnXRNulKzt2kutYVS3I4OApiFaHSgnWCXgX97nA9AOu1dLWpJsXx',
    projectId: 'fbbshc6p',
    dataset: 'aunivers',
    apiVersion: '2022-10-30',
    useCdn: false,
  });

sanityClient.sanityClientSkolestudio = createSanityClient({
    token: 'sk5skxKwUSIjecv2q0cnnYZnjInUUJgXo05XZnw6F6Qfjxu2QtloMleWml1A6w0WNo9ZbXa8yi8uGHpiy8TI1DPRvHUT159hlnZDpQ99myX2Of46p2KRj1GIqJ8iJibuuQh5hMfVht8z284tzruLbm4MGezezf4npc2TJgMwIa7uH5nJCIxs',
    projectId: '7xashn1s',
    dataset: 'skolestudio',
    apiVersion: '2022-10-30',
    useCdn: false,
  });

sanityClient.sanityClientSkolenMin = createSanityClient({
    token: 'skAUKzIqAQD1UQJwc2ZciHn6rOpog9gDeKkZFi6UHD4oNy6IZX4AevhDX4n23h2boRo2KK8mOstIJUcIa7f4y9hlWWuqBfKVxX8oM2yJugx4SzkyIraMEMEXKni1RztUOnXRNulKzt2kutYVS3I4OApiFaHSgnWCXgX97nA9AOu1dLWpJsXx',
    projectId: 'fbbshc6p',
    dataset: 'skolen-cdu',
    apiVersion: '2022-10-30',
    useCdn: false,
  });


  
module.exports = sanityClient
