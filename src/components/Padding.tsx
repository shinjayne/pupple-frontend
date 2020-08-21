import React, {PropsWithChildren} from 'react';

interface IProps {
}


const Padding : React.FC<PropsWithChildren<IProps> > = ({children}) => {

  return (
    <>
      <div style={{display: 'flex', flexDirection: "column", padding: '0 15px 15px 15px', alignItems: "stretch"}}>
        {children}
      </div>
    </>
  );
};

export default Padding;
