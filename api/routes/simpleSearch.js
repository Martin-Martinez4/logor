
import 'dotenv/config';

import { handleGetUsersLike, handleGetTagsLike } from '../controllers/search/searchLike.js';

import { db } from '../server.js';

import express from 'express';


const router = express.Router() 

router.post("/users/search/", (req, res, next) => {

    handleGetUsersLike(req, res, next, db);
});

router.post("/tags/search/", (req, res, next) => {

    handleGetTagsLike(req, res, next, db)

})

export default router;