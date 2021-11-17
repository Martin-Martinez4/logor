
import React from "react";

import "./ProgressBarLabeling.css";

const ProgressBarLabeling = ({ numberOfSteps, barHeight, barWidth, labelsArray }) => {

    const barLabelStyle = { width:String(barWidth/numberOfSteps)+"vw", display:"block" }

        let labels = []
        let label = ""

        for(let i = 0; i < numberOfSteps; i++){


            if(i < labelsArray.length){

                label = labelsArray[i];
            }else{
                label = "";
            }
           
            labels.push(<p className="bar label" key={"label"+i} style={barLabelStyle}>{label}</p>);


        }


    return(
        <div style={{display:"flex", textAlign:"center"}}>
            {/* <p className="bar label" style={barLabelStyle}>Progress</p>
            <p className="bar label" style={barLabelStyle}>Progress</p>
            <p className="bar label" style={barLabelStyle}>Progress</p> */}

            {labels}

        </div>
    );

}

export default ProgressBarLabeling

