
import React, { FC, useState, useContext } from "react";

import { useNavigate, Link } from "react-router-dom";

import useSigninModal from "../hooks/useModal";

import useAuth from "../hooks/useAuth";
// import useUserInfo from "../hooks/useUserInfo";
import UserInfoContext from "../context/UserInfoProvider";

const Signin:FC = ({ reDirect }) => {

    const { showModal, toggleModal } = useSigninModal();

    const { loadUser } = useContext( UserInfoContext);

    // const { loadUser } = useUserInfo();

    const { setAuth } = useAuth();

    const navigate = useNavigate();


    

    
    const [loginError, setLoginError] = useState({

        inputError:false,
        flagTripped: false
    });
    // const [hasLoaded, sethasLoaded] = useState(false);
  
    const [userCreds, setUserCreds] = useState({

        username:"",
        password:""
    });

    const oninputChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        // console.log(e.target.name, e.target.value)
        // console.log(TestData["login"]["1"]["username"])

        setUserCreds(userCreds => ({...userCreds, [e.target.name]: (e.target.value).toString()}))

        e.preventDefault();

        
    }

    const errorMessageTimeout = (milisecs) => {

        const {inputError, flagTripped} = loginError

        setLoginError(prev =>({...prev, flagTripped:true}));
        setLoginError(prev =>({...prev, inputError:true}));

        setTimeout(() =>  setLoginError(prev =>({...prev, inputError:false})), milisecs);

    }

    const onAttemptLogin = async (e) => {

        
        e.preventDefault();
        
        console.log("test") 
        const {username, password} = userCreds

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

            console.log("signin access token: ",user.access_token)
            if(user.access_token){

                console.log("signin access token: ",user.access_token)

                // token stuff

                setAuth(() => {

                    return { user_id: user.user_id, access_token:user.access_token }
                });



                

                // login().then(() => {
                        
                    // loadUser(user);
                      return fetch(`http://localhost:3001/loggedin/user/info/`, {

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

                            if(reDirect){

                                navigate(`/home/${user[0].id}`)
                            }
                            
                            
                        }
                        catch(err){

                            console.error(err)
                        }
                    
                    })

                    // if(auth?.user_id){

                    //     const from = location.state?.from?.pathname || `/home/${user.user_id}`;
                    //     navigate(from, { replace:true });
                    // }
                                
                

                   
            }
            else{

                errorMessageTimeout(3000);
            }

        }).catch((err)=> console.log(err))

        

    }
            



    return (
        
    <form className="signin flexColContainer">

        <h2> Welcome!</h2>
        <h3>Login!</h3>

        <div className=" flexColContainer inner">
            <div className="flexColContainer">

                <span className={`${loginError.inputError?"errorBackground":loginError.flagTripped?"fadeOut":"hdden"}`} >incorrect username and/or password</span>


                <label htmlFor="uname" className="upperleft ">
                
                    <h4 className="inputName">Username</h4> 
                    <input className="" type="text" placeholder="Enter Username" name="username" onChange={oninputChange} required />
                </label>
                
                <label htmlFor="password" className="upperleft">
                    <h4 className="inputName">Password</h4>
                
                    <input type="password" placeholder="Enter Password" name="password" onChange={oninputChange} required />
                </label>

                <div>
                    <button type="submit" className=" button primary" onClick={onAttemptLogin} >Login</button>
                </div>
                <div>
                    <label>
                        <input type="checkbox" name="remember" />Remember Me?
                    </label>
                </div>
            </div>

            <div className="flexColContainer inner" >
                <span >Forgot your password?  <Link to="/reset"> Reset your password.</Link></span>
                <span >Do not have an account? <Link to="/register">Register Here.</Link></span>
            </div>
        </div>
    </form>

    )
    
}

export default Signin;




