
const express = require('express');
const session = require('express-session');
const router = express.Router();
const data = require('../data');
const users = data.users;
const app = express();


function check(username) {
  if (typeof username != "string") throw new error("bad inputs");
  for(let i in username) {
    if(username[i] == ' ') {
      throw new error("bad inputs");
    }
  }
  if (username.length < 4) {
    throw new error("bad inputs");
  }
  return true;
}

function checkPassword(password) {
  if (typeof password != "string") throw new error("bad inputs");
  for(let i in password) {
    if(password[i] == ' ') {
      throw new error("bad inputs");
    }
  }
  if (password.length < 6) {
    throw new error("bad inputs");
  }
  return true;
}

router.get('/logout', async (req, res) => {
  try {
    if (!req.session.user) {
        res.redirect('/');
    }
    else {
      const holder = req.session.user
      req.session.destroy();
      res.render('logout', { user: holder })
    }
  } catch (e) {
    res.status(500).json({error: e});
  }
});
router.get('/', async (req, res) => {
    if (req.session.user) {
        res.redirect('/private');
    }
    else {
        res.render('login');
    }
  });


router.post('/login', async (req, res) => {
  let n = 400;
  try {
    let inputs = req.body;
    if (!inputs.username || !inputs.password || !check(inputs.username) || !checkPassword(inputs.password)) {
      throw new error("bad inputs");
    }
    let login = await users.checkUser(inputs.username, inputs.password);
    if (login.authenticated != true) {
      n = 500;
      throw new error("bad inputs");
    }
    req.session.user = inputs.username;
        res.redirect('/private')
  } catch (e) {
    res.status(n).render('login', {error: true});
  }
});

router.get('/signup', async (req, res) => {
  if (req.session.user) {
      res.redirect('/private');
  }
  else {
      res.render('signup');
  }
});

router.post('/signup', async (req, res) => {
  let n = 400;
  try {
    let inputs = req.body;
    if (!inputs.username || !inputs.password || !check(inputs.username) || !checkPassword(inputs.password)) {
      throw new error("bad inputs");
    }
    let signup = await users.createUser(inputs.username, inputs.password);
    if (signup.userInserted != true) {
      n = 500;
      throw new error("bad inputs");
    }
    req.session.user = inputs.username
    res.redirect('/private');
  } catch (e) {
    res.status(n).render('signup', {error: true});
  }
});

router.get('/tag/:tag', async (req, res) => {
  const postList = await postData.getPostsByTag(req.params.tag);
  res.render('posts/index', {posts: postList});
});


module.exports = router;


app.use('*', (req, res) => {
    res.sendStatus(404);
  });