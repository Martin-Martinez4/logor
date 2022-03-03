
export const handleCountFollowersByUserID = (req, res, db) => {

    const {id} = req.params;

    db("follower_followee").count("*").where("followee_id", "=", `${id}`)
    .then(count => {
        console.log(count)
        res.json(count[0]["count"])
    })
    .catch(err => {
        console.log(err)
        res.json("0")
    })


}

