
export const handleGetPostsThatMentionUser = (req, res, next, db) => {

    const user_id = req.user_id

    console.log(user_id)

    db.select("*")
    .from("comments")
    .join("mentions", "comments.comment_id", "mentions.comment_id")
    .join("users", "comments.user_id", "users.id")
    .where("mentions.user_id", "=", user_id)
    .orderBy('created_at', 'desc')
    .then(comments => {

        res.status(200).json(comments);
    })
    .catch(err => {
        
        if(!err.statusCode){
    
            err.statusCode = 500;
        }

        err.message = "Error getting user mentions";

        next(err);

    });


}


