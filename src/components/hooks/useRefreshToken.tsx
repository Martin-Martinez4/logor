
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {

        // get refresh token like in siginin
        const response = await fetch('http://localhost:3001/token/refresh/', {

            method: "get",
            credentials:'include',
            cache:'no-cache',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
        .then((response) => response.json())
        .then((user) => {
            

            // console.log(user)

            // console.log(user.access_token)
            if(user.access_token){

                // const from = location.state?.from?.pathname || `/user/1`;

                // console.log(user.access_token)
                // token stuff

                // setAuth({ user_id: user.user_id, access_token:user.access_token });

                setAuth(prev => {
                    return { 
                        ...prev, 
                        user_id: user.user_id,
                        access_token:user.access_token  
                    }
                });

                return user.access_token;

              
                    
                

                   
            }
            else{

                console.log("error")

                return null

            }
        })
    
    }

    return refresh;
};

export default useRefreshToken;