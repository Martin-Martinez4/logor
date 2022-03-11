
import jwt from "jsonwebtoken"
// import jwt_decode from "jwt-decode"

export const jwtTokens = ({ id }) => {

    // verify token: 
    // var decoded = jwt.verify(token, process.env.ACCESS_SECRET);

    // console.log("createToken: ",id)

    const user = { id };

    const secret = process.env.ACCESS_SECRET;
    const secretRef = process.env.REFRESH_SECRET;



    const access_token = jwt.sign(user, secret, { expiresIn: '5m', algorithm: 'HS256' });

    const refresh_token  = jwt.sign(user, secretRef, { expiresIn: '5m', algorithm: 'HS256' });

    return ({ access_token, refresh_token });
}

export const refreshCookie = (req, res) => {

    const refreshToken = req.cookies.refresh_token || null;

    // console.log("trest: ", refreshToken)

    const test = jwt.verify(refreshToken, process.env.REFRESH_SECRET)
    // console.log("test: ", test)

    try{


        if(refreshToken === null) {return res.status(401).json({ error: "No refresh token" })};

        // const secret = process.env.REFRESH_SECRET
        // const secretAcecess = process.env.ACCESS_SECRET

        jwt.verify(refreshToken,  process.env.REFRESH_SECRET, (error, user) => {

            console.log("user: ", user)

            if(error) {return res.status(403).json({ error: error.message })};


            let tokens = jwtTokens(user);

            // res.cookie('refresh_token', tokens.refresh_token, { httpOnly: true, sameSite: "none", secure: true});
            res.cookie('refresh_token', tokens.refresh_token, { httpOnly: true, sameSite: 'None', maxAge: 5 * 60 * 60 * 1000 });

            // console.log("tokens: ", tokens)

            const verifed = jwt.verify(tokens.access_token, process.env.ACCESS_SECRET)

            // console.log("verif: ", verifed)

            tokens.user_id = verifed.id

            res.json(tokens)
        })

        const test = jwt.verify(refreshToken,  process.env.REFRESH_SECRET)


        
    }
    catch(error){

        console.log("erroe")

        res.status(401).status({ error: error.message })

    }
}

export const deleteCookieToken = (req, res) => {

    try{

        res.clearCookies('refreshToken');

        return res.status(200).json({ message: "token deleted"})
    }
    catch(error){

        res.status(401).status({ error: error.message })

    }
}



