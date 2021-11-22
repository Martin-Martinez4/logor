
// A progess indicator that is displayed as a single element
//  The element is filled a segment at a time

import React, { useEffect } from "react";
import ProgressBarLabeling from "./ProgressBarLabeling";

import "./ProgressBar.css";

// Needs to take a step property that will segment the bar and keep track of the current step

// barWidth and barHeight are the bar's height and width, change theses props to cutomize the bar's dimensions
// numberOfSteps is the number of steps that are being tracked
// currentStep is the step that the component is currently on


const ProgressBarSingle = ({ barHeight, barWidth1, barWidth2, numberOfSteps, currentStep, labelsArray }) => {

    
    // Get precentage of steps completed
    let currentProgress = (currentStep/numberOfSteps)*100;

    const [mQuery, setMQuery] = React.useState({
        matches: window.innerWidth > 991.98 ? true : false,
      });
        useEffect(() => {
          let mediaQuery = window.matchMedia("(min-width: 991.98px)");
          mediaQuery.addListener(setMQuery);
          // this is the cleanup function to remove the listener
          return () => mediaQuery.removeListener(setMQuery);
        }, []);
    
    return (
        <React.Fragment>

            {mQuery && !mQuery.matches ? (
                <>
                    <ProgressBarLabeling barHeight={barHeight} barWidth={barWidth1} numberOfSteps={numberOfSteps} labelsArray={labelsArray} />
                    <div className="flexRowContainer single_bar" style={{width:barWidth1 + "vw", height:barHeight+"vh"}}>
                    <div className="bar" style={{width: String(currentProgress) +"%"}}></div>
                    </div>
                </>
          
                ):(
                    
                    <>
                        <ProgressBarLabeling barHeight={barHeight} barWidth={barWidth2} numberOfSteps={numberOfSteps} labelsArray={labelsArray} />
                        <div className="flexRowContainer single_bar" style={{width:barWidth2 + "vw", height:barHeight+"vh"}}>
                        <div className="bar" style={{width: String(currentProgress) +"%"}}></div>
                        </div>
                    </>
              
            )
                }
        </React.Fragment>

    )

}

export default ProgressBarSingle;


