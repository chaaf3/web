const data = require('../data');
const express = require('express');
const router = express.Router();
const bandsData = data.bands;
const albumsData = data.albums;
const {ObjectId } = require('mongodb');
const { bands } = require('../data');




router.route('/:id').post( async (req, res) => {
    //id, newName, newGenre, newWebsite, newRecordLabel, newBandMembers, newYearFormed
    //validate the json
    try {
        const bandId = req.params.id;
        let albumsInfo = req.body;
        let answer = await albumsData.create({id: bandId,... albumsInfo});
        res.json(answer);
    }
    catch (e) {
        res.status(500).json({error: e})
    }
})


router.route('/:id').get( async (req, res) => {
    try {
        let albums = await albumsData.get(req.params.id);
        res.json(albums);
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
let answer = await albumsData.remove(req.params.id);
    //console.log(answer, "hello there");
    res.status(200).json({albumId: req.params.id, deleted: true});
// try { 
    
// } catch (e) {
//     res.status(500).send(e);
// }
})
// data function does the delete
//deleteone mongo

module.exports = router;