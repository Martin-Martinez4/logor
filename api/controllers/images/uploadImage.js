
import fs from 'fs-extra';

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

    if(!req.file.originalname.match( /\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|svg|SVG)$/)){

        res.send({msg: 'Only png, gif, jpeg, and svg ar allowed!'})

    }else{

        
        const image = req.file.filename;
        console.log(req.file.filename.split("/").pop())
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

export const handleUploadProfileHeaderImage = (req, res, db) => {

    const fileTypeRegexp = /\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|svg|SVG)$/;

    // console.log("profile and header: ", req)
    // console.log("profile and header: ", req.files)

    if(!req.files[0].originalname.match( fileTypeRegexp) || !req.files[1].originalname.match(fileTypeRegexp)){

        res.send({msg: 'Only png, gif, jpeg, and svg ar allowed!'})

    }else{

        
        const imageProfile = req.files[0].filename;
        const imageHeader = req.files[1].filename;
        // console.log(req.files.filename.split("/").pop())
        const profileImageName = req.files[0].filename.split("/").pop()
        const headerImageName = req.files[1].filename.split("/").pop()
        // JSON.parse(req.body.data).directory
        const id = req.body.user_id;

        // const dir = req.body.directory

        const newProfileFilepath = './temp' + "/"+`${id}`+ '/' + 'profile/'+ profileImageName
        const newHeaderFilepath = './temp' + "/"+`${id}`+ '/' + 'header/'+ headerImageName

        console.log(newProfileFilepath)
        
        fs.move('./temp/' +profileImageName, newProfileFilepath, function (err) {
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
        
                    profile_pic_url: newProfileFilepath,
            
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
        
        fs.move('./temp/'+headerImageName, newHeaderFilepath, function (err) {
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
        
                    header_img_url: newHeaderFilepath,
            
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

