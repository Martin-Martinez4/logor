
import React, {useState, useEffect, FC } from "react";
import {useNavigate, Link} from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import useAuth from "../useAuth/useAuth";

import TestData from "../../tempStaticData/testData.json"

import Card from "../Card/Card";
import ProgressBarSingle from "../ProgressBar/ProgressBarSingle";

import Monkey1 from "../../assets/Monkey_1.svg";
import Monkey2 from "../../assets/Monkey_2.svg";
import Monkey3 from "../../assets/Monkey_3.svg";
import Monkey4 from "../../assets/Monkey_4.svg";

import test from "../../assets/ryunosuke-kikuno-RKwivgSTXVI-unsplashBig.jpg"

import "./Register.css";
import { userInfo } from "os";

const Register:FC = ({ loadUser }) => {
    
    const [user, setUser] = useState({

        id:"",
        username:"",
        joined_date:"",
        tag:"",
        profile_pic_url:Monkey1,
        description:"",
        header_img_url:"",
        location:"",
        links:"",

        name:"",
        email:"",
        password:"",
        password2:"",
        gender:"",
        other:""

    });

    const [{alt, src}, setImg] = useState({
        src: Monkey4,
        alt: 'Upload an Image'
    });

    const handleImg = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files === null){
            return
        }
        if(e.target.files[0]) {
            setImg({
                src: URL.createObjectURL(e.target.files[0]),
                alt: e.target.files[0].name
            });
        
            
            setUser(user => ({ ...user, profile_pic_url: e.target.files === null? Monkey1:URL.createObjectURL(e.target.files[0]) }))
        }   
}

    const oninputChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        if(e === null){
            return
        }

        setUser(prev => ({ ...prev, [e.target.name]: e.target.value }))

        e.preventDefault()
    }
    
    const onPickImage= (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {

        const { src } = e.currentTarget;


        setUser(user => ({ ...user, profile_pic_url:src }))

        e.preventDefault()
    }

    useEffect(() => {
        // console.log("user profileImage: " + user.profileImage); 
    }, [user.profile_pic_url]);
    

    const numberOfSteps:number = 3;
    const labelsArray:string[] = ["Login Information", "User Information", "Profile Picture"]
    

    const barWidth1:number = 80;
        
    const barWidth2:number = 35;

    const barHeight:number = 1.5;

    const [currentStep, setCurrentStepValue] = useState(1);

    const navigate = useNavigate();

    const navigateHome = () => {
        navigate('/');
        }
    
    const { login, logout } = useAuth();

    const navigateSuccess = (data) => {


        // create UUID for  user  id

        const newUserId = uuidv4();

        console.log("new uuid: ", newUserId);

        console.log("user.username: ",user.username);

        data["login"][newUserId] = {};
        data["users"][newUserId] = {};

        data["login"][newUserId]["username"] = user.username;
        data["users"][newUserId]["username"] = user.username;

        // data["login"]["password"] = data.password.toString();

        const userData = Object.assign({id: newUserId}, TestData["users"][newUserId], TestData["headers"][newUserId])

        console.log("userData", userData)

        // loadUser(userData)

        login().then(() => {

            navigate('/success');


        });



        // Create User
           /* Login: {
                "1":{
                    username,
                    password
                }
            }

            "users":{

                    "1":{

                        "username": "Monk1",
                        "tag": "@1Monk",
                        "profile_pic_url": "../../assets/Monkey_1.svg"
                    },
                }

            "headers":{

                    "1":{

                        "description": "First member of the site",
                        "header_img_url": "...",
                        "location": "New Ape City; The Great Cayon",
                        "links": "apes.apes",
                        "joined_date": "1/25/2015"
                    },
                }
            */


        // loadUser
            // attempt login

        // navigate('/success');
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
                    
                        <input type="text" placeholder="Enter Username" name="username" onChange={oninputChange} value={user.username} required />
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
                        <button onClick={navigateHome} type="button"className="button red" title="Click to cancel registration">Cancel</button>
                        <button onClick={() => setCurrentStepValue((currentStep + 1)) } type="button" className="button primary" title="Click to move to next Step"
                            >Next</button>
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
                        <button onClick={() => setCurrentStepValue((currentStep - 1)) } type="button" className="button red" title="Click to move back to step 1">Back</button>
                        <button onClick={() => setCurrentStepValue((currentStep + 1)) } type="button" className="button primary" title="Click to move to next step">Next</button>
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

                    <div className="flexColContainer">
                        <h4 className="inputName">Upload a picture or choose one from the circles below</h4>

                        <label className="uploadLabel">

                            <input 
                                type="file" 
                                placeholder="Choose a Profile Image"
                                accept=".png, .jpg, .jpeg" 
                                id="photo" 
                                className="file_input"
                                onChange={handleImg}
                            />
                        </label>
                    </div>

                    <div className="flexRowContainer profile_image_container">
                        <img onClick={ onPickImage } className="round profileImage" src={Monkey1} alt="Monkey" />
                        <img onClick={ onPickImage } className="round profileImage" src={Monkey2} alt="Monkey" />
                        <img onClick={ onPickImage } className="round profileImage" src={Monkey3} alt="Monkey" />
                        <img onClick={ onPickImage } className="round profileImage" src={Monkey4} alt="Monkey" />
                        <img onClick={ onPickImage } src={test} className="round profileImage" alt="Profile Preveiw" />
                       
                    </div>

                    <div className="flexColContainer">

                        <p>Preview</p>
                       

                        <div className="form__img-input-container">
                            <img src={user.profile_pic_url} alt={alt} className="round profileImage"/>
                        </div>

                    </div>

                    

                    <div className="flexRowContainer margin1">
                        <button onClick={() => setCurrentStepValue((currentStep - 1)) } type="button" className="button red" title="Click to move back to step 2">Back</button>
                        <a onClick={() => navigateSuccess(TestData)} className="button primary">Submit</a>
                    </div>
                    
                </div>

                
            </div>
        </div>
        :
        <div className="flexColContainer">
            <h2>I am error</h2>
            <h4><Link to="/">Go back</Link></h4>
        </div>
    }

        </Card>
    </form>

    )
    
}

export default Register;




