
import { useState } from "react"

import Loader1 from "../svg/Loader1/Loader1"

const LoaderHOC = ({ children, loading }) => {

    const [test, setTest ] = useState(false)

    if(loading){
        return (<Loader1></Loader1>)

    }
    else{

        return (
            [children]
        )

    }

}

export default LoaderHOC
