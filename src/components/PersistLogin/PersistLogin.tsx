
import {  Outlet } from "react-router-dom"
import {  useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth } = useAuth();

    useEffect(() => {

        let isMounted = true;

        const verifyRefreshToken = async () => {


            try {
                
                await refresh();
            }
            catch (err) {
                console.error(err);
            }
            finally {
                isMounted && setIsLoading(false);
            }
        }

        !auth?.access_token ? verifyRefreshToken() : setIsLoading(false);

        return () => isMounted = false;

    }, [])

    useEffect(() => {
        console.log(`isLoading: ${isLoading}`)
        console.log(`aT: ${auth?.access_token}`)
        console.log(`user-id: ${auth?.user_id}`)
    }, [isLoading])

    return (
        <>
            {isLoading
            ? <p>Loading...</p>
            : auth?.access_token
            ? <Outlet/>
            : <Outlet/>
            }
        </>
    )
}

export default PersistLogin
