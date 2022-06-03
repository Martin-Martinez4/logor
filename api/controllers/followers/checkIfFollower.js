
// Followee = being followed
// logged in user = follower, visited = followee: check if user logged in follows
// visited = follower, logged in user = followee: check if user logged in is being followed
export const handleCheckIfFollower = (req, res, next ,db) => {

    const { followee_id} = req.body
    const follower_id = req.user_id


    db("follower_followee").count("*").where({

        follower_id: `${follower_id}`,
        followee_id: `${followee_id}`

    }) 
    .limit(1)
    .then(count => {

        // console.log(count)
        if(count[0]["count"] >= 1){
            
            res.status(200).json(true);

        }else{
            
            res.status(200).json(false);
        }
        
    })
    .catch(err => {

        if(!err.statusCode){

            err.statusCode = 500;
        }

        err.message = "Error checking if follower."

        next(err);
        // res.json(false)
    })


}

export const handleCheckIfLoggedInFollower = (req, res, next ,db) => {

    const {followee_id} = req.body

    const follower_id = req.user_id

    // console.log(followee_id, follower_id)


    db("follower_followee").count("*").where({

        follower_id: `${follower_id}`,
        followee_id: `${followee_id}`

    }) 
    .limit(1)
    .then(count => {

        // console.log(count)
        if(count[0]["count"] >= 1){
            
            res.status(200).json(true);
            
        }else{
            
            res.status(200).json(false);
            
        }
        
    })
    .catch(err => {

        if(!err.statusCode){

            err.statusCode = 500;
        }

        err.message = "Error checking if you are follower."

        next(err);
        // res.json(false)
    })


}

export const handleCheckIfLoggedInFollowee = (req, res, next ,db) => {

    const { followee_id } = req.user_id
    const follower_id  = req.body


    db("follower_followee").count("*").where({

        follower_id: `${follower_id}`,
        followee_id: `${followee_id}`

    }) 
    .limit(1)
    .then(count => {

        // console.log(count)
        if(count[0]["count"] >= 1){
            
            res.status(200).json(true);
            
        }else{
            
            res.status(200).json(false);

        }
        
    })
    .catch(err => {

        if(!err.statusCode){

            err.statusCode = 500;
        }

        err.message = "Error checking if you are following."

        next(err);
        // res.json(false)
    })


}



