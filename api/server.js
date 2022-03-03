

import 'dotenv/config';
// const signin = require('./controllers/signin');

import { handleGetUserInfo, handleGetUserInfoByNickname } from './controllers/getUserInfo.js';
import { handleGetTagID, handleGetUserID } from './controllers/getIds/getIDs.js';
import {handleSignin} from './controllers/signin.js';
import { handleRegister } from './controllers/register.js';
import { handleGetComments } from './controllers/getPosts/getOwnPosts.js';
import { handleCreatePost } from './controllers/post/createPost.js';
import { handleSlateForDeletion, handleUpdatePost} from './controllers/post/updatePost.js';
import { handleGetSinglePost } from './controllers/getPosts/getSinlgePost.js';
import { handleGetTagNamesFromCommentID } from './controllers/tags/getTagNames.js';
import { handleCreateTag, handleDeleteTagToComment, handleAddTagToComment } from './controllers/tags/addDeleteTags.js';

import { handleAddMentionToComment, handleDeleteMentionToComment } from './controllers/mentions/addDeleteMention.js';
import { handleGetMentionsFromCommentID } from './controllers/mentions/getMentions.js'

import { handleAddResponse } from './controllers/responses/addResponse.js';

import { handleCheckIfLiked } from './controllers/likes/checkIfLiked.js'
import { handleAddLike, handleDeleteLike } from './controllers/likes/addDeleteLikes.js'

import { handleCountFollowersByUserID } from './controllers/followers/countFollowers.js';
import { handleCountFollowingByUserID } from './controllers/followers/countFollowing.js';

import { handleAddFollower, handleDeleteFollower } from './controllers/followers/addDeleteFollowers.js';
import { handleCheckIfFollower } from './controllers/followers/checkIfFollower.js';

import { handleGetCommentsByUserNickname, handleGetCommentsByUserID, handleGetCommentsByTag, handleGetTagByName } from './controllers/getPosts/getOtherPosts.js';

// const express = require('express');
import express from 'express';
const app = express();

// const bcrypt = require('bcrypt');
import cors from 'cors';

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


app.use(express.json());

// Needed to able to send and recieve request to websites
// const whitelist = ["http://localhost:3000"];
// const corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
// };

app.use(cors());


//=================Register/Signin=================

app.post("/signin", (req, res) => {

  handleSignin(req, res, db);

});

app.post('/register', (req, res) => { 
  handleRegister(req, res, db ) 

});

//=================Signed In User=================

app.post("/home/:id", (req, res) => {

  handleCreatePost(req, res, db)

})

app.get('/home/:id', (req, res) => {

  handleGetComments(req,res,db)

})

app.post("/home/delete/:comment_id", (req, res) => {

  handleSlateForDeletion(req, res, db)

})

app.post("/home/update/:comment_id", (req, res) => {

  handleUpdatePost(req, res, db)

})


//=================Tags=================

app.get("/tagID/:name", (req, res) => {

  handleGetTagID(req, res, db);
})


app.get("/tags/byName/:name", (req, res) => {

  handleGetTagByName(req, res, db);
});

app.post("/create/tag/", (req, res) => {

  handleCreateTag(req, res, db)

})

app.post("/comment/addTag/", (req, res) => {

  handleAddTagToComment(req, res, db)

})

app.delete("/comment/deleteTag/", (req, res) => {

  handleDeleteTagToComment(req, res, db)

})


//=================User Info=================

app.get("/userID/:nickname", (req, res) => {

  handleGetUserID(req, res, db);
})

app.get("/usersInfo/:id", (req, res) => {

  handleGetUserInfo(req, res, db)
  
})

app.get("/usersInfo/byNickname/:nickname", (req, res) => {

  handleGetUserInfoByNickname(req, res, db);

})


//=================Comments=================


app.get('/post/:id', (req, res) => {

  handleGetSinglePost(req,res,db)

})

app.get("/tags/:id", (req, res) => {

  handleGetCommentsByTag(req, res, db);
  
})

app.get("/users/:id", (req, res) => {

  handleGetCommentsByUserID(req, res, db);

})

app.get("/users/byNickname/:nickname", (req, res) => {

  handleGetCommentsByUserNickname(req, res, db);

})

//=================Comment Info=================

app.get("/tags/byName/comment/:id", (req, res)  => {

  handleGetTagNamesFromCommentID(req, res, db);

})

app.get("/mentions/byName/comment/:id", (req, res)  => {

  handleGetMentionsFromCommentID(req, res, db);

})

//==================Comment Responses=================

app.post("/responses/create/", (req, res) => {

  handleAddResponse(req, res, db)

})

app.get("/responses/count/:id", (req, res) => {

  handleCountResponses(req, res, db)

})

//=================Followers=================

app.get("/users/number/followers/:id", (req, res) => {

  handleCountFollowersByUserID(req, res, db)

})

app.get("/users/number/following/:id", (req, res) => {

  handleCountFollowingByUserID(req, res, db)

})

app.post("/user/isFollower/", (req, res) => {

  handleCheckIfFollower(req, res, db)

})

app.post("/users/create/following/", (req, res) => {

  handleAddFollower(req, res, db)
  
})

app.delete("/users/delete/following/", (req, res) => {

  handleDeleteFollower(req, res, db)
  
})

//=================Mentions=================

app.post("/comment/addMention/", (req, res) => {

  handleAddMentionToComment(req, res, db)

})

app.delete("/comment/deleteMention/", (req, res) => {

  handleDeleteMentionToComment(req, res, db)

})

//=================Likes=================

app.post("/comment/add/like/", (req, res) => {

  handleAddLike(req, res, db)

})

app.delete("/comment/delete/like/", (req, res) => {

  handleDeleteLike(req, res, db)

})

app.get("/comment/count/likes/:id", (req, res) => {

  handleCountLikes(req, res, db)

})

app.post("/user/liked/comment/", (req, res) => {

  handleCheckIfLiked(req, res ,db)

})


app.get('/', res  => console.log("this is working"))
// app.post('/profile/:id', auth.requireAuth, (req, res) => { profile.handleProfileUpdate(req, res, db) })

// The id of  the user will be sent in the body
// app.put('/image', auth.requireAuth, (req, res) => {image.handleImage(req, res, db)})
// app.post('/imageurl', auth.requireAuth, (req, res) => {image.handleApiCall(req, res)})

// Passing in denpendacies to the handleRegister is called dependacy injection



app.listen(3001, () => {

    console.log("server is running on port 3001")
})

