

import 'dotenv/config';
// const signin = require('./controllers/signin');

import jwt from "express-jwt";

import home from "./home.js"

import followers from "./followers.js"

import likes from "./likes.js";

import tags from "./tags.js";

import mentions from "./mentions.js";

import responses from "./responses.js";

import { handleGetUserInfo, handleGetUserInfoByNickname, handleGetGetMiniProfileInfo } from './controllers/getUserInfo.js';
import { handleGetUserID, handleGetRandomUserIDs } from './controllers/getIds/getIDs.js';
import { handleSignin, handleSignin2} from './controllers/signin.js';
import { handleRegister } from './controllers/register.js';

// import { handleAddResponse } from './controllers/responses/addResponse.js';


// import { handleGetCommentsByUserNickname, handleGetCommentsByUserID, handleGetCommentsByTag } from './controllers/getPosts/getOtherPosts.js';

import { authenticateToken } from './middleware/authorization.js';


// const express = require('express');
import express from 'express';
import cookieParser from "cookie-parser"; 

const app = express();

const secret = process.env.ACCESS_SECRET;



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
app.use(express.json());
app.use(cors(options));
app.use(cookieParser())


//=================Register/Signin=================

app.post("/signin", (req, res) => {

  handleSignin(req, res, db);

});

app.post("/signin2", (req, res) => {

  handleSignin2(req, res, db);

});

app.post('/register', (req, res) => { 
  handleRegister(req, res, db ) 

});

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


//=================Tokens=================

app.get("/token/refresh/", (req, res) => {

  refreshCookie(req, res)

})


app.get('/', res  => console.log("this is working"))


app.listen(3001, () => {

    console.log("server is running on port 3001")
})

