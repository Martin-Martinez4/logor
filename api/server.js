

import 'dotenv/config';
// const signin = require('./controllers/signin');

import jwt from "express-jwt";

import home from "./home.js"

import { handleGetUserInfo, handleGetUserInfoByNickname, handleGetUserInfoByToken } from './controllers/getUserInfo.js';
import { handleGetTagID, handleGetUserID } from './controllers/getIds/getIDs.js';
import { handleSignin, handleSignin2} from './controllers/signin.js';
import { handleRegister } from './controllers/register.js';
// import { handleGetComments } from './controllers/getPosts/getOwnPosts.js';
// import { handleCreatePost } from './controllers/post/createPost.js';
// import { handleSlateForDeletion, handleUpdatePost} from './controllers/post/updatePost.js';
import { handleGetSinglePost } from './controllers/getPosts/getSinlgePost.js';
import { handleGetTagNamesFromCommentID } from './controllers/tags/getTagNames.js';
import { handleCreateTag, handleDeleteTagToComment, handleAddTagToComment } from './controllers/tags/addDeleteTags.js';

import { handleAddMentionToComment, handleDeleteMentionToComment } from './controllers/mentions/addDeleteMention.js';
import { handleGetMentionsFromCommentID } from './controllers/mentions/getMentions.js'

import { handleAddResponse } from './controllers/responses/addResponse.js';

import { handleCheckIfLiked } from './controllers/likes/checkIfLiked.js'
import { handleAddLike, handleDeleteLike } from './controllers/likes/addDeleteLikes.js'
import { handleCountLikes } from './controllers/likes/countLikes.js';

import { handleCountFollowersByUserID } from './controllers/followers/countFollowers.js';
import { handleCountFollowingByUserID } from './controllers/followers/countFollowing.js';

import { handleAddFollower, handleDeleteFollower } from './controllers/followers/addDeleteFollowers.js';
import { handleCheckIfFollower } from './controllers/followers/checkIfFollower.js';

import { handleGetCommentsByUserNickname, handleGetCommentsByUserID, handleGetCommentsByTag, handleGetTagByName } from './controllers/getPosts/getOtherPosts.js';

import { authenticateToken } from './middleware/authorization.js';





// const express = require('express');
import express from 'express';
import cookieParser from "cookie-parser"; 

const app = express();

const secret = process.env.ACCESS_SECRET;



// const bcrypt = require('bcrypt');
import cors from 'cors';


// Database queries with the knex module
import knex from 'knex';
import { env } from 'process';
import { refreshCookie } from './utils/createTokens.js';

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

  const allowedOrigins = ['http://localhost:3000'];

const options = {
  origin: allowedOrigins,
  credentials: true

};

// Then pass these options to cors:
app.use(express.json());
app.use(cors(options));
app.use(cookieParser())






//=================Register/Signin=================

app.post("/signin", (req, res) => {

  handleSignin(req, res, db);

});

app.post("/signin2", (req, res) => {

  handleSignin2(req, res, db);

});

app.post('/register', (req, res) => { 
  handleRegister(req, res, db ) 

});

//=================Signed In User=================

app.use(home);

// app.post("/home/create/comments", authenticateToken, (req, res) => {

//   handleCreatePost(req, res, db)

// })

// app.get('/home/', authenticateToken, (req, res) => {

//   handleGetComments(req,res,db)

// })

// app.post("/home/delete/:comment_id", (req, res) => {

//   handleSlateForDeletion(req, res, db)

// })

// app.post("/home/update/:comment_id", (req, res) => {

//   handleUpdatePost(req, res, db)

// })


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

// app.get("/user/get/info", authenticateToken , (req, res) => {

//   handleGetUserInfoByToken(req, res ,db)

// })

// app.get("/user/get/info", (req, res) => {

//   handleGetUserInfoByToken(req, res ,db)

// })

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

app.get("/responses/count/:comment_id", (req, res) => {

  handleCountResponses(req, res, db)

})

//=================Followers=================

app.get("/users/number/followers/:user_id", (req, res) => {

  handleCountFollowersByUserID(req, res, db)

})

app.get("/users/number/following/:user_id", (req, res) => {

  handleCountFollowingByUserID(req, res, db)

})

app.post("/user/is/follower/", (req, res) => {

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

app.get("/comment/count/likes/:comment_id", (req, res) => {

  handleCountLikes(req, res, db)

})

app.post("/user/liked/comment/", (req, res) => {

  handleCheckIfLiked(req, res ,db)

})

//=================Tokens=================

app.get("/token/refresh/", (req, res) => {

  refreshCookie(req, res)

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

