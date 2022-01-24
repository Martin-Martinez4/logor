
import React, { FC } from "react";

import Card from "../Card/Card";
import ProfileImage from "../../assets/Monkey_1.svg";
import "./Posts.css";

const Post: FC = () => {


        return(
            <Card classes="content post">
                <div className="post user_image">
                    <img src={ProfileImage} alt="profile image" className="post_user_image "></img>
                   
                </div>
                <div className="post user_content">
                   <div className="post user_info">
                        <strong>Nameeeeeeeeeeeeeeeee</strong>
                        <em>@Nameeeeeeeeeeeeeeeee</em>
                        <span className="user_info__pipe"> | </span>
                        <em> Month Year</em>
                   </div>
                    <p className="post_body_text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos perferendis iusto autem, et, maxime sint soluta alias reiciendis earum quidem placeat corrupti provident voluptatibus, veniam illum repellendus nostrum aliquid neque unde? Libero natus, veniam perspiciatis ad maiores obcaecati animi culpa voluptates laudantium repellendus quisquam officia maxime eligendi reiciendis molestias fuga minus, aliquid, rerum omnis vel fugit voluptatibus. Minima architecto dignissimos repellendus odio? Rerum omnis placeat, suscipit unde quod consequuntur, vitae culpa voluptas doloribus ipsa mollitia similique aliquam quos. Omnis nesciunt suscipit vero mollitia, corporis expedita iste dolorem cum quia, porro aspernatur perferendis molestias aut accusamus odio sint minima est voluptates animi rem quasi dignissimos! Sapiente fugit alias minima! Nostrum molestias alias minus sunt soluta ad pariatur mollitia fugit animi ipsam!</p>
                </div>
            </Card>
        );
}

export default Post

