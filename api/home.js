
import 'dotenv/config';
// const signin = require('./controllers/signin');

import jwt from "express-jwt";

// import { authenticateToken } from './middleware/authorization.js';

import { handleGetComments } from './controllers/getPosts/getOwnPosts.js';
import { handleCreatePost } from './controllers/post/createPost.js';
import { handleSlateForDeletion, handleUpdatePost} from './controllers/post/updatePost.js';


import { authenticateToken } from './middleware/authorization.js';

// Database queries with the knex module
import knex from 'knex';
import { env } from 'process';
import { refreshCookie } from './utils/createTokens.js';

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





// const express = require('express');
import express from 'express';




const router = express.Router() 



router.post("/home/create/comments", authenticateToken, (req, res) => {

    handleCreatePost(req, res, db)

})

router.get('/home/', authenticateToken, (req, res) => {

    handleGetComments(req,res,db)

})

router.post("/home/delete/:comment_id", (req, res) => {

    handleSlateForDeletion(req, res, db)

})

router.post("/home/update/:comment_id", (req, res) => {

    handleUpdatePost(req, res, db)

})

export default router;

