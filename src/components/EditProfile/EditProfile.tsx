
import React, { useContext, useState } from "react";
import UserInfoContext from "../context/UserInfoProvider";
import { serverAddressString } from "../utils/exportGetImage"; 

import Card from "../Card/Card";

import LeftsideCard from "../LeftsideCard/LeftsideCard";
import SideCard from "../SideCards/SideCard";

import LocationIcon from "../../assets/LocationIcon.svg"
import LinkIcon from "../../assets/LinkIcon.svg"

import { validateEmail, validatePassword, validateUsername } from "../utils/validation";
import { checkIfUsernameExists, checkIfNicknameExists } from "../utils/fetchDoesUsernameNicknameExist";

import Scroll from "../Scroll/Scroll";


const EditProfile = () => {

    const header1 = "../../users/default/unsplash_GBEHjsPQbEQ.jpg";
    const header2 = "../../users/default/ganapathy-kumar-L75D18aVal8-unsplash.jpg";
    const header3 = "../../users/default/tj-holowaychuk-iGrsa9rL11o-unsplash.jpg";
    const header4 = "../../users/default/tobias-keller-73F4pKoUkM0-unsplash.jpg";
    const header5 = "../../users/default/wengang-zhai-fa3mwqbW1XQ-unsplash.jpg";

    const Monkey1 = `${serverAddressString}/profiles/Monkey_1.svg`;
    const Monkey2 = "../../users/default/Monkey_2.svg";
    const Monkey3 = "../../users/default/Monkey_3.svg";
    const Monkey4 = "../../users/default/Monkey_4.svg";

    const usernameErrorMessage = "Username must be at least 4 cahracters long and only contain letters numbers and -._"
    const usernameAvailabe = "Username has been taken"
    const nicknameErrorMessage = "Nickname must be at least 4 cahracters long and only contain letters numbers and -._"
    const nicknameAvailable = "Nickname has been taken"
    const passwordErrorMessage = "Password be at least 8 characters and must include at least one: lowercase letter, uppercase letter,number, and special character(@#$%^&+=)"
    const password2ErrorMessafe = "Passwords must match"
    const emailErrorMessage = "Please input a valid email address"

    const genericErrorMessage = "Please fix issues to continue"
    
    const [usernameValid, setUsernameValid] = useState();
    const [nicknameValid, setNicknameValid] = useState();
    const [emailValid, setEmailValid] = useState();
    const [passwordValid, setPasswordValid] = useState();
    const [password2Valid, setPassword2Valid] = useState();
    const [topValid, setTopVaild] = useState();

    const { loggedInUser } = useContext(UserInfoContext);

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


    // const [editUsername, setEditUsername] = useState(false)
    // const [editNickname, setEditNickname] = useState(false)
    // const [editDescription, setEditDescription] = useState(false)
    // const [editLocation, setEditLocation] = useState(false)
    // const [editLinks, setEditLinks] = useState(false)

    const[editState, setEditState] = useState({

        editHeader: false,
        editProfile: false,
        editUsername: false,
        editNickname: false,
        editDescription: false,
        editLocation: false,
        editLinks: false
    })

    const [previewBlobs, setPreviewBlobs] = useState({})

    const oninputChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        e.preventDefault()

        if(e === null){
            return
        }
        
        setUser(prev => ({ ...prev, [e.target.name]: e.target.value }))

    }


    const handleImg = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()

        if(e.target.files === null){
            return
        }
        if(e.target.files[0]) {
            const file = e?.target.files[0]

            const fileName = e?.target?.files[0].name? e?.target?.files[0].name : ""

            const targetName = e?.target?.name;
            
            setPreviewBlobs(prev => ({ ...prev, [targetName]:{
                src: URL.createObjectURL(file),
                alt: fileName
            }}));

            
            setUser(user => ({ ...user, [targetName]: e.target.files === null? Monkey1:file }))
        }   
    }

    const onPickImage= (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {

        const el = e.target as HTMLInputElement

        const { src } = e.currentTarget;

        const pictureType = el.getAttribute("pic-type")

        setPreviewBlobs(prev => ({ ...prev, [pictureType]:{
            src: src,
            alt: src
        }}));


        setUser(user => ({ ...user, [pictureType]:src }))

        e.preventDefault()
    }

    const validateOnBlur = async (e, validateFunciton, setFunction, errorMessage, checkIfAvailable=false, ifAvailableFunction=returnFalse) => {

        e?.preventDefault()

        if(!validateFunciton(e.target.value) && e.target.value.length > 0){

            setFunction(errorMessage)
            return
        }
        else{

            if(checkIfAvailable){

                const alreadyTaken = await ifAvailableFunction(e.target.value)


                if(alreadyTaken){

                    setFunction(`${e.target.name} already taken`)
                }
                else{
                    
                    setFunction()
                }


                return
            }

            setFunction()


            return
        }

    }

    const validateInput = (e, validateFunciton, setFunction, errorMessage) => {

        e?.preventDefault()
        

        if(!validateFunciton(e.target.value) && e.target?.value?.length >= 4){

            setFunction(errorMessage)
        }
        else{

            setFunction()

        }


        oninputChange(e)

    }

    const toggleEditMode = (stateName, stateValue, setStateFunction) => {

        console.log(stateValue)

        setStateFunction(prev => ({...prev, [stateName]:!stateValue}))


    }

    const {editHeader, editProfile, editUsername, editNickname, editDescription, editLocation, editLinks} = editState



    return(

        <div className="contentArea">


         <SideCard side="leftSide">

            <LeftsideCard></LeftsideCard>
        </SideCard>
         <Card>
            <h3>Click to edit</h3>
            <Scroll>

            {editHeader
                ? 
                <>
                    <div></div>

                    <div>
                        <div className="flexColContainer">
                            <h3>Header Image</h3>

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
                                <img onClick={ onPickImage } className="round profileImage" pic-type="header_img_url" src={header1} alt="header" />
                                <img onClick={ onPickImage } className="round profileImage" pic-type="header_img_url" src={header2} alt="header" />
                                <img onClick={ onPickImage } className="round profileImage" pic-type="header_img_url" src={header3} alt="header" />
                                <img onClick={ onPickImage } className="round profileImage" pic-type="header_img_url" src={header4} alt="header" />
                                <img onClick={ onPickImage } className="round profileImage" pic-type="header_img_url" src={header5} alt="header Preveiw" />
                            
                            </div>

                            <div className="flexColContainer">

                                <p>Preview</p>
                            

                                <div className="form__img-input-container">
                                    <img src={previewBlobs?.header_img_url?.src? previewBlobs.header_img_url.src: ""} alt={alt} className="round profileImage"/>
                                </div>

                            </div>

                            <div className="flexRowContainer margin1">

                                <button onClick={() => toggleEditMode("editHeader",editHeader, setEditState)} type="button"className="button red" title="Click to cancel Header Image change">Cancel</button>
                                <button onClick={() =>  toggleEditMode("editHeader", editHeader, setEditState)} type="button" className="button primary" title="Confirm New Header Image">Confirm</button>
                            </div>
                        </div>



                        
                    </div>
                
                </>
                : 
                <div onClick={() => toggleEditMode("editHeader",editHeader, setEditState)} className="profile_header_background pointer onHover_border--Primary" style={{
                    backgroundImage: `url(${serverAddressString}${loggedInUser["header_img_url"]})`,
                    backgroundRepeat:" no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                }} >

                </div>
            }

            {editProfile
            
                ?
                <>

                    <div>
                        <div className="flexColContainer">
        
                            <h3>Profile Picture</h3>
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

                                <button onClick={() => toggleEditMode("editProfile",editProfile, setEditState)} type="button"className="button red" title="Click to cancel Profile Image change">Cancel</button>
                                <button onClick={() => toggleEditMode("editProfile",editProfile, setEditState)} type="button" className="button primary" title="Confirm New Profile Image">Confirm</button>
                            </div>
        
                            
                            
                        </div>
        
                        
                    </div>
                </>
                :
                <img src={ `${serverAddressString}${loggedInUser["profile_pic_url"]}`}  onClick={() => toggleEditMode("editProfile",editProfile, setEditState)} alt="profile" className="profile_header_image pointer onHover_border--Primary" style={{marginTop:"1rem"}}></img>
            }

            <div className="profile_header_container">

                {editUsername
                ?
                <div className="flexColContainer">

                    <h3>Username</h3>

                    <label htmlFor="uname" className="upperleft">
                        <h4 className="inputName">Username</h4>
        
                        <input type="text" placeholder="Enter Username" name="username" 
                            onChange={(e) => validateInput(e, validateUsername, setUsernameValid, usernameErrorMessage)} 
                            onBlur={(e) =>  validateOnBlur(e, validateUsername, setUsernameValid, usernameErrorMessage, true, checkIfUsernameExists)}
                            value={user.username} 
                            required />
                    </label>
                    <br/><span className="form_warning">{usernameValid}</span>
                    <div className="flexRowContainer margin1">

                        <button onClick={() => toggleEditMode("editUsername", editUsername, setEditState)} type="button"className="button red" title="Click to cancel usernaem change">Cancel</button>
                        <button onClick={() =>  toggleEditMode("editUsername", editUsername, setEditState)} type="button" className="button primary" title="Confirm New username">Confirm</button>
                    </div>

                </div>
                :
                <h3 className="profile_name pointer onHover_border--Primary" onClick={() => toggleEditMode("editUsername", editUsername, setEditState)}>{loggedInUser["username"]}</h3>
                }

                {editNickname
                ?
                    <div className="flexColContainer">

                        <h3>Nickname</h3>


                        <label htmlFor="nickname" className="upperleft">
                            <h4 className="inputName">nickname</h4>
                        
                            <span>@</span><input type="text" placeholder="Enter nickname" name="nickname" 
                            onChange={(e) => validateInput(e, validateUsername, setNicknameValid, nicknameErrorMessage)} 
                            onBlur={(e) =>  validateOnBlur(e, validateUsername, setNicknameValid, nicknameErrorMessage, true, checkIfNicknameExists)}
                            value={user.nickname} 
                            required />
                        </label>
                        <br/><span className="form_warning">{nicknameValid}</span>
                        <div className="flexRowContainer margin1">

                            <button onClick={() => toggleEditMode("editNickname", editNickname, setEditState)} type="button"className="button red" title="Click to cancel usernaem change">Cancel</button>
                            <button onClick={() =>  toggleEditMode("editNickname", editNickname, setEditState)} type="button" className="button primary" title="Confirm New username">Confirm</button>
                        </div>
                    </div>
                :
                <h4 className="profile_tag pointer onHover_border--Primary" onClick={() => toggleEditMode("editNickname", editNickname, setEditState)}><em>{loggedInUser["nickname"]}</em></h4>

                }

                
                {
                    editDescription
                    ?
                    <div className="flexColContainer">
                        
                        <h3>Description</h3>


                        <label htmlFor="description" className="upperleft">
                            <h4 className="inputName">Description</h4>
                        
                            <input type="text" placeholder="Enter Description" name="description"  onChange={oninputChange} value={user.description} required />
                        </label>
                        <div className="flexRowContainer margin1">

                            <button onClick={() => toggleEditMode("editDescription", editDescription, setEditState)} type="button"className="button red" title="Click to cancel usernaem change">Cancel</button>
                            <button onClick={() =>  toggleEditMode("editDescription", editDescription, setEditState)} type="button" className="button primary" title="Confirm New username">Confirm</button>
                        </div>
                    </div>
                    :
                    <p className="profile_description pointer onHover_border--Primary"  onClick={() => toggleEditMode("editDescription", editDescription, setEditState)}>{loggedInUser["description"]}</p>

                }

                <div className="profile_other">

                    {
                        editLocation
                        ?
                        <div className="flexColContainer">
                        
                            <h3>Location</h3>
                            <label htmlFor="location" className="upperleft">
                                <h4 className="inputName">Location</h4>
                            
                                <input type="text" placeholder="Enter Location" name="location" onChange={oninputChange} value={user.location} required />
                            </label>
                            <div className="flexRowContainer margin1">

                                <button onClick={() => toggleEditMode("editLocation", editLocation, setEditState)} type="button"className="button red" title="Click to cancel usernaem change">Cancel</button>
                                <button onClick={() =>  toggleEditMode("editLocation", editLocation, setEditState)} type="button" className="button primary" title="Confirm New username">Confirm</button>
                            </div>
                        </div>

                  
                        :
                        <p className="pointer onHover_border--Primary" onClick={() => toggleEditMode("editLocation", editLocation, setEditState)}><img src={LocationIcon} alt="profile" className="profile_icon location_icon"></img> <em>{loggedInUser["location"]}</em></p>
                    }

                    {
                        editLinks
                        ?
                        <div className="flexColContainer">
                        
                            <h3>Links</h3>

                            <label htmlFor="links" className="upperleft">
                                <h4 className="inputName">Links</h4>
                            
                                <input type="links" placeholder="Enter Links" name="links" onChange={oninputChange} value={user.links} required />
                            </label>
                            <div className="flexRowContainer margin1">

                                <button onClick={() => toggleEditMode("editLinks", editLinks, setEditState)} type="button"className="button red" title="Click to cancel usernaem change">Cancel</button>
                                <button onClick={() => toggleEditMode("editLinks", editLinks, setEditState)} type="button" className="button primary" title="Confirm New username">Confirm</button>
                            </div>
                        </div>
                        :
                        <p className="pointer onHover_border--Primary"  onClick={() => toggleEditMode("editLinks", editLinks, setEditState)}><img src={LinkIcon} alt="profile" className="profile_icon link_icon"></img><span><em>{loggedInUser["links"]}</em></span></p>
                    }

                 
                  


                </div>


            </div>
        
            </Scroll>
        </Card>
        </div>
    )
}

export default EditProfile;

