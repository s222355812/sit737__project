const express = require('express');
const router = express.Router();
const path = require('path');

let { getDB } = require('../dbConnect');
let database;
getDB.then((result) => {
  database = result;
});


const hardcodedDoctors = [
  {
    _id: {
      $oid: "647748ec319af80caaa2abb5"
    },
  "_user": "doctor",
  "_email": "shaun@gmail.com",
  "_name": "Dr. Shaun Green",
  "_password": "shaun",
  "_picture": "",
  "_specialisation": [
    "General Medicine",
    "Kidney & Urine",
    "Stomach & Digestion",
    "Hepatology",
    "Diet & Nutrition"
  ],
  "_fees": "60.00",
  "_comments": [],
  "_experience": [
    {
      "_Position": "Head Doctor",
      "_HospitalName": "Melbourne University Hosptial",
      "_Duration": "2"
    }
  ],
  "_education": [
    {
      "_UniName": "Monash",
      "_Degree": "Master"
    },
    {
      "_UniName": "Melbourne University",
      "_Degree": "PHD"
    }
  ],
  "_appointments": {
    "May 01, 2023": [
      {
        "name": "Philips William",
        "email": "philips@gmail.com",
        "picture": "",
        "from": "10:00 AM",
        "to": "11:00 AM",
        "status": "booked"
      },
      {
        "name": " ",
        "email": "v@gmail.com",
        "picture": "images/profile.jpg",
        "from": "11:00 AM",
        "to": "12:00 PM",
        "status": "booked"
      }
    ]
  },
  "_docSched": {
    "monday": [
      {
        "from": "09:00 AM",
        "to": "10:00 AM"
      },
      {
        "from": "10:00 AM",
        "to": "11:00 AM"
      },
      {
        "from": "11:00 AM",
        "to": "12:00 PM"
      },
      {
        "from": "01:00 PM",
        "to": "02:00 PM"
      },
      {
        "from": "02:00 PM",
        "to": "03:00 PM"
      },
      {
        "from": "03:00 PM",
        "to": "04:00 PM"
      },
      {
        "from": "04:00 PM",
        "to": "05:00 PM"
      },
      {
        "from": "05:00 PM",
        "to": "06:00 PM"
      }
    ],
    "tuesday": [
      {
        "from": "09:00 AM",
        "to": "10:00 AM"
      },
      {
        "from": "10:00 AM",
        "to": "11:00 AM"
      },
      {
        "from": "11:00 AM",
        "to": "12:00 PM"
      },
      {
        "from": "01:00 PM",
        "to": "02:00 PM"
      },
      {
        "from": "02:00 PM",
        "to": "03:00 PM"
      },
      {
        "from": "03:00 PM",
        "to": "04:00 PM"
      },
      {
        "from": "04:00 PM",
        "to": "05:00 PM"
      },
      {
        "from": "05:00 PM",
        "to": "06:00 PM"
      }
    ],
    "wednesday": [
      {
        "from": "09:00 AM",
        "to": "10:00 AM"
      },
      {
        "from": "10:00 AM",
        "to": "11:00 AM"
      },
      {
        "from": "11:00 AM",
        "to": "12:00 PM"
      },
      {
        "from": "01:00 PM",
        "to": "02:00 PM"
      },
      {
        "from": "02:00 PM",
        "to": "03:00 PM"
      },
      {
        "from": "03:00 PM",
        "to": "04:00 PM"
      },
      {
        "from": "04:00 PM",
        "to": "05:00 PM"
      },
      {
        "from": "05:00 PM",
        "to": "06:00 PM"
      }
    ],
    "thursday": [
      {
        "from": "09:00 AM",
        "to": "10:00 AM"
      },
      {
        "from": "10:00 AM",
        "to": "11:00 AM"
      },
      {
        "from": "11:00 AM",
        "to": "12:00 PM"
      },
      {
        "from": "01:00 PM",
        "to": "02:00 PM"
      },
      {
        "from": "02:00 PM",
        "to": "03:00 PM"
      },
      {
        "from": "03:00 PM",
        "to": "04:00 PM"
      },
      {
        "from": "04:00 PM",
        "to": "05:00 PM"
      },
      {
        "from": "05:00 PM",
        "to": "06:00 PM"
      }
    ],
    "friday": [
      {
        "from": "09:00 AM",
        "to": "10:00 AM"
      },
      {
        "from": "10:00 AM",
        "to": "11:00 AM"
      },
      {
        "from": "11:00 AM",
        "to": "12:00 PM"
      },
      {
        "from": "01:00 PM",
        "to": "02:00 PM"
      },
      {
        "from": "02:00 PM",
        "to": "03:00 PM"
      },
      {
        "from": "03:00 PM",
        "to": "04:00 PM"
      },
      {
        "from": "04:00 PM",
        "to": "05:00 PM"
      },
      {
        "from": "05:00 PM",
        "to": "06:00 PM"
      }
    ],
    "saturday": [],
    "sunday": []
  }}, {
    _id: {
      $oid: "64774915319af80caaa2abb6"
    },
    "_user":"doctor","_email":"isaac@gmail.com","_name":"Dr. Isaac Wilson","_password":"isaac","_picture":"","_fees":"50.00","_specialisation":["General Medicine","Skin & Dermatology","Acne and Eczema","Allergy","Cancer"],"_comments":{},"_experience":[{"_Position":"Head Doctor","_HospitalName":"Monash Hosptial","_Duration":"6"},{"_Position":"Assitant Doctor","_HospitalName":"Deakin Hosptial","_Duration":"1"}],"_education":[{"_UniName":"Deakin","_Degree":"PHD"},{"_UniName":"Monash","_Degree":"Masters Degree"}],"_appointments":{},"_docSched":{"monday":[{"from":"09:00 AM","to":"10:00 AM"},{"from":"10:00 AM","to":"11:00 AM"},{"from":"11:00 AM","to":"12:00 PM"},{"from":"01:00 PM","to":"02:00 PM"},{"from":"02:00 PM","to":"03:00 PM"},{"from":"03:00 PM","to":"04:00 PM"},{"from":"04:00 PM","to":"05:00 PM"},{"from":"05:00 PM","to":"06:00 PM"}],"tuesday":[{"from":"09:00 AM","to":"10:00 AM"},{"from":"10:00 AM","to":"11:00 AM"},{"from":"11:00 AM","to":"12:00 PM"},{"from":"01:00 PM","to":"02:00 PM"},{"from":"02:00 PM","to":"03:00 PM"},{"from":"03:00 PM","to":"04:00 PM"},{"from":"04:00 PM","to":"05:00 PM"},{"from":"05:00 PM","to":"06:00 PM"}],"wednesday":[{"from":"09:00 AM","to":"10:00 AM"},{"from":"10:00 AM","to":"11:00 AM"},{"from":"11:00 AM","to":"12:00 PM"},{"from":"01:00 PM","to":"02:00 PM"},{"from":"02:00 PM","to":"03:00 PM"},{"from":"03:00 PM","to":"04:00 PM"},{"from":"04:00 PM","to":"05:00 PM"},{"from":"05:00 PM","to":"06:00 PM"}],"thursday":[{"from":"09:00 AM","to":"10:00 AM"},{"from":"10:00 AM","to":"11:00 AM"},{"from":"11:00 AM","to":"12:00 PM"},{"from":"01:00 PM","to":"02:00 PM"},{"from":"02:00 PM","to":"03:00 PM"},{"from":"03:00 PM","to":"04:00 PM"},{"from":"04:00 PM","to":"05:00 PM"},{"from":"05:00 PM","to":"06:00 PM"}],"friday":[{"from":"09:00 AM","to":"10:00 AM"},{"from":"10:00 AM","to":"11:00 AM"},{"from":"11:00 AM","to":"12:00 PM"},{"from":"01:00 PM","to":"02:00 PM"},{"from":"02:00 PM","to":"03:00 PM"},{"from":"03:00 PM","to":"04:00 PM"},{"from":"04:00 PM","to":"05:00 PM"},{"from":"05:00 PM","to":"06:00 PM"}],"saturday":[],"sunday":[]}}
];

router.get('/search', (req, res) => {
  res.sendFile(path.resolve('public/doctor-list.html'));
});

router.post('/search', (req, res) => {
  // Instead of querying the database, use the hardcoded doctor data
  const result = hardcodedDoctors.filter(doctor => doctor._specialisation.includes(req.body.search));
  
  let query = { _id: 'k0RK4pQvFiyGr4LSyRP75m1YNOZYKsY_' };
  let newValue = { $set: { 'session.searchResults': result } };
  database.collection('sessions').updateOne(query, newValue, (err, result) => {
    if (err) throw err;
    else console.log('Session searchResults updated');
  });

  res.redirect('/search');
});

module.exports = router;

// router.get('/search', (req, res) => {
//   res.sendFile(path.resolve('public/doctor-list.html'));
// });

// router.post('/search', (req, res) => {
//   database
//     .collection('DoctorClass')
//     .find(
//       { _specialisation: { $all: [req.body.search] } },
//       {
//         projection: {
//           _email: 1,
//           _experience: 1,
//           _name: 1,
//           _specialisation: 1,
//           _picture: 1,
//         },
//       }
//     )
//     .toArray((err, result) => {
//       let query = { _id: 'k0RK4pQvFiyGr4LSyRP75m1YNOZYKsY_' };
//       let newValue = { $set: { 'session.searchResults': result } };
//       if (err) throw err;
//       else
//         database
//           .collection('sessions')
//           .updateOne(query, newValue, (err, result) => {
//             if (err) throw err;
//             else console.log('Session searchResults updated');
//           });
//     });
//   res.redirect('/search');
// });
// module.exports = router;
