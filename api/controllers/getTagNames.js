
export const handleGetTagNamesFromCommentID = (req, res,  db) => {

    const {id } = req.params

    db.select("tags.tag_name").from("tag_comment")
    .join("tags", "tags.tag_id", "tag_comment.tag_id" )
    .where("tag_comment.comment_id", "=", `${id}`)
    .then((tagInfo) => {

        console.log(tagInfo)
        res.json(tagInfo);
    })
    .catch(err => {
        console.log(err)
        res.json("")
    });
}


