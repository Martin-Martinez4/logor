
export const handleAddResponse = (req, res, next, db) => {

    const {parent_id, comment_id}  = req.body

    let insert_parent;

    if(parent_id === null){

        insert_parent = "00000000-0000-0000-0000-000000000000"
    }
    else{

        insert_parent = parent_id
    }


    db("responses").insert({

        parent_id: `${insert_parent}`,
        comment_id: `${comment_id}`
    })
    .onConflict(["parent_id", "comment_id"])
    .ignore()
    .returning("comment_id")
    .then(data => res.status(200).json(data))
    .catch(err => {

        if(!err.statusCode){
    
            err.statusCode = 500;
        }

        err.message = "Error adding response";

        next(err);
        res.json("Error")
    })

}

