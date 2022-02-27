
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
        
        res.json(user)
    })
    .catch(err => console.log(err))


}
