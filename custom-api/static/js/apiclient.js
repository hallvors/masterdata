
function getFilteredList(work, form) {
    return fetch('/api/filtered/' + work + '?' +
        new URLSearchParams(new FormData(document.forms[0])).toString())
        .then(res => res.json())
}

function getDocuments(work, type) {
    return fetch('/api/docs/' + work + '?' + new URLSearchParams({ type }).toString())
        .then(res => res.json())
}
