
// Not efficent (while loop inside of for loop) but it is just a helper, may change later
const faker = require("faker");

const UUIDv4 = require('uuid') ;

const randName = faker.commerce.productDescription();
const randName2 = faker.company.catchPhrase();

const fs = require('fs');

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
  }


// console.log(randName);
// console.log(randName2);


data = `
"sorted_comments":{`
    
//     "1":{
        
//         "34234234234":{
            
//             "date_made":"12/23/2021",
//             "text_content": "${randName + ' ' +randName2}",
//             "like": "10",
//             "replies": []
//         }
//     }   
// }
// `

let tempData = ``;

let numberUsers = 6;

for(let i = 1; i <= numberUsers; i++ ){

    // console.log("ping")

    tempData += `
                    "${i}": {
    `
    
    let randNum = getRndInteger(0, 15)

    let counter = 0;
    // console.log(randNum)

    while(counter < randNum){


        const randName = faker.commerce.productDescription();
        const randName2 = faker.company.catchPhrase();

        const randomDate = faker.date.past();

        tempData = tempData + `
                                "${UUIDv4.v4()}": 
                                {
                                    "date_made":"${randomDate}",

                                    "text_content": "${randName + ' ' +randName2}",
                                    
                                    "like": "10",
                                    "replies": []
                                   
                                }${counter < randNum-1 ? ",":""}       
        `

        counter++;

        // randNum = getRndInteger(0, 10)

    }

    
    // console.log(tempData);
    tempData += `}${i < numberUsers? ",":""}`;
}

data = data + tempData + '}';

// console.log(data)

// console.log(data);

fs.appendFile('testfake.json', data, function (err) {
    if (err) throw err;
    console.log('Updated!');
    });

