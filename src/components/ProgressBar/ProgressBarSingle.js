
// A progess indicator that is displayed as a single element
//  The element is filled a segment at a time

import React from "react";

import "./ProgressBar.css";

// Needs to take a step property that will segment the bar and keep track of the current step

// barWidth and barHeight are the bar's height and width, change theses props to cutomize the bar's dimensions
// numberOfSteps is the number of steps that are being tracked
// currentStep is the step that the component is currently on

/*

    example:
    const Register = () => {

        const numberOfSteps = 5;

        const [currentStep, setSurrentStepValue] = useState(1)

        return(

            <span className="progressBar registeration_progress">
                <div style={{display:"flex"}}>
                    <span>Progress</span>
                    <span>Progress</span>
                    <span>Progress</span>
                </div>
                <ProgressBarSingle barHeight={1.5} barWidth={25} numberOfSteps={numberOfSteps} currentStep={currentStep} />
          
            </span>

            <div>
                <button type="submit big button">Cancel</button>
                <button onClick={() => setSurrentStepValue((currentStep + 1))} type="submit big button">Next Step</button>
            </div>
        )
    }
    
*/

const ProgressBarSingle = ({ barHeight, barWidth, numberOfSteps, currentStep }) => {

    // Get precentage of steps completed
    let currentProgress = (currentStep/numberOfSteps)*100;

    return (
        <React.Fragment>

            <div className="flexRowContainer single_bar" style={{width:barWidth + "vw", height:barHeight+"vh"}}>
                <div className="bar" style={{width: String(currentProgress) +"%"}}></div>
            </div>
        </React.Fragment>

    )

}

export default ProgressBarSingle;


