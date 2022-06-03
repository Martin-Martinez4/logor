
import fs from 'fs-extra';
import sharp from 'sharp';
import path from 'path';

import { defaultHeaders, defaultProfiles } from '../../utils/defaultImage.js';

export const handleUpdateProfileWithDefault = async (req, res, next, db) => {

    const id = req.user_id;

    // console.log("req.body: ",req.body)

    
    if(typeof req?.body?.profile_pic_url === "string"){

        const profileImageNameArray = req.body.profile_pic_url.split("/")

        // console.log(profileImageNameArray)

        const profileImageNameString = profileImageNameArray.pop()

        // console.log(profileImageNameString)

        const profileFilepathString = '/profiles/'+ profileImageNameString

        // console.log(profileFilepathString)

        db("users").where({
            id: id
        })
        .update({

            profile_pic_url: profileFilepathString,
    
        })
        .then(data => {

            res.status(200).json(id)

        })
        .catch(err => {
        
            if(!err.statusCode){
        
                err.statusCode = 500;
            }
    
            err.message = "Error updating profile.";
    
            next(err);
    
        });



    }

}

export const handleUploadProfileImage = async (req, res, next, db) => {

    // console.log("gets to profile update")

    const fileTypeRegexp = /\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|svg|SVG)$/;

    // console.log("profile req.file: ", req?.file)
    // console.log("header req: ", req)

    if(!req?.file?.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|svg|SVG)$/)){

        const error = new Error('Only png, gif, jpeg, and svg ar allowed!');

        error.statusCode = 415;

        error.message = 'Only png, gif, jpeg, and svg ar allowed!';

        next(error);

        // res.send({msg: 'Only png, gif, jpeg, and svg ar allowed!'})

    }else{

        // const headerImageArray = req.file.filename.split("/");

        const profileImageName = path.basename(req.file.filename)

        // console.log("top imageImage: ",profileImageName)

        const resizedprofile = path.resolve(req.file.destination,'temp','profiles', profileImageName)

        await sharp(req.file.path)
        .resize(260 , 260,
        {
            kernel: sharp.kernel.nearest,
            fit: 'fill',
      
        }
        )
        .jpeg({ quality: 90 })
        .toFile(
            // path.resolve(req.files[1].destination,'temp','resized','headers', req.files[1].filename.split("/").pop())
            // path.resolve(req.files[1].path)
            resizedprofile
        ).catch(err => {
            
            if(!err.statusCode){
    
                err.statusCode = 500;
            }
    
            err.message = "Error resizing profile image";
    
            next(err);

            console.error(err)
        })

        const oldProfilepath = path.resolve('.','temp', profileImageName);


        await fs.remove(oldProfilepath)

        const image = req.file.filename;

        const imageName = req.file.filename.split("/").pop()

        const id = req.user_id;

        const newFilepath = '/' + 'profiles/'+profileImageName;

        // console.log("newFilePath: ",newFilepath)
        
        // console.log("id upload: ", id)
    
        db("users").where({
            id: id
        })
        .update({

            profile_pic_url: newFilepath,
    
        })
        .then(data => {


            res.status(200).json({
                data: data,
                msg: "Image has been updated"
            })
        })
        .catch(err => {

            if(!err.statusCode){
    
                err.statusCode = 500;
            }
    
            err.message = "Error updating profile image";
    
            next(err);

            res.json({
                msg: err
            })
        })
    

    }

}

export const handleDeleteProfileImage = async (req, res, next, db) => {

    const user_id = req.user_id;

    const newProfile = req.body.newProfile

    // console.log("newProfile: ",newProfile)

        db.select("profile_pic_url")
        .from("users")
        .where({

            id: user_id
        })
        .returning("profile_pic_url")
        .then((oldProfileURL) => {

            const oldProfilePath = `./temp${oldProfileURL[0]["profile_pic_url"]}`;

            if(defaultProfiles.includes(oldProfilePath)){

                console.log("would not have been deleted: ",oldProfilePath)
            }
            else{

                // console.log("would have been deleted: ",oldProfilePath)

                try{

                    fs.remove(oldProfilePath)
                }
                catch{

                    res.status(200).json(oldProfileURL)
                }

            }

            console.log("here")

            // res.status(200).json(oldProfileURL)
            // res.json(oldProfileURL)

            res.status(200).json(oldProfileURL)

        })
        .catch(err => {

            if(!err.statusCode){
    
                err.statusCode = 500;
            }
    
            err.message = "Error deleting profile image";
    
            next(err);
           
        })
}

export const handleUpdateHeaderImage = async (req, res, next, db) => {

    console.log("gets to header update")

    const fileTypeRegexp = /\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|svg|SVG)$/;

    // console.log("header req.file: ", req?.file)
    // console.log("header req: ", req)

    if(!req?.file?.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|svg|SVG)$/)){

        const error = new Error('Only png, gif, jpeg, and svg ar allowed!');

        error.statusCode = 415;

        error.message = 'Only png, gif, jpeg, and svg ar allowed!';

        next(error);
    }else{

        const headerImageArray = req.file.filename.split("/");

        const headerImageName = path.basename(req.file.filename)

        // console.log("top imageImage: ",headerImageName)

        const resizedHeader = path.resolve(req.file.destination,'temp','headers', headerImageName)

        await sharp(req.file.path)
        .resize(1920 , 1280,
        {
            kernel: sharp.kernel.nearest,
            fit: 'fill',
      
        }
        )
        .jpeg({ quality: 90 })
        .toFile(
            
            resizedHeader
        ).catch(err => {
            
            // console.log("sharp error")
            if(!err.statusCode){
    
                err.statusCode = 500;
            }
    
            err.message = "Error resizing header image";
    
            next(err);

        })

        const oldHeaderpath = path.resolve('.','temp', headerImageName);


        await fs.remove(oldHeaderpath)

        const id = req.user_id;

        const newFilepath = '/' + 'headers/'+headerImageName;

        // console.log("newFilePath: ",newFilepath)

            // console.log("id upload: ", id)
            
                await db("user_headers").where({
                    user_id: id
                })
                .update({
        
                    header_img_url: newFilepath,
            
                })
                .then(data => {
        
        
                    res.status(200).json({
                        data: data,
                        msg: "Image has been updated"
                    })
                })
                .catch(err => {
        
                    if(!err.statusCode){
    
                        err.statusCode = 500;
                    }
            
                    err.message = "Error updating header image";
            
                    next(err);
                    res.status(200).json({
                        msg: err
                    })
                })
                .catch(err => {

                    if(!err.statusCode){
    
                        err.statusCode = 500;
                    }
            
                    err.message = "Error updating header image";
            
                    next(err);
                })
        // });
    

    }

}

export const handleUpdateHeaderWithDefault = async (req, res, next, db) => {

    const id = req.user_id;

    
    if(typeof req?.body?.header_img_url === "string"){

        const headerImageNameArray = req.body.header_img_url.split("/");

        const headerImageNameString = headerImageNameArray.pop()

        const headerFilepathString = '/headers/'+ headerImageNameString

        db("user_headers").where({
            user_id: id
        })
        .update({

            header_img_url: headerFilepathString,
    
        })
        .then(data => {

            res.status(200).json(id)

        })
        .catch(err => {

            if(!err.statusCode){

                err.statusCode = 500;
            }
    
            err.message = "Error updating header";
    
            next(err);
        })

    }
    else{

        const error = new Error('Error updating header');

        error.statusCode = 415;

        error.message = 'Error updating header';

        next(error);
    }
}

export const handleDeleteHeaderImage = async (req, res, next, db) => {

    const user_id = req.user_id;

    db.select("header_img_url")
    .from("user_headers")
    .where({

        user_id: user_id
    })
    .returning("header_img_url")
    .then((oldHeaderURL) => {

        const oldHeaderpath = `./temp${oldHeaderURL[0]["header_img_url"]}`;

        if(defaultHeaders.includes(oldHeaderpath)){

            console.log("would not have been deleted: ",oldHeaderpath)
        }
        else{

            // console.log("would have been deleted: ",oldHeaderpath)

            fs.remove(oldHeaderpath)
        }

        res.status(200).json(oldHeaderURL)

    })
    .catch(err => {

        if(!err.statusCode){
    
            err.statusCode = 500;
        }

        err.message = "Error deleting header image";

        next(err);

        res.json({
            msg: err
        })
    })
}


export const handleUpdateUsername = (req, res, next, db) => {

    const user_id = req.user_id;

    const username = req.body.username

    db("users").where({

        id: user_id
    })
    .update({

        username: username,

    })
    .then(data => {

        res.status(200).json(data)

    })
    .catch(err => {

        if(!err.statusCode){
    
            err.statusCode = 500;
        }

        err.message = "Error updating header username";

        next(err);

        res.json({
            msg: err
        })
    })


}
  
export const handleUpdateNickname = (req, res, next, db) => {

    const user_id = req.user_id;

    const nickname = req.body.nickname

    db("users").where({

        id: user_id
    })
    .update({

        nickname: nickname,

    })
    .then(data => {

        res.status(200).json(data)

    })
    .catch(err => {

        if(!err.statusCode){
    
            err.statusCode = 500;
        }

        err.message = "Error updating header nickname";

        next(err);

        res.json({
            msg: err
        })
    })

}
  
export const handleUpdateDescription = (req, res, next, db) => {

    const user_id = req.user_id;

    const description = req.body.description

    db("user_headers").where({

        user_id: user_id
    })
    .update({

        description: description,

    })
    .then(data => {

        res.status(200).json(data)

    })
    .catch(err => {

        if(!err.statusCode){
    
            err.statusCode = 500;
        }

        err.message = "Error updating header description";

        next(err);
        res.json({
            msg: err
        })
    })

}
  
  
export const handleUpdateLocation = (req, res, next, db) => {

    const user_id = req.user_id;

    const location = req.body.location

    db("user_headers").where({

        user_id: user_id
    })
    .update({

        location: location,

    })
    .then(data => {

        res.status(200).json(data)

    })
    .catch(err => {

        if(!err.statusCode){
    
            err.statusCode = 500;
        }

        err.message = "Error updating header location";

        next(err);

        res.json({
            msg: err
        })
    })

}
  
export const handleUpdateLinks = (req, res, next, db) => {

    const user_id = req.user_id;

    const links = req.body.links

    db("user_headers").where({

        user_id: user_id
    })
    .update({

        links: links,

    })
    .then(data => {

        res.status(200).json(data)

    })
    .catch(err => {

        if(!err.statusCode){
    
            err.statusCode = 500;
        }

        err.message = "Error updating header links";

        next(err);

        res.json({
            msg: err
        })
    })

}
  
  

