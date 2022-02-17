
export const handleUpdatePost = (req, res, db) => {

    // INSERT INTO comments( comment_id, text_content, created_at, status, likes, user_id )

    const { comment_id } = req.params

    const { text_content } = req.body;

    const newDate = new Date((new Date().getTime())).toUTCString();

    console.log("input: ",text_content)

    const status = ['Edited', `'${newDate}'`];
    db.transaction(trx => {
    trx("comments")
    .returning(['text_content', 'status'])
    .where('comment_id', comment_id)
    .update({ 
        text_content: text_content, 
        status: status 
    })
    .then(comment => {

        res.json(comment[0])
    })
    .then(trx.commit)
    .catch(trx.rollback)
}).catch(err => console.log(err))

    // db.transaction(trx => {

    //     trx('comments')
    //     .where({ comment_id: comment_id })
    //     .update({

    //         text_content: text_content,
    //         status: status
    //     })
    //     .then(() => {

    //         db.select('*').from('comments')
    //             .where('comment_id', '=', comment_id)
    //             .then((comment) => {
                    
    //                 console.log(comment[0])
    //                 res.json(comment[0])
    //             })
    //             .catch((err) => console.log(err))
    //         })
    //     .then(trx.commit)
    //     .catch(trx.rollback)
    // })

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
    
        .then(() => {

            db.select('*').from('comments')
                .where('comment_id', '=', comment_id)
                .then((comment) => {
                    
                    // console.log(comment[0])
                    res.json(comment[0])
                })
                .catch((err) => console.log(err))
            })
        .then(trx.commit)
        .catch(trx.rollback)
    })


}




