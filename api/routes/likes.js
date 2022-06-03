
import 'dotenv/config';

import { handleCheckIfLiked } from '../controllers/likes/checkIfLiked.js'
import { handleAddLike, handleDeleteLike } from '../controllers/likes/addDeleteLikes.js'
import { handleCountLikes } from '../controllers/likes/countLikes.js';

import { authenticateToken } from '../middleware/authorization.js';

import { db } from '../server.js';

import express from 'express';

const router = express.Router();

// authenticateToken
router.post("/comment/add/like/", authenticateToken, (req, res, next) => {

    handleAddLike(req, res, next, db)
  
})

// authenticateToken
router.delete("/comment/delete/like/", authenticateToken, (req, res, next) => {

    handleDeleteLike(req, res, next, db)

})

router.get("/comment/count/likes/:comment_id", (req, res, next) => {

    handleCountLikes(req, res, next, db)

})


router.post("/user/liked/comment/", authenticateToken, (req, res, next) => {

    handleCheckIfLiked(req, res, next, db)

})

export default router;

