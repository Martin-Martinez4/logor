
import React from "react";
import Card from "../Card/Card";
import ProgressBarSingle from "../ProgressBar/ProgressBarSingle";

import "./Register.css";

const Register = () => {

    return (
        
    <form className="register flexColContainer">


        <Card cardStyle={{width:"40vw", height:"80vh"}}>
            <span className="progressBar registeration_progress">
                <div style={{display:"flex"}}>
                    <span>Progress</span>
                    <span>Progress</span>
                    <span>Progress</span>
                </div>
                <ProgressBarSingle barStyle={{height:"1.5vh", width:"25vw"}}/>
          
            </span>

        <div className="flexColContainer">
            <h3>Login Information</h3>

            <div className="inner">
                <div className="flexColContainer">

                    <label for="uname" className="upperleft">
                        <h4 className="inputName">Username</h4>
                    
                        <input type="text" placeholder="Enter Username" name="uname" required />
                    </label>

                    <label for="uname" className="upperleft">
                        <h4 className="inputName">Username</h4>
                    
                        <input type="text" placeholder="Enter Username" name="uname" required />
                    </label>

                    <label for="uname" className="upperleft">
                        <h4 className="inputName">Username</h4>
                    
                        <input type="text" placeholder="Enter Username" name="uname" required />
                    </label>
                    
                    <label for="psw" className="upperleft">
                        <h4 className="inputName">Password</h4>
                    
                        <input type="password" placeholder="Enter Password" name="psw" required />
                    </label>

                    <div>
                        {/* Need to add a on click that changes the progress bar and changes cancel to Back */}
                        <button type="submit big button">Cancel</button>
                        <button type="submit big button">Next Step</button>
                    </div>
                    
                </div>

                
            </div>
        </div>
        </Card>
    </form>

    )
    
}

export default Register;




