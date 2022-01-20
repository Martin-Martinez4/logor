import React, { FC, PropsWithChildren } from 'react';
import "./scroll.css";

type Props = PropsWithChildren<{
  }>

const Scroll: FC<Props> = ({ children }) => {

    return (
        <div style={{overflowY:'scroll', border:'1px  solid  black', height:'90vh'}} className='scroll_div'>

            {children}

        </div>
    );

}

export default Scroll
