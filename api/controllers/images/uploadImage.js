
import fs from 'fs-extra';
import sharp from 'sharp';
import path from 'path';

// Add user id to filename using jws token authentication

export const handleUploadImage = (req, res, db) => {

    const fileTypeRegexp = /\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|svg|SVG)$/;

    if(!req.file.originalname.match( /\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|svg|SVG)$/)){

        res.send({msg: 'Only png, gif, jpeg, and svg ar allowed!'})

    }else{

        
        const image = req.file.filename;
        console.log(req.file.filename.split("/").pop())
        const imageName = req.file.filename.split("/").pop()
        // JSON.parse(req.body.data).directory
        const id = 1;

        // const dir = req.body.directory

        const newFilepath = './temp' + "/"+`${id}`+ '/' + imageName

        fs.move(image, './temp' + "/"+`${id}`+ '/' + imageName, function (err) {
            if (err) {
                return console.error(err);
            }
    
            // res.json({});
            
                db.insert({
        
                    image: newFilepath,
                    image_id: id
        
                })
                .into("images")
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

export const handleUploadProfileImage = (req, res, db) => {

    const fileTypeRegexp = /\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|svg|SVG)$/;

    if(!req?.file?.originalname.match( /\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|svg|SVG)$/)){

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

// export const handleUpdateProfileWithDefault = async (req, res, db) => {

//     const id = req.user_id;

//     console.log("req.body: ",req.body)

    
//     if(typeof req?.body?.profile_pic_url === "string"){

//         const profileImageNameString = req.body.profile_pic_url.split("/").pop()

//         console.log(profileImageNameString)

//         const profileFilepathString = '/profiles/'+ profileImageNameString

//         console.log(req.body.profile_pic_url)

//         db("users").where({
//             id: id
//         })
//         .update({

//             profile_pic_url: profileFilepathString,
    
//         })
//         .then(data => {

//             res.json(id)

//         })
//         .catch(err => {

//             console.log(err)
//             res.json({
//                 msg: err
//             })
//         });



//     }

// }

// export const handleUpdateHeaderWithDefault = async (req, res, db) => {

//     const id = req.user_id;

    
//     if(typeof req?.body?.profile_pic_url === "string"){

//         const headerImageNameString = req.body.header_img_url.split("/").pop()

//         const headerFilepathString = '/headers/'+ headerImageNameString

//         console.log(req.body.profile_pic_url)

//         db("user_headers").where({
//             user_id: id
//         })
//         .update({

//             header_img_url: headerFilepathString,
    
//         })
//         .then(data => {

//             res.json(id)

//         })
//         .catch(err => {

//             console.log(err)
//             res.json({
//                 msg: err
//             })
//         })

//     }
// }

export const handleUploadProfileHeaderImage = async (req, res, db) => {

    const fileTypeRegexp = /\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|svg|SVG)$/;

    const id = req.body.user_id;


    // console.log("profile and header: ", req)
    console.log("profile and header: ", typeof req?.body?.profile_pic_url)
    console.log("profile and header: ", typeof  req?.body?.header_img_url)

    // check if string or other type
    // console.log(typeof req.body.profile_pic_url)

    if(typeof req?.body?.profile_pic_url === "string"){

        const profileImageNameString = req.body.profile_pic_url.split("/").pop()

        console.log(profileImageNameString)

        const profileFilepathString = '/profiles/'+ profileImageNameString

        console.log(req.body.profile_pic_url)

        db("users").where({
            id: id
        })
        .update({

            profile_pic_url: profileFilepathString,
    
        })
        .then(data => {

        })
        .catch(err => {

            console.log(err)
            res.json({
                msg: err
            })
        });



    }

    if(typeof req?.body?.header_img_url === "string"){

        const headerImageNameString = req.body.header_img_url.split("/").pop()

        const headerFilepathString = '/headers/'+ headerImageNameString

        console.log(req.body.profile_pic_url)

        db("user_headers").where({
            user_id: id
        })
        .update({

            header_img_url: headerFilepathString,
    
        })
        .then(data => {


        })
        .catch(err => {

            console.log(err)
            res.json({
                msg: err
            })
        })
    }

    if(!req?.files[0]?.originalname.match( fileTypeRegexp) || !req?.files[1]?.originalname.match(fileTypeRegexp)){

        res.send({msg: 'Only png, gif, jpeg, and svg ar allowed!'})

    }else{

        // try{

            
                    console.log("req.files: ",req.files[0].destination)

                    const resizedProfile = path.resolve(req.files[0].destination,'temp','resized', 'profiles',req.files[0].filename.split("/").pop())
                    const resizedHeader = path.resolve(req.files[1].destination,'temp','resized','headers', req.files[1].filename.split("/").pop())
            
                    await sharp(req.files[0].path)
                    .resize(800, 800,
                    {
                        kernel: sharp.kernel.nearest,
                        fit: 'contain',
              
                      })
                    .jpeg({ quality: 90 })
                    .toFile(
                        // path.resolve(req.files[0].destination,'temp','resized', 'profiles',req.files[0].filename.split("/").pop())
                        // path.resolve(req.files[0].path)
                        resizedProfile
            
                    )
                    
                    await sharp(req.files[1].path)
                    .resize(1600 , 750,
                    {
                        kernel: sharp.kernel.nearest,
                        fit: 'contain',
                  
                      })
                    .jpeg({ quality: 90 })
                    .toFile(
                        // path.resolve(req.files[1].destination,'temp','resized','headers', req.files[1].filename.split("/").pop())
                        // path.resolve(req.files[1].path)
                        resizedHeader
                    )
                    
                    const imageProfile = req.files[0].filename;
                    const imageHeader = req.files[1].filename;
                    // console.log(req.files.filename.split("/").pop())
                    const profileImageName = req.files[0].filename.split("/").pop()

                    
                    const headerImageName = req.files[1].filename.split("/").pop()
                    // JSON.parse(req.body.data).directory
                    // const id = req.body.user_id;
            
                    // const dir = req.body.directory
                    
                    // to remove
                    const oldProfilepath = path.resolve('.','temp', profileImageName);
                    const oldHeaderpath = path.resolve('.','temp', headerImageName);
                    
                    // to move to
                    const newProfileFilepath = './temp/' + 'profiles/' + profileImageName
                    const newHeaderFilepath = './temp/'+ 'headers/'+ headerImageName
                        
                    // To add to database
                    const profileFilepath = '/profiles/'+ profileImageName
                    const headerFilepath = '/headers/'+ headerImageName
            
                    console.log(newProfileFilepath)

                    fs.remove(oldProfilepath)
                    fs.remove(oldHeaderpath)
                    
                    fs.move(resizedProfile, newProfileFilepath, function (err) {
                        if (err) {
                            return console.error(err);
                        }
                        
                        // console.log(newFilepath)
                        // res.json({});
            
                        console.log("id upload: ", id)
                        
                            db("users").where({
                                id: id
                            })
                            .update({
                    
                                profile_pic_url: profileFilepath,
                        
                            })
                            .then(data => {
                    
                            })
                            .catch(err => {
                    
                                console.log(err)
                                res.json({
                                    msg: err
                                })
                            })
                    });
                    
                    fs.move(resizedHeader, newHeaderFilepath, function (err) {
                        if (err) {
                            return console.error(err);
                        }
                        
                        // console.log(newFilepath)
                        // res.json({});
            
                        console.log("id upload: ", id)
                        
                            db("user_headers").where({
                                user_id: id
                            })
                            .update({
                    
                                header_img_url: headerFilepath,
                        
                            })
                            .then(data => {
            
                                res.json({
            
                                    data: data,
                                    msg: "files uploaded"
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

