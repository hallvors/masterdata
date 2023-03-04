function mkSanityStudioUrl(work, id) {
    const server = {
        'skolenmin': 'hrms-masterdata-skolenmin',
        'skolestudio': 'hrms-masterdata-skolestudio',
        'aunivers': 'hrms-masteroppgave-data',
    }[work.toLowerCase()];
    return `https://${server}.sanity.studio/desk/page_evaluation;${id}`;
}

function renderPageEvalData(work, data) {
    const main = document.getElementsByTagName('main')[0];
    main.innerHTML = '';
    for (var i = 0; i < data.length; i++) {
        var div = main.appendChild(elm('div'));
        if (data[i].screenshot) {
            div.appendChild(elm('img', {
                align: 'right',
                src: '/api/image/' + work + '?asset=' + encodeURIComponent(JSON.stringify(data[i].screenshot))
            }));
        }
        div.appendChild(elm('p', null, elm('label', null, [
            elm('input', { type: 'checkbox', value: data[i]._id, name: 'ids' }),
            elm('b', null, data[i].level + ' ' + data[i].chapterpage),
            data[i].url ? elm('a', { href: data[i].url }, '>>') : null,
            elm('a', { href: mkSanityStudioUrl(work, data[i]._id) }, ' [S]'),
        ])))
        div.appendChild(elm('p', null, 'Lærerstyrt: '  + (data[i].requires_teacher ? 'ja' : 'nei') ))
        // requires global var goals
        if (data[i].goals && data[i].goals.length && goals.length) {
            div.appendChild(elm('h2', null, 'Kompetansemål'));
            div.appendChild(elm('ul', null, data[i].goals.map(goal => {
                const theOne = goals.find(item => item._id === goal._ref);
                return elm('li', null, theOne.goal)
            })));
        }
        // requires global var didactics
        if (data[i].challenge && data[i].challenge.length && didactics.length) {
            div.appendChild(elm('h2', null, 'Didaktiske utfordringer'));
            div.appendChild(elm('ul', null, data[i].challenge.map(chall => {
                const theOne = didactics.find(item => item._id === chall._ref);
                return elm('li', null, theOne.title);
            })));
        }
        // requires global vars affordances and didactics
        if (data[i].evaluations && data[i].evaluations.length && didactics.length && affordances.length) {
            div.appendChild(elm('h2', null, 'Affordanser og vurderinger'));
            div.appendChild(elm('ul', null, data[i].evaluations.map(theEval => {
                // affordance._ref
                // challenges [] .challenge._ref , requires_teacher, score
                const theOne = affordances.find(item => item._id === theEval.affordance._ref);
                return elm('li', null, [
                    theOne.title,
                    theEval.challenges && theEval.challenges.length ?
                    elm('ul', null, theEval.challenges.map(theChallenge => {
                        const theOne = didactics.find(item => item._id === theChallenge.challenge._ref);
                        return elm('li', null, [elm('b', null, theOne.title), ' ', theChallenge.score || '' ]);
                    })) : ''
                ])
            })));
        }
/*
        div.appendChild(elm('pre')).innerHTML = JSON.stringify(data[i], (name, value) => {
            if ([
                '_id', '_createdAt', '_rev', '_updatedAt', '_type',
                'chapterpage', 'level', 'screenshot', 'url', 'goals', 'challenge', 'requires_teacher', 'evaluations'
            ].includes(name)) return undefined;
            return value;
        }, 2);
        */
    }
}
function elm(tagName, attrs, content) {
    var element = document.createElement(tagName);
    if (attrs) {
        for (var prop in attrs) {
            element.setAttribute(prop, attrs[prop])
        }
    }
    recursiveAppend(element, content);
    return element;
}

function recursiveAppend(parent, content) {
    if (content) {
        if (typeof content === 'string' || typeof content === 'number') {
            parent.appendChild(document.createTextNode(content));
        } else if (content.length) {
            content.forEach(item => {
                recursiveAppend(parent, item);
            })
        } else {
            parent.appendChild(content);
        }
    }
}
