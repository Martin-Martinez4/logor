
export const handleGetUserInfo = (req, res , db) => {

    const { id } = req.params;

    db.select("*").from('users')
    .join('user_headers', 'users.id', 'user_headers.user_id')
    .where("users.id", "=", `${id}`)
    .then((user) => {
        
        res.json(user)
    })
    .catch(err => console.log(err))


}
