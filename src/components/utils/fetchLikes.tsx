
export const getLikesCount = async (comment_id) => {

    const count = await fetch(`http://localhost:3001/comment/count/likes/${comment_id}`, {

    method: "get",
    headers: { "Content-Type": "application/json"},

    })
    .then(count =>  {
        
        return count.json()
    })
    .catch(err => {

        return "NA"
    });

    return count

}

export const userLiked = async (comment_id, user_id) => {

    const userLiked = await fetch(`http://localhost:3001/user/liked/comment/`, {

        method: "post",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({
            comment_id: comment_id,
            user_id: user_id 
           
        })

    })
    .then(isLiked => {

        return isLiked.json()
    })
    

    return userLiked

}

export const createLike = async (comment_id, user_id) => {

    const response = await fetch(`http://localhost:3001/comment/add/like/`, {

        method: "post",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({
            comment_id: comment_id,
            user_id: user_id 
           
        })

    })
    .then(resp => {

        return resp
    })
    

    return response


}

export const deleteLike = async (comment_id, user_id) => {

    const response = await fetch(`http://localhost:3001/comment/delete/like/`, {

        method: "delete",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({
            comment_id: comment_id,
            user_id: user_id 
           
        })

    })
    .then(resp => {

        return resp
    })
    

    return response

    
}
