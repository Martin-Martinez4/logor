

export const handleCreatePost = (req, res, db) => {

        //  Like register, create comment, return comments list, run through make posts, setUserPost to result, postlist will rerender
        // INSERT INTO comments( comment_id, text_content, created_at, status, likes, user_id )

        const {text_content, user_id, newComment_id} = req.body;

        // console.log(user_id)

        const created_at = new Date((new Date().getTime())).toUTCString();
        const status = ['', ''];
        const likes = 0;

        db.insert({
            comment_id: `${newComment_id}`,
            text_content: text_content,
            created_at: created_at,
            status: status,
            likes: likes,
            user_id: user_id

        })
        .into('comments')
        .then(() => {

            db.select('*').from('comments')
                .where('comments.user_id', '=', user_id).orderBy('created_at', 'desc')
                .then((comments) => {
                    
                    res.json(comments)
                })
                .catch((err) => console.log(err))
        })
        .catch(err => console.log(err));



}


