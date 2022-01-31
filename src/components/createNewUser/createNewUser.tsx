
import { v4 as uuidv4 } from 'uuid';


function createNewUser(user, data){

    // console.log(data);

    const newUserId = uuidv4();

    data["login"][newUserId] = {
                                "username":"", 
                                "password":""
                            };

    data["users"][newUserId] = {
                                "username":"",
                                "tag":"", 
                                "profile_pic_url":""
                            };

    data["headers"][newUserId] = {
                                    "description": "",
                                    "header_img_url": "",
                                    "location": "",
                                    "links": "",
                                    "joined_date": ""
                                
                                };

    for (let key of Object.keys( data["login"][newUserId])){

        data["login"][newUserId][key] = user[key];
    }

    for (let key of Object.keys( data["users"][newUserId])){

        data["users"][newUserId][key] = user[key];
    }

    for (let key of Object.keys( data["headers"][newUserId])){

        data["headers"][newUserId][key] = user[key];
    }

    const userData = Object.assign({id: newUserId}, data["users"][newUserId], data["headers"][newUserId])


    return userData;


}


export default createNewUser;

