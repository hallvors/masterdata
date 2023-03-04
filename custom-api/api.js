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
    // We don't list absolutely everything, only list things if there are filters
    if (Object.keys(filterData.params).length === 0) {
        return res.json([]);
    }
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
});

router.post('/batchpatch/:work', async (req, res, next) => {
    const theClient = sanityClients['sanityClient' + req.params.work];
    // we can set the following options on page_evaluation documents:
    // - requires_teacher (on/off)
    // - collaborative (on/off)
    // - goals (add to array) - get array of ids, add with _ref / _key
    // - challenge (add to array) - same
    // - affordance (add to array) - get array of ids, add the somewhat more complicated object
    const response = [];
    ['ids', 'goals', 'challenge', 'affordance'].forEach(str => {
        if(req.body[str] && typeof req.body[str] === 'string') {
            req.body[str] = [req.body[str]];
        }
    });
    if (req.body.ids) {
        for(let i = 0; i < req.body.ids.length; i++) {
            let id = req.body.ids[i];

            const existingDoc = await theClient.getDocument(id);
            const patch = {};
            ['requires_teacher', 'collaborative'].forEach(item => {
                if (item in req.body) {
                    patch[item] = req.body[item] === 'on';
                }
            });

            // goals and challenges
            ['goals', 'challenge'].forEach(propertyName => {
                if (req.body[propertyName]) {
                    patch[propertyName] = existingDoc[propertyName] || [];
                    req.body[propertyName].forEach(item => {
                        if (!patch[propertyName].find(existing => existing._ref === item)) {
                            patch[propertyName].push({
                                _type: 'reference',
                                _ref: item,
                                _key: makeKey()
                            });
                        }
                    });
                }
            });

            if (req.body.affordance) {
                patch.evaluations = existingDoc.evaluations || [];
                req.body.affordance.forEach(id => {
                    patch.evaluations.push({
                        _type: 'eval',
                        _key: makeKey(),
                        affordance: {
                            _type: 'reference',
                            _ref: id,
                        }
                    })
                });
            }

            if (Object.keys(patch).length) {
                console.log('patching ' + existingDoc._id + ', setting ' + Object.keys(patch));
                const data = await theClient.patch(existingDoc._id)
                .set(patch)
                .commit();
                response.push(data);
            }
        }
    }
    console.log('Done - batchpatched ' + req.body.ids)
    res.json(response);
});

function makeKey() {
    return String(parseInt(Math.random()*10e16));
}

module.exports = router;