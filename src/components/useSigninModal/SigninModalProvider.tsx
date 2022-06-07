
import { createContext, FC, useState } from "react";


interface SigninModalContextInterface {
    showModal?: boolean; 
    toggleModal?: () => void;
    hideModal?:  () => void;
}

const SigninModalContext = createContext<SigninModalContextInterface>({});

export const SigninModalProvider: FC = ({ children }) => {

    const [showModal, setShowModal] = useState<boolean>(false);

    const toggleModal = () => {

        setShowModal(!showModal);

    }

    const hideModal = () => {

        setShowModal(false)
    }



    return (
        <SigninModalContext.Provider value={{ showModal, toggleModal, hideModal }}>
            {children}
        </SigninModalContext.Provider>
    )
}

export default SigninModalContext;