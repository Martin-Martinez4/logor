
import { handleAddMentionToComment, handleDeleteMentionToComment } from '../controllers/mentions/addDeleteMention.js';
import { handleGetMentionsFromCommentID } from '../controllers/mentions/getMentions.js';

import { db } from '../server.js';

import express from 'express';

const router = express.Router() 

// Create and update are protected are these are part of these functions, no need for middleware

router.post("/comment/addMention/", (req, res, next) => {

    handleAddMentionToComment(req, res, next, db)
  
})

router.delete("/comment/deleteMention/", (req, res, next) => {

    handleDeleteMentionToComment(req, res, next, db)

})

router.get("/mentions/byName/comment/:id", (req, res, next)  => {

    handleGetMentionsFromCommentID(req, res, next, db);
  
})


  

export default router;