const express = require("express"); //importing express
require("firebase/compat/firestore");
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const session = require('express-session')

const bcrypt = require('bcrypt');
const saltRounds = 10;
const app = express();
app.use(express.json()); //initializing express app
app.use(cors({  
    origin: ["http://localhost:3000"],
    methods:["GET","POST"],
    credentials:true
}));
app.use(bodyParser.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))

app.use(session({
  secret:"orbit",
  resave:false,
  saveUninitialized:false,
  cookie:{
    secure:false,
    maxAge:1000* 60 * 60 * 2,
  },
}
));

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
  
  bcrypt.hash(userData.password,saltRounds, async(err, hash)=> {
    if(err){
      console.log(err)
    }
    const staffPath = doc(db, `staff/${userData.email}`);
    userData.password=hash
    const addedUser = await setDoc(staffPath, userData);
  })

  
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
    
    
    const staffDocRef = doc(db, "staff", email);
    const userDoc = await getDoc(staffDocRef);
    
    if (userDoc.exists()) {
      //perform authentication
      const userData = userDoc.data();
      bcrypt.compare(password,userData.password,(err,response)=>{
        console.log(response)
        if(response){
          
          //Creating a session
          
          req.session.userid = {
            email:userData.email,
            department:userData.department,
            name:userData.name,
            phone:userData.phone
          }
          
          console.log(req.session)
          res.send({
            msg: "Staff logged in successfully",
            status: 200, //All okay , can proceeed
            data: req.session.userid,
          });
        }else{
          res.send({
            msg: "Password entered is incorrect, Please try again",
            status: 401, //Password is not correct
          });
        }
      })
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

app.get("/loginStaff",(req,res)=>{
  //console.log(req.session)
  if(req.session.userid){
    return res.json({
      valid:true,
      userData: req.session.userid
    })
  }else{
    return res.json({
      valid:false,
    })
  }
})

async function authenticateStaff(email, password) {
  const staffDocRef = doc(db, "staff", email);
  const userDoc = await getDoc(staffDocRef);

  if (userDoc.exists()) {
    //perform authentication
    const userData = userDoc.data();
    bcrypt.compare(password,userData.password,(err,response)=>{
      console.log(response)
      if(response){
        return true;
      }else{
        return false;
      }
    })
  } else {
    console.log("Cannot authenticate user, as document does not exist");
    return false;
  }
  
}

app.post("/register", async (req, res) => {
  //Register user POST api
  try {
    console.log(req.body);
    const reqBody = req.body;
    const username = reqBody.username;
    if (await checkIfUserExists(username)) {
      res.send({
        status: 401,
        message: `User with - ${username} already exists try with another username`,
      });
    } else {
      await addUser(reqBody);
      console.log(`User got added - ${username}`);
      res.send({
        status: 200,
        message: `User got added - ${username}`,
      });
    }
  } catch (error) {
    res.send(`error occured ${error}`);
  }
});

async function checkIfUserExists(username) {
  console.log(`Checking if username already exists ${username}`);
  if(username === undefined || username.length <1){
    return false;
  }
  const userDocRef = doc(db, "users", username);
  const userDoc = await getDoc(userDocRef);
  if (userDoc.exists()) {
    return true;
  } else {
    return false;
  }
}

async function addUser(userData) {
  bcrypt.hash(userData.password,saltRounds, async(err, hash)=> {
    if(err){
      console.log(err)
    }
    const userPath = doc(db, `users/${userData.username}`);
    userData.password=hash
    const addedUser = await setDoc(userPath, userData);
  })
  // console.log(addedUser)
}

app.post("/addTicket", async (req, res) => {
  try {
      const reqBody = req.body;
      
      const category = reqBody.category;
      if (DEPARTMENTS_SET[category] !== true) {
        return res.json({
          status: "501",
          message: `${category} category is invalid`,
        });
      }
      const date = new Date()
      reqBody['date']=date.toDateString();
      reqBody['STATUS']= `OPEN`;
      const ticketNo =await generateTicketNumber(category);
      if(!await addTicket(ticketNo,reqBody,"",category)){
          return res.json({status:500, message: `Something went wrong check logs`})
      }
      updateTicketCounter(category);
      
  
      return res.json({ status: 200, message: "All good", tix: ticketNo });
  } catch (error) {
      return res.json({status: 500, message: `${error}` })
  }
  });

  async function generateTicketNumber(category) {
    const deptCounter = doc(db, `counter`, `ticketCounter`);
    const counterSnap = await getDoc(deptCounter);
    if (counterSnap.exists()) {
      const counterData = counterSnap.data();
          if (!counterData[category]) {
          counterData[category] = 1;
          } else {
          counterData[category]++;
          }
          const categoryCode = category.substring(0, 3).toUpperCase();
          const ticketNumber = counterData[category].toString().padStart(5, "0");
          // console.log(`Unique Ticket number -- ${categoryCode}-${ticketNumber}`)
          return `${categoryCode}-${ticketNumber}`
    } else {
      console.log("No such document!");
    }
  }

  async function addTicket(ticketNo,ticketData,username,category){
    try {
        // const userTicketPath = doc(db,`users/${username}/tickets/${ticketNo}`)
        // const addedTicket =await setDoc(userTicketPath,ticketData)
        const deptTicketPath = doc(db,`tickets/${category}/tix/${ticketNo}`)
        const ticketAdded = await setDoc(deptTicketPath,ticketData)
        return true;
    } catch (error) {
        console.log(error)
        return false;
    }
}

async function updateTicketCounter(category){
  const deptCounterPath = doc(db,`counter`,`ticketCounter`)
  const counterSnap = await getDoc(deptCounterPath)
  if(counterSnap.exists()){
      const counterData = counterSnap.data();
      // console.log(`${JSON.stringify(counterData)} -- counter data from DB`)
      if(!counterData[category]){
          counterData[category]=1
      }else{
          counterData[category]++;
      }
      // console.log(`Updating ticket counter ${JSON.stringify(counterData)}`)
      setDoc(deptCounterPath,counterData)
  }else{
      console.log(`No such document`)
  }
}

const port = 4000;

app.listen(port, () => console.log("Up and running on  http://localhost:4000"));
