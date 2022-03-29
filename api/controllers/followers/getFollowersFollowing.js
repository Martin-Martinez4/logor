

export const handleGetFollowers = (req, res, db) => {

    const user_id = req.query.user_id;

    db.select("id", "username", "nickname", "profile_pic_url")
    .from("follower_followee")
    .join("users", "id", "follower_id")
    .where({

        followee_id: user_id
    })
    .then(users => {

        res.json(users)
    })
    .catch(err => {

        res.json("Error")
    })
    

}

export const handleGetFollowing = (req, res, db) => {

    const user_id = req.query.user_id;

    db.select("id", "username", "nickname", "profile_pic_url")
    .from("follower_followee")
    .join("users", "id", "followee_id")
    .where({

        follower_id: user_id
    })
    .then(users => {

        res.json(users)
    })
    .catch(err => {

        res.json("Error")
    })
    

}
