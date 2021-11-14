
// A progess indicator that is displayed as a single element
//  The element is filled a segment at a time

import React, {useState} from "react";

import "./ProgressBar.css";

// Needs to take a step property that will segment the bar and keep track of the current step

const ProgressBarSingle = ({ barHeight, barWidth, numberOfSteps, stepValue }) => {

    // const [stepValue, setStepValue] = useState(1)

    let currentProgress = (stepValue/numberOfSteps)*100;

    return (

        <div className="flexRowContainer single_bar" style={{width:barWidth + "vw", height:barHeight+"vh"}}>
            <div className="bar" style={{width: String(currentProgress) +"%"}}></div>
        </div>

    )

}

export default ProgressBarSingle;


