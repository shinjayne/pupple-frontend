import React, {CSSProperties} from 'react';
import styled from "styled-components";
import {AnimatePresence, motion} from "framer-motion";

interface IProps {
  active?: boolean,
  style?: CSSProperties,
  onClick?: () => any,
  count? :number,
}


const LikeButton : React.FC<IProps> = ({active = false, style, onClick,count}) => {

  return (
    <>
      <AnimatePresence>
      {
        active ? (
          <GradientWrapper
            initial={{ opacity: 0 , scale: 0.8}}
            animate={{ opacity: 1 , scale: 1}}
            exit={{ opacity: 0 , scale: 0.8}}
            onClick={onClick}
            whileHover={{scale: 1.1}}
            // whileTap={{scale: 0.8, transition: {duration: 0.1}}}
            style={style}>
            <LikeButtonBodyActived style={{color: 'black'}}>💜 {count}</LikeButtonBodyActived>
          </GradientWrapper>
        ):
          (
            <JustWrapper
              initial={{ opacity: 0 , scale: 0.8}}
              animate={{ opacity: 1 , scale: 1}}
              exit={{ opacity: 0 , scale: 0.8}}
              onClick={onClick}
              whileHover={{scale: 1.1}}
              // whileTap={{scale: 0.8, transition: {duration: 0.1}}}
              style={style}>
            <LikeButtonBody
            >💜 {count}</LikeButtonBody>
            </JustWrapper>
          )
      }
      </AnimatePresence>
    </>
  );
};

const GradientWrapper = styled(motion.div)`
  position: relative;
  background: linear-gradient(to right, #6D1EFF, #C800E9);
  padding: 4px;
  border-radius: 10px;
 
`;

const JustWrapper = styled(motion.div)`
  padding: 0px;
`;

const LikeButtonBody = styled(motion.div)`
  padding: 18px 16px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  
  font-style: normal;
font-weight: 500;
font-size: 15px;
line-height: 140%;
/* identical to box height, or 21px */
  
text-align: center;
letter-spacing: -0.33px;

color: #BDBDBD;

:hover {
background-color: #d4cece;
cursor: pointer;

}
:active {
background-color: #d4cece;
}
`;

const LikeButtonBodyActived = styled(motion.div)`
  padding: 14px 12px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 7px;
  
  font-style: normal;
font-weight: 500;
font-size: 15px;
line-height: 140%;
/* identical to box height, or 21px */
  
text-align: center;
letter-spacing: -0.33px;

color: black;

:hover {
background-color: #d4cece;
cursor: pointer;

}
:active {
background-color: #d4cece;
}
`;

export default LikeButton;
