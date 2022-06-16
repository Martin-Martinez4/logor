
import multer from "multer";

import {  
    handleUpdateHeaderWithDefault, 
    handleUpdateProfileWithDefault, 
    handleUpdateHeaderImage,
    handleUploadProfileImage, 
    handleDeleteHeaderImage,
    handleDeleteProfileImage,
    handleUpdateUsername,
    handleUpdateNickname,
    handleUpdateDescription,
    handleUpdateLocation,
    handleUpdateLinks 
} from "../controllers/profileAndHeader/profileAndHeader.js"

import { authenticateToken } from '../middleware/authorization.js';

import {upload} from "../server.js";

import { db } from '../server.js';

import express from 'express';

const router = express.Router() 

router.post("/profile/update/default/", authenticateToken,(req, res, next) => {

    handleUpdateProfileWithDefault(req, res, next, db)
  
})

router.post("/profile/update/", [ authenticateToken, upload().single('image')],(req, res, next) => {

    handleUploadProfileImage(req, res, next, db)

})

router.post("/profile/delete/", authenticateToken, (req, res, next) => {

    handleDeleteProfileImage(req, res, next, db)

})

router.post("/header/update/default/", authenticateToken, (req, res, next) => {

    handleUpdateHeaderWithDefault(req, res, next, db)

})

router.post("/header/update/", [ authenticateToken, upload().single('image')], (req, res, next ) => {

    handleUpdateHeaderImage(req, res, next, db)

})

router.post("/header/delete/", authenticateToken, (req, res, next) => {

    handleDeleteHeaderImage(req, res, next, db)

})

router.post("/update/username/", authenticateToken, (req, res, next) => {

    handleUpdateUsername(req, res, next, db)

});

router.post("/update/nickname/", authenticateToken, (req, res, next) => {

    handleUpdateNickname(req, res, next, db)

});

router.post("/update/description/", authenticateToken, (req, res, next) => {

    handleUpdateDescription(req, res, next, db)

});

router.post("/update/location/", authenticateToken, (req, res, next) => {

    handleUpdateLocation(req, res, next, db)

});

router.post("/update/links/", authenticateToken, (req, res, next) => {

    handleUpdateLinks(req, res, next, db)

});


export default router;

