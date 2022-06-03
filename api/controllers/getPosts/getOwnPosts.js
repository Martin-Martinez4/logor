

export const handleGetComments = (req, res, next, db) => {

    const id = req.user_id

    db.distinct('*').from('comments')
    .join('users', 'comments.user_id', 'users.id')
    .where('user_id', '=', id).orderBy('created_at', 'desc')
    .then(data => {

        res.status(200).json(data);
    })
    .catch(err => {
        // console.log(err)
        if(!err.statusCode){

            err.statusCode = 500;
        }

        err.message = "Error getting your comments."

        next(err);
        res.json([])
    });

}

