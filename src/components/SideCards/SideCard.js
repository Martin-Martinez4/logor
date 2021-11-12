
import React from "react";

import Card from "../Card/Card";

const SideCard = ({ side }) => {

    return (

        <Card cardStyle={{width:"16vw", height:"664px"}} classes={side + " sideCard"} >
            Side Card
        </Card>

    );


}

export default SideCard;
