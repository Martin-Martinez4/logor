
import { FC } from "react";

import "./MiniProfile.css";
import Monkey2 from "../../assets/Monkey_2.svg";


const MiniProfile:FC = () => {

    return(
        <div className="miniProfile">
            <img src={Monkey2} alt="Monkey 2" className="profilePicture" />
            <div className="profileName">
                <p><strong>wwwwwwwwwwwwwww</strong></p>
                <p><em>@wwwwwwwwwwwwwww</em></p>
                < button type="button" className="button" title="Click to move to next Step">Follow</button>
            </div>
            {/* < button type="button" className="button" title="Click to move to next Step">Follow</button> */}
        </div>
    )
}

export default MiniProfile



