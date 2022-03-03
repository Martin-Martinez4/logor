

export const handleGetComments = (req, res, db) => {

    const {id } = req.params

    db.distinct('*').from('comments').where('user_id', '=', id).orderBy('created_at', 'desc')
    .then(data => {

        res.json(data);
    })
    .catch(err => console.log(err));

}

