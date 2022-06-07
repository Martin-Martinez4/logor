// function escapeRegExp(string){
//   return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
// }

import 'dotenv/config';
// const signin = require('./controllers/signin');

import helmet from "helmet";

import path from "path";


import { fileURLToPath } from 'url';
import { dirname } from 'path';

import bodyParser from 'body-parser'; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import home from "./routes/home.js"

import followers from "./routes/followers.js"

import likes from "./routes/likes.js";

import tags from "./routes/tags.js";

import mentions from "./routes/mentions.js";

import responses from "./routes/responses.js";

import simpleSearch from "./routes/simpleSearch.js"

import auth from "./routes/auth.js";

import userInformation from "./routes/userInformation.js";

import updateProfile from "./routes/updateProfile.js";


import { authenticateToken } from './middleware/authorization.js';


const acceptableImageMimeTypes = ["image/jpeg", "image/jpg", "image/png", "image/svg+xml"]


// const express = require('express');
import express from 'express';
import cookieParser from "cookie-parser"; 

import multer from "multer";

const app = express();

const secret = process.env.ACCESS_SECRET;

// app.use(helmet());
// app.use(helmet.crossOriginOpenerPolicy({ policy: "same-origin-allow-popups" }));

// app.use(
//   helmet({
//     crossOriginResourcePolicy: false,
//   })
// )

app.use(express.static(path.join(__dirname,'temp')));





// const bcrypt = require('bcrypt');
import cors from 'cors';


// Database queries with the knex module
import knex from 'knex';
import { env } from 'process';
import { refreshCookie } from './utils/createTokens.js';
import comments from './routes/comments.js';

// export const db = knex({
//     client: 'pg',
//     connection: {
//       host : process.env.POSTGRES_HOST,
//       port :  process.env.POSTGRES_PORT,
//       user :  process.env.POSTGRES_USER,
//       password :  process.env.POSTGRES_PASSWORD,
//       database :  process.env.POSTGRES_DB
//     }
//   });
export const db = knex({
    client: 'pg',
    connection: {
      connectionString: process.env.DATABASE_URL,
      // ssl: { require: false, rejectUnauthorized: false }
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


export function upload(req, res, next){
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
  },

  
});

  const fileFilter = (req, file, cb) => {

    mimeType = file.mimetype;

    if(acceptableImageMimeTypes.includes(mimeType)){

      cb(null, true);

    }
    else{

      cb(null, false);

    }

  }

  const upload = multer({

    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 1 * 1024 * 1024 }
  })

  return upload;
}

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

app.use(auth);

//=================Signed In User Home Page=================

app.use(home);

//=================Tags=================

app.use(tags);


//=================User Info=================

app.use(userInformation);

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

app.use(updateProfile);

//=================Tokens=================

app.get("/token/refresh/", (req, res) => {

  refreshCookie(req, res)

})

// Erro handling middleware
app.use((error, req ,res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;

  console.log(error);

  res.status(status).json({message: message})

})


app.listen(process.env.PORT || 3001, () => {

    console.log(`server is running on port ${process.env.PORT || 3001}`)
})

