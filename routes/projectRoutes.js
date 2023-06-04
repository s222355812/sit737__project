const express = require('express');
const router = express.Router();
const path = require('path');

let { getDB } = require('../dbConnect');
let database;
getDB.then((result) => {
  database = result;
});

const isAuth = (req, res, next) => {
  if (req.session.isAuth) {
    next();
  } else {
    res.sendFile(path.resolve('public/login.html'));
  }
};

const getCollection = (collection, email, res) => {
  database
    .collection(collection)
    .find(email)
    .toArray((err, result) => {
      if (err) res.json({ statusCode: 400, message: err });
      else res.json({ statusCode: 200, data: result, message: 'Success' });
    });
};

router.get('/', isAuth, (req, res) => {
  console.log('k0RK4pQvFiyGr4LSyRP75m1YNOZYKsY_');

  req.session.searchResults = {};
  req.session.viewProfileDoctor = {};
  req.session.viewProfilePatient = {};

  res.sendFile(path.resolve('public/homepage.html'));
});

router.post('/login', (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  let query = {
    _email: `${email}`,
  };

  database
    .collection('Patient')
    .find(query)
    .toArray((err, result) => {
      if (err) throw err;
      if (result[0]) {
        if (result[0]._password == password) {
          req.session.isAuth = true;
          req.session.userData = {
            _email: result[0]._email,
            _user: result[0]._user,
          };
          res.redirect('/?sessionID=' + 'k0RK4pQvFiyGr4LSyRP75m1YNOZYKsY_');
        }
      }
    });

  database
    .collection('DoctorClass')
    .find(query)
    .toArray((err, result) => {
      if (err) throw err;
      if (result[0]) {
        if (result[0]._password == password) {
          req.session.isAuth = true;
          req.session.userData = {
            _email: result[0]._email,
            _user: result[0]._user,
          };
          res.redirect('/?sessionID=' + 'k0RK4pQvFiyGr4LSyRP75m1YNOZYKsY_');
        }
      }
    });
});

router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) throw err;
    res.redirect('/');
  });
});

router.post('/api/userData', (req, res) => {
  let email = req.session.userData._email;
  if (req.session.userData._user == 'patient')
    getCollection('Patient', { _email: email }, res);
  else if (req.session.userData._user == 'doctor')
    getCollection('DoctorClass', { _email: email }, res);
  else console.log('No user found');
});

router.get('/api/homepage', (req, res) => {
  getCollection('homepage', {}, res);
});

module.exports = router;
