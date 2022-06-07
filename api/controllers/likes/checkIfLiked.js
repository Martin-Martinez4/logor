
export const handleCheckIfLiked = (req, res, next, db) => {

    if(req.user_id){


        const { comment_id} = req.body
        const user_id  = req.user_id
    
        // console.log(user_id)
    
        db("user_likes").count("*").where({
    
            user_id: `${user_id}`,
            comment_id: `${comment_id}`
    
        }) 
        .limit(1)
        .then(count => {
    
            // console.log(count)
            if(count[0]["count"] >= 1){
                
                res.status(200).json(true)

            }else{
                
                 res.status(200).json(false)
            }
            
        })
        .catch(err => {
    
            if(!err.statusCode){

                err.statusCode = 500;
            }
    
            err.message = "Error checking if you liked comment";
    
            next(err);

        })
    }
    else{

        res.status(200).json(false)

    }



}


