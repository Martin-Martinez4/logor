
import { jwtTokens } from "../utils/createTokens.js";
import bcrypt from "bcrypt";


export const handleSignin = (req, res, db) => {

    // get username and password from body request
    const {username, password} = req.body

    // Check if both username and password are present
    if(!username || !password){

        return res.status(400).json("Incorrect form submission");
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
        .catch(() => res.status(400).json("Trouble loggining in"))

}

export const handleSignin2 = (req, res, db) => {

    // get username and password from body request
    const {username, password} = req.body


    // Check if both username and password are present
    if(!username || !password){

        return res.status(400).json("Incorrect form submission");
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
                    .catch((err) => console.log(err))
            }
            else{

                res.status(400).json("Trouble loggining in")
            }
        })
        })
        .catch(() => res.status(400).json("Trouble loggining in"))

}

export const removeToken = (req, res) => {
    
    try{
        
        res.clearCookie('refresh_token', { httpOnly: true, sameSite: 'None', secure: true  })
        res.json("")
        

    }
    catch(err){

        console.error(err)
    }




}


