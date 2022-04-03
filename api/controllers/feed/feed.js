
export const handleGetFeed = (req ,res, db) => {

    // The query: 
    // SELECT user_id, comments.text_content FROM follower_followee JOIN users on users.id = followee_id JOIN comments ON follower_followee.followee_id = comments.user_id WHERE follower_followee.follower_id = '9f09c196-f66b-4ee7-a172-53eb39f0d349' ORDER BY comments.created_at DESC LIMIT 100;

    const user_id = req.user_id;

    db.select("user_id", "text_content", "nickname", "profile_pic_url", "created_at", "comment_id", "likes", "status")
    .from("follower_followee")
    .join("users", "users.id", "followee_id")
    .join("comments", "follower_followee.followee_id", "comments.user_id")
    .where({

        follower_id: user_id
    })
    .orderBy('created_at', 'desc')
    .limit(200)
    .then(comments => {

        res.json(comments)
    })
    .catch(err => {

        res.json("Error")
    })


}
