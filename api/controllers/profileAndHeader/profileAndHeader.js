
import fs from 'fs-extra';
import sharp from 'sharp';
import path from 'path';

export const handleUpdateProfileWithDefault = async (req, res, db) => {

    const id = req.user_id;

    console.log("req.body: ",req.body)

    
    if(typeof req?.body?.profile_pic_url === "string"){

        const profileImageNameArray = req.body.profile_pic_url.split("/")

        console.log(profileImageNameArray)

        const profileImageNameString = profileImageNameArray.pop()

        console.log(profileImageNameString)

        const profileFilepathString = '/profiles/'+ profileImageNameString

        console.log(profileFilepathString)

        db("users").where({
            id: id
        })
        .update({

            profile_pic_url: profileFilepathString,
    
        })
        .then(data => {

            res.json(id)

        })
        .catch(err => {

            console.log(err)
            res.json({
                msg: err
            })
        });



    }

}

export const handleUploadProfileImage = (req, res, db) => {

    const fileTypeRegexp = /\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|svg|SVG)$/;

    if(!req?.file?.originalname.match(fileTypeRegexp)){

        res.send({msg: 'Only png, gif, jpeg, and svg ar allowed!'})

    }else{

        
        const image = req.file.filename;
        // console.log(req.file.filename.split("/").pop())
        const imageName = req.file.filename.split("/").pop()
        // JSON.parse(req.body.data).directory
        const id = req.body.user_id;

        // const dir = req.body.directory

        const newFilepath = './temp' + "/"+`${id}`+ '/' + 'profile/'+ imageName

        console.log(newFilepath)
        
        fs.move(image, './temp' + "/"+`${id}`+ '/' + imageName, function (err) {
            if (err) {
                return console.error(err);
            }
            
            console.log(newFilepath)
            // res.json({});

            console.log("id upload: ", id)
            
                db("users").where({
                    id: id
                })
                .update({
        
                    profile_pic_url: newFilepath,
            
                })
                .then(data => {
        
        
                    res.json({
                        data: data,
                        msg: "Image has been updated"
                    })
                })
                .catch(err => {
        
                    console.log(err)
                    res.json({
                        msg: err
                    })
                })
        });
    

    }

}

export const handleUpdateHeaderImage = (req, res, db) => {

    console.log("gets to header update")

    const fileTypeRegexp = /\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|svg|SVG)$/;

    console.log("header req.file: ", req?.file)
    // console.log("header req: ", req)

    if(!req?.file?.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|svg|SVG)$/)){

        res.send({msg: 'Only png, gif, jpeg, and svg ar allowed!'})

    }else{

        
        const image = req.file.filename;
        // console.log(req.file.filename.split("/").pop())
        const imageName = req.file.filename.split("/").pop()
        // JSON.parse(req.body.data).directory
        const id = req.user_id;


        // const dir = req.body.directory

        const newFilepath = '/headers/'+ imageName

        console.log(newFilepath)
        
        fs.move(image, './temp' + newFilepath, function (err) {
            if (err) {
                return console.error(err);
            }
            
            console.log(newFilepath)
            // res.json({});

            console.log("id upload: ", id)
            
                db("user_headers").where({
                    user_id: id
                })
                .update({
        
                    header_img_url: newFilepath,
            
                })
                .then(data => {
        
        
                    res.json({
                        data: data,
                        msg: "Image has been updated"
                    })
                })
                .catch(err => {
        
                    console.log(err)
                    res.json({
                        msg: err
                    })
                })
        });
    

    }

}

export const handleUpdateHeaderWithDefault = async (req, res, db) => {

    const id = req.user_id;

    
    if(typeof req?.body?.header_img_url === "string"){

        const headerImageNameArray = req.body.header_img_url.split("/");

        const headerImageNameString = headerImageNameArray.pop()

        const headerFilepathString = '/headers/'+ headerImageNameString

        console.log(req.body.profile_pic_url)

        db("user_headers").where({
            user_id: id
        })
        .update({

            header_img_url: headerFilepathString,
    
        })
        .then(data => {

            res.json(id)

        })
        .catch(err => {

            console.log(err)
            res.json({
                msg: err
            })
        })

    }
    else{

        res.json("error")
    }
}
