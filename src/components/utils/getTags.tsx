
const getTags = (text_string) => {

    if(text_string === null || text_string === undefined){
        text_string = "";
    }


    //eslint-disable-next-line
    const pattern = /(#)[a-zA-Z]{1}[\-a-zA-Z0-9]{1,14}/g;

    let match;

    let tempArray = [];


    let tempPrevIndex;

    while(match = pattern.exec(text_string)){

        // tempArray.push([text_string.substring(tempPrevIndex, match.index)])
        tempArray.push([text_string.substring(match.index, pattern.lastIndex)])

        tempPrevIndex = pattern.lastIndex;

    }

    
    return tempArray;
}

export default getTags;
