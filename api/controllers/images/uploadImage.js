
import fs from 'fs-extra';
import sharp from 'sharp';
import path from 'path';

// Add user id to filename using jws token authentication

export const handleUploadImage = (req, res, next, db) => {

    const fileTypeRegexp = /\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|svg|SVG)$/;

    if(!req.file.originalname.match( /\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|svg|SVG)$/)){

        // res.send({msg: 'Only png, gif, jpeg, and svg ar allowed!'})

        const error = new Error(err);
        error.httpStatusCode = 415;
        error.message = "Only png, gif, jpeg, and svg ar allowed!"
  
        return next(error);


    }else{

        
        const image = req.file.filename;
        // console.log(req.file.filename.split("/").pop())
        const imageName = req.file.filename.split("/").pop()
        // JSON.parse(req.body.data).directory
        const id = 1;

        // const dir = req.body.directory

        const newFilepath = './temp' + "/"+`${id}`+ '/' + imageName

        fs.move(image, './temp' + "/"+`${id}`+ '/' + imageName, function (err) {
            if (err) {
                if(!err.statusCode){

                    err.statusCode = 500;
                }
        
                err.message = "Error getting requested comment."
        
                next(err);
            }
    
            // res.json({});
            
                db.insert({
        
                    image: newFilepath,
                    image_id: id
        
                })
                .into("images")
                .then(data => {
        
        
                    res.status(201).json({
                        data: data,
                        msg: "Image has been updated"
                    })
                })
                .catch(err => {

                    if(!err.statusCode){

                        err.statusCode = 500;
                    }
            
                    err.message = err
            
                    next(err);
        
                })
        })
        .catch(err => {

            if(!err.statusCode){

                err.statusCode = 500;
            }
    
            err.message = err
    
            next(err);

        });
    

    }

}



