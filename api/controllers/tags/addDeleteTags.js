
import { v4 as uuidv4 } from 'uuid';

export const handleAddTagToComment = (req, res ,db) => {

const {tag_name, comment_id} = req.body

    // console.log(tag_name)

    db.transaction(trx => 
        
        trx("tags").select("tag_id")
        .where("tag_name", "=", tag_name)
        .returning("tag_id")
        .then(tagID => {

            return trx("tag_comment").insert({
                tag_id: `${tagID[0].tag_id}`,
                comment_id:`${comment_id}`
            })
            .onConflict(["tag_id", "comment_id"])
            .ignore()
            .returning("tag_id")
          
        })
        .then(
    
            db.select("tag_name").from("tags")
            .where("tag_name", "=", tag_name)
            .then((comments) => {
                        
                res.json(comments)
            })
     
        ).then(trx.commit)
        .catch(trx.rollback)
    )
    .catch(err => console.log(err));


}


export const handleDeleteTagToComment = (req, res, db) => {

    const {comment_id, tag_name} = req.body;

        console.log("testP: ", tag_name)
        console.log(comment_id)

        db.transaction(trx => 
            
            trx("tags").select("tag_id")
            .where({

                tag_name: tag_name,
            })
            .returning("tag_id")
            .then(tag_id => {

            return trx("tag_comment")
            .where({
                tag_id: `${tag_id[0].tag_id}`,
                comment_id: `${comment_id}`

            })
            .del()
            .returning("tag_id")
            .then(res => res)
            })
        
        
            .then(trx.commit)
            .catch(trx.rollback)
        )
        .catch(err => console.log(err));
    


}

export const handleCreateTag = (req, res, db) => {

    const {tag_name} = req.body

    // console.log(tag_name)

    const newUUID = uuidv4();
    
    db("tags").insert({
        tag_id: newUUID,
        tag_name: tag_name
    })
    .onConflict("tag_name")
    .ignore()
    .returning("tag_name")
    
    .then(

        db.select("tag_name").from("tags")
        .where("tag_name", "=", tag_name)
        .then((comments) => {
                    
            res.json(comments)
        })
    )
    .catch(err => console.log(err));


}

