
import React, {useState} from "react";
import {useNavigate} from 'react-router-dom';
import Card from "../Card/Card";
import ProgressBarSingle from "../ProgressBar/ProgressBarSingle";
import ProgressBarLabeling from "../ProgressBar/ProgressBarLabeling";

import "./Register.css";

const Register = () => {

    const numberOfSteps = 3;
    const labelsArray = ["Login Information", "User Information", "Profile Picture"]

    const barHeight = 1.5;
    const barWidth = 25;

    // const barLabelStyle = { width:String(barWidth/numberOfSteps)+"vw", display:"block" }

    const [currentStep, setSurrentStepValue] = useState(1);

    const navigate = useNavigate();

  const navigateHome = () => {
    navigate('/');
    }


    return (
        
    <form className="register flexColContainer">


        <Card cardStyle={{width:"40vw", height:"80vh"}}>
            <span className="progressBar registeration_progress">
                {/* Make into a Component later */}
                {/* <div style={{display:"flex", textAlign:"center"}}>
                    <p className="bar label" style={barLabelStyle}>Progress</p>
                    <p className="bar label" style={barLabelStyle}>Progress</p>
                    <p className="bar label" style={barLabelStyle}>Progress</p>
                </div> */}
                <ProgressBarLabeling barHeight={barHeight} barWidth={barWidth} numberOfSteps={numberOfSteps} labelsArray={labelsArray} />
                <ProgressBarSingle barHeight={barHeight} barWidth={barWidth} numberOfSteps={numberOfSteps} currentStep={currentStep} />
          
            </span>
        { currentStep == 1 
        ? 
        <div className="flexColContainer">
            <h3>Login Information</h3>

            <div className="inner">
                <div className="flexColContainer">

                    <label htmlFor="uname" className="upperleft">
                        <h4 className="inputName">Username</h4>
                    
                        <input type="text" placeholder="Enter Username" name="uname" required />
                    </label>

                    <label htmlFor="email" className="upperleft">
                        <h4 className="inputName">Email</h4>
                    
                        <input type="text" placeholder="Enter Email" name="email" required />
                    </label>

                    <label htmlFor="password" className="upperleft">
                        <h4 className="inputName">Password</h4>
                    
                        <input type="text" placeholder="Enter Password" name="password" required />
                    </label>
                    
                    <label htmlFor="password2" className="upperleft">
                        <h4 className="inputName">Confirm Password</h4>
                    
                        <input type="password2" placeholder="Confirm Password" name="password2" required />
                    </label>

                    <div className="flexRowContainer margin1">
                        <button  onClick={navigateHome} className="button red">Cancel</button>
                        <button onClick={() => setSurrentStepValue((currentStep + 1)) } className="button primary">Next Step</button>
                    </div>
                    
                </div>

                
            </div>
        </div>

        : currentStep == 2 
        ?
        <div className="flexColContainer">
            <h3>User Information</h3>

            <div className="inner">
                <div className="flexColContainer">

                    <label htmlFor="uname" className="upperleft">
                        <h4 className="inputName">Username</h4>
                    
                        <input type="text" placeholder="Enter Username" name="uname" required />
                    </label>

                    <label htmlFor="uname" className="upperleft">
                        <h4 className="inputName">Username</h4>
                    
                        <input type="text" placeholder="Enter Username" name="uname" required />
                    </label>

                    <label htmlFor="uname" className="upperleft">
                        <h4 className="inputName">Username</h4>
                    
                        <input type="text" placeholder="Enter Username" name="uname" required />
                    </label>
                    
                    <label htmlFor="psw" className="upperleft">
                        <h4 className="inputName">Password</h4>
                    
                        <input type="password" placeholder="Enter Password" name="psw" required />
                    </label>

                    <div className="flexRowContainer margin1">
                        <button  onClick={() => setSurrentStepValue((currentStep - 1)) } className="button red">Back</button>
                        <button onClick={() => setSurrentStepValue((currentStep + 1)) } className="button primary">Next Step</button>
                    </div>
                    
                </div>

                
            </div>
        </div>
        : currentStep == 3
        ?
        <div className="flexColContainer">
            <h3>Profile Picture</h3>

            <div className="inner">
                <div className="flexColContainer">

                    <label htmlFor="uname" className="upperleft">
                        <h4 className="inputName">Username</h4>
                    
                        <input type="text" placeholder="Enter Username" name="uname" required />
                    </label>

                    <label htmlFor="uname" className="upperleft">
                        <h4 className="inputName">Username</h4>
                    
                        <input type="text" placeholder="Enter Username" name="uname" required />
                    </label>

                    <label htmlFor="uname" className="upperleft">
                        <h4 className="inputName">Username</h4>
                    
                        <input type="text" placeholder="Enter Username" name="uname" required />
                    </label>
                    
                    <label htmlFor="psw" className="upperleft">
                        <h4 className="inputName">Password</h4>
                    
                        <input type="password" placeholder="Enter Password" name="psw" required />
                    </label>

                    <div className="flexRowContainer margin1">
                        <button  onClick={() => setSurrentStepValue((currentStep - 1)) } className="button red">Back</button>
                        <button onClick={() => setSurrentStepValue((currentStep + 1)) } className="button primary">Submit</button>
                    </div>
                    
                </div>

                
            </div>
        </div>
        :
        <div className="flexColContainer">
            <h2>I am error</h2>
            <h4><a href="">Go back</a></h4>
        </div>
    }

        </Card>
    </form>

    )
    
}

export default Register;




