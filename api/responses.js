
import { handleAddResponse } from './controllers/responses/addResponse.js';

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

router.post("/responses/create/", (req, res) => {

    handleAddResponse(req, res, db)
  
})
  
router.get("/responses/count/:comment_id", (req, res) => {
  
    handleCountResponses(req, res, db)
  
})

export default router;
