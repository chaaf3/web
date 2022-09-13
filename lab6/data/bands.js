const mongoCollections = require('../config/mongoCollections');
const bands = mongoCollections.bands;
const { ObjectId, ConnectionCheckedInEvent, StreamDescription } = require('mongodb');

function hasElements(arr) {
    for (let i = 0; i < arr.length; i++) {
        if (typeof arr[i] == "string" && arr[i] != "" && !empty(arr[i])) {
            return true;
        }
    }
    return false;
}
function empty(str) {
    if (typeof str != "string") {
        return true;
    }
    for (let i = 0; i < str.length; i++) {
        if (str.charAt(i) != " ") {
            return false;
        }
    }
    return true;
}
function has5(str) {
    let counter = 0;
    for (let i=11; i < str.length - 4; i++) {
        if (str.charAt(i) != ' ') {
            counter++;
        }
    }
    if (counter >= 5) {
        return true;
    }
    return false;
}

async function create({name, genre, website, recordLabel, bandMembers, yearFormed}) {
    if (name == undefined || genre == undefined || website == undefined || recordLabel == undefined || bandMembers == undefined || yearFormed == undefined) {
        throw new Error("bad inputs");
    }
    if (typeof name != typeof website || typeof website != typeof recordLabel || typeof recordLabel != "string"
        || empty(name) || empty(website) || empty(recordLabel)) {
            throw new Error("bad inputs");
    }
    if (website.slice(-4) != ".com" || website.slice(0, 10) == "http://www." || website.length < 20 || !has5(website)) {
        throw new Error("bad inputs");
    }

    if (!Array.isArray(genre) || !Array.isArray(bandMembers) || !hasElements(genre) || !hasElements(bandMembers)) {
        throw new Error("bad inputs");
    }
    if (typeof yearFormed != "number" || yearFormed < 1900 || yearFormed > 2022) {
        throw new Error("bad inputs");
    }
    const bandsCollection = await bands();

    let newBand = {
        name: name,
        genre: genre,
        website: website,
        recordLabel: recordLabel,
        bandMembers: bandMembers,
        yearFormed: yearFormed,
        albums: [],
        rating: 0
    };
    const insInfo = await bandsCollection.insertOne(newBand);
    if (insInfo.acknowledged == false) {
        throw new Error("failed inserting into database");
    }
    let holder = await get(insInfo.insertedId.toString());
    holder._id = holder._id.toString();
    
    return holder;
}


async function getAll() {
    const bandsCollection = await bands();
    const bandsList = await bandsCollection.find({}).toArray();
    if (!bandsList) {
        return [];
    }
    for (let i = 0; i < bandsList.length; i++) {
        bandsList[i]["_id"] = bandsList[i]._id.toString();
    }
    return bandsList;
}

async function get(id) {
    if (id == undefined || typeof id != "string" || empty(id)) {
        throw new Error("bad inputs");
    }
    if (!ObjectId.isValid(id)) {
        throw new Error("bad inputs");

    }
    let bandCollection = await bands();
    let band = await bandCollection.findOne({_id: ObjectId(id) });
    if (band == null) {
        throw new Error("this doesn't exist");
    }
    band["_id"] = band["_id"].toString();
    return band;
}

async function remove(id) {
    if (id == undefined || typeof id != "string" || empty(id)) {
        throw new Error("bad inputs");
    }
    if (!ObjectId.isValid(id)) {
        throw new Error("bad inputs");

    }
    let bandCollection = await bands();
    let names = await get(id);
    let band = await bandCollection.deleteOne({_id: ObjectId(id) });
    if (band.deletedCount == 0 || band.acknowledge == false) {
        throw new Error("this doesn't exist");
    }
    return names.name + " has been successfully deleted!"
}


async function update({id, name, genre, website, recordLabel, bandMembers, yearFormed}) {
    //console.log(id, name, genre, website, recordLabel, bandMembers, yearFormed)
    if (id == undefined || name == undefined || genre == undefined || website == undefined || recordLabel == undefined || bandMembers == undefined || yearFormed == undefined) {
        throw new Error("bad inputs");
    }
    if (empty(id) || empty(name) || empty(website) || empty(recordLabel)) {
        throw new Error("bad inputs");
    }
    if (!ObjectId(id)) {
        throw new Error("bad inputs");
    }
    if (website.slice(-4) != ".com" || website.slice(0, 10) == "http://www." || website.length < 20 || !has5(website)) {
        throw new Error("bad inputs");
    }
    if (!Array.isArray(genre) || !Array.isArray(bandMembers) || !hasElements(genre) || !hasElements(bandMembers)) {
        throw new Error("bad inputs");
    }
    if (typeof yearFormed != "number" || yearFormed < 1900 || yearFormed > 2022) {
        throw new Error("bad inputs");
    }
    let breakdown = await get(id);
    let alb = breakdown.albums;
    let rat = breakdown.overallRating;

    let bandCollection = await bands();
    let band = await get(id);
    //console.log(band2);
    let band2 = await bandCollection.findOne({_id: ObjectId(id) });
    band2.name = name;
    band2.genre = genre;
    band2.website = website;
    band2.recordLabel = recordLabel;
    band2.bandMembers = bandMembers;
    band2.yearFormed = yearFormed;
    if (band2.albums) {
        band2.albums = alb;
    }
    if (band2.overallRating) {
        band2.overallRating = rat;
    }
    //console.log(band2);
    await bandCollection.updateOne({_id: ObjectId(id)}, {$set: band2});
    
    //console.log(band);
    return band2;
}
async function rename(id, name) {
    if (id == undefined || name == undefined || typeof id != "string" || empty(id) || typeof name != "string" || empty(name)) {
        throw new Error("bad inputs");
    } 
    let bandCollection = await bands();
    let holder = await get(id);
    if (holder.name == name) {
        throw new Error("the names are the same");
    }
    let band2 = await bandCollection.findOne({_id: ObjectId(id) });
    band2.name = name
    bandCollection.findOneAndReplace({_id: ObjectId(id) }, band2);
    holder.name = name;
    return holder;
}


module.exports = {update, remove, get, getAll, create};