
import 'dotenv/config';

import { handleCheckIfLiked } from './controllers/likes/checkIfLiked.js'
import { handleAddLike, handleDeleteLike } from './controllers/likes/addDeleteLikes.js'
import { handleCountLikes } from './controllers/likes/countLikes.js';

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

const router = express.Router();

// authenticateToken
router.post("/comment/add/like/", authenticateToken, (req, res) => {

    handleAddLike(req, res, db)
  
})

// authenticateToken
router.delete("/comment/delete/like/", authenticateToken, (req, res) => {

    handleDeleteLike(req, res, db)

})

router.get("/comment/count/likes/:comment_id", (req, res) => {

    handleCountLikes(req, res, db)

})


router.post("/user/liked/comment/", authenticateToken, (req, res) => {

    handleCheckIfLiked(req, res ,db)

})

export default router;

