

 //  SELECT * FROM comments jOIN user_headers ON comments.user_id = user_headers.user_id WHERE tag_id = '849998ef-e4b6-48ce-aa0d-7bbef2ee1995' ORDER BY comments.created_at;

export const handleGetCommentsByUser = (req, res, db) => {

    const {id } = req.params

    db.distinct('*').from('users')
    .join('comments', 'comments.user_id', 'users.id')
        .where('comments.user_id', '=', `${id}`)
        .orderBy('created_at', 'DESC')
        .then((comments) => {

            // console.log(comments);
            res.json(comments);
        })

}

export const handleGetCommentsByTag = (req, res, db) => {

    const {id } = req.params

    db.select('*').from('comments').where('user_id', '=', id).orderBy('created_at', 'desc')
    .then(data => {

        res.json(data);
    })

}



