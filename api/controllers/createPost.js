

import { v4 as uuidv4 } from 'uuid';

export const handleCreatePost = (req, res, db) => {

        //  Like register, create comment, return comments list, run through make posts, setUserPost to result, postlist will rerender
        // INSERT INTO comments( comment_id, text_content, created_at, status, likes, user_id )

        const {text_content, user_id} = req.body;

        // console.log(user_id)

        const comment_id = uuidv4();
        const created_at = new Date((new Date().getTime())).toUTCString();
        const status = ['', ''];
        const likes = 0;

        db.insert({
            comment_id:comment_id,
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



}


