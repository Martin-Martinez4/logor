
export const handleAddResponse = (req, res, db) => {

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
    .then(data => res.json(data))
    .catch(err => {

        console.log(err)
        res.json("Error")
    })

}

