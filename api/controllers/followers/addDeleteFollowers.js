
export const handleAddFollower = (req, res, next, db) => {

    const follower_id = req.user_id

    const { followee_id} = req.body

    // console.log(followee_id)


    db("follower_followee")
    .insert({
        followee_id: followee_id,
        follower_id: follower_id
    })
    .onConflict(["followee_id", "follower_id"])
    .ignore()
    .returning("follower_id")
    .then(data => res.status(201).json(comments))
    .catch(err => {

        if(!err.statusCode){

            err.statusCode = 500;
        }

        err.message = "Error Adding Follower."

        next(err);
    })
    
}

export const handleDeleteFollower = (req, res, next, db) => {

    const follower_id = req.user_id

    const {followee_id } = req.body


    db("follower_followee")
    .where({
        followee_id: followee_id,
        follower_id: follower_id
    })
    .del()
    .onConflict()
    .ignore()
    .returning("follower_id")
    .then(data => res.status(201).json(comments))
    .catch(err => {

        if(!err.statusCode){

            err.statusCode = 500;
        }

        err.message = "Error Deleting Follower."

        next(err);
    })

}

