
export const handleGetTagNamesFromCommentID = (req, res, next, db) => {

    const {id } = req.params

    db.select("tags.tag_name").from("tag_comment")
    .join("tags", "tags.tag_id", "tag_comment.tag_id" )
    .where("tag_comment.comment_id", "=", `${id}`)
    .then((tagInfo) => {

        // console.log(tagInfo)
        res.status(200).json(tagInfo);
    })
    .catch(err => {

        if(!err.statusCode){
    
            err.statusCode = 500;
        }

        err.message = "Error getting tag name from comments";

        next(err);
    });
}


