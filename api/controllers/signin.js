
import { jwtTokens } from "../utils/createTokens.js";
import bcrypt from "bcrypt";


export const handleSignin = (req, res, next, db) => {

    // get username and password from body request
    const {username, password} = req.body

    // Check if both username and password are present
    if(!username || !password){

        const error = new Error("Incorrect form submission");

        error.statusCode = 400;

        error.message = "Incorrect form submission";

        next(error);
    }

    db.select('username', 'password').from('login')
        .where('username', '=', username)
        .then((data) => {

            if(data[0].password === password){

                db.select('*').from('users')
                .join('user_headers', 'users.id', 'user_headers.user_id')
                    .where('users.username', '=', data[0].username)
                    .then((user) => {
                        
                        // console.log(user[0])
                        res.json(user[0])
                    })
                    .catch((err) => console.log(err))
            }
            else{

                res.status(400).json("Trouble loggining in")
            }
        })
        .catch(err => {
            if(!err.statusCode){
    
                err.statusCode = 500;
            }
    
            err.message = "Error logging in";
    
            next(err);
        
        })

}

export const handleSignin2 = (req, res, next, db) => {

    // get username and password from body request
    const {username, password} = req.body


    // Check if both username and password are present
    if(!username || !password){

        const error = new Error("Incorrect form submission");

        error.statusCode = 401;

        error.message = "Incorrect form submission";

        next(error);
    }

    
    db.select('username', 'password').from('login')
    .where('username', '=', username)
    .then((data) => {
        
        bcrypt.compare(password, data[0].password).then((result) => {

            console.log(result)
    
            if(result){
            // if(data[0].password === password){

                db.select('id').from('users')
                .where('users.username', '=', data[0].username)
                .then((user) => {
                        
                    // console.log("user[0].id: ", user[0].id)

                    const tokens = jwtTokens(user[0])

                    // res.cookie('refresh_token', tokens.refresh_token, {httpOnly: true,  sameSite: 'none', secure: true});
                    res.cookie('refresh_token', tokens.refresh_token, { httpOnly: true, sameSite: 'None', maxAge: 5 * 60 * 60 * 1000, secure: true });

                    tokens.user_id = user[0].id

                    res.json(tokens);
                })
                .catch(err => {
                    if(!err.statusCode){
            
                        err.statusCode = 500;
                    }
            
                    err.message = "Error logging in";
            
                    next(err);
                
                })
            }
            else{

                // res.status(400).json("Trouble loggining in")
                const error = new Error("Error logging in");

                error.statusCode = 401;

                error.message = "Error logging in";

                next(error);
            }
        })
        })
        .catch(err => {
            if(!err.statusCode){
    
                err.statusCode = 500;
            }
    
            err.message = "Error logging in";
    
            next(err);
        
        })

}

export const removeToken = (req, res, next) => {
    
    try{
        
        res.clearCookie('refresh_token', { httpOnly: true, sameSite: 'None', secure: true  })
        res.status(201).json("")
        

    }
    catch(err){

        const error = new Error("Error");

        error.statusCode = 401;

        error.message = "Error";

        next(error);
    }




}


