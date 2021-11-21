
import React from "react";
import "./Cards.css"

const Card = ({ children, classes="" }) => {

    return (

        <div className={"card " + classes} >
            {/* {console.log(childern)} */}
                {children}

            {/* <p>Text</p> */}

        </div>
    );
}

export default Card;



