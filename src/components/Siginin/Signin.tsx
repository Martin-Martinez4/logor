
import React, { ReactElement } from "react";

const Signin = ():ReactElement => {

    return (
        
    <form className="signin flexColContainer">

        <h1> Welcome!</h1>
        <h2>Login!</h2>

        <div className=" flexColContainer inner">
            <div className="flexColContainer">

                <label htmlFor="uname" className="upperleft">
                    <h4 className="inputName">Username</h4>
                
                    <input type="text" placeholder="Enter Username" name="uname" required />
                </label>
                
                <label htmlFor="psw" className="upperleft">
                    <h4 className="inputName">Password</h4>
                
                    <input type="password" placeholder="Enter Password" name="psw" required />
                </label>

                <div>
                    <button type="submit" className=" button primary">Login</button>
                </div>
                <div>
                    <label>
                        <input type="checkbox" name="remember" />Remember Me?
                    </label>
                </div>
            </div>

            <div className="flexColContainer inner" >
                <span >Forgot your password?  <a href="/reset"> Reset your password.</a></span>
                <span >Do not have an account? <a href="/register">Register Here.</a></span>
            </div>
        </div>
    </form>

    )
    
}

export default Signin;




