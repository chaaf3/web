const mongoCollections = require('../config/mongoCollections');
const bands = mongoCollections.bands;
const { ObjectId, ConnectionCheckedInEvent, StreamDescription } = require('mongodb');
const bandFunctions = require('./bands');


function hasElements(arr) {
    for (let i = 0; i < arr.length; i++) {
        if (typeof arr[i] == "string" && arr[i] != "" && !empty3(arr[i])) {
            return true;
        }
    }
    return false;
}
function empty3(str) {
    if (typeof str != "string") {
        return true;
    }
    let counter = 0;
    for (let i = 0; i < str.length; i++) {
        if (str.charAt(i) != " ") {
            counter++;
        }
        if (counter == 3) {
            return false;
        }
    }
    return true;
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

async function create({id, title, releaseDate, tracks, rating}) {
    const bandCollection = await bands();
    if (id == undefined || title == undefined || releaseDate == undefined || tracks == undefined || rating == undefined) {
        throw new Error("bad inputs");
    }
    if (typeof id != typeof title || typeof title != typeof releaseDate || typeof releaseDate != "string"
        || empty(id) || empty(title) || empty(releaseDate)) {
            throw new Error("bad inputs");
    }
    if (!ObjectId.isValid(id)) {
        throw new Error("bad inputs");
    }
    let band = await bandCollection.findOne({_id: ObjectId(id) });
    if (band == null) {
        throw new Error("this doesn't exist");
    }
    if (!Array.isArray(tracks) || !hasElements(tracks)) {
        throw new Error("bad inputs");
    }
    // if (date.match(/^\d{2}\/\d{2}\/\d{4}$/) === null || parseInt(releaseDate) < 1900 || parseInt(releaseDate) > 2023) {
    //     throw new Error("bad inputs");
    // }
    if (typeof rating != "number") {
        throw new Error("bad inputs");
    }
    if (Number.isInteger(rating)) {
        if (rating > 5 || rating < 0) {
            throw new Error ("bad inputs");
        }
    }
    else {
        if (rating > 4.8 || rating < 1.5) {
            throw new Error ("bad inputs");
        }
    }

    let newAlbum = {
        id: ObjectId(),
        title: title,
        releaseDate: releaseDate,
        tracks: tracks,
        rating: rating
    };


    band.albums.push(newAlbum);
    let insInfo = await bandCollection.updateOne({_id: ObjectId(id)}, {$set: band});
    if (insInfo.acknowledged == false) {
        throw new Error("failed inserting into database");
    }
    newAlbum.id = newAlbum.id.toString();
    return newAlbum;
}


async function getAll(bandId) {
    const bandCollection = await bands();
    if (bandId == undefined) {
        throw new Error("bad inputs");
    }
    if (typeof bandId != "string" || empty(bandId)) {
            throw new Error("bad inputs");
    }
    if (!ObjectId.isValid(bandId)) {
        throw new Error("bad inputs");
    }
    let band = await bandCollection.findOne({_id: ObjectId(bandId) });
    if (band == null) {
        throw new Error("this doesn't exist");
    }
    for (let i = 0; i < band.albums.length; i++) {
        band.albums[i]["_id"] = band.albums[i]._id.toString();
    }
    return band.albums;
}

async function get(albumId) {
    if (albumId == undefined || typeof albumId != "string" || empty(albumId)) {
        throw new Error("bad inputs");
    }
    if (!ObjectId.isValid(albumId)) {
        throw new Error("bad inputs");

    }
    let bandsCollection = await bands();
    const bandCollection = await bandsCollection.find({}).toArray();
    let band;
    for (let i = 0; i < bandCollection.length; i++) {
        for(let j = 0; j < bandCollection[i].albums.length; j++) {
            if (bandCollection[i].albums[j].id.toString() == albumId) {
                band = bandCollection[i];
                break;
            }
        }
    }
    if (band == null) {
        throw new Error("this doesn't exist");
    }

    band["_id"] = band["_id"].toString();
    return band;
}

async function remove(albumId) {
    if (albumId == undefined || typeof albumId != "string" || empty(albumId)) {
        throw new Error("bad inputs");
    }
    if (!ObjectId.isValid(albumId)) {
        throw new Error("bad inputs");

    }
    let names = await get(albumId);
    //console.log(names);
    for (let i = 0; i < names.albums.length; i++) {
        if (names.albums[i].id.toString() == albumId) {
            names.albums.splice(i, 1);
        }
    }
    let bandsCollection = await bands();
    let holderId = names._id;
    delete names._id;

    await bandsCollection.updateOne({_id: ObjectId(holderId)}, {$set: names});
    names["_id"] = holderId;


    return names;
}





module.exports = {remove, get, getAll, create};