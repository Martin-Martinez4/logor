
const relativePath = '../api/database/seed/'


// Not efficent (while loop inside of for loop) but it is just a helper, may change later
const faker = require("faker");

const UUIDv4 = require('uuid') ;

const fs = require('fs');

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

function createUsers(number){


    const usersPath = `${relativePath+'users.sql'}`;
    const headersPath = `${relativePath+'headers.sql'}`;
    const loginPath = `${relativePath+'login.sql'}`;

    fs.writeFileSync(`${usersPath}`, 'BEGIN TRANSACTION;\n INSERT INTO users(id, username, nickname, profile_pic_url)\nVALUES \n', function (err) {
        if (err) throw err;
    });
    fs.writeFileSync(`${headersPath}`, 'BEGIN TRANSACTION;\n INSERT INTO user_headers( description, header_img_url, location, links, joined_date, user_id)\nVALUES \n', function (err) {
        if (err) throw err;
    });
    fs.writeFileSync(`${loginPath}`, 'BEGIN TRANSACTION;\n INSERT INTO login( username, password, user_id)\nVALUES \n', function (err) {
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


        tempUser = `\n( '${currentUserUUID}', '${currentUserName}',  '${currentUserNickName}', '../../users/default/Monkey_2.svg')${i === number-1? ';':','}`;
        tempLogin = `\n('${currentUserName}', 'password', '${currentUserUUID}')${i === number-1? ';':','}`;

        // user_headers( description, header_img_url, location, links, joined_date, user_id) 

        tempHeaders = `\n('${faker.git.commitMessage() + " " + faker.company.catchPhrase() + " " + faker.company.bs()}', '../../users/1/unsplash_GBEHjsPQbEQ.png', '${faker.address.cityName()}', '${faker.internet.url()}', '${new Date().toISOString().slice(0, 19).replace('T', ' ')}', '${currentUserUUID}')${i === number-1? ';':','}`;

        userIDs.push(currentUserUUID);


        fs.appendFileSync(`${usersPath}`, tempUser, function (err) {
            if (err) throw err;
        });
        fs.appendFileSync(`${headersPath}`, tempHeaders, function (err) {
            if (err) throw err;
        });
        fs.appendFileSync(`${loginPath}`, tempLogin, function (err) {
            if (err) throw err;
        });


    }

    fs.appendFileSync(`${usersPath}`, `\n COMMIT;`, function (err) {
        if (err) throw err;
    });
    fs.appendFileSync(`${headersPath}`, `\n COMMIT;`, function (err) {
        if (err) throw err;
    });
    fs.appendFileSync(`${loginPath}`, `\n COMMIT;`, function (err) {
        if (err) throw err;
    });


    return userIDs
}


function createTags(number){

    const tagsPath = `${relativePath+'tags.sql'}`;
  
    fs.writeFileSync(`${tagsPath}`, 'BEGIN TRANSACTION;\n INSERT INTO tags( tag_id, tag_name)\nVALUES\n', function (err) {
        if (err) throw err;
    });

    let tagIDs = []

    let tempTagID;
    let tempTagName;

    let tagEntry;

    for(let i = 0; i < number; i++){

        tempTagID = UUIDv4.v4();
        tempTagName = '#' + faker.company.bsNoun();


        tagEntry = `('${tempTagID}', '${tempTagName}')${i === number-1? ';':','} \n`;

        tagIDs.push([tempTagID, tempTagName]);


        fs.appendFileSync(`${tagsPath}`, tagEntry, function (err) {
            if (err) throw err;
        });
        
    }
    
    fs.appendFileSync(`${tagsPath}`, `\n COMMIT;`, function (err) {
        if (err) throw err;
    });

    return tagIDs
}


const userIDsArray = createUsers(10);
const tagsIDNameArray = createTags(10);

//  insert array as '{'', ''}' 

function createComments(userIDsArray, maxNumOfComments, minNumOfComments){

    const commentsPath = `${relativePath + 'comments.sql'}`

    fs.writeFileSync(`${commentsPath}`, 'BEGIN TRANSACTION;\n INSERT INTO comments( comment_id, text_content, created_at, status, likes, user_id )\nVALUES \n', function (err) {
        if (err) throw err;
    });

    let commentIDArray = [];


    for(let i = 0; i < userIDsArray.length; i++){

        const numberOfComments = getRndInteger(minNumOfComments, maxNumOfComments);

        // let counter = 0;

        for(let counter = 0; counter < numberOfComments; counter++){

            // counter++;

            let tempComment = ``;

            const commentID =  UUIDv4.v4();
            const textContent = (faker.commerce.productDescription() + " " + faker.company.catchPhrase()).replace(new RegExp("\\'","gm"),"''");
            // text.replace(new RegExp("\\'","gm"),"''")
            
            const createdAt = new Date((new Date(faker.date.past()).getTime())).toUTCString();

                        
            // const status = ARRAY [' ',' ']";
            const likes = 0;
            const currentUserUUID = userIDsArray[i];


            // INSERT INTO comments( comment_id, text_content, created_at, status, likes, user_id ) VALUES

            tempComment = `\n('${commentID}', '${textContent}',  '${createdAt}', '{'',''}', ${likes}, '${currentUserUUID}')${i ===  userIDsArray.length-1?counter === numberOfComments-1? ';':',':','}`;


            fs.appendFileSync(`${commentsPath}`, tempComment, function (err) {
                if (err) throw err;
            });
            
            commentIDArray.push(commentID);
            
            
            
            
        }
        
    }

    fs.appendFileSync(`${commentsPath}`, `\n COMMIT;`, function (err) {
        if (err) throw err;
    });
    return commentIDArray;
}

const comments = createComments(userIDsArray, 2, 10);

// Will creat a statement to set comment text_content to text + tags and 
// Will create a statement to input the comment tag input
// Will take min and max number of tags per comment

const updateCommentPath = `${relativePath + 'updateComment.sql'}`;
const tagCommentPath = `${relativePath +'tag_comment.sql'}`;

function addTagToComment(tagsArray, commentIDsArray, minNumTags, maxNumTags){

    fs.writeFileSync(`${updateCommentPath}`, 'BEGIN TRANSACTION;\n ', function (err) {
        if (err) throw err;
    });
    fs.writeFileSync(`${tagCommentPath}`, 'BEGIN TRANSACTION;\n INSERT INTO tag_comment( tag_id, comment_id )\nVALUES \n', function (err) {
        if (err) throw err;
    });

    let tagString = '';
    
    for( let i = 0; i < commentIDsArray.length; i++ ){

        let insertStatment = ``;
        
        const numberOfTags = getRndInteger(minNumTags, maxNumTags);

        let tempTagsArray = [...tagsArray];

        let tempTagString = '';

        // console.log(tempTagsArray)

        for(let j = 0; j < numberOfTags; j ++){

            let tagIDCommentID = ``;

            const index = getRndInteger(0, tempTagsArray.length -1);

            tempTagString += tempTagsArray[index][1]

            tagIDCommentID = `\n ('${tempTagsArray[index][0]}', '${commentIDsArray[i]}')${i === commentIDsArray.length -1?j === numberOfTags -1? ';':',':','}`
          

            updateStatement = `\n UPDATE comments \n SET text_content = CONCAT(text_content,'${tempTagString}') \n WHERE comment_id = '${commentIDsArray[i]}';`
    
            fs.appendFileSync(`${updateCommentPath}`, updateStatement, function (err) {
                if (err) throw err;
            });
    
            fs.appendFileSync(`${tagCommentPath}`, tagIDCommentID, function (err) {
                if (err) throw err;
            });
            
            tempTagsArray.splice(index, 1);
        }
        
    }
    
        fs.appendFileSync(`${updateCommentPath}`, `\n COMMIT;`, function (err) {
            if (err) throw err;
        });

        fs.appendFileSync(`${tagCommentPath}`, `\n COMMIT;`, function (err) {
            if (err) throw err;
        });
}

addTagToComment(tagsIDNameArray, comments, 0, 2)




// const randName = faker.commerce.productDescription();
// const randName2 = faker.company.catchPhrase();

// const randomDate = faker.date.past();



// fs.appendFileSync('testfake.json', data, function (err) {
//     if (err) throw err;
//     console.log('Updated!');
//     });


