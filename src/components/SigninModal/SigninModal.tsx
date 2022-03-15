
import React from "react";
import ReactDOM from "react-dom";
import useSigninModal from "../hooks/useModal";



// import "./modal.css";

// const  SigininModal = ({ showModal, hide }) => showModal ? ReactDOM.createPortal(

//     <React.Fragment>
//     <div className="modal-overlay"/>
//     <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
//       <div className="modal">
//         <div className="modal-header">
//           <button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close" onClick={hide}>
//             <span aria-hidden="true">&times;</span>
//           </button>
//         </div>
//         {/* <p>
//           Hello, I'm a modal.
//         </p> */}
          
//       </div>
//     </div>
//   </React.Fragment>, document.body
//     )
//     : null

// export default SigininModal
import Signin from "../Siginin/Signin";

import "./modal.css";

const  SigininModal = ({ showModal, hide, children }) => {

  return (
    

      <React.Fragment>
        { children }
      {showModal
      ?
      <>
      <div className="modal-overlay"/>
      <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
        <div className="modal">
          <div className="modal-header">
            <button type="button" className="modal-close-button button red" data-dismiss="modal" aria-label="Close" onClick={hide}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <Signin />
         
            
        </div>
      </div>
      </>
    : ""
    }
    </React.Fragment>
      )
}


export default SigininModal

