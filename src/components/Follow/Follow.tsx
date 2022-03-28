
import { FC, useEffect, useState, useContext } from "react";

import UserInfoContext from "../context/UserInfoProvider";

import { getFollowersCount, getFollowingCount, loggedIsFollower } from "../utils/fetchFollowers";

import useSigninModal from "../hooks/useModal";

import { createFollow, deleteFollow } from "../utils/fetchCreateDeleteFollow";

import "./Follow.css";

const Follow:FC = ({ visiteeUser, buttonClasses, followCountClass }) => {

    const { loadUser, loggedInUser, setloggedInUser } = useContext( UserInfoContext);

    const [ followerCount, setFollowerCount ] = useState({

        followers:"",
        following:""
    })

    const { showModal, toggleModal } = useSigninModal();


    const [ isFollower, setIsFollower ] = useState();

    const handleFollow = async () => {

        try{
    
            if(loggedInUser.username === ""){
    
    
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
        }
        catch(err){

            console.error(err)

        }

    }

    const handleUnfollow = async () => {

        try{
    
            if(loggedInUser.username === ""){
    
    
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
        }
        catch(err){

            console.error(err)

        }


    }

    useEffect(() => {

        (async (user_id, setIsFollower) => {

            
            const followersCount =  await getFollowersCount(user_id)
            const followingCount =  await getFollowingCount(user_id)

            setFollowerCount(prev => ({...prev, followers: followersCount, following: followingCount}))


            console.log("Follower id: ",visiteeUser.id)
            console.log("Follower loggedInUser.username: ",loggedInUser.username)

            if(user_id && !(loggedInUser.username === "")){

                const isFollower = await loggedIsFollower(user_id);
    
                console.log("isFollower: ",isFollower)
    
                setIsFollower(isFollower)

            }else{

                console.error("error getting follow status")
                setIsFollower(false)

            }


        })(visiteeUser?.id, setIsFollower)
        

    },[loggedInUser, visiteeUser])

    useEffect(() => {

        (async (user_id, setIsFollower) => {


            console.log("Follower id: ",visiteeUser.id)
            console.log("Follower loggedInUser.username: ",loggedInUser.username)

            if(user_id && !(loggedInUser.username === "")){

                const isFollower = await loggedIsFollower(user_id);
    
                console.log("isFollower: ",isFollower)
    
                setIsFollower(isFollower)

            }else{

                console.error("error getting follow status")
                setIsFollower(false)

            }


        })(visiteeUser?.id, setIsFollower)
        

    },[])

    useEffect(() => {}, [isFollower])

    return(

        <>
            <p className={followCountClass}><a href="">Followers: </a><em>{ followerCount?.followers? followerCount?.followers: " Error"}</em></p> 
            <p className={followCountClass}><a href="">Followers: </a><em>{followerCount?.following? followerCount?.following: " Error"}</em></p>

            <div className="follow-button__container"> 
                {isFollower
                    ?
                    < button type="button" className={`button red ${buttonClasses}`} title="Click to follow" onClick={handleUnfollow} >Unfollow</button>
                    : 
                    < button type="button" className={`button primary ${buttonClasses}`} title="Click to follow" onClick={handleFollow}>Follow</button>
                }
            </div>
        </>
    )

}

export default Follow;
