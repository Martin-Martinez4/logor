// SELECT * FROM users  WHERE username like 'N%' or username like 'n%' or nickname like 'n%' or nickname like 'N%';

export const handleGetUsersLike = (req, res ,db ) => {

    const queryStringLower = req.body.query;

    db("users")
    .whereILike("username", `${queryStringLower}%`)
    .orWhereILike("nickname", `${queryStringLower}%`)
    // .orWhereILike("nickname", `${queryStringLower}%`)
   
    .then( users => {

        res.json(users)
    }
    )
    .catch(err => {

        console.error(err)
    })


} 