
import React, {useState, useEffect, useContext, FC } from "react";
import {useNavigate, Link} from 'react-router-dom';

import useSigninModal from "../hooks/useModal";

import { serverAddressString } from "../utils/exportGetImage";

import useAuth from "../hooks/useAuth";
// import useUserInfo from "../hooks/useUserInfo";
import UserInfoContext from "../context/UserInfoProvider";

import Card from "../Card/Card";
import ProgressBarSingle from "../ProgressBar/ProgressBarSingle";


import "./Register.css";
// import { userInfo } from "os";

const Register:FC = () => {

    // const Monkey1 = "../../users/default/Monkey_1.svg";
    const Monkey1 = `${serverAddressString}/profiles/Monkey_1.svg`;
    const Monkey2 = "../../users/default/Monkey_2.svg";
    const Monkey3 = "../../users/default/Monkey_3.svg";
    const Monkey4 = "../../users/default/Monkey_4.svg";
    const header1 = "../../users/default/ryunosuke-kikuno-RKwivgSTXVI-unsplash.jpg";

    const { showModal, toggleModal } = useSigninModal();

    const { loadUser } = useContext( UserInfoContext);

    // const { loadUser } = useUserInfo();

    const { setAuth } = useAuth();

    const navigate = useNavigate();
    
    const [user, setUser] = useState({

        id:"",
        username:"",
        joined_date:"",
        nickname:"",
        profile_pic_url: "",
        description:"",
        header_img_url: "",
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

    const [previewBlobs, setPreviewBlobs] = useState({

    })

    const handleImg = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()

        console.log(e.target.files)
        if(e.target.files === null){
            return
        }
        if(e.target.files[0]) {
            const file = e?.target.files[0]
            console.log("file: ", URL.createObjectURL(file))

            const fileName = e?.target?.files[0].name? e?.target?.files[0].name : ""

            const targetName = e?.target?.name;
            
            setPreviewBlobs(prev => ({ ...prev, [targetName]:{
                src: URL.createObjectURL(file),
                alt: fileName
            }}));


            console.log(targetName)
            
            console.log(file.type)
            
            setUser(user => ({ ...user, [targetName]: e.target.files === null? Monkey1:file }))
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



        console.log("pickimage: ",typeof src)
        // console.log("pickimage: ",fileToDataUri(src))

        setPreviewBlobs(prev => ({ ...prev, [pictureType]:{
            src: src,
            alt: src
        }}));


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


    const navigateHome = () => {
        navigate('/');
        }
    
    // eslint-disable-next-line
    // const { login, logout } = useAuth();

    const onAttemptRegister = async (user, e) => {

        e.preventDefault();

        const { username, nickname, profile_pic_url, description, header_img_url, location, links, password, password2} = user

      
        if(password === password2){

            const testid = await fetch('http://localhost:3001/register', {
    
                method: "post",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({
                    username: username, 
                    nickname: '@'+nickname, 
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
    
                // console.log("response", user)
    
                if(user.id){


                    return user.id
    
                }
                else{
    
                    console.log("error");
                }
    
            }).catch((err)=> console.log(err))

            await fetch('http://localhost:3001/signin2', {

                method: "post",
                credentials:'include',
                cache:'no-cache',
                headers: {
                    
                    'Content-Type': 'application/json',
                  },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            })
            .then((response) => response.json())
            .then((user) => {
                
    
                console.log(user)
    
                // console.log(user.access_token)
                if(user.access_token){
    
    
                    // token stuff
    
                    setAuth(() => {
    
                        return { user_id: user.user_id, access_token:user.access_token }
                    });

                    return user.user_id
    
                       
                }
                else{
    
                    console.log("login Error");
                }
    
            }).catch((err)=> console.log(err))

            // console.log("user.id: ",user.id)
    
            // const formDataProfile = new FormData()
            // const formDataHeader = new FormData()

            console.log("typeof test: ",typeof profile_pic_url)

            console.log("user_id: ", testid)
            if(typeof profile_pic_url === "string"){

                console.log("inside string: ",profile_pic_url)

                // formData.append('image', header_img_url)
                // formDataProfile.append('profile_pic_url', profile_pic_url)
    
                // // formData.append('header_img_url', header_img_url)
                // formDataProfile.append('user_id', user.id)


                await fetch(`http://localhost:3001/profile/update/default/`, {
         
                    method: "post",
                    credentials:'include',
                    cache:'no-cache',
                    headers: {
                    
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        
                        profile_pic_url: profile_pic_url,
                    
                        })
                 })
                 .then(res => res.json())
                 .then(resonse => {
         
                     // setUploadStatus(res.msg)
                     
                    return resonse

                 })
                 .catch( err => console.error(err))
            }
            else if(typeof profile_pic_url === "object"){

                const formDataProfile = new FormData()

                formDataProfile.append('image', profile_pic_url)

                console.log(typeof profile_pic_url)

                await fetch(`http://localhost:3001/profile/update/`, {
         
                    method: "post",
                    credentials:'include',
                    cache:'no-cache',
                    // headers: {
                    
                    //     'Content-Type': 'form-data',
                    // },
                    body: formDataProfile
                })
                 .then(res => res.json())
                 .then(resonse => {
         
                    // setUploadStatus(res.msg)
                    
                   return resonse

                })
                 .catch( err => console.error(err))
            }
    
            if(typeof header_img_url === "string"){

                console.log("inside string: ",header_img_url)

                // formData.append('image', header_img_url)
                // formDataProfile.append('profile_pic_url', profile_pic_url)
    
                // // formData.append('header_img_url', header_img_url)
                // formDataProfile.append('user_id', user.id)


                await fetch(`http://localhost:3001/header/update/default/`, {
         
                    method: "post",
                    credentials:'include',
                    cache:'no-cache',
                    headers: {
                    
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        
                        header_img_url: header_img_url,
                    
                    })
                 })
                 .then(res => res.json())
                 .then(resonse => {
         
                    // setUploadStatus(res.msg)
                    
                   return resonse

                })
                 .catch( err => console.error(err))
            }
            else if(typeof header_img_url === "object"){

                const formDataHeader = new FormData()

                formDataHeader.append('image', header_img_url)

                console.log("header_img_url")
                console.log(typeof header_img_url)
                console.log(header_img_url)
                console.log("formdataheader:  ", ...formDataHeader)

                await fetch(`http://localhost:3001/header/update/`, {
         
                    method: "post",
                    credentials:'include',
                    // cache:'no-cache',
                    // headers: {
                    
                    //     'Content-Type': 'form-data',
                    // },
                    body: formDataHeader,
                })
                 .then(res => res.json())
                 .then(resonse => {
         
                    // setUploadStatus(res.msg)
                    
                   return resonse

                })
                 .catch( err => console.error(err))
            }
    

            console.log("gets to login call")
            await fetch(`http://localhost:3001/loggedin/user/info/`, {
    
                method: "get",
                credentials:'include',
                cache:'no-cache',
                headers: {
                    
                    'Content-Type': 'application/json',
                    },
            })
            .then(res => res.json())
            .then(user => {
                console.log("user:",user[0])

                try{

                    loadUser(user[0]) 
                    
                    // const from = location.state?.from?.pathname || `/home/${user[0].id}`;

                    // console.log(showModal)

                    if(showModal){

                        toggleModal();
                    }
                    
                    navigate(`/home/${user[0].id}`)
                    
                }
                catch(err){

                    console.error(err)
                }
            
            })


        }else{

            console.log("validation Error");
        }

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
                                // value={user.profile_pic_url}
                                className="file_input"
                                onChange={handleImg}
                            />
                        </label>
                    </div>

                    <div className="flexRowContainer profile_image_container">
                        <img onClick={ onPickImage } className="round profileImage" pic-type="profile_pic_url" src={Monkey1} alt="Monkey" />
                        <img onClick={ onPickImage } className="round profileImage" pic-type="profile_pic_url" src={Monkey2} alt="Monkey"  />
                        <img onClick={ onPickImage } className="round profileImage" pic-type="profile_pic_url" src={Monkey3} alt="Monkey" />
                        <img onClick={ onPickImage } className="round profileImage" pic-type="profile_pic_url" src={Monkey4} alt="Monkey" />
                        <img onClick={ onPickImage } src={header1} className="round profileImage" pic-type="profile_pic_url" alt="Profile Preveiw" />
                       
                    </div>

                    <div className="flexColContainer">

                        <p>Preview</p>
                       

                        <div className="form__img-input-container">
                            <img src={previewBlobs?.profile_pic_url?.src? previewBlobs.profile_pic_url.src: ""} alt={alt} className="round profileImage"/>
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
            <h3>Header Picture</h3>
            <div></div>

            <div className="inner">
                <div className="flexColContainer">

                    <div className="flexColContainer">
                        <h4 className="inputName">Upload a picture or choose one from the circles below</h4>

                        <label className="uploadLabel">

                            <input 
                                type="file" 
                                placeholder="Choose a header Image"
                                accept=".png, .jpg, .jpeg" 
                                id="header" 
                                name="header_img_url"
                                // value={user.header_img_url}
                                className="file_input"
                                onChange={handleImg}
                            />
                        </label>
                    </div>

                    <div className="flexRowContainer profile_image_container">
                        <img onClick={ onPickImage } className="round profileImage" pic-type="header_img_url" src={Monkey1} alt="Monkey" />
                        <img onClick={ onPickImage } className="round profileImage" pic-type="header_img_url" src={Monkey2} alt="Monkey" />
                        <img onClick={ onPickImage } className="round profileImage" pic-type="header_img_url" src={Monkey3} alt="Monkey" />
                        <img onClick={ onPickImage } className="round profileImage" pic-type="header_img_url" src={Monkey4} alt="Monkey" />
                        <img onClick={ onPickImage } src={header1} className="round profileImage"pic-type="header_img_url" alt="Profile Preveiw" />
                    
                    </div>

                    <div className="flexColContainer">

                        <p>Preview</p>
                    

                        <div className="form__img-input-container">
                            <img src={previewBlobs?.header_img_url?.src? previewBlobs.header_img_url.src: ""} alt={alt} className="round profileImage"/>
                        </div>

                    </div>

                    

                    <div className="flexRowContainer margin1">
                        <button onClick={() => setCurrentStepValue((currentStep - 1)) } type="button" className="button red" title="Click to move back to step 2">Back</button>
                        <button onClick={(e) => onAttemptRegister(user, e)} className="button primary" type="button">Submit</button>
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




