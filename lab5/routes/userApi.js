const express = require ('express');
const router = express.Router();
const data = require ('../data');
const userApi = data.users;
const {ObjectId } = require('mongodb');
const axios = require('axios');


function checkId(id) {
    if (!id) throw 'Error';
    if (typeof id !== 'string') throw 'Error:';
    id = id.trim();
    if (id.length === 0 || isNaN(id) || parseInt(id) < 0)
      throw 'Error';
    return id;
  }

//checkId and was coppied and pasted from Professor Hill's lecture code 
router 
    .route('/people/')
    .get (async (req, res) => {
        try {
            const peopleList = await userApi.getPeople();
            res.json(peopleList.data);
        } catch (e) {
            res.status(500).send(e);
        }
    })
router.route('/people/:id')
    .get(async (req, res) => {
        try {
            const peopleList = await userApi.getPerson(checkId(req.params.id))
            res.json(peopleList)
        } catch (e) {
            res.status (404).json(e);
        }
    })

    router 
    .route('/work/')
    .get (async (req, res) => {
        try {
            const workList = await userApi.getWorks();
            res.json(workList.data)
        } catch (e) {
            res.status(500).send(e);
        }
    })
router.route('/work/:id')
    .get(async (req, res) => {
        try {
            const workList = await userApi.getWork(checkId(req.params.id))
            res.json(workList)
        } catch (e) {
            res.status (404).json(e);
        }
    })

module.exports = router;
