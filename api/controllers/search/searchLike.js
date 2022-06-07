// SELECT * FROM users  WHERE username like 'N%' or username like 'n%' or nickname like 'n%' or nickname like 'N%';

export const handleGetUsersLike = (req, res, next, db ) => {

    const queryString = req.body.query;

    let queryLimit

    if(req.body.limit){

        queryLimit = req.body.limit

    }else{

        queryLimit = 5
    }

    db("users")
    .whereILike("username", `${queryString}%`)
    .orWhereILike("nickname", `${queryString}%`)
    .limit(parseInt(queryLimit))
    .then( users => {

        console.log(users)

        res.status(200).json(users)
    }
    )
    .catch(err => {

        if(!err.statusCode){
    
            err.statusCode = 500;
        }

        err.message = "Error getting user likes";

        next(err);
    })


} 

export const handleGetTagsLike = (req, res, next, db) => {

    const queryString = req.body.query;

    db.select("tag_name").from("tags")
    .whereILike("tag_name", `#${queryString}%`)
    .then(tagnames => {
        res.status(200).json(tagnames)
    })
    .catch(err => {
        if(!err.statusCode){
    
            err.statusCode = 500;
        }

        err.message = "Error getting tag likes";

        next(err);
    })
}