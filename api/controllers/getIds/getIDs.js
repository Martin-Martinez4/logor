
export const handleGetTagID = (req, res, next, db) => {

    const { name } = req.params

    const tagName = '#'+ name;

    db.select("tag_id").from("tags")
    .where("tag_name", "=", tagName)
    .then((id) => {
        res.status(200).json(id)
    })
    .catch(err => {

        if(!err.statusCode){

            err.statusCode = 500;
        }

        err.message = "Error getting tag id."

        next(err);
    })

}

export const handleGetUserID = (req, res, next, db) => {

    const { nickname } = req.params

    // console.log(nickname)

    db.select("id").from("users")
    .where("nickname", "=", `@${nickname}`)
    .then((id) => {

        // console.log(id[0].id)
       res.status(200).json(id[0])
    })
    .catch(err => {
        if(!err.statusCode){

            err.statusCode = 500;
        }

        err.message = "Error getting user id."

        next(err);
    })

}

export const handleGetTagIDName = (req, res, next, db) => {

    const { comment_id } = req.params

    //  SELECT tags.tag_name, tags.tag_id, tag_comment.comment_id FROM tag_comment JOIN tags ON tags.tag_id = tag_comment.tag_id WHERE tag_comment.comment_id = '4961e34a-d4f6-470f-b7a4-43b73fb755f2';

    db.select("tags.tag_name", "tags.tag_id", "tag_comment.comment_id").from("tag_comment")
    .join("tags", "tags.tag_id", "tag_comment.tag_id")
    .where("tag_comment.comment_id", "=", `${comment_id}`)
    .then((tags) => {
        res.status(200).json(tags)
    })
    .catch(err => {
        if(!err.statusCode){

            err.statusCode = 500;
        }

        err.message = "Error getting id name."

        next(err);
    })

}

export const handleGetRandomUserIDs = (req,res, next, db) => {

    const { number } =  req.params;

    db.select("id").from("users")
    .orderBy(db.raw('RANDOM()'))
    .limit(parseInt(number))
    .then((user_ids) => {

        res.status(200).json(user_ids);
    })
    .catch(err => {
        if(!err.statusCode){

            err.statusCode = 500;
        }

        err.message = "Error getting random users."

        next(err);
    })

}


