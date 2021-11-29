import React, { FC, PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
  }>

const Scroll: FC<Props> = ({ children }) => {

    return (
        <div style={{overflowY:'scroll', border:'1px  solid  black', height:'90vh'}}>

            {children}

        </div>
    );

}

export default Scroll
