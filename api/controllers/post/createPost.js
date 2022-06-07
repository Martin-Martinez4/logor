

export const handleCreatePost = (req, res, next, db) => {

        //  Like register, create comment, return comments list, run through make posts, setUserPost to result, postlist will rerender
        // INSERT INTO comments( comment_id, text_content, created_at, status, likes, user_id )

        const user_id = req.user_id

        // console.log("create_id: ", req.user_id)

        const {text_content, newComment_id, parent_id} = req.body;

        console.log({text_content, newComment_id, parent_id, user_id})

        // console.log(newComment_id)
        // console.log("parent_id: ",parent_id)

        const created_at = new Date((new Date().getTime())).toUTCString();
        const status = ['', ''];
        const likes = 0;

        db.transaction(trx => {

            console.log("start")

            trx.insert({
                comment_id: `${newComment_id}`,
                text_content: text_content,
                created_at: created_at,
                status: status,
                likes: likes,
                user_id: user_id
    
            })
            .into('comments')
            .then(() => {

                console.log("insert", parent_id === "")
                console.log("newComment", newComment_id)
    
               return trx.insert({
    
                    parent_id: parent_id === "" ? null : parent_id,
                    comment_id: `${newComment_id}`
                })
                .into('responses')
                .then(() => {

                    console.log("Res")


                    res.status(201).json("done");
    
                    // return trx.select('*').from('comments')
                    // .join("users", "comments.user_id", "users.id")
                    //     .where('comments.user_id', '=', user_id).orderBy('created_at', 'desc')
                    //     .then((comments) => {
                            
                    //         res.json(comments)
                    //     })
                    //     .catch((err) => console.log(err))
    
                })
                .catch(err => {
        
                    if(!err.statusCode){
                
                        err.statusCode = 500;
                    }
            
                    err.message = "Error getting user mentions";
            
                    next(err);
            
                });
    
            })
            .then(trx.commit)
            .catch(trx.rollback)
        })
        .catch(err => {
        
            if(!err.statusCode){
        
                err.statusCode = 500;
            }
    
            err.message = "Error creating post";
    
            next(err);
    
        });




}


