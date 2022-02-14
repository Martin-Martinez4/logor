
import React, { FC, useState } from "react";

import { useNavigate, Link } from "react-router-dom";

import useAuth from "../useAuth/useAuth";

import TestData from "../../tempStaticData/testData.json"

const Signin:FC = ({ loadUser }) => {

    const navigate = useNavigate();
    const { login, logout } = useAuth();
    
    const [loginError, setLoginError] = useState({

        inputError:false,
        flagTripped: false
    });
    const [hasLoaded, sethasLoaded] = useState(false);
  
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

    const onAttemptLogin = (e) => {

        e.preventDefault();

        const {username, password} = userCreds

        fetch('http://localhost:3001/signin', {

            method: "post",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        .then((response) => response.json())
        .then((user) => {

            if(user.id){

                login().then(() => {
                        
                    loadUser(user);
                    navigate("/users/");
                }).catch( (err) => {

                    console.log("fail")
                    logout().then(() => {
                        navigate("/");
                    })

                })

            }
            else{

                errorMessageTimeout(3000);
            }

        }).catch((err)=> console.log(err))

    }
            



    return (
        
    <form className="signin flexColContainer">

        <h1> Welcome!</h1>
        <h2>Login!</h2>

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




