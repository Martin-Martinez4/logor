
import React, { FC } from "react";

import "./CommentBox.css";
import Card from "../Card/Card";

const PostBox:FC = () => {

    return(

        <Card classes="content content__commentBox">

                <textarea id="commentBox" name="commentBox" className="commentBox__commentInput" placeholder="Have something to say?" maxLength={920} cols={92} rows={10}></textarea>

                <div className="commentBox__buttonArea">
                    
                    <em className="buttonArea__charsLeft">Characters Left: 920</em>
                    <div className="buttonArea__buttons">
                        <button className="button primary">Submit</button>
                        <button className="button red">Cancel</button>

                    </div>
                </div>
        </Card>
    )

}

export default PostBox;



