import React, { FC, PropsWithChildren } from 'react';
import "./scroll.css";

type Props = PropsWithChildren<{
  }>

const Scroll: FC<Props> = ({ children }) => {

    return (
        <div className='scroll_div'>

            {children}

        </div>
    );

}

export default Scroll
