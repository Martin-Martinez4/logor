
import React, {useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom';
import Card from "../Card/Card";
import ProgressBarSingle from "../ProgressBar/ProgressBarSingle";

import Monkey1 from "../../assets/Monkey_1.svg";
import Monkey2 from "../../assets/Monkey_2.svg";
import Monkey3 from "../../assets/Monkey_3.svg";
import Monkey4 from "../../assets/Monkey_4.svg";

import test from "../../assets/ryunosuke-kikuno-RKwivgSTXVI-unsplashBig.jpg"

import "./Register.css";

const Register = () => {
    
    const [user, setUser] = useState({

        name:"",
        email:"",
        password:"",
        password2:"",
        description:"",
        location:"",
        gender:"",
        other:"",
        profileImage:Monkey1,

    });

    const [{alt, src}, setImg] = useState({
        src: Monkey4,
        alt: 'Upload an Image'
    });

    const handleImg = (e) => {
        if(e.target.files[0]) {
            setImg({
                src: URL.createObjectURL(e.target.files[0]),
                alt: e.target.files[0].name
            });
            
            setUser(user => ({ ...user, profileImage: URL.createObjectURL(e.target.files[0]) }))
        }   
    }

    const oninputChange = (e) => {

        setUser(prev => ({ ...prev, [e.target.name]: e.target.value }))

        e.preventDefault()
    }

    const onPickImage = (e) => {

        setUser(user => ({ ...user, profileImage: e.target.src }))

        e.preventDefault()
    }

    useEffect(() => {
        // console.log("user profileImage: " + user.profileImage); 
    }, [user.profileImage]);
    

    const numberOfSteps = 3;
    const labelsArray = ["Login Information", "User Information", "Profile Picture"]
    

    const barWidth1 = 80;
        
    const barWidth2 = 35;

    const barHeight = 1.5;

    const [currentStep, setSurrentStepValue] = useState(1);

    const navigate = useNavigate();

    const navigateHome = () => {
        navigate('/');
        }
    const navigateSuccess = () => {
        navigate('/success');
        }


    return (
        
    <form className="register flexColContainer" method="post">


        <Card classes={"register_card flexColContainer"}>
           
        { currentStep === 1 
        ? 
        <div className="flexColContainer">
            <div className="progressBar registeration_progress">
           

            <ProgressBarSingle barHeight={barHeight} barWidth1={barWidth1} barWidth2={barWidth2} numberOfSteps={numberOfSteps} currentStep={currentStep} labelsArray={labelsArray} />
                
            </div>
            <h3>Login Information</h3>

            <div className="inner">
                <div className="flexColContainer">

                    <label htmlFor="uname" className="upperleft">
                        <h4 className="inputName">Username</h4>
                    
                        <input type="text" placeholder="Enter Username" name="name" onChange={oninputChange} value={user.name} required />
                    </label>

                    <label htmlFor="email" className="upperleft">
                        <h4 className="inputName">Email</h4>
                    
                        <input type="text" placeholder="Enter Email" name="email" onChange={oninputChange} value={user.email} required />
                    </label>

                    <label htmlFor="password" className="upperleft">
                        <h4 className="inputName">Password</h4>
                    
                        <input type="text" placeholder="Enter Password" name="password" onChange={oninputChange} value={user.password} required />
                    </label>
                    
                    <label htmlFor="password2" className="upperleft">
                        <h4 className="inputName">Confirm Password</h4>
                    
                        <input type="password2" placeholder="Confirm Password" name="password2" onChange={oninputChange} value={user.password2} required />
                    </label>

                    <div className="flexRowContainer margin1">
                        <button onClick={navigateHome} className="button red">Cancel</button>
                        <a onClick={() => setSurrentStepValue((currentStep + 1)) } className="button primary">Next</a>
                    </div>
                    
                </div>

                
            </div>
        </div>

        : currentStep === 2 
        ?
        <div className="flexColContainer">
            <div className="progressBar registeration_progress">
                
            <ProgressBarSingle barHeight={barHeight} barWidth1={barWidth1} barWidth2={barWidth2} numberOfSteps={numberOfSteps} currentStep={currentStep} labelsArray={labelsArray} />
          
            </div>
            <h3>User Information</h3>

            <div className="inner">
                <div className="flexColContainer">

                    <label htmlFor="description" className="upperleft">
                        <h4 className="inputName">Description</h4>
                    
                        <input type="text" placeholder="Enter Description" name="description"  onChange={oninputChange} value={user.description} required />
                    </label>

                    <label htmlFor="location" className="upperleft">
                        <h4 className="inputName">Location</h4>
                    
                        <input type="text" placeholder="Enter Location" name="location" onChange={oninputChange} value={user.location} required />
                    </label>

                    <label htmlFor="gender" className="upperleft">
                        <h4 className="inputName">Gender</h4>
                    
                        <input type="text" placeholder="Enter Gender" name="gender" onChange={oninputChange} value={user.gender} required />
                    </label>
                    
                    <label htmlFor="other" className="upperleft">
                        <h4 className="inputName">Other</h4>
                    
                        <input type="text" placeholder="Enter Other" name="other" onChange={oninputChange} value={user.other} />
                    </label>

                    <div className="flexRowContainer margin1">
                        <a  onClick={() => setSurrentStepValue((currentStep - 1)) } className="button red">Back</a>
                        <a onClick={() => setSurrentStepValue((currentStep + 1)) } className="button primary">Next</a>
                    </div>
                    
                </div>

                
            </div>
        </div>
        : currentStep === 3
        ?
        <div className="flexColContainer">
            <div className="progressBar registeration_progress">
                
            <ProgressBarSingle barHeight={barHeight} barWidth1={barWidth1} barWidth2={barWidth2} numberOfSteps={numberOfSteps} currentStep={currentStep} labelsArray={labelsArray} />

            </div>
            <h3>Profile Picture</h3>

            <div className="inner">
                <div className="flexColContainer">

                    <div htmlFor="uname" className="flexColContainer">
                        <h4 className="inputName">Upload a picture or choose one from the circles below</h4>
                    
                        <input 
                            type="file" 
                            placeholder="Choose a Profile Image"
                            accept=".png, .jpg, .jpeg" 
                            id="photo" 
                            className="file_input"
                            onChange={handleImg}
                        />
                    </div>

                    <div className="flexRowContainer profile_image_container">
                        <img onClick={ onPickImage } className="round profileImage" src={Monkey1} alt="Monkey" />
                        <img onClick={ onPickImage } className="round profileImage" src={Monkey2} alt="Monkey" />
                        <img onClick={ onPickImage } className="round profileImage" src={Monkey3} alt="Monkey" />
                        <img onClick={ onPickImage } className="round profileImage" src={Monkey4} alt="Monkey" />
                        <img onClick={ onPickImage } src={test} className="round profileImage" />
                       
                    </div>

                    <div className="flexColContainer">

                        <p>Preview</p>
                       

                        <div className="form__img-input-container">
                            <img src={user.profileImage} alt={alt} className="round profileImage"/>
                        </div>

                    </div>

                    

                    <div className="flexRowContainer margin1">
                        <a onClick={() => setSurrentStepValue((currentStep - 1)) } className="button red">Back</a>
                        <button onClick={navigateSuccess} className="button primary">Submit</button>
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




