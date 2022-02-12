

// Not efficent (while loop inside of for loop) but it is just a helper, may change later
const faker = require("faker");

const UUIDv4 = require('uuid') ;

const randName = faker.commerce.productDescription();
const randName2 = faker.company.catchPhrase();

const fs = require('fs');

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

function createUsers(number){

    fs.writeFile('usersTest.sql', 'VALUES \n', function (err) {
        if (err) throw err;
    });
    fs.writeFile('headersTest.sql', 'VALUES \n', function (err) {
        if (err) throw err;
    });
    fs.writeFile('loginTest.sql', 'VALUES \n', function (err) {
        if (err) throw err;
    });

    let userIDs = []

    let tempUser = ``;
    let tempLogin = ``;
    let tempHeaders = ``;
    

    let currentUserUUID;
    let currentUserName;
    let currentUserNickName; 

    for(let i = 0; i < number; i++){

        currentUserUUID = UUIDv4.v4();
        currentUserNickName = faker.hacker.adjective() + "-" + faker.animal.type();
        currentUserName = faker.internet.userName();


        tempUser = `\n( '${currentUserUUID}', '${currentUserName}',  '${currentUserNickName}', '../../users/default/Monkey_2.svg'),`;
        tempLogin = `\n('${currentUserName}', 'password', '${currentUserUUID}'),`;

        // user_headers( description, header_img_url, location, links, joined_date, user_id) 

        tempHeaders = `\n('${faker.git.commitMessage() + " " + faker.company.catchPhrase() + " " + faker.company.bs()}', '../../users/1/unsplash_GBEHjsPQbEQ.png', '${faker.address.cityName()}', '${faker.internet.url()}', '${new Date().toISOString().slice(0, 19).replace('T', ' ')}', '${currentUserUUID}'),`;

        userIDs.push(currentUserUUID);


        fs.appendFile('usersTest.sql', tempUser, function (err) {
            if (err) throw err;
        });
        fs.appendFile('headersTest.sql', tempHeaders, function (err) {
            if (err) throw err;
        });
        fs.appendFile('loginTest.sql', tempLogin, function (err) {
            if (err) throw err;
        });


    }


    return userIDs
}


function createTags(number){

    fs.writeFile('tags.sql', 'VALUES \n', function (err) {
        if (err) throw err;
    });

    let tagIDs = []

    let tempTagID;
    let tempTagName;

    let tagEntry;

    for(let i = 0; i < number; i++){

        tempTagID = UUIDv4.v4();
        tempTagName = '#' + faker.company.bsNoun();


        tagEntry = `\n ( '${tempTagID}', '${tempTagName}'),`;

        tagIDs.push(tempTagID);


        fs.appendFile('tags.sql', tagEntry, function (err) {
            if (err) throw err;
        });

    }


    return tagIDs
}


const userIDsArray = createUsers(10);
const tagsIDNameArray = createTags(10);

//  insert array as '{'', ''}' 

function createComments(userIDsArray, maxNumOfComments, minNumOfComments){

    fs.writeFile('comments.sql', 'VALUES \n', function (err) {
        if (err) throw err;
    });

    let commentIDArray = [];

    console.log(userIDsArray.length)

    for(let i = 0; i < userIDsArray.length -1; i++){

        console.log("i", userIDsArray[i])

        const numberOfComments = getRndInteger(minNumOfComments, maxNumOfComments);

        let counter = 0;

        while(counter < numberOfComments){

            let tempComment = ``;

            const commentID =  UUIDv4.v4();
            const textContent = faker.commerce.productDescription() + " " + faker.company.catchPhrase();
            
            const createdAt = (new Date(faker.date.past())).getTime();
            
            // const status = ARRAY [' ',' ']";
            const likes = 0;
            const currentUserUUID = userIDsArray[i];


            // INSERT INTO comments( comment_id, text_content, created_at, status, likes, user_id ) VALUES

            tempComment = `\n('${commentID}', '${textContent}',  '${createdAt}', '{'', ''}', ${likes}, '${currentUserUUID}'),`;

            fs.appendFile('comments.sql', tempComment, function (err) {
                if (err) throw err;
            });

            commentIDArray.push(commentID);

            counter++;
    
    
        }

        
        
    }
    return commentIDArray;

}

console.log(createComments(userIDsArray, 2, 3));




// const randName = faker.commerce.productDescription();
// const randName2 = faker.company.catchPhrase();

// const randomDate = faker.date.past();



// fs.appendFile('testfake.json', data, function (err) {
//     if (err) throw err;
//     console.log('Updated!');
//     });


