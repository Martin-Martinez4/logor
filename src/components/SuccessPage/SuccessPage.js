

import React from "react";
import {useNavigate} from 'react-router-dom';
import Card from "../Card/Card";
import checkMark from "../../assets/Round_Check.svg";

// import "./Register.css";

// Have to add redirect to home page of the user after acouple of seconds
const SuccessPage = () => {

    const registerSuccess = true;

    const navigate = useNavigate();

  const navigateHome = () => {
    navigate('/');
    }


    return (
        
    <form className="register flexColContainer">


        <Card cardStyle={{width:"50vw", height:"96vh"}}>
           
        { registerSuccess === true 
        ? 
        <div className="flexColContainer">
            <h1>Success</h1>
           <img style={{marginTop:"10vh"}} src={checkMark} alt="Round checkmark" />
        </div>
         :
         <div className="flexColContainer">
             <h2>I am error</h2>
             <h4><a href="#">Go back</a></h4>
         </div>
    }

        </Card>
    </form>

    )
    
}

export default SuccessPage;






