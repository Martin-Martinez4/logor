
export const handleCheckIfLiked = (req, res ,db) => {

    const {user_id, comment_id} = req.body

    console.log(user_id)

    db("user_likes").count("*").where({

        user_id: `${user_id}`,
        comment_id: `${comment_id}`

    }) 
    .limit(1)
    .then(count => {

        // console.log(count)
        if(count[0]["count"] >= 1){
            
            res.json(true)
        }else{
            
            res.json(false)
        }
        
    })
    .catch(err => {

        console.log(err)
        res.json(false)
    })


}

