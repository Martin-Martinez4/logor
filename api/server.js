// function escapeRegExp(string){
//   return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
// }

import 'dotenv/config';
// const signin = require('./controllers/signin');

import path from "path";


import { fileURLToPath } from 'url';
import { dirname } from 'path';

import bodyParser from 'body-parser'; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import home from "./home.js"

import followers from "./followers.js"

import likes from "./likes.js";

import tags from "./tags.js";

import mentions from "./mentions.js";

import responses from "./responses.js";

import simpleSearch from "./simpleSearch.js"

import { handleGetUserInfo, handleGetUserInfoByNickname, handleGetGetMiniProfileInfo, handleGetLoggedinUserInfo } from './controllers/getUserInfo.js';
import { handleGetUserID, handleGetRandomUserIDs } from './controllers/getIds/getIDs.js';
import { handleSignin, handleSignin2, removeToken } from './controllers/signin.js';
import { handleRegister, handleNicknameExists, handleUsernameExists } from './controllers/register.js';

import {  
  handleUpdateHeaderWithDefault, 
  handleUpdateProfileWithDefault, 
  handleUpdateHeaderImage,
  handleUploadProfileImage, 
  handleDeleteHeaderImage,
  handleDeleteProfileImage,
  handleUpdateUsername,
  handleUpdateNickname,
  handleUpdateDescription,
  handleUpdateLocation,
  handleUpdateLinks 
  } from "./controllers/profileAndHeader/profileAndHeader.js"

import { authenticateToken } from './middleware/authorization.js';


// const express = require('express');
import express from 'express';
import cookieParser from "cookie-parser"; 

import multer from "multer";

const app = express();

const secret = process.env.ACCESS_SECRET;

app.use(express.static(path.join(__dirname,'temp')));





// const bcrypt = require('bcrypt');
import cors from 'cors';


// Database queries with the knex module
import knex from 'knex';
import { env } from 'process';
import { refreshCookie } from './utils/createTokens.js';
import comments from './comments.js';

const db = knex({
    client: 'pg',
    connection: {
      host : process.env.POSTGRES_HOST,
      port :  process.env.POSTGRES_PORT,
      user :  process.env.POSTGRES_USER,
      password :  process.env.POSTGRES_PASSWORD,
      database :  process.env.POSTGRES_DB
    }
  });

  const allowedOrigins = ['http://localhost:3000'];

const options = {
  origin: allowedOrigins,
  credentials: true

};

// Then pass these options to cors:           
// app.use(bodyParser.json({limit:'50mb'})); 
app.use(bodyParser.urlencoded({extended:true, limit:'4mb'})); 
app.use(express.json({limit:'4mb'}));
app.use(cors(options));
app.use(cookieParser())

const storage = multer.diskStorage({

  destination: (req, file, cb) => {

    cb(null, "./");

  },

  filename: function(req, file, cb){

    const ext = file.mimetype.split("/")[1];
    const originalname = file.originalname.split(".")[0];
    // Stores the file in temp as the origiginal filename-dat.filetype
    // Could maybe get the user_id from the req later on
    cb(null, `temp/${originalname}-${Date.now()}.${ext}`)
  }

});

const upload = multer({

  storage: storage,
  limits: { fileSize: 1 * 1024 * 1024 }
})

//=================Image Get=================

// app.use(express.static(__dirname+'temp'))

// app.use(express.static('temp'));
app.use('/static', express.static('temp'))
app.use('/profiles', express.static('temp/profiles'))
app.use('/header', express.static('temp/header'))

app.get('/temp/', async (req, res) => {

  try{

    const fileQuery = req.query.filepath
  
    const fileName = req.query.filepath.split("/").pop()

  
    const options = {
      root: path.join(__dirname, 'temp')
  };
  
   
    // send a png file
    // res.sendFile(p);
  
      res.sendFile(fileQuery, options, function (err) {
        if (err) {
          // console.error(err)
        } else {
            console.log('Sent:', fileName);
        }
    });
  }catch{

  }

})


//=================Register/Signin=================

app.post("/signin", (req, res) => {

  handleSignin(req, res, db);

});

app.post("/signin2", (req, res) => {

  handleSignin2(req, res, db);

});

app.get("/signout", (req, res) => {

  removeToken(req, res);

});

app.post('/register', (req, res) => { 
  handleRegister(req, res, db ) 

});

app.get('/available/username/', (req, res) => {

  handleUsernameExists(req, res, db)

})

app.get('/available/nickname/', (req, res) => {

  handleNicknameExists(req, res, db)

})

//=================Signed In User=================

app.use(home);

//=================Tags=================

app.use(tags);


//=================User Info=================

app.get("/userID/:nickname", (req, res) => {

  handleGetUserID(req, res, db);
})

app.get("/usersInfo/:id", (req, res) => {

  handleGetUserInfo(req, res, db)
  
})

app.get("/loggedin/user/info/", authenticateToken, (req, res) => {

  handleGetLoggedinUserInfo(req, res, db)
  
})

app.get("/usersInfo/byNickname/:nickname", (req, res) => {

  handleGetUserInfoByNickname(req, res, db);

})

app.get("/users/info/random/:number", (req, res) => {

  handleGetRandomUserIDs(req, res, db);

})

app.get("/users/info/miniprofile/:id", (req, res) => {

  handleGetGetMiniProfileInfo(req, res, db);

})


//=================Comments=================

app.use(comments);


//==================Comment Responses=================

app.use(responses);
//=================Followers=================


app.use(followers);


//=================Mentions=================
app.use(mentions);


//=================Likes=================

app.use(likes);


//=================Simple Search=================

app.use(simpleSearch)

//=================Image Upload=================

// Need to add authenication middleware
// app.post("/api/image/", upload.single('image'), (req, res) => {

//   handleUploadImage(req, res, db)

// })


app.post("/profile/update/default/", authenticateToken,(req, res) => {

  handleUpdateProfileWithDefault(req, res, db)

})

app.post("/profile/update/", [ authenticateToken, upload.single('image')],(req, res) => {
  
  handleUploadProfileImage(req, res, db)
  
})

app.post("/profile/delete/", authenticateToken, (req, res) => {

  handleDeleteProfileImage(req, res, db)

})

app.post("/header/update/default/", authenticateToken, (req,res) => {

  handleUpdateHeaderWithDefault(req, res, db)

})

app.post("/header/update/", [ authenticateToken, upload.single('image')], (req,res) => {

  handleUpdateHeaderImage(req, res, db)

})

app.post("/header/delete/", authenticateToken, (req, res) => {

  handleDeleteHeaderImage(req, res, db)

})

app.post("/update/username/", authenticateToken, (req, res) => {

  handleUpdateUsername(req, res, db)

});

app.post("/update/nickname/", authenticateToken, (req, res) => {

  handleUpdateNickname(req, res, db)

});

app.post("/update/description/", authenticateToken, (req, res) => {

  handleUpdateDescription(req, res, db)

});

app.post("/update/location/", authenticateToken, (req, res) => {

  handleUpdateLocation(req, res, db)

});

app.post("/update/links/", authenticateToken, (req, res) => {

  handleUpdateLinks(req, res, db)

});


//=================Tokens=================

app.get("/token/refresh/", (req, res) => {

  refreshCookie(req, res)

})



app.listen(3001, () => {

    console.log("server is running on port 3001")
})

