
import { FC, useEffect, useState, useContext, useRef } from "react";

import UserInfoContext from "../context/UserInfoProvider";

import { getFollowersCount, getFollowingCount, loggedIsFollower } from "../utils/fetchFollowers";

import useSigninModal from "../hooks/useModal";

import { createFollow, deleteFollow } from "../utils/fetchCreateDeleteFollow";

import { refreshTokenBool } from "../utils/tokenRefreshedBool";

import FollowersPage from "../FollowersPage/FollowersPage";

import useAuth from "../hooks/useAuth";

import "./Follow.css";

const Follow:FC = ({ visiteeUser, buttonClasses, followCountClass }) => {

      const componentIsMounted = useRef(true);

    const { loadUser, loggedInUser, setloggedInUser } = useContext( UserInfoContext);
    const { auth, setAuth } = useAuth();


    const [ followerCount, setFollowerCount ] = useState({

        followers:"",
        following:""
    })

    const { showModal, toggleModal, hideModal,  } = useSigninModal();


    const [ isFollower, setIsFollower ] = useState();

    const handleFollow = async () => {

        try{

            const refreshBool = await refreshTokenBool(auth, setAuth)
    
            if(!refreshBool){
    
    
                if(showModal){
    
                    return 
                }else{
    
                    toggleModal()
                    return
                }
    
            }
    
            await createFollow(visiteeUser.id)

            const isFollower = await loggedIsFollower(visiteeUser?.id);

            // console.log("isFollower: ",isFollower)

            setIsFollower(isFollower)

            const followersCount =  await getFollowersCount(visiteeUser?.id)
            const followingCount =  await getFollowingCount(visiteeUser?.id)
    
            setFollowerCount(prev => ({...prev, followers: followersCount, following: followingCount}))

            const followersCountloggedIn =  await getFollowersCount(loggedInUser.id)
            const followingCountloggedIn =  await getFollowingCount(loggedInUser.id)

                // console.log("followers: ", followersCount, " Following: ", followingCount)

                setloggedInUser((prev) => 
                        ({...prev, 
                      followers: followersCountloggedIn,
                      following: followingCountloggedIn
                }))

        }
        catch(err){

    
    
                if(showModal){
    
                    console.error(err)
                    return 
                }else{
    
                    console.error(err)
                    toggleModal()
                    return
                }
    


        }

    }

    const handleUnfollow = async () => {

        try{
    
            const refreshBool = await refreshTokenBool(auth, setAuth)
    
            if(!refreshBool){
    
    
                if(showModal){
    
                    return 
                }else{
    
                    toggleModal()
                    return
                }
    
            }
    
            await deleteFollow(visiteeUser.id)

            const isFollower = await loggedIsFollower(visiteeUser?.id);

            
            // console.log("isFollower: ",isFollower)
            
            setIsFollower(isFollower)

            const followersCount =  await getFollowersCount(visiteeUser?.id)
            const followingCount =  await getFollowingCount(visiteeUser?.id)
    
            setFollowerCount(prev => ({...prev, followers: followersCount, following: followingCount}))

            const followersCountloggedIn =  await getFollowersCount(loggedInUser.id)
            const followingCountloggedIn =  await getFollowingCount(loggedInUser.id)

                // console.log("followers: ", followersCount, " Following: ", followingCount)

                setloggedInUser((prev) => 
                        ({...prev, 
                      followers: followersCountloggedIn,
                      following: followingCountloggedIn
                }))
        }
        catch(err){

            console.error(err)

        }


    }

    useEffect(() => {

        const checkIfFollower = async (user_id, setIsFollower) => {



                const followersCount =  await getFollowersCount(user_id)
                const followingCount =  await getFollowingCount(user_id)
    
                setFollowerCount(prev => ({...prev, followers: followersCount, following: followingCount}))
    
    
                // console.log("Follower id: ",visiteeUser.id)
                // console.log("Follower loggedInUser.username: ",loggedInUser.username)
    
                if(user_id && !(loggedInUser.username === "")){
    
                    // const isFollower = await loggedIsFollower(user_id);

                    loggedIsFollower(user_id).then( checkIsFollower => {


                            setIsFollower(checkIsFollower)


                    })
                    .catch(err => console.error(err))
        
                    // console.log("isFollower: ",isFollower)
        
                    // console.log("isFollower: ",isFollower)
        
                    // setIsFollower(isFollower)
    
                }else{
    
                    // console.error("error getting follow status")
                    // setIsFollower(false)
                    return
    
                }
            }
           
            


        
        checkIfFollower(visiteeUser?.id, setIsFollower)

        // return () =>  {componentIsMounted.current = false}
        
        

    },[loggedInUser, visiteeUser])

    useEffect(() => {

        // let abortController = new AbortController();
        // let isSubscribed = true;


        const checkIsFollower = async (user_id, setIsFollower) => {

            // let isMounted = true


            // console.log("Follower id: ",visiteeUser.id)
            // console.log("Follower loggedInUser.username: ",loggedInUser.username)

            // if(isMounted){

                if(user_id && !(loggedInUser.username === "")){
    
                    loggedIsFollower(user_id).then( checkIsFollower => {

                        if(componentIsMounted.current){

                            setIsFollower(checkIsFollower)
                        }


                    })
                    .catch(err => console.error(err))
        
                    console.log("isFollower: ",isFollower)
    
                }else{
    
                    console.error("error getting follow status")
                    // setIsFollower(false)
    
                }
          



        }
        
        checkIsFollower(visiteeUser?.id, setIsFollower)

        

    },[])

    useEffect(() => {}, [isFollower])

    return(

        <>
            <p className={followCountClass}><a href="">Followers:</a><em>{ followerCount?.followers? " " +followerCount?.followers: " Error"}</em></p> 
            <p className={followCountClass}><a href="">Following:</a><em>{followerCount?.following? " " +followerCount?.following: " Error"}</em></p>

            {visiteeUser.username === loggedInUser.username
            ?  
            " "
            :

            <div className="follow-button__container"> 
                {isFollower
                    ?
                    < button type="button" className={`button red ${buttonClasses}`} title="Click to follow" onClick={handleUnfollow} >Unfollow</button>
                    : 
                    < button type="button" className={`button primary ${buttonClasses}`} title="Click to follow" onClick={handleFollow}>Follow</button>
                }
            </div>
            
                
            }

            {/* <FollowersPage user_id={visiteeUser?.id} /> */}
        </>
    )

}

export default Follow;
