

import { handleSignin, handleSignin2, removeToken } from '../controllers/signin.js';
import { handleRegister, handleNicknameExists, handleUsernameExists } from '../controllers/register.js';

import { db } from '../server.js';

import express from 'express';

const router = express.Router() 

router.post("/signin", (req, res, next) => {

    handleSignin(req, res, next, db);
  
});
  
router.post("/signin2", (req, res, next) => {

handleSignin2(req, res, next, db);

});

router.get("/signout", (req, res, next) => {

removeToken(req, res, next);

});

router.post('/register', (req, res, next) => { 
handleRegister(req, res, next, db ) 

});

router.get('/available/username/', (req, res, next) => {

handleUsernameExists(req, res, next, db)

})

router.get('/available/nickname/', (req, res, next) => {

handleNicknameExists(req, res, next, db)

})

export default router;


