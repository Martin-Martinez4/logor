
const handleCountResponses = (req, res, db) => {

    const { comment_id } = req.params;

    db("responses")
    .count("*")
    .where("comment_id", "=", `${comment_id}`)
    .then(count => {

        res.json(count)
    })
    .catch(err => {
        console.log(err)
        res.json("Error")
    })

}


