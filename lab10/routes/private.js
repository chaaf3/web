const express = require('express');
const session = require('express-session');
const router = express.Router();
const data = require('../data');
const users = data.users;
const app = express();

// router.get('/logout', async (req, res) => {
//   const { user } = req.session
//   delete user
//   req.session.destroy();
//   res.render('logout', { user })
// })


function checkBody(req, res, next){
  if ( !req.session.user) {
    //they aren't authenticated
    res.status(403).render('not-logged')
  } else next();
}

router.get('/', checkBody, async (req, res) => {
    try {
        let user = req.session.user

        res.render('logged', {user:user});
    } catch (e) {
      res.status(500).json({error: e});
    }
  });

module.exports = router;