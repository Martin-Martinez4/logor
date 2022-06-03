
export const handleGetMentionsFromCommentID = (req, res, next, db) => {

    const { id } = req.params

    console.log("get mentions: ", id)

    db.select("users.nickname").from("mentions")
    .join("users", "users.id", "mentions.user_id" )
    .where("mentions.comment_id", "=", `${id}`)
    .then((mentionsInfo) => {

        console.log(mentionsInfo)
        res.status(200).json(mentionsInfo);
    })
    .catch(err => {
        
        if(!err.statusCode){
    
            err.statusCode = 500;
        }

        err.message = "Error getting mentions from comment";

        next(err);

        res.json({})
    });
}

