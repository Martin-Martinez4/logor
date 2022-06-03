
import { handleCreateTag, handleDeleteTagToComment, handleAddTagToComment } from '../controllers/tags/addDeleteTags.js';
import { handleGetTagByName } from '../controllers/getPosts/getOtherPosts.js';
import { handleGetTagID } from '../controllers/getIds/getIDs.js';
import { handleGetTagNamesFromCommentID } from '../controllers/tags/getTagNames.js';

import { db } from '../server.js';

import express from 'express';

const router = express.Router() 

// Create and update are protected are these are part of these functions, no need for middleware

router.get("/tagID/:name", (req, res, next) => {

    handleGetTagID(req, res, next, db);
})


router.get("/tags/byName/:name", (req, res, next) => {

    handleGetTagByName(req, res, next, db);
});

router.post("/create/tag/", (req, res, next) => {

    handleCreateTag(req, res, next, db)

})

router.post("/comment/addTag/", (req, res, next) => {

    handleAddTagToComment(req, res, next, db)

})

router.delete("/comment/deleteTag/", (req, res, next) => {

    handleDeleteTagToComment(req, res, next, db)

})

router.get("/tags/byName/comment/:id", (req, res, next)  => {

    handleGetTagNamesFromCommentID(req, res, next, db);
  
  })
  

export default router;
