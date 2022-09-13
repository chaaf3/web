const express = require ('express');
const router = express.Router();
const data = require ('../data');
const tvApi = data.tv;
const axios = require('axios');

router 
    .route('/')
    .get (async (req, res) => {
        res.render('posts/showFinder');
    })

//checkId and was coppied and pasted from Professor Hill's lecture code 
router 
    .route('/searchshows')
    .post (async (req, res) => {
        try {
            const shows = await tvApi.getByWord(req.body.showSearchTerm);
            res.render('posts/search', {showSearchTerm: req.body.showSearchTerm, results: shows});
        } catch (e) {
            res.status(500).send(e);
        }
    })
router.route('/show/:id')
    .get(async (req, res) => {
        try {
            const shows = await tvApi.getById(req.params.id);
            res.render('posts/single', {shows: shows.data, title: shows.data.title});
        } catch (e) {
            res.status (404).json(e);
        }
    })


module.exports = router;
