
import MiniProfile from "../MiniProfile/MiniProfile"

 export const createMiniProfiles = (suggestedProfiles) => {

    let profilesArray = []

    // console.log("inside function: ",suggestedProfiles)

    for(let i = 0; i < suggestedProfiles?.length?suggestedProfiles.length:0; i++){

        // console.log("for loop ssuggestedProfiles[i][id]: ", suggestedProfiles[i]["id"])

        profilesArray.push( <MiniProfile user_id={suggestedProfiles[i]["id"]} ></MiniProfile>)

    }

    return profilesArray
}
