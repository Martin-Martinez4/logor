
const addLinkTags = (treatedArray) => {

    let linkTagsAdded = [];

    //eslint-disable-next-line
    const pattern = /(#|@)[a-zA-Z]{1}[\-a-zA-Z0-9]{1,14}|((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/g;
    
    for(let i = 0; i < treatedArray.length; i++){


        if(pattern.test(treatedArray[i][0])){

            if(treatedArray[i][0].startsWith("#")){

                linkTagsAdded.push(<a href={`/tags/name/${treatedArray[i][0].substring(1)}`}>{treatedArray[i]}</a>)
                
            }
            else if (treatedArray[i][0].startsWith("@")){
                
                console.log("hash: ", treatedArray[i][0]);
                linkTagsAdded.push(<a href={`/users/nickname/${treatedArray[i][0].substring(1)}`}>{treatedArray[i]}</a>)
            }
            else{

                console.log("link: ", treatedArray[i][0]);
                // need to check for https:// at the begining or else ad it 
                linkTagsAdded.push(<a target="_blank" href={`${treatedArray[i][0]}`}>{treatedArray[i]}</a>)
            }

            
        }
        else if(treatedArray[i][0][0] === undefined){

            linkTagsAdded.push(" ");
        }
        else{
            
            // console.log(pattern.test(treatedArray[i][0]))
            linkTagsAdded.push(<span>{treatedArray[i]}</span>);
        }
    }


    return linkTagsAdded;

}

export default addLinkTags;

