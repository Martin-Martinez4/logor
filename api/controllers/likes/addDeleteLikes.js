
export const handleAddLike = (req, res, next, db) => {

    try{

        const { comment_id } = req.body;
    
        const user_id = req.user_id
    
        db("user_likes").insert({
    
            user_id: user_id,
            comment_id: comment_id
        })
        .onConflict(["user_id", "comment_id"])
        .ignore()
        .returning("comment_id")
        .then(resp =>  res.status(201).json(resp))
        .catch(err => {
    
            if(!err.statusCode){

                err.statusCode = 500;
            }
    
            err.message = err
    
            next(err);
        })
    }
    catch{

        if(!err.statusCode){

            err.statusCode = 500;
        }

        err.message = err

        next(err);

        res.json({})
    }

}

export const handleDeleteLike = (req, res, next, db) => {

    const { comment_id } = req.body;

    const user_id = req.user_id;

    db("user_likes")
    .where({

        user_id: user_id,
        comment_id: comment_id
    })
    .del()
    .onConflict(["user_id", "comment_id"])
    .ignore()
    .returning("comment_id")
    .then(resp => res.status(200).json(resp))
    .catch(err => {

        if(!err.statusCode){

            err.statusCode = 500;
        }

        err.message = err

        next(err);

        res.json("Error")
    })

}


