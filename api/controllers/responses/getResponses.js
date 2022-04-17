
export const handleGetResponses = (req, res, db) => {

    const{ parent_id }  = req.params;

    db.select("*")
    .from("responses")
    .join("comments", "comments.comment_id", "responses.comment_id")
    .join('users', 'comments.user_id', 'users.id')
    .where('responses.parent_id', '=', parent_id).orderBy('created_at', 'desc')
    .then((comments) => {

        // console.log(comments);
        res.json(comments);
    })
    .catch(err => {
        console.log(err)
    });
}


