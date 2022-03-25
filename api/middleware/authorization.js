
import jwt from "jsonwebtoken"


export const authenticateToken = (req, res, next) => {

    // console.log("suthtoken req.file: ",req.file)
    
    const token  = req.cookies.refresh_token;
    // console.log("token: ", token)
    jwt.verify(
        token,
        process.env.REFRESH_SECRET,
        (err, decoded) => {
            if (err) return res.sendStatus(403); //invalid token
            // console.log("decoded, middleware: ", decoded)
            req.user_id = decoded.id;
            next();
        })
}