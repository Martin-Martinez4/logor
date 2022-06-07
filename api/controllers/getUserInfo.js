

export const handleGetUserInfo = (req, res, next, db) => {

    const { id } = req.params;

    db.select("*").from('users')
    .join('user_headers', 'users.id', 'user_headers.user_id')
    .where("users.id", "=", `${id}`)
    .then((user) => {
        
        res.status(200).json(user)
    })
    .catch(err => {
        if(!err.statusCode){
    
            err.statusCode = 500;
        }

        err.message = "Error getting user information";

        next(err)
    })


}

export const handleGetUserInfoByNickname = (req, res, next, db) => {

    const { nickname } = req.params;

    const tagNickanme = '@'+nickname

    db.select("*").from('users')
    .join('user_headers', 'users.id', 'user_headers.user_id')
    .where("users.nickname", "=", `${tagNickanme}`)
    .then((user) => {

        // console.log(user)
        
        res.status(200).json(user)
    })
    .catch(err => {
        if(!err.statusCode){
    
            err.statusCode = 500;
        }

        err.message = "Error getting user information";

        next(err);
    })

}

export const handleGetGetMiniProfileInfo = (req, res, next, db) => {

    try{

        const user_id = req.params.id;
    
        // console.log(user_id)
    
        db.select("*").from("users")
        .where({
    
            id: user_id
        })
        .then(userInfo => {
    
            res.status(200).json(userInfo)
        })
        .catch(err => {
            if(!err.statusCode){
    
                err.statusCode = 500;
            }
    
            err.message = "Error getting miniprofile information";
    
            next(err);
        
        })

    }catch{
        const error = new Error("Error getting miniprofile information");

        error.statusCode = 500;

        error.message = "Error getting miniprofile information";

        next(error);

    }


}

export const handleGetLoggedinUserInfo = (req, res, next, db) => {

    const user_id = req.user_id;

    db.select("*").from('users')
    .join('user_headers', 'users.id', 'user_headers.user_id')
    .where("users.id", "=", `${user_id}`)
    .then((user) => {
        
        res.status(200).json(user)
    })
    .catch(err => {

        const error = new Error("Error getting miniprofile information");

        error.statusCode = 500;

        error.message = "Error getting miniprofile information";

        next(error);
    })



}

