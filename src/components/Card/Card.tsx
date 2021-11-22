
import React,{ PropsWithChildren, FC  } from "react";
import "./Cards.css"

type Props = PropsWithChildren<{
    classes: string
  }>

const Card:FC <Props> = ({ children, classes="" }) => {

    return (

        <div className={"card " + classes} >
                {children}
        </div>
    );
}

export default Card;



