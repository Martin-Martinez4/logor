
import { v4 as uuidv4 } from 'uuid';

export const handleRegister = (req, res ,db) => {

    const { username, 
        nickname,
        profile_pic_url,
        description,
        header_img_url,
        location,
        links,
        password,
        password2 } = req.body;

        const id = uuidv4();

        
        const joined_date = new Date(new Date().getTime()).toISOString();

    if(!id || !username || !nickname || !password || !profile_pic_url || !header_img_url || password !== password2){

        return res.status(400).json("Incorrect form submission");
    }

    db.transaction(trx => {
        trx.insert({
            id: id,
            username: username, 
            nickname: nickname,
            profile_pic_url: profile_pic_url
        })
        .into('users')

        .then(() =>{

            return trx('users')
            .returning('user_id')
            .insert({
                username: username, 
                password: password,
                user_id: id
            })
            .into('login')})

        .then(
            (user_id) => {
                return trx('users')
                // knex built in method .returning
                .returning('user_id')
                
                .insert({
        
                            description:description,
                            header_img_url: header_img_url,
                            location: location,
                            links: links,
                            joined_date: joined_date,
                            user_id: id
                        })
                        .into('user_headers')
            }
        )
        .then(() => {

            db.select('*').from('users')
            .join('user_headers', 'users.id', 'user_headers.user_id')
                .where('users.username', '=', username)
                .then((user) => {
                    
                    console.log(user[0])
                    res.json(user[0])
                })
                .catch((err) => console.log(err))
        })

        
        .then(trx.commit)
        .catch(trx.rollback)
             
    })

}

