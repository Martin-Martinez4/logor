
export const arrayFromObjProp = (objectName, prop) => {

    console.log("objectProp: ", objectName)
    
    return objectName.map((object) => {

        return object[`${prop}`]

    })

}

