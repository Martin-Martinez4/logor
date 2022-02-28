
export const arrayFromObjProp = (objectName, prop) => {
    
    return objectName.map((object) => {

        return object[`${prop}`]

    })

}

