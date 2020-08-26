import React, {CSSProperties, useState} from 'react';
import styled from "styled-components";
import {motion, useAnimation} from "framer-motion";
import sample1 from './sample1.png';

interface IProps {
  style?: CSSProperties,
}


const ImageTextButton: React.FC<IProps> = ({style}) => {

  const controls = useAnimation();

  const [selected, setSelected] = useState(false)

  function onClick() {
    setSelected(!selected)
    // controls.start({
    //   scale: 0.8,
    //   transition: {duration: 0.1}
    // });
  }

  return (
    <>
      {selected ? (

        <GradientWrapper
          initial={{opacity: 0, scale: 0.8}}
          animate={{opacity: 1, scale: 1}}
          exit={{opacity: 0, scale: 0.8}}
          onClick={onClick}
          whileHover={{scale: 1.1}}
          style={style}
        >
          <ImageVoteButtonInGradient
          >
            <ButtonImage source={sample1}/>
            Look 1
          </ImageVoteButtonInGradient>
        </GradientWrapper>
      ) : (
        <JustWrapper
          style={style}
          initial={{opacity: 0, scale: 0.8}}
          animate={{opacity: 1, scale: 1}}
          exit={{opacity: 0, scale: 0.8}}
          onClick={onClick}
          whileHover={{scale: 1.1}}
        >
          <ImageVoteButtonInactive
          >
            <ButtonImage source={sample1}/>
            Look 1
          </ImageVoteButtonInactive>
        </JustWrapper>
      )
      }

    </>
  );
};


const JustWrapper = styled(motion.div)`
  width: 48%;
`;

const GradientWrapper = styled(motion.div)`
  position: relative;
  background: linear-gradient(to right, #6D1EFF, #C800E9);
  padding: 4px;
  border-radius: 11px;
 
  width: 48%;
`;

const ImageVoteButtonInGradient = styled(motion.div)`
  padding: 8px;
background: #F2F2F2;
box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 7px;
  
font-style: normal;
font-weight: 500;
font-size: 15px;
line-height: 140%;

/* identical to box height, or 21px */

text-align: center;
letter-spacing: -0.33px;

color: #000000;
:hover {
background-color: #d4cece;
cursor: pointer;

}
:active {
background-color: #d4cece;
}
`;

const ImageVoteButtonInactive = styled(motion.div)`
  padding: 12px;
background: #F2F2F2;
box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  
font-style: normal;
font-weight: 500;
font-size: 15px;
line-height: 140%;

/* identical to box height, or 21px */

text-align: center;
letter-spacing: -0.33px;

color: #000000;
:hover {
background-color: #d4cece;
cursor: pointer;

}
:active {
background-color: #d4cece;
}
`;

const ButtonImage = styled.div<{ source: string }>`
  background-image: url(${props => props.source});
            background-size: cover;
          background-repeat: no-repeat;
         
          padding-top: 100%;
          width: 100%;
          margin-bottom: 10px;
          border-radius: 10px;
          
`;

export default ImageTextButton;
