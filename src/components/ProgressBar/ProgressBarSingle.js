
// A progess indicator that is displayed as a single element
//  The element is filled a segment at a time

import React from "react";

import "./ProgressBar.css";

// Needs to take a step property that will segment the bar and keep track of the current step

const ProgressBarSingle = ({ barStyle }) => {

    return (

        <div className="flexColContainer single_bar" style={barStyle}>
            <div className="bar"></div>
        </div>

    )

}

export default ProgressBarSingle;


