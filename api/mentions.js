
import { handleAddMentionToComment, handleDeleteMentionToComment } from './controllers/mentions/addDeleteMention.js';
import { handleGetMentionsFromCommentID } from './controllers/mentions/getMentions.js'


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

router.post("/comment/addMention/", (req, res) => {

    handleAddMentionToComment(req, res, db)
  
})

router.delete("/comment/deleteMention/", (req, res) => {

    handleDeleteMentionToComment(req, res, db)

})

router.get("/mentions/byName/comment/:id", (req, res)  => {

    handleGetMentionsFromCommentID(req, res, db);
  
})
  

export default router;