const axios = require ('axios');
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
function containsDot(s) {
    let hasD = false;
    for (let x of s) {
        if (x == '.') {
            hasD = true;
        }
    }
    return hasD;
}

function runThrough(s) {
    let two = 1;
    for (let i = 0; i < s.length; i++) {
        if (s.charAt(i) == '.' && two < 2) {
            return true;
        }
        else if (s.charAt(i) == '.') {
            two = 0;
        }
        else {
            two++;
        }
    }
    return false;
}
function hasTwo(s) {
    if (s.charAt(s.length-1) != '.' && s.charAt(s.length-2) != '.') {
        return true;
    }
    else {
        return false;
    }
}

async function getPersonById(id) {
    if (id == undefined || typeof id != "string" || justSpaces(id)) {
        throw new Error("bad inputs");
    }
    let holder = await getAPIdata();
    let final = {}
    holder.forEach((x) => {
        if (x.id === id) {
            final = x;
            // return x;
        }
    });

    if(Object.keys(final).length != 0){
        return final;
    }
    throw new Error("id is not found");
}

async function sameEmail(emailDomain) {
    if (emailDomain == undefined || typeof emailDomain != "string" || justSpaces(emailDomain) || !containsDot(emailDomain) || !hasTwo(emailDomain) || runThrough(emailDomain)) {
        throw new Error("bad inputs");
    }
    let holder = await getAPIdata();
    let final = []
    let emailDomain2 = emailDomain.toLowerCase();
    for (let i = 0; i < holder.length; i++) {
        if (holder[i]["email"].slice(0 - emailDomain.length).toLowerCase() === emailDomain2) {
            final.push(holder[i]);
        }
    }
    if (final.length >= 2) {
        return final;
    }
    else {
        throw new Error ("bad inputs not enough matching emails");
    }
}


function ipC (ip) {
    let holder = [];
    for (let i = 0; i < ip.length; i++) {
        if (ip.charAt(i) != '.' && ip.charAt(i) != '0') {
            holder.push(parseInt(ip.charAt(i)));
        }
    }
    holder.sort();
    return parseInt(holder.join(''));
}
async function manipulatelp() {
    let info = await getAPIdata();
    let answer = {
        highest: {firstName: "", lastName: ""},
        lowest: { firstName: "", lastName: "" },
        average: 0
    };
    let min = 999999999999;
    let max = -99999999;
    let total = 0;
    for (let i = 0; i < info.length; i++) {
        let current = ipC(info[i]["ip_address"]);
        if (current > max) {
            max = current;
            answer["highest"]["firstName"] = info[i]["first_name"];
            answer["highest"]["lastName"] = info[i]["last_name"];
        }
        if (current < min) {
            min = current;
            answer["lowest"]["firstName"] = info[i]["first_name"];
            answer["lowest"]["lastName"] = info[i]["last_name"];
        }
        total += current;
    }
    answer["average"] = Math.floor(total / info.length);
    return answer;
}

async function sameBirthday(month, day) {
    let month2 = parseInt(month);
    let day2 = parseInt(day);
    if (month == undefined || day == undefined || typeof month2 != "number" || typeof day2 != "number" || 1 > month2 || 12 < month2) {
        throw new Error("bad inputs");
    }
    if (month2 == 1 || month2 == 3 || month2 == 5 || month2 == 7 || month2 == 8 || month2 == 10 || month2 == 12) {
        if (day2 < 1 || day2 > 31) {
            throw new Error("day out of month range");
        }
    }
    else if (month2 == 2) {
        if (day2 > 28) {
            throw new Error("day out of month range");
        }
    }
    else {
        if (day2 > 30) {
            throw new Error("day out of month range");
        }
    }
    let holder = await getAPIdata();
    let answer = [];
    for (let i = 0; i < holder.length; i++) {
        if (parseInt(holder[i]["date_of_birth"].slice(0,2)) == month2 && parseInt(holder[i]["date_of_birth"].slice(3,5)) == day2) {
            answer.push(holder[i]["first_name"] + " " + holder[i]["last_name"]);
        }
    }
    return answer;
}


module.exports = {getPersonById, sameEmail, manipulatelp, sameBirthday};