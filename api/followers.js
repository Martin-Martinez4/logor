

import 'dotenv/config';

import { authenticateToken } from './middleware/authorization.js';

// Database queries with the knex module
import knex from 'knex';

import { handleCountFollowersByUserID } from './controllers/followers/countFollowers.js';
import { handleCountFollowingByUserID } from './controllers/followers/countFollowing.js';

import { handleAddFollower, handleDeleteFollower } from './controllers/followers/addDeleteFollowers.js';
import { handleCheckIfFollower } from './controllers/followers/checkIfFollower.js';

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

router.get("/user/number/followers/:user_id", (req, res) => {

  handleCountFollowersByUserID(req, res, db)

})

router.get("/user/number/following/:user_id", (req, res) => {

  handleCountFollowingByUserID(req, res, db)

})

router.post("/user/is/follower/", (req, res) => {

  handleCheckIfFollower(req, res, db)

})

// authenticateToken
router.post("/user/create/following/", authenticateToken, (req, res) => {

  handleAddFollower(req, res, db)
  
})

// authenticateToken
router.delete("/user/delete/following/", authenticateToken, (req, res) => {

  handleDeleteFollower(req, res, db)
  
})


export default router;

