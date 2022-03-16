
import { handleCreateTag, handleDeleteTagToComment, handleAddTagToComment } from './controllers/tags/addDeleteTags.js';
import { handleGetTagByName } from './controllers/getPosts/getOtherPosts.js';
import { handleGetTagID } from './controllers/getIds/getIDs.js';
import { handleGetTagNamesFromCommentID } from './controllers/tags/getTagNames.js';


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

// Create and update are protected are these are part of these functions, no need for middleware

router.get("/tagID/:name", (req, res) => {

    handleGetTagID(req, res, db);
})


router.get("/tags/byName/:name", (req, res) => {

    handleGetTagByName(req, res, db);
});

router.post("/create/tag/", (req, res) => {

    handleCreateTag(req, res, db)

})

router.post("/comment/addTag/", (req, res) => {

    handleAddTagToComment(req, res, db)

})

router.delete("/comment/deleteTag/", (req, res) => {

    handleDeleteTagToComment(req, res, db)

})

router.get("/tags/byName/comment/:id", (req, res)  => {

    handleGetTagNamesFromCommentID(req, res, db);
  
  })
  

export default router;
