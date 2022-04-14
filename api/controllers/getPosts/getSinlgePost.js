

export const handleGetSinglePost = (req, res, db) => {

    const {id } = req.params

    db.select('*').from('comments')
    .join('users', 'comments.user_id', 'users.id')
    .where('comment_id', '=', id).orderBy('created_at', 'desc')
    .then(data => {

        res.json(data);
    })
    .catch(err => console.log(err));

}