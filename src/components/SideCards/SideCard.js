
import React from "react";

import Card from "../Card/Card";

const SideCard = ({ side }) => {

    return (

        <Card classes={side + " sideCard"} >
            Side Card
        </Card>

    );


}

export default SideCard;
