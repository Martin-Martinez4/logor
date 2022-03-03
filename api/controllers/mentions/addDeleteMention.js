

export const handleAddMentionToComment = (req, res ,db) => {

const {nickname, comment_id} = req.body

    // console.log(nickname)
    // console.log(comment_id)

    db.transaction(trx => 
        
        trx("users").select("id")
        .where("nickname", "=", nickname)
        .returning("id")
        .then(userID => {

            return trx("mentions").insert({
                user_id: `${userID[0].id}`,
                comment_id:`${comment_id}`
            })
            .onConflict(["user_id", "comment_id"])
            .ignore()
            .returning("user_id")
          
        })
        .then(
    
            db.select("nickname").from("users")
            .where("nickname", "=", nickname)
            .then((nickName) => {
                        
                res.json(nickName)
            })
     
        ).then(trx.commit)
        .catch(trx.rollback)
    )


}


export const handleDeleteMentionToComment = (req, res, db) => {

    const {comment_id, nickname} = req.body;

        // console.log("test nickN: ", nickname)
        // console.log(comment_id)

        db.transaction(trx => 
            
            trx("users").select("id")
            .where({

                nickname: nickname,
            })
            .returning("id")
            .then(user_id => {

            return trx("mentions")
            .where({
                user_id: `${user_id[0].id}`,
                comment_id: `${comment_id}`

            })
            .del()
            .returning("user_id")
            .then(res => res)
            })
        
        
            .then(trx.commit)
            .catch(trx.rollback)
        )
    


}

