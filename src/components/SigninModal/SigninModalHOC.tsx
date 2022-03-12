
import useAuth from "../hooks/useAuth";
import useModal from "../hooks/useModal";
import SigininModal from "../SigninModal/SigninModal";
import useSigninModal from "../hooks/useModal";


const SigninModalHOC = ({ children }) => {

    // const { showModal, toggleModal } = useModal();
    const { showModal, toggleModal } = useSigninModal();

    return (
        <>

            
             <SigininModal
                    showModal={showModal}
                    hide={toggleModal}
                    
            />
            
            {children}

        </>
    )

}

export default SigninModalHOC


