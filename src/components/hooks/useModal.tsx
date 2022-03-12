
// import { useState } from "react";

// const  useModal = () => {

//     const [showModal, setShowModal] = useState(false);

//     const toggleModal = () => {

//         setShowModal(!showModal);

//     }

//     // this can be used to make laod user a hook
//     // insted of toggleModl do loadUser then return, user and loadUser
//     return {

//         showModal,
//         toggleModal
//     }
// }

// export default useModal;

import { useContext, useDebugValue } from "react";
import SigninModalContext from "../useSigninModal/SigninModalProvider";

const useSigninModal = () => {
    const { showModal } = useContext(SigninModalContext);
    return useContext(SigninModalContext);
}

export default useSigninModal;


