
import React, { FC } from "react";

import Card from "../Card/Card";

type PropsSideCard = {

    side: string

}

const SideCard: FC<PropsSideCard> = ({ side }) => {

    return (

        <Card classes={side + " sideCard"} >
            Side Card
        </Card>

    );


}

export default SideCard;
