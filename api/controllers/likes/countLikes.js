
export const handleCountLikes = (req, res, db) => {

    const { comment_id } = req.params

    db("user_likes")
    .count("*")
    .where({

        comment_id: `${comment_id}`,
    })
    .then(count => {

        res.json(count[0]["count"])
    })
    .catch(err => {

        console.log(err)
        res.json("NA")
    })
}


