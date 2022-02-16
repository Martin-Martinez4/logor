
export const handleUpdatePost = (req, res, db) => {

    // INSERT INTO comments( comment_id, text_content, created_at, status, likes, user_id )

    const { comment_id } = req.params

    const { text_content } = req.body;

    const newDate = new Date((new Date().getTime())).toUTCString();

    const status = ['Edited', `'${newDate}'`];

    db.transaction(trx => {

        trx('comments')
        .where({ comment_id: comment_id })
        .update({

            text_content: text_content,
            status: status
        })
        .then(resp => {

            if(resp){
                console.log(`${comment_id}: updated`)
            }
            else{
                res.status(400).json('Not found')
            }
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })

}

export const handleSlateForDeletion = (req, res, db) => {

    const { comment_id } = req.params

    const text_content = null;
    const newDate = new Date((new Date().getTime())).toUTCString();

    const status = ['Deleted', `'${newDate}'`];

    db.transaction(trx => {

        trx('comments')
        .where({ comment_id: comment_id })
        .update({

            text_content: text_content,
            status: status
        })
        .then(resp => {

            if(resp){
                console.log(`${comment_id}: updated`)
            }
            else{
                res.status(400).json('Not found')
            }
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })


}




