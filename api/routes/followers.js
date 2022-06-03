

import 'dotenv/config';

import { authenticateToken } from '../middleware/authorization.js';

// Database queries with the knex module
// import knex from 'knex';

import { handleCountFollowersByUserID } from '../controllers/followers/countFollowers.js';
import { handleCountFollowingByUserID } from '../controllers/followers/countFollowing.js';

import { handleAddFollower, handleDeleteFollower } from '../controllers/followers/addDeleteFollowers.js';
import { handleCheckIfFollower, handleCheckIfLoggedInFollower, handleCheckIfLoggedInFollowee } from '../controllers/followers/checkIfFollower.js';
import { handleGetFollowers, handleGetFollowing } from '../controllers/followers/getFollowersFollowing.js';

import { db } from '../server.js'

import express from 'express';


const router = express.Router() 

router.get("/user/number/followers/:user_id", (req, res, next) => {

  handleCountFollowersByUserID(req, res, next, db)

})

router.get("/user/followers/", (req, res, next) => {

  handleGetFollowers(req, res, next, db)

})

router.get("/user/number/following/:user_id", (req, res, next) => {
  
  handleCountFollowingByUserID(req, res, next, db)
  
})

router.get("/user/following/", (req, res, next) => {

  handleGetFollowing(req, res, next, db)

})

router.post("/is/follower/", (req, res, next) => {

  handleCheckIfFollower(req, res, next, db)

})

router.post("/user/is/follower/", authenticateToken, (req, res, next) => {

  handleCheckIfLoggedInFollower(req, res, next, db)

})

router.post("/user/is/followee/", authenticateToken, (req, res, next) => {

  handleCheckIfLoggedInFollowee(req, res, next, db)

})

// authenticateToken
router.post("/following/create/", authenticateToken, (req, res, next) => {

  handleAddFollower(req, res, next, db)
  
})

// authenticateToken
router.delete("/following/delete/", authenticateToken, (req, res, next) => {

  handleDeleteFollower(req, res, next, db)
  
})


export default router;

