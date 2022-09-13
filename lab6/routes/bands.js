const data = require('../data');
const express = require('express');
const router = express.Router();
const bandsData = data.bands;
const albumsData = data.albums;
const {ObjectId } = require('mongodb');
const { bands } = require('../data');




router.route('/').get( async (req, res) => {
    try {
        const bandsList = await bandsData.getAll();
        let bands2 = bandsList.map((band) => {return { id: band._id.toString(), name: band.name}})
        res.json(bands2);
    } catch (e) {
        res.status(404).send(e);
    }
})

router.route('/').post( async (req, res) => {
    //id, newName, newGenre, newWebsite, newRecordLabel, newBandMembers, newYearFormed
    //validate the json
    try {
        const bands2 = req.body;
        const bandsList = await bandsData.create(bands2);
        res.json(bandsList)
    }
    catch (e) {
        res.status(500).json({error: e})
    }
})


router.route('/:id').get( async (req, res) => {
    try {
        let bandsList = await bandsData.get(req.params.id);
        res.json(bandsList);
    } catch (e) {
        res.status(404).send(e);
    }
})

router.route('/:id').put(async (req, res) => {
    try {
        const bands2 = req.body;
        const bandsList = await bandsData.update({ id: req.params.id,... bands2});
        res.json(bandsList);
    }
    catch (e) {
        res.status(500).json({error: e})
    }
})

router.route('/:id').delete(async (req, res) => {
//check id
try { 
    console.log(req.params.id);
    let answer = await bandsData.remove(req.params.id);
    res.json(answer);
} catch (e) {
    res.status(404).send(e);
}
})
// data function does the delete
//deleteone mongo

module.exports = router;