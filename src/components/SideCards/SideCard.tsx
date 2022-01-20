
import React, { FC, PropsWithChildren } from "react";

import Card from "../Card/Card";
import ProfileIcon from "../../assets/ProfileIcon.svg";

type PropsSideCard = PropsWithChildren<{

    side: string

}>

const SideCard: FC<PropsSideCard> = ({ children, side }) => {

    return (

        <Card classes={side + " sideCard"} >
          
            {children}
        </Card>

    );


}

export default SideCard;
