
import 'dotenv/config';

import { handleGetComments } from '../controllers/getPosts/getOwnPosts.js';
import { handleCreatePost } from '../controllers/post/createPost.js';
import { handleSlateForDeletion, handleUpdatePost} from '../controllers/post/updatePost.js';
import { handleGetPostsThatMentionUser } from '../controllers/mentions/getPostsThatMentionUser.js';
import { handleGetFeed } from '../controllers/feed/feed.js';

import { authenticateToken } from '../middleware/authorization.js';

import { db } from '../server.js';

import express from 'express';

const router = express.Router() 


router.post("/home/create/comments", authenticateToken, (req, res, next) => {

    handleCreatePost(req, res, next, db)

})

router.get('/home/', authenticateToken, (req, res, next) => {

    handleGetComments(req, res, next, db)

})

router.post("/home/delete/:comment_id", authenticateToken, (req, res, next) => {

    handleSlateForDeletion(req, res, next, db)

})

router.post("/home/update/:comment_id", authenticateToken, (req, res, next) => {

    handleUpdatePost(req, res, next, db)

})

router.get("/home/posts/mentions/",  authenticateToken, (req, res, next) => {

    handleGetPostsThatMentionUser(req, res, next, db)

})

router.get("/home/posts/feed/", authenticateToken, (req, res, next) => {

    handleGetFeed(req, res, next, db)

})

export default router;

