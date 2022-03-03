
// Followee = being followed
// logged in user = follower, visited = followee: check if user logged in follows
// visited = follower, logged in user = followee: check if user logged in is being followed
export const handleCheckIfFollower = (req, res ,db) => {

    const {follower_id, followee_id} = req.body


    db("followee_follower").count("*").where({

        follower_id: `${follower_id}`,
        followee_id: `${followee_id}`

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



