
import React from "react";

import Card from "../Card/Card";

const SideCard = ({ side }) => {

    return (

        <Card cardStyle={{width:"15vw", height:"84vh"}} classes={side + " sideCard"} >
            Side Card
        </Card>

    );


}

export default SideCard;
