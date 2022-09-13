const express = require('express');
const app = express();

const exphbs = require("express-handlebars")
const session = require('express-session');
const configRoutes = require('./routes');
app.use(express.json());

app.use(express.urlencoded({extended: true}))

app.use(session({
    name: 'AuthCookie',
    secret: 'some secret string!',
    resave: false,
    saveUninitialized: true
  }))


  
app.engine("handlebars", exphbs.engine({defaultLayout: "main"}))
app.set('view engine', 'handlebars');

// app.use('/private', (req, res, next) => {
//   console.log({ session: req.session })
//     if ( !req.session.user) {
//       //they aren't authenticated
//       res.status(404).render('not-logged')
//     }
//   next();
// });

app.use('*', (req, res, next) => {
    console.log(new Date().toUTCString());
    const { session: { user } } = req
    console.log(req.method)
    console.log(req.originalUrl)

    if (!user) {
      console.log("(Non-Authenticated User)");
    }
    else {
      console.log("(Authenticated User)");
    }
    //print whether the user is authenticated
    next();
});





configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});