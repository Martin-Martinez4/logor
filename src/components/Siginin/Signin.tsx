
import React, { FC, useState } from "react";

import { useNavigate, Link } from "react-router-dom";

import useAuth from "../useAuth/useAuth";

import TestData from "../../tempStaticData/testData.json"

const Signin:FC = ({ loadUser }) => {

    const navigate = useNavigate();
    const { login, logout } = useAuth();    
  
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

    const onAttemptLogin = () => {

        // let userName = "";

        for(let key in TestData["login"]){

            // console.log("userCreds", userCreds.username)
            // console.log(TestData["login"][key]["username"])

            if(userCreds.username === TestData["login"][key]["username"]){

                // console.log("success", userCreds.username)
                // userName = userCreds.username

                if(userCreds.password === TestData["login"][key]["password"]){

                    const userData = Object.assign({id: key}, TestData["users"][key], TestData["headers"][key])
                    
                    login().then(() => {
                        
                        loadUser(userData);
                        navigate("/users/");
                    }).catch( err => {

                        console.log("fail")
                        logout().then(() => {
                            navigate("/");
                        })

                    })
                }
            }
        }


    }

    return (
        
    <form className="signin flexColContainer">

        <h1> Welcome!</h1>
        <h2>Login!</h2>

        <div className=" flexColContainer inner">
            <div className="flexColContainer">

                <label htmlFor="uname" className="upperleft">
                    <h4 className="inputName">Username</h4>
                
                    <input type="text" placeholder="Enter Username" name="username" onChange={oninputChange} required />
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




