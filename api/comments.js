
import { handleGetSinglePost } from './controllers/getPosts/getSinlgePost.js';

import { handleGetCommentsByUserNickname, handleGetCommentsByUserID, handleGetCommentsByTag } from './controllers/getPosts/getOtherPosts.js';

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

router.get('/post/:id', (req, res) => {

    handleGetSinglePost(req,res,db)
  
})

router.get("/tags/:id", (req, res) => {

    handleGetCommentsByTag(req, res, db);

})

router.get("/users/:id", (req, res) => {

    handleGetCommentsByUserID(req, res, db);

})

router.get("/users/byNickname/:nickname", (req, res) => {

    handleGetCommentsByUserNickname(req, res, db);

})

export default router;