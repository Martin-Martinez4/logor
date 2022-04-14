
export const handleCountResponses = (req, res, db) => {

    const { parent_id } = req.params;

    db("responses")
    .count("*")
    .where("parent_id", "=", `${parent_id}`)
    .then(count => {

        // console.log(count)

        res.json(count[0]["count"])
    })
    .catch(err => {
        console.log(err)
        res.json("NA")
    })

}


