import React, {PropsWithChildren} from 'react';

interface IProps {
}


const MaxWidthRoot: React.FC<PropsWithChildren<IProps>> = ({children}) => {

  return (
    <>
      <div style={{maxWidth: 450}}>
        {children}
      </div>
    </>
  );
};

export default MaxWidthRoot;
