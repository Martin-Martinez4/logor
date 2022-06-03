
export const handleGetResponses = (req, res, next, db) => {

    const{ parent_id }  = req.params;

    db.select("*")
    .from("responses")
    .join("comments", "comments.comment_id", "responses.comment_id")
    .join('users', 'comments.user_id', 'users.id')
    .where('responses.parent_id', '=', parent_id).orderBy('created_at', 'desc')
    .then((comments) => {

        // console.log(comments);
        res.status(200).json(comments);
    })
    .catch(err => {
        
        if(!err.statusCode){
    
            err.statusCode = 500;
        }

        err.message = "Error getting responses";

        next(err);
    });
}


