const express = require('express');
const router = express.Router({ mergeParams: true }); // eslint-disable-line
require('dotenv').config();

const imageUrlBuilder = require('@sanity/image-url');

const sanityClients = require('../sanityClient');
const { filterBuilder } = require('./lib/queryhelper');

router.get('/filtered/:work', (req, res, next) => {
    const theClient = sanityClients['sanityClient' + req.params.work];
    delete req.query.work;
    const filterData = filterBuilder(req.query, { level: parseInt, requires_teacher: Boolean }, {
        chapterpage: 'string::startsWith({{name}}, ${{name}})',
        didactic_challenge: 'references(${{name}})',
        digital_affordance: 'references(${{name}})',
        goal: 'references(${{name}})',
    })

    console.log('will query ' + 'sanityClient' + req.params.work, filterData.query, filterData.params);

    return theClient.fetch('*[' + filterData.query + '] | order(level asc, chapterpage asc) ', filterData.params)
        .then(res.json.bind(res));
});

router.get('/docs/:work', (req, res, next) => {
    const theClient = sanityClients['sanityClient' + req.params.work];

    return theClient.fetch('*[_type == $type]', {
        type: req.query.type,
    })
        .then(res.json.bind(res));

})

router.get('/image/:work', (req, res, next) => {
    const builder = imageUrlBuilder(sanityClients['sanityClient' + req.params.work])
    const source = JSON.parse(req.query.asset);
    res.redirect(builder.image(source).width(700).url());

})

module.exports = router;