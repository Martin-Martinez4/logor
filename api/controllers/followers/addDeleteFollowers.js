
export const handleAddFollower = (req, res, db) => {

    const {followee_id, follower_id} = req.body

    db("follower_followee")
    .insert({
        followee_id: followee_id,
        follower_id: follower_id
    })
    .onConflict(["followee_id", "follower_id"])
    .ignore()
    .returning("follower_id")
    .then(data => res.json(data))
    .catch(err => {

        console.log(err)
        res.json("Error")
    })
    
}

export const handleDeleteFollower = (req, res, db) => {

    const {followee_id, follower_id} = req.body


    db("follower_followee")
    .where({
        followee_id: followee_id,
        follower_id: follower_id
    })
    .del()
    .onConflict()
    .ignore()
    .returning("follower_id")
    .then(data => res.json(data))
    .catch(err => {

        console.log(err)
        res.json("Error")
    })

}

