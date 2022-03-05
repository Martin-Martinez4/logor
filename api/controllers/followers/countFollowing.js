

export const handleCountFollowingByUserID = (req, res, db) => {

    const {user_id} = req.params;

    db("follower_followee").count("*").where("follower_id",  "=", `${user_id}`)
    .then(count => {
        console.log(count)
        res.json(count[0]["count"])
    })
    .catch(err => {
        console.log(err)
        res.json("NA")
    })



}
