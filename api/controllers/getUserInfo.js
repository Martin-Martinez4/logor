
import jwt from "jsonwebtoken";
import jwt_decode from "jwt-decode"


export const handleGetUserInfo = (req, res , db) => {

    const { id } = req.params;

    db.select("*").from('users')
    .join('user_headers', 'users.id', 'user_headers.user_id')
    .where("users.id", "=", `${id}`)
    .then((user) => {
        
        res.json(user)
    })
    .catch(err => {
        console.log(err)
        res.json([])
    })


}

export const handleGetUserInfoByNickname = (req, res , db) => {

    const { nickname } = req.params;

    const tagNickanme = '@'+nickname

    db.select("*").from('users')
    .join('user_headers', 'users.id', 'user_headers.user_id')
    .where("users.nickname", "=", `${tagNickanme}`)
    .then((user) => {
        
        res.json(user)
    })
    .catch(err => console.log(err))

}

export const handleGetUserInfoByToken = (req, res, db) => {

    // get token from body,
    // If token expired, refresh 
    // decode id from token

    if (req.headers && req.headers.authorization) {

        // const authorization = req.headers.authorization;
        const authorization = req.headers.authorization.split(' ')[1];

        console.log("req headers:", authorization)

        try {

            console.log( "try")
            console.log("decode: ",jwt_decode(authorization))


        } catch (e) {
            return res.status(401).send('unauthorized');
        }
    }


}

export const handleGetGetMiniProfileInfo = (req, res, db) => {

    const user_id = req.params.id;

    console.log(user_id)

    db.select("*").from("users")
    .where({

        id: user_id
    })
    .then(userInfo => {

        res.json(userInfo)
    })
    .catch(err => console.log(err))

}

