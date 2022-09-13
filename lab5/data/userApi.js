const axios = require ('axios')

async function getPeople() {
    //use his validation call
    let allPeople = await axios.get('https://gist.githubusercontent.com/graffixnyc/31e9ef8b7d7caa742f56dc5f5649a57f/raw/43356c676c2cdc81f81ca77b2b7f7c5105b53d7f/people.json');
    return allPeople;
}

async function getPerson(Id) {
    var holder = await getPeople();
    for(var x = 0; x < holder.data.length; x++) {
        if (holder.data[x].id == Id) {
            return holder.data[x]
        }
    }
    throw 'Error';
}


async function getWorks() {
    //use his validation call
    let allPeople = await axios.get('https://gist.githubusercontent.com/graffixnyc/febcdd2ca91ddc685c163158ee126b4f/raw/c9494f59261f655a24019d3b94dab4db9346da6e/work.json');
    return allPeople;
}

async function getWork(Id) {
    var holder = await getWorks();
    for(var x = 0; x < holder.data.length; x++) {
        if (holder.data[x].id == Id) {
            return holder.data[x]
        }
    }
    throw 'Error';
}

module.exports = {getPeople, getPerson, getWorks, getWork};