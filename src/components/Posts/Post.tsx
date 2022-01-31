
import React, { FC } from "react";

import Card from "../Card/Card";
import "./Posts.css";

const Post: FC = ({ uuid, userName, tag, user_profile, date_posted, text_content }) => {


        return(
            <Card classes="content post">
                <div className="post user_image">
                    <img src={user_profile} alt="profile" className="post_user_image "></img>
                   
                </div>
                <div className="post user_content">
                   <div className="post user_info">
                        <strong>{userName}</strong>
                        <em>@{tag}</em>
                        <span className="user_info__pipe"> | </span>
                        <em>{date_posted}</em>
                   </div>
                    <p className="post_body_text">{text_content}</p>
                </div>
            </Card>
        );
}

export default Post

