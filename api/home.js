
import 'dotenv/config';

import { handleGetComments } from './controllers/getPosts/getOwnPosts.js';
import { handleCreatePost } from './controllers/post/createPost.js';
import { handleSlateForDeletion, handleUpdatePost} from './controllers/post/updatePost.js';
import { handleGetPostsThatMentionUser } from './controllers/mentions/getPostsThatMentionUser.js';
import { handleGetFeed } from './controllers/feed/feed.js';


import { authenticateToken } from './middleware/authorization.js';

// Database queries with the knex module
import knex from 'knex';

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

router.post("/home/delete/:comment_id", authenticateToken, (req, res) => {

    handleSlateForDeletion(req, res, db)

})

router.post("/home/update/:comment_id", authenticateToken, (req, res) => {

    handleUpdatePost(req, res, db)

})

router.get("/home/posts/mentions/",  authenticateToken, (req, res) => {

    handleGetPostsThatMentionUser(req, res, db)

})

router.get("/home/posts/feed/", authenticateToken, (req, res) => {

    handleGetFeed(req, res, db)

})

export default router;

