
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



