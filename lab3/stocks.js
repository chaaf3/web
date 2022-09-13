const axios = require ('axios');
const people = require ('./people.js')
async function getStocks () {
    let { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/8c363d85e61863ac044097c0d199dbcc/raw/7d79752a9342ac97e4953bce23db0388a39642bf/stocks.json')
    return data // this will be the array of people objects
}
async function getAPIdata () {
    let { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/a1196cbf008e85a8e808dc60d4db7261/raw/9fd0d1a4d7846b19e52ab3551339c5b0b37cac71/people.json')
    return data // this will be the array of people objects
}

function justSpaces(s) {
    let just = true;
    for (let x of s) {
        if (x != ' ') {
            just = false;
        }
    }
    return just;
}

async function listShareholders(stockName) {
    if (stockName == undefined || typeof stockName != "string" || justSpaces(stockName)) {
        throw new Error("bad inputs");
    }
    let fillIn = {};
    let holder = await getStocks();
    for (let i = 0; i < holder.length; i++) {
        if (holder[i]["stock_name"] == stockName) {
            fillIn = holder[i];
            break;
        }
    }
    for (let i = 0; i < fillIn["shareholders"].length; i++) {
        let temp = await people.getPersonById(fillIn["shareholders"][i]["userId"])
        delete fillIn["shareholders"][i]["userId"]
        fillIn["shareholders"][i]["first_name"] = temp["first_name"];
        fillIn["shareholders"][i]["last_name"] = temp["last_name"];
    }
    return fillIn;

}

async function totalShares(stockName) {
    if (stockName == undefined || typeof stockName != "string" || justSpaces(stockName)) {
        throw new Error("bad inputs");
    }
    let fillIn = {};
    let holder = await getStocks();
    for (let i = 0; i < holder.length; i++) {
        if (holder[i]["stock_name"] == stockName) {
            fillIn = holder[i];
            break;
        }
    }
    if (Object.keys(fillIn).length == 0) {
        throw new Error("No stock with that name");
    }
    let numHolders = fillIn["shareholders"].length;
    let numShares = 0;
    for (let i = 0; i < numHolders; i++) {
        numShares += fillIn["shareholders"][i]["number_of_shares"];
    }
    if (numHolders == 0) {
        return stockName + " currently has no shareholders."
    }
    if (numHolders == 1) {
        return stockName + ", has 1 shareholder that owns a total of " + numShares + " shares."
    } 
    else {
        return stockName + ", has " + numHolders + " shareholders that own a total of " + numShares + " shares."
    }
}

async function listStocks(firstName, lastName)  {
    if (firstName == undefined || typeof firstName != "string" || justSpaces(firstName) ||
        lastName == undefined || typeof lastName != "string" || justSpaces(lastName)) {
        throw new Error("bad inputs");
    }
    let holder = await getAPIdata();
    let final = {}
    holder.forEach((x) => {
        if (x["first_name"].toLowerCase() === firstName.toLowerCase() && x["last_name"].toLowerCase() == lastName.toLowerCase()) {
            final = x;
        }
    });
    if (Object.keys(final).length == 0) {
        throw new Error("bad inputs")
    }
    let id = final["id"];
    let stocks = await getStocks();
    let answer = [];
    for (let i = 0; i < stocks.length; i++) {
        for (let j = 0; j < stocks[i]["shareholders"].length; j++) {
            if (id == stocks[i]["shareholders"][j]["userId"]) {
                let name = stocks[i]["stock_name"]
                let temp = {"stock_name": name, "number_of_shares": stocks[i]["shareholders"][j]["number_of_shares"]};
                answer.push(temp);
            }
        }
    }
    if (answer.length == 0) {
        throw new Error("person doesn't own any stocks");
    }
    return answer;
}

async function getStockById(id) {
    if (id == undefined || typeof id != "string" || justSpaces(id)) {
        throw new Error("bad inputs");
    }
    let answer = {};
    let stocks = await getStocks();
    for (let i = 0; i < stocks.length; i++) {
        if (id == stocks[i]["id"]) {
            answer = stocks[i];
            break;
        }
    }
    if (Object.keys(answer).length == 0) {
        throw new Error("stock not found");
    }
    return answer;
}

module.exports = {listShareholders, totalShares, listStocks, getStockById}