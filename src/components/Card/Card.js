
import React from "react";
import "./Cards.css"

const Card = ({ children, cardStyle, classes="" }) => {

    // const { cardWidth, cardHeight } = props


    return (

        <div className={"card " + classes} style={cardStyle}>
            {/* {console.log(childern)} */}
                {children}

            {/* <p>Text</p> */}

        </div>
    );
}

export default Card;



