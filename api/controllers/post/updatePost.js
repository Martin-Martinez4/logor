
export const handleUpdatePost = (req, res, next, db) => {

    // INSERT INTO comments( comment_id, text_content, created_at, status, likes, user_id )

    const { comment_id } = req.params

    const user_id = req.user_id;

    const { text_content } = req.body;

    const newDate = new Date((new Date().getTime())).toUTCString();

    // console.log("input: ",text_content)

    const status = ['Edited', `'${newDate}'`];
    db.transaction(trx => {
        trx("comments")
        .returning(['text_content', 'status'])
        .where({
            comment_id: comment_id,
            user_id: user_id
        })
        .update({ 
            text_content: text_content, 
            status: status 
        })
        .then(comment => {

            res.status(200).json(comment[0])
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(err => {
        
        if(!err.statusCode){
    
            err.statusCode = 500;
        }

        err.message = "Error updating post.";

        next(err);

    });


}

export const handleSlateForDeletion = (req, res, next, db) => {

    const { comment_id } = req.params;

    const user_id = req.user_id;

    const text_content = null;
    const newDate = new Date((new Date().getTime())).toUTCString();

    const status = ['Deleted', `'${newDate}'`];

    db.transaction(trx => {

        trx('comments')
        .returning("*")
        .where({ comment_id: comment_id,
                user_id: user_id 
        })
        .update({

            text_content: text_content,
            status: status
        })
        .then((comment) => {
        
            res.status(200).json(comment[0])
        })
               

        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(err => {
        
        if(!err.statusCode){
    
            err.statusCode = 500;
        }

        err.message = "Error deleting post.";

        next(err);

    });


}




