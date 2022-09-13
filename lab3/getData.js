const axios = require ('axios');
async function getAPIdata () {
    let { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/a1196cbf008e85a8e808dc60d4db7261/raw/9fd0d1a4d7846b19e52ab3551339c5b0b37cac71/people.json')
    return data // this will be the array of people objects
}
async function getStocks () {
    let { stocks } = await axios.get('https://gist.githubusercontent.com/graffixnyc/8c363d85e61863ac044097c0d199dbcc/raw/7d79752a9342ac97e4953bce23db0388a39642bf/stocks.json')
    return stocks // this will be the array of stock objects
}

module.exports = {getAPIdata, getStocks};

// async function getFirstTen () {
//     var answer = await getAPIdata();
//     return answer;
// }

// async function doSomething (getFirst)