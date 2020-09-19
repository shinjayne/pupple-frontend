import React, {CSSProperties} from 'react';
import styled from "styled-components";
import {motion} from "framer-motion";
import {ChoiceResponse} from "./ComponentDecision";

interface IProps {
  selected?: boolean,
  data: ChoiceResponse,
  percent?: number,
  onClick?: () => void,
  style?: CSSProperties
}


const TextChoice : React.FC<IProps> = ({selected,data, percent, onClick=()=>{}, style}) => {

  return (
    <>
      {
        selected ? (
            <GradientWrapper
              initial={{opacity: 0, scale: 0.8}}
              animate={{opacity: 1, scale: 1}}
              exit={{opacity: 0, scale: 0.8}}
              onClick={onClick}
              whileHover={{scale: 1.1}}
              style={style}
            >
              <ButtonResultChildSelected>
                {percent !== undefined && percent > 50 && <SelectedGradientFont>{percent} %</SelectedGradientFont>}
                {percent !== undefined && percent <= 50 && <UnSelectedGradientFont>{percent} %</UnSelectedGradientFont>}
                <TextOnButton>{data.name}</TextOnButton>
              </ButtonResultChildSelected>
            </GradientWrapper>
          )
          : (
            <ButtonResultChildNotSelected
              style={style}
              initial={{opacity: 0, scale: 0.8}}
              animate={{opacity: 1, scale: 1}}
              exit={{opacity: 0, scale: 0.8}}
              onClick={onClick}
              whileHover={{scale: 1.1}}
            >
              {percent !== undefined && percent > 50 && <SelectedGradientFont>{percent} %</SelectedGradientFont>}
              {percent !== undefined && percent <= 50 && <UnSelectedGradientFont>{percent} %</UnSelectedGradientFont>}
              <TextOnButton>{data.name}</TextOnButton>
            </ButtonResultChildNotSelected>
          )
      }


    </>
  );
};



styled(motion.div)`
  display: flex;
  justify-content: space-between;
  background: #FFFFFF;
box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  
font-style: normal;
font-weight: 500;
font-size: 15px;
line-height: 140%;
width: 100%;
/* identical to box height, or 21px */

text-align: center;
letter-spacing: -0.33px;

color: #000000;
:hover {
cursor: pointer;
}
`;

const GradientWrapper = styled(motion.div)`
  position: relative;
  background: linear-gradient(to right, #9733EE, #7A1FC9);
  padding: 4px;
  width: 48%;
  border-radius: 11px;
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

const ButtonResultChildNotSelected = styled(motion.div)`

display: flex;
justify-content: flex-start;
align-items: center;
    width: 48%;
    padding: 18px 16px;
  background: #FFFFFF;
  border-radius: 10px;
  
font-style: normal;
font-weight: 500;
font-size: 15px;
line-height: 140%;
/* identical to box height, or 21px */

text-align: center;
letter-spacing: -0.33px;

color: #000000;
`;

const ButtonResultChildSelected = styled.div`
display: flex;
justify-content: flex-start;
align-items: center;
  padding: 18px 16px;
  background: #FFFFFF;
//box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
filter: drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.1));
  border-radius: 7px;
  
font-style: normal;
font-weight: 500;
font-size: 15px;
line-height: 140%;
width: 100%;
height: 100%;
/* identical to box height, or 21px */

text-align: center;
letter-spacing: -0.33px;

color: #000000;
flex-grow: 2;
`;

export default TextChoice;
