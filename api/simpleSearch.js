
import 'dotenv/config';

import { authenticateToken } from './middleware/authorization.js';

import { handleGetUsersLike, handleGetTagsLike } from './controllers/search/searchLike.js';

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

router.post("/users/search/", (req, res) => {

    handleGetUsersLike(req, res, db);
});

router.post("/tags/search/", (req, res) => {

    handleGetTagsLike(req, res, db)

})

export default router;