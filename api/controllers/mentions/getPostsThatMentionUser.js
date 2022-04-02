
export const handleGetPostsThatMentionUser = (req, res, db) => {

    const user_id = req.user_id

    console.log(user_id)

    db.select("*")
    .from("comments")
    .join("mentions", "comments.comment_id", "mentions.comment_id")
    .join("users", "comments.user_id", "users.id")
    .where("mentions.user_id", "=", user_id)
    .orderBy('created_at', 'desc')
    .then(comments => {

        res.json(comments)
    })
    .catch(error => {

        console.error(error)

    })


}


