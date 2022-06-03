
export const handleGetResponsesRecusive = (req, res, next, db) => {

    const { parent_id } = req.params;

    db.withRecursive('ResponsesCTE', (qb) => {
        qb.select('responses.parent_id', 'responses.comment_id')
        .from('responses')
        .where('responses.parent_id', `${parent_id}`)
        .union((qb) => {
          qb.select('responses.parent_id', 'responses.comment_id')
          .from('responses')
          .join('ResponsesCTE', 'ResponsesCTE.comment_id', 'responses.parent_id')
        })
      }).select('*').from('ResponsesCTE')
      .join('comments', 'ResponsesCTE.comment_id', 'comments.comment_id')
      .join('users', 'comments.user_id', 'users.id')
      .orderBy('comments.created_at', 'desc')
      .then(data => {
  
          res.json(data);
      })
      .then(comments => {
          res.status(200).json(comments)
        })
      .catch(err => {
        if(!err.statusCode){
    
            err.statusCode = 500;
        }

        err.message = "Error getting replies";

        next(err);
    });

}

