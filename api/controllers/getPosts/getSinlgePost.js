

export const handleGetSinglePost = (req, res, next, db) => {

    const {id } = req.params

    db.select('*').from('comments')
    .join('users', 'comments.user_id', 'users.id')
    .where('comment_id', '=', id).orderBy('created_at', 'desc')
    .then(data => {

        res.status(200).json(data);
    })
    .catch(err => {
        // console.log(err)
        if(!err.statusCode){

            err.statusCode = 500;
        }

        err.message = "Error getting requested comment."

        next(err);
    });

}