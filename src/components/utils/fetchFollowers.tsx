
// API calls

export const getFollowersCount = async (user_id) => {

    const followersCount = await fetch(`http://localhost:3001/user/number/followers/${user_id}`, {

        method: "get",
        headers: { "Content-Type": "application/json"},

    })
    .then(data =>  {
        
        return data.json()
    }) 
    .catch(err => {

        console.log(err)
        return "NA"

    });
    return followersCount
        
    
}

export const getFollowingCount = async (user_id) => {

    const followingCount = await fetch(`http://localhost:3001/user/number/following/${user_id}`, {

        method: "get",
        headers: { "Content-Type": "application/json"},

    })
    .then(data =>  {
        
        return data.json()
    })
    .catch(err => {

        console.log(err)
        return "NA"

    });

    return followingCount

}

export const isAFollowerOfB = async (follower_id, followee_id) => {

    // followee = being followed, follower subscribes to followee

    const isAFollowerOfB = await fetch('http://localhost:3001"/user/isFollower/', {

        method: "post",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({
            follower_id: follower_id,
            followee_id: followee_id
           
            })
        })
        .then(data =>  {
        
            return data.json()
        })
        .catch(err => {

            console.log(err)
            return false
        });


    return isAFollowerOfB


}



