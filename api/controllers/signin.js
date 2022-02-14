
export const handleSignin = (req, res, db) => {

    // get username and password from body request
    const {username, password} = req.body

    // console.log(username)
    // console.log(password)

    // Check if both username and password are present
    if(!username || !password){

        return res.status(400).json("Incorrect form submission");
    }

    db.select('username', 'password').from('login')
        .where('username', '=', username)
        .then((data) => {

            // console.log(data);

            // console.log(data[0].password === password)

            if(data[0].password === password){

                db.select('*').from('users')
                .join('user_headers', 'users.id', 'user_headers.user_id')
                    .where('users.username', '=', data[0].username)
                    .then((user) => {
                        
                        console.log(user[0])
                        res.json(user[0])
                    })
                    .catch((err) => console.log(err))
            }
            else{

                res.status(400).json("Trouble loggining in")
            }
        })
        .catch(() => res.status(400).json("Trouble loggining in"))

}


