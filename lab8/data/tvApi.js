const axios = require ('axios')


async function getById(Id) {
    let searcher = 'http://api.tvmaze.com/shows/' + Id
    let holder = await axios.get(searcher);
    return holder;
}


async function getByWord(word) {
    //use his validation call
    let searcher = 'http://api.tvmaze.com/search/shows?q=' + word;
    let allPeople = await axios.get(searcher);
    return allPeople.data.slice(0,5);
}

module.exports = {getById, getByWord};