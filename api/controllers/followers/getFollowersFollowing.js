

export const handleGetFollowers = (req, res, next, db) => {

    const user_id = req.query.user_id;

    db.select("id", "username", "nickname", "profile_pic_url")
    .from("follower_followee")
    .join("users", "id", "follower_id")
    .where({

        followee_id: user_id
    })
    .then(users => {

        res.status(200).json(users);
    })
    .catch(err => {

        if(!err.statusCode){

            err.statusCode = 500;
        }

        err.message = "Error getting followers."

        next(err);
    })
    

}

export const handleGetFollowing = (req, res, next, db) => {

    const user_id = req.query.user_id;

    db.select("id", "username", "nickname", "profile_pic_url")
    .from("follower_followee")
    .join("users", "id", "followee_id")
    .where({

        follower_id: user_id
    })
    .then(users => {

        res.status(200).json(users);
    })
    .catch(err => {

        if(!err.statusCode){

            err.statusCode = 500;
        }

        err.message = "Error getting following."

        next(err);
    })
    

}
