const express = require('express');
const router = express.Router();
const path = require('path');

let { getDB } = require('../dbConnect');
let database;
getDB.then((result) => {
  database = result;
});

router.post('/sessions', (req, res) => {
  database
    .collection('sessions')
    .find({ _id: 'k0RK4pQvFiyGr4LSyRP75m1YNOZYKsY_' })
    .toArray((err, result) => {
      if (err) throw err;
      else res.json({ statusCode: 200, data: result, message: 'Success' });
    });
});

module.exports = router;
