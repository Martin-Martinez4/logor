
import { handleGetUserInfo, handleGetUserInfoByNickname, handleGetGetMiniProfileInfo, handleGetLoggedinUserInfo } from '../controllers/getUserInfo.js';
import { handleGetUserID, handleGetRandomUserIDs } from '../controllers/getIds/getIDs.js';

import { authenticateToken } from '../middleware/authorization.js';

import { db } from '../server.js';

import express from 'express';

const router = express.Router() 



router.get("/userID/:nickname", (req, res, next) => {

    handleGetUserID(req, res, next, db);
})

router.get("/usersInfo/:id", (req, res, next) => {

handleGetUserInfo(req, res, next, db)

})

router.get("/loggedin/user/info/", authenticateToken, (req, res, next) => {

handleGetLoggedinUserInfo(req, res, next, db)

})

router.get("/usersInfo/byNickname/:nickname", (req, res, next) => {

handleGetUserInfoByNickname(req, res, next, db);

})

router.get("/users/info/random/:number", (req, res, next) => {

handleGetRandomUserIDs(req, res, next, db);

})

router.get("/users/info/miniprofile/:id", (req, res, next) => {

handleGetGetMiniProfileInfo(req, res, next, db);

})
  


export default router;

