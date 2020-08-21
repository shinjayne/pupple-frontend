import React, {PropsWithChildren} from 'react';

interface IProps {
}


const MaxWidthRoot: React.FC<PropsWithChildren<IProps>> = ({children}) => {

  return (
    <>
      <div style={{maxWidth: 375, display: 'flex', flexDirection: "column", padding: 15, alignItems: "stretch"}}>
        {children}
      </div>
    </>
  );
};

export default MaxWidthRoot;
