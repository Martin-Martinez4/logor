
import { handleAddResponse } from '../controllers/responses/addResponse.js';
import { handleCountResponses } from '../controllers/responses/countResponses.js';
import { handleGetResponses } from '../controllers/responses/getResponses.js';
import { handleGetResponsesRecusive } from '../controllers/responses/recusiveReponses.js';

import { db } from '../server.js';

import express from 'express';

const router = express.Router() 

// authenticateToken
router.post("/responses/create/", (req, res, next) => {

    handleAddResponse(req, res, next, db)
  
})
  
router.get("/responses/count/:parent_id", (req, res, next) => {
  
    handleCountResponses(req, res, next, db)
  
})

router.get("/responses/:parent_id", (req, res, next) => {

  handleGetResponses(req, res, next, db)
  
})

router.get("/responses/recursive/:parent_id", (req, res, next) => {

  handleGetResponsesRecusive(req, res, next, db)

})

export default router;
