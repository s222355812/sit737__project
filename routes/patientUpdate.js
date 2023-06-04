const express = require('express');
const router = express.Router();
const path = require('path');
const { isBuffer } = require('util');

let { getDB } = require('../dbConnect');
let database;
getDB.then((result) => {
  database = result;
});

router.post('/patientupdate', (req, res) => {
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let age = req.body.age;
  let sex = req.body.sex;
  let newValue = {
    $set: { _fname: firstName, _lname: lastName, _age: age, _sex: sex },
  };

  // let newValue1 = {
  //   $set: {
  //     ['session.userData._fname']:firstName,
  //     ['session.userData._lname']:lastName,
  //     ['session.userData._age']:age,
  //     ['session.userData._sex']:sex,
  //   }
  // };
  database
    .collection('sessions')
    .find({ _id: 'k0RK4pQvFiyGr4LSyRP75m1YNOZYKsY_' })
    .toArray((err, result) => {
      if (err) throw err;
      if (result[0]) {
        console.log('result[0] works');
        let email = result[0].session.userData._email;
        let query = {
          _email: `${email}`,
        };
        database
          .collection('Patient')
          .find(query)
          .toArray((err, patient) => {
            console.log('enter patient collection');
            if (err) throw err;
            else {
              database
                .collection('Patient')
                .updateMany(query, newValue, (err, result) => {
                  if (err) throw err;
                  else {
                    console.log('all updated');
                  }

                  res.redirect('/patient-profile.html');
                });
            }
          });

        // let query2 = { _id: 'k0RK4pQvFiyGr4LSyRP75m1YNOZYKsY_' };

        // database
        // .collection('sessions')
        // .updateMany(query2, newValue1, (err, result) => {
        //   if (err) throw err;
        //   else console.log('Session Exp updated');
        // });
      }
    });
});

router.post('/patientupdate/pic', (req, res) => {
  let picture = req.body.picture;
  let email = req.session.userData._email;
  let query = {
    _email: `${email}`,
  };
  let newPic = { $set: { _picture: picture } };
  database
    .collection('Patient')
    .find(query)
    .toArray((err, patient) => {
      if (err) throw err;
      else {
        database
          .collection('Patient')
          .updateOne(query, newPic, (err, result) => {
            if (err) throw err;
            else {
              console.log('Picture updated');
            }
          });
      }
    });

  // res.redirect('back');
  res.redirect('http://localhost:3000/patient-profile.html');
});

module.exports = router;
