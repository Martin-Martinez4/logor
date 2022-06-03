
import { handleGetSinglePost } from '../controllers/getPosts/getSinlgePost.js';

import { handleGetCommentsByUserNickname, handleGetCommentsByUserID, handleGetCommentsByTag } from '../controllers/getPosts/getOtherPosts.js';

import { db } from '../server.js';

import express from 'express';

const router = express.Router() 

router.get('/post/:id', (req, res, next ) => {

    handleGetSinglePost(req, res, next ,db)
  
})

router.get("/tags/:id", (req, res, next ) => {

    handleGetCommentsByTag(req, res, next , db);

})

router.get("/users/:id", (req, res, next ) => {

    handleGetCommentsByUserID(req, res, next , db);

})

router.get("/users/byNickname/:nickname", (req, res, next ) => {

    handleGetCommentsByUserNickname(req, res, next , db);

})

export default router;