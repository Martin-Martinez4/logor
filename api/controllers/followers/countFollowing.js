

export const handleCountFollowingByUserID = (req, res, next, db) => {

    const {user_id} = req.params;

    db("follower_followee").count("*").where("follower_id",  "=", `${user_id}`)
    .then(count => {
        // console.log(count)
        res.status(200).json(count[0]["count"]);
    })
    .catch(err => {
        if(!err.statusCode){

            err.statusCode = 500;
        }

        err.message = "Error counting following."

        next(err);
        // res.json("NA")
    })



}
