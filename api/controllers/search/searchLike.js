// SELECT * FROM users  WHERE username like 'N%' or username like 'n%' or nickname like 'n%' or nickname like 'N%';

export const handleGetUsersLike = (req, res ,db ) => {

    const queryString = req.body.query;

    db("users")
    .whereILike("username", `${queryString}%`)
    .orWhereILike("nickname", `${queryString}%`)
    // .orWhereILike("nickname", `${queryString}%`)
   
    .then( users => {

        res.json(users)
    }
    )
    .catch(err => {

        console.error(err)
    })


} 

export const handleGetTagsLike = (req, res, db) => {

    const queryString = req.body.query;

    db.select("tag_name").from("tags")
    .whereILike("tag_name", `#${queryString}%`)
    .then(tagnames => {
        res.json(tagnames)
    })
    .catch(err => console.error(err))
}