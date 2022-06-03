
export const handleCountLikes = (req, res, next, db) => {

    const { comment_id } = req.params

    db("user_likes")
    .count("*")
    .where({

        comment_id: `${comment_id}`,
    })
    .then(count => {

        res.status(200).json(count[0]["count"])
    })
    .catch(err => {

        if(!err.statusCode){

            err.statusCode = 500;
        }

        err.message = "Error counting likes";

        next(err);

        res.json("NA")
    })
}


