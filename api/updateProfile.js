
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

router.post("/update/header-image/", (res, req) => {



});

router.post("/update/profile-image/", (res, req) => {



});

router.post("/update/username/", (res, req) => {



});

router.post("/update/nickname/", (res, req) => {



});

router.post("/update/location/", (res, req) => {



});

router.post("/update/links/", (res, req) => {



});

export default router;