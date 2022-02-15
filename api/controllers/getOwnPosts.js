

export const handleGetComments = (req, res, db) => {

    const {id } = req.params

    db.select('*').from('comments').where('user_id', '=', id).orderBy('created_at', 'desc')
    .then(data => {

        res.json(data);
    })

}

