import React, {CSSProperties, useEffect, useState} from 'react';
import styled from "styled-components";
import {motion} from "framer-motion";
import {ChoiceResponse} from "./ComponentDecision";
import {fullImageUrl} from "../utils";

interface IProps {
  style?: CSSProperties,
  selected?: boolean,
  onClick?: (data: ChoiceResponse) => any,
  percent?: number,
  data: ChoiceResponse,
}


const ImageChoice: React.FC<IProps> = ({
                                         style,
                                         selected,
                                         onClick,

                                         percent,
                                         data
                                       }) => {

  function onClicked() {
    onClick && onClick(data)
  }

  return (
    <>
      {selected ? (

        <GradientWrapper
          initial={{opacity: 0, scale: 0.8}}
          animate={{opacity: 1, scale: 1}}
          exit={{opacity: 0, scale: 0.8}}
          onClick={onClicked}
          whileHover={{scale: 1.1}}
          style={style}
        >
          <ImageVoteButtonInGradient
          >
            <ButtonImage source={data.img_url ? fullImageUrl(data.img_url) : ''}/>
            <TextArea>
              {percent && percent > 50 && <SelectedGradientFont>{percent} %</SelectedGradientFont>}
              {percent && percent <= 50 && <UnSelectedGradientFont>{percent} %</UnSelectedGradientFont>}
              <TextOnButton>{data.name}</TextOnButton>
            </TextArea>

          </ImageVoteButtonInGradient>
        </GradientWrapper>
      ) : (
        <JustWrapper
          style={style}
          initial={{opacity: 0, scale: 0.8}}
          animate={{opacity: 1, scale: 1}}
          exit={{opacity: 0, scale: 0.8}}
          onClick={onClicked}
          whileHover={{scale: 1.1}}
        >
          <ImageVoteButtonInactive
          >
            <ButtonImage source={data.img_url ? fullImageUrl(data.img_url) : ''}/>
            <TextArea>
              {percent && percent > 50 && <SelectedGradientFont>{percent} %</SelectedGradientFont>}
              {percent && percent <= 50 && <UnSelectedGradientFont>{percent} %</UnSelectedGradientFont>}
              <TextOnButton>{data.name}</TextOnButton>
            </TextArea>
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

const TextArea = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TextOnButton = styled.div`
  flex-grow: 2;
  font-style: normal;
font-weight: 500;
font-size: 15px;
line-height: 140%;

text-align: center;
letter-spacing: -0.33px;

color: #000000;
`;

const SelectedGradientFont = styled.div`
font-style: normal;
font-weight: 600;
font-size: 24px;
line-height: 100%;
/* identical to box height, or 34px */

text-align: center;
letter-spacing: -0.33px;

/* logo3 */

color:  #6D1EFF;
margin-right: 8px;
flex-grow: 1;
`
const UnSelectedGradientFont = styled.div`
font-style: normal;
font-weight: 300;
font-size: 24px;
line-height: 100%;
/* identical to box height, or 34px */

text-align: center;
letter-spacing: -0.33px;

/* logo3 */

color: #BDBDBD;

margin-right: 8px;
flex-grow: 1;
`

export default ImageChoice;
