

export const handleGetUserInfo = (req, res , db) => {

    const { id } = req.params;

    db.select("*").from('users')
    .join('user_headers', 'users.id', 'user_headers.user_id')
    .where("users.id", "=", `${id}`)
    .then((user) => {
        
        res.json(user)
    })
    .catch(err => {
        console.log(err)
        res.json([])
    })


}

export const handleGetUserInfoByNickname = (req, res , db) => {

    const { nickname } = req.params;

    const tagNickanme = '@'+nickname

    db.select("*").from('users')
    .join('user_headers', 'users.id', 'user_headers.user_id')
    .where("users.nickname", "=", `${tagNickanme}`)
    .then((user) => {

        // console.log(user)
        
        res.json(user)
    })
    .catch(err => console.log(err))

}

export const handleGetGetMiniProfileInfo = (req, res, db) => {

    try{

        const user_id = req.params.id;
    
        // console.log(user_id)
    
        db.select("*").from("users")
        .where({
    
            id: user_id
        })
        .then(userInfo => {
    
            res.json(userInfo)
        })
        .catch(err => {
            console.log("error handleGetGetMiniProfileInfo ")
            console.log(err)
            res.json({})
        
        })

    }catch{
        console.log("error handleGetGetMiniProfileInfo ")
        res.json({})

    }


}

export const  handleGetLoggedinUserInfo = (req, res, db) => {

    const user_id = req.user_id;

    db.select("*").from('users')
    .join('user_headers', 'users.id', 'user_headers.user_id')
    .where("users.id", "=", `${user_id}`)
    .then((user) => {
        
        res.json(user)
    })
    .catch(err => {
        console.log("get info error")
        console.log(err)
        res.json([])
    })



}

