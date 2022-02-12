

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
            console.log('Updated!');
        });
        fs.appendFile('headersTest.sql', tempHeaders, function (err) {
            if (err) throw err;
            console.log('Updated!');
        });
        fs.appendFile('loginTest.sql', tempLogin, function (err) {
            if (err) throw err;
            console.log('Updated!');
        });


    }


    return userIDs
}

console.log(createUsers(3));

function createTags(number){

    let tagIDs = []

    let tempTagID;
    let tempTagName;

    let tagEntry;

    for(let i = 0; i < number; i++){

        tempTagID = UUIDv4.v4();
        tempTagName = '#' + faker.company.bsNoun();


        tagEntry = `\n( '${tempTagID}', '${tempTagName}'),`;

        tagIDs.push(tempTagID);


        fs.appendFile('tags.sql', tagEntry, function (err) {
            if (err) throw err;
            console.log('Updated!');
        });

    }


    return tagIDs
}

console.log(createTags(3));

const userIDsArray = createUsers(10);
const tagsIDNameArray = createTags(10);

// function createComments(userIDsArray, tagIDNameArray, maxNumOfComments,  minNumOfComments, maxNumberTagsPerComment){

//     for(let i = 0; i < userIDsArray.length -1; i++){

//         const numberOfComments = getRndInteger(minNumOfComments, maxNumOfComments);

//         let counter = 0;

//         while(counter < numberOfComments){

//             let tempComment;


//             const commentID =  UUIDv4.v4();
//             const textContent = faker.commerce.productDescription() + " " + faker.company.catchPhrase();
    
//             const createdAt = (new Date(faker.date.past())).getTime();

//             const status = ARRAY ['999-876-5432','999-123-4567']

//             // INSERT INTO comments( comment_id, text_content, created_at, status, likes, user_id ) VALUES

//             tempComment = `\n( '${currentUserUUID}', '${currentUserName}',  '${currentUserNickName}', 'ARRAY ['0', '']'),`;
    
    
//             counter++;
    
//             // randNum = getRndInteger(0, 10)
    
//         }
    

//     }


// }




// const randName = faker.commerce.productDescription();
// const randName2 = faker.company.catchPhrase();

// const randomDate = faker.date.past();



// fs.appendFile('testfake.json', data, function (err) {
//     if (err) throw err;
//     console.log('Updated!');
//     });


