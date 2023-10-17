const express = require("express"); //importing express
require("firebase/compat/firestore");
const cors = require('cors');

const app = express();
app.use(express.json()); //initializing express app
app.use(cors({  
    origin: '*'
}));

const firebase = require("firebase/compat/app");


const {
  doc,
  setDoc,
  updateDoc,
  addDoc,
  collection,
  getDoc,
  onSnapshot,
  DocumentSnapshot,
  where,
  limit,
  getDocs,
  query,
  getCountFromServer,
  orderBy,
  QueryOrderByConstraint,
  QueryConstraint,
  startAfter,
} = require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyCfihXTRF22A-vcTj0CSaQ5AoSDLO9aibs",
  authDomain: "ticketing-system-bdf85.firebaseapp.com",
  projectId: "ticketing-system-bdf85",
  storageBucket: "ticketing-system-bdf85.appspot.com",
  messagingSenderId: "645378284782",
  appId: "1:645378284782:web:588b333460dea80436a7ff",
  measurementId: "G-6M0WTZDTLC",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

app.get("/health-check", (req, res) => {
  //making a get api
  res.send("Server is running");
});

//List of departments
const DEPARTMENTS_SET = {
  DEVELOPMENT: true,
  CLOUD: true,
  DEPLOYMENT: true,
  DIGITAL_MARKETING: true,
  INFRASTRUCTURE: true,
  APP_DEVELOPMENT: true,
  SOFTWARE_SOLUTIONS: true,
  DESIGN: true,
};

// Request Body for registarStaff

// {
//     email,
//     password,
//     name,
//     dateOfBirth,
//     phone,
//     department,
//     education
// }

app.post("/registerStaff", async (req, res) => {
  //Register user POST api
  try {
    const reqBody = req.body;
    console.log(
      `Recieved request to Register Staff ${JSON.stringify(reqBody)}`
    );
    const email = reqBody.email;

    const department = reqBody.department;
    if (DEPARTMENTS_SET[department] !== true) {
      return res.json({
        status: "501",
        message: `${department} department is invalid`,
      });
    }

    if (await checkIfStaffExists(email)) {
      console.log(
        `Staff with - ${email} already exists try with another email`
      );
      res.send({
        status: 401,
        message: `Staff with - ${email} already exists try with another email`,
      });
    } else {
      await addStaff(reqBody);
      console.log(`Staff got added - ${email}`);
      res.send({
        status: 200,
        message: `Staff got added - ${email}`,
      });
    }
  } catch (error) {
    console.log(`Error occured ${error}`);
    res.send(`error occured ${error}`);
  }
});

async function addStaff(userData) {
  const staffPath = doc(db, `staff/${userData.email}`);
  const addedUser = await setDoc(staffPath, userData);
  // console.log(addedUser)
}

async function checkIfStaffExists(email) {
  console.log(`Checking if Staff already exists ${email}`);
  if (email === undefined || email.length < 1) {
    console.log(`Null value passed -- ${email}`);
    return false;
  }
  const staffDocRef = doc(db, "staff", email);
  const staffDoc = await getDoc(staffDocRef);
  if (staffDoc.exists()) {
    return true;
  } else {
    return false;
  }
}

// Request Body for loginStaff

// {
//     email,
//     password,
// }

app.post("/loginStaff", async (req, res) => {
  try {
    const recvData = req.body;
    console.log(
      `Recieved request to login Staff \n ${JSON.stringify(recvData)}`
    );
    const email = recvData.email;
    const password = recvData.password;

    const userBool = await checkIfStaffExists(email);

    console.log(userBool + " if user exists");
    if (userBool) {
      const authenticatedUser = await authenticateStaff(email, password);
      if (authenticatedUser) {
        const staffDocRef = doc(db, "staff", email);
        const userDoc = await getDoc(staffDocRef);
        const userData = userDoc.data();

        res.send({
          msg: "Staff logged in successfully",
          status: 200, //All okay , can proceeed
          data: userData,
        });
      } else {
        res.send({
          msg: "Password entered is incorrect, Please try again",
          status: 401, //Password is not correct
        });
      }
    } else {
      res.send({
        msg: "staff does not exist, please register ",
        status: 301, // User does not exist, redirect to /register
      });
    }
  } catch (error) {
    console.log(error);
    res.send({ msg: `cannot login ${error}` });
  }
});

async function authenticateStaff(email, password) {
  const staffDocRef = doc(db, "staff", email);
  const userDoc = await getDoc(staffDocRef);

  if (userDoc.exists()) {
    //perform authentication
    const userData = userDoc.data();

    if (password === userData.password) {
      return true;
    }
  } else {
    console.log("Cannot authenticate user, as document does not exist");
  }
  return false;
}



const port = 4000;

app.listen(port, () => console.log("Up and running on  http://localhost:4000"));
