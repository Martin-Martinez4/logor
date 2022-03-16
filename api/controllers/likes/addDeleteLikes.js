
export const handleAddLike = (req, res,  db) => {

    const { comment_id } = req.body;

    const user_id = req.user_id

    db("user_likes").insert({

        user_id: user_id,
        comment_id: comment_id
    })
    .onConflict(["user_id", "comment_id"])
    .ignore()
    .returning("comment_id")
    .then(resp => res.json(resp))
    .catch(err => {
        console.log(err)

        res.json("Error")
    })

}

export const handleDeleteLike = (req, res,  db) => {

    const { comment_id } = req.body;

    const user_id = req.user_id;

    db("user_likes")
    .where({

        user_id: user_id,
        comment_id: comment_id
    })
    .del()
    .onConflict(["user_id", "comment_id"])
    .ignore()
    .returning("comment_id")
    .then(resp => res.json(resp))
    .catch(err => {
        console.log(err)

        res.json("Error")
    })

}


