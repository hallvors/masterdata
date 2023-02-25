function filterBuilder(query, specialParsers, specialOperators) {
    const stringParts = [];
    const params = {};

    for (let prop in query) {
        if (!query[prop]) {
            continue;
        }
        let value = specialParsers[prop] ? specialParsers[prop](query[prop]) : query[prop];

        if (specialOperators[prop]) {
            stringParts.push(specialOperators[prop].replace(/\{\{name\}\}/g, prop))
        } else {
            stringParts.push(prop + ' == $' + prop)
        }
        params[prop] = value;
    }

    return {
        query: stringParts.join(' && '),
        params
    }
}

module.exports = {
    filterBuilder
}
