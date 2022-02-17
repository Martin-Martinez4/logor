

export const handleGetSinglePost = (req, res, db) => {

    const {id } = req.params

    db.select('*').from('comments').where('comment_id', '=', id).orderBy('created_at', 'desc')
    .then(data => {

        res.json(data);
    })

}