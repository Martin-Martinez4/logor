
export const handleGetMentionsFromCommentID = (req, res,  db) => {

    const { id } = req.params

    console.log("get mentions: ", id)

    db.select("users.nickname").from("mentions")
    .join("users", "users.id", "mentions.user_id" )
    .where("mentions.comment_id", "=", `${id}`)
    .then((mentionsInfo) => {

        console.log(mentionsInfo)
        res.json(mentionsInfo);
    })
    .catch(err => {
        console.log(err)
        res.json("")
    });
}

