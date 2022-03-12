import { createContext, useState } from "react";

const SigninModalContext = createContext(false);

export const SigninModalProvider = ({ children }) => {

    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => {

        setShowModal(!showModal);

    }

    return (
        <SigninModalContext.Provider value={{ showModal, toggleModal }}>
            {children}
        </SigninModalContext.Provider>
    )
}

export default SigninModalContext;