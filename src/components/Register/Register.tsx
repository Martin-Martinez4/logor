
import React, {useState, useEffect, FC } from "react";
import {useNavigate, Link} from 'react-router-dom';

import useAuth from "../useAuth/useAuth";
import createNewUser from "../createNewUser/createNewUser";

import TestData from "../../tempStaticData/testData.json"

import Card from "../Card/Card";
import ProgressBarSingle from "../ProgressBar/ProgressBarSingle";

import Monkey1 from "../../assets/Monkey_1.svg";
import Monkey2 from "../../assets/Monkey_2.svg";
import Monkey3 from "../../assets/Monkey_3.svg";
import Monkey4 from "../../assets/Monkey_4.svg";

import background1 from "../../assets/ryunosuke-kikuno-RKwivgSTXVI-unsplash__mobile2.jpg"

import test from "../../assets/ryunosuke-kikuno-RKwivgSTXVI-unsplashBig.jpg"

import "./Register.css";
// import { userInfo } from "os";

const Register:FC = ({ loadUser }) => {
    
    const [user, setUser] = useState({

        id:"",
        username:"",
        joined_date:"",
        nickname:"",
        profile_pic_url:Monkey1,
        description:"",
        header_img_url:background1,
        location:"",
        links:"",

        name:"",
        email:"",
        password:"",
        password2:"",
        gender:"",
        other:""

    });

      // eslint-disable-next-line 
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

            const targetName = e.target.name;

            console.log(targetName)
        
            
            setUser(user => ({ ...user, [targetName]: e.target.files === null? Monkey1:URL.createObjectURL(e.target.files[0]) }))
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

        const el = e.target as HTMLInputElement

        const { src } = e.currentTarget;

        const pictureType = el.getAttribute("pic-type")

        console.log(pictureType)


        setUser(user => ({ ...user, [pictureType]:src }))

        e.preventDefault()
    }

    // Helps stop unnecessary rerenders
    useEffect(() => {

    }, [user.profile_pic_url, user.joined_date]);

    useEffect(() => {

    }, [user.header_img_url]);
    
    
    

    const numberOfSteps:number = 4;
    const labelsArray:string[] = ["Login Information", "User Information", "Profile Picture", "Background Pricture"]
    

    const barWidth1:number = 80;
        
    const barWidth2:number = 35;

    const barHeight:number = 1.5;

    const [currentStep, setCurrentStepValue] = useState(1);

    const navigate = useNavigate();

    const navigateHome = () => {
        navigate('/');
        }
    
    // eslint-disable-next-line
    const { login, logout } = useAuth();

    const onAttemptRegister = (data, e) => {

        e.preventDefault();

        const { username, nickname, profile_pic_url, description, header_img_url, location, links, password, password2} = user

        if(password === password2){

            fetch('http://localhost:3001/register', {
    
                method: "post",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({
                    username: username, 
                    nickname: nickname, 
                    profile_pic_url: profile_pic_url, 
                    description: description, 
                    header_img_url: header_img_url, 
                    location: location, 
                    links: links, 
                    password: password, 
                    password2: password2
                })
    
            })
            .then((response) => response.json())
            .then((user) => {
    
                console.log("response", user)
    
                if(user.id){
    
                    login().then(() => {
                            
                        loadUser(user);
                        navigate(`/home/${user.id}`);
                    }).catch( (err) => {
    
                        console.log("fail")
                        logout().then(() => {
                            navigate("/");
                        })
    
                    })
    
                }
                else{
    
                    console.log("error");
                }
    
            }).catch((err)=> console.log(err))
        }else{

            console.log("validation Error");
        }



        // const userData = createNewUser(user, data);

        // loadUser(userData)

        // login().then(() => {

        //     navigate('/success');


        // }).catch(err => {
        //     console.log("something went wrong")
        // });

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

                    <label htmlFor="nickname" className="upperleft">
                        <h4 className="inputName">nickname</h4>
                    
                        <input type="text" placeholder="Enter nickname" name="nickname" onChange={oninputChange} value={user.nickname} required />
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

                    <label htmlFor="links" className="upperleft">
                        <h4 className="inputName">Links</h4>
                    
                        <input type="links" placeholder="Enter Links" name="links" onChange={oninputChange} value={user.links} required />
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
                                name="profile_pic_url"
                                className="file_input"
                                onChange={handleImg}
                            />
                        </label>
                    </div>

                    <div className="flexRowContainer profile_image_container">
                        <img onClick={ onPickImage } className="round profileImage" pic-type="profile_pic_url" src={Monkey1} alt="Monkey" />
                        <img onClick={ onPickImage } className="round profileImage" pic-type="profile_pic_url" src={"../../users/default/Monkey_2.svg"} alt="Monkey"  />
                        <img onClick={ onPickImage } className="round profileImage" pic-type="profile_pic_url" src={Monkey3} alt="Monkey" />
                        <img onClick={ onPickImage } className="round profileImage" pic-type="profile_pic_url" src={Monkey4} alt="Monkey" />
                        <img onClick={ onPickImage } src={test} className="round profileImage" pic-type="profile_pic_url" alt="Profile Preveiw" />
                       
                    </div>

                    <div className="flexColContainer">

                        <p>Preview</p>
                       

                        <div className="form__img-input-container">
                            <img src={user.profile_pic_url} alt={alt} className="round profileImage"/>
                        </div>

                    </div>

                    

                    <div className="flexRowContainer margin1">
                        <button onClick={() => setCurrentStepValue((currentStep - 1)) } type="button" className="button red" title="Click to move back to step 2">Back</button>
                        <button onClick={() => { 
                            setCurrentStepValue((currentStep + 1)) 
                        }} type="button" className="button primary" title="Click to move to next Step"
                            >Next</button>
                    </div>
                    
                </div>

                
            </div>
        </div>
        : currentStep === 4
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
                                name="header_img_url"
                                className="file_input"
                                onChange={handleImg}
                            />
                        </label>
                    </div>

                    <div className="flexRowContainer profile_image_container">
                        <img onClick={ onPickImage } className="round profileImage" pic-type="header_img_url" src={Monkey1} alt="Monkey" />
                        <img onClick={ onPickImage } className="round profileImage" pic-type="header_img_url" src={"../../users/default/Monkey_2.svg"} alt="Monkey" />
                        <img onClick={ onPickImage } className="round profileImage" pic-type="header_img_url" src={Monkey3} alt="Monkey" />
                        <img onClick={ onPickImage } className="round profileImage" pic-type="header_img_url" src={Monkey4} alt="Monkey" />
                        <img onClick={ onPickImage } src={test} className="round profileImage"pic-type="header_img_url" alt="Profile Preveiw" />
                    
                    </div>

                    <div className="flexColContainer">

                        <p>Preview</p>
                    

                        <div className="form__img-input-container">
                            <img src={user.header_img_url} alt={alt} className="round profileImage"/>
                        </div>

                    </div>

                    

                    <div className="flexRowContainer margin1">
                        <button onClick={() => setCurrentStepValue((currentStep - 1)) } type="button" className="button red" title="Click to move back to step 2">Back</button>
                        <button onClick={(e) => onAttemptRegister(TestData, e)} className="button primary" type="button">Submit</button>
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




