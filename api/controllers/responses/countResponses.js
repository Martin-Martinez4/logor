
export const handleCountResponses = (req, res, next, db) => {

    const { parent_id } = req.params;

    db("responses")
    .count("*")
    .where("parent_id", "=", `${parent_id}`)
    .then(count => {

        // console.log(count)

        res.status(200).json(count[0]["count"])
    })
    .catch(err => {
        if(!err.statusCode){
    
            err.statusCode = 500;
        }

        err.message = "Error counting responses";

        next(err);
        res.json("NA")
    })

}


