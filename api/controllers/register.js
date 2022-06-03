
import { v4 as uuidv4 } from 'uuid';
import bcrypt from "bcrypt";

export const handleRegister = (req, res, next, db) => {

    const { username, 
        nickname,
        profile_pic_url,
        description,
        header_img_url,
        location,
        links,
        password,
        password2 } = req.body;

        const id = uuidv4();

        
    const joined_date = new Date(new Date().getTime()).toISOString();

    if(!id || !username || !nickname || !password || !profile_pic_url || !header_img_url || password !== password2){

        const error = new Error('Missing required field, registration falied');

        error.statusCode = 400;

        error.message = 'Missing required field, registration falied';

        next(error);
    }

    bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS)).then(function(hash) {

        db.transaction(trx => {
            trx.insert({
                id: id,
                username: username, 
                nickname: nickname,
                profile_pic_url: profile_pic_url
            })
            .into('users')
    
            .then(() =>{
    
                return trx('users')
                .returning('user_id')
                .insert({
                    username: username, 
                    password: hash,
                    user_id: id
                })
                .into('login')})
    
            .then(
                (user_id) => {
                    return trx('users')
                    // knex built in method .returning
                    .returning('user_id')
                    
                    .insert({
            
                                decription:description,
                                header_img_url: header_img_url,
                                location: location,
                                links: links,
                                joined_date: joined_date,
                                user_id: id
                            })
                            .into('user_headers')
                }
            )
            .then(() => {
    
                db.select('*').from('users')
                .join('user_headers', 'users.id', 'user_headers.user_id')
                    .where('users.username', '=', username)
                    .then((user) => {
                        
                        res.status(201).json(user[0])
                    })
                    .catch(err => {
                        if(!err.statusCode){
                
                            err.statusCode = 500;
                        }
                
                        err.message = "Error creating user";
                
                        next(err);
                        res.json({})
                    
                    })
            })
    
            
            .then(trx.commit)
            .catch(trx.rollback)
                 
        })
        .catch(err => {
            if(!err.statusCode){
    
                err.statusCode = 500;
            }
    
            err.message =  "Error creating user";
    
            next(err);
            res.json({})
        
        })
    })
    .catch(err => {
        if(!err.statusCode){

            err.statusCode = 500;
        }

        err.message =  "Error creating user";

        next(err);
        res.json({})
    
    });


}

export const handleUsernameExists = (req, res, next, db) => {

    const username = req.query.username

    db.count("username")
    .from("users")
    .where({
        username: username
    })
    .then(countObject => {

        const count = countObject[0]["count"]

        if(count >= 1){

            res.status(200).json(true)

        }
        else{

            res.status(200).json(false)
        }
    })
    .catch(err => {
        if(!err.statusCode){

            err.statusCode = 500;
        }

        err.message =  "Error creating user";

        next(err);
        res.json({})
    
    })

} 

export const handleNicknameExists = (req, res, next, db) => {

    const nickname = '@'+req.query.nickname

    db.count("username")
    .from("users")
    .where({

        nickname: nickname
    })
    .then(countObject => {

        const count = countObject[0]["count"]

        if(count >= 1){

            res.status(200).json(true)

        }
        else{

            res.status(200).json(false)
        }
    })
    .catch(err => {
        if(!err.statusCode){

            err.statusCode = 500;
        }

        err.message =  "Error creating user";

        next(err);
        res.json({})
    
    })


}

