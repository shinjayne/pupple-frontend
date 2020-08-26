import React from 'react';
import styled from "styled-components";
import sample1 from './sample1.png';
import {AnimatePresence, motion, useAnimatedState, useAnimation, useViewportScroll} from "framer-motion";
import useScrollPosition from "../hooks/useScrollPosition";

interface IProps {
}


const LandingCover: React.FC<IProps> = () => {

  const scrollPosition = useScrollPosition();

  const controls = useAnimation();

  function getOpacity(): number {
    if (scrollPosition > 300) {
      return 0
    } else {
      return (300 - scrollPosition) / 300
    }
  }

  function getOpacityForFixedHeader(): number {
    const pos = scrollPosition - 300

    if (pos > 100) {
      return 1
    }
    if (pos <= 0) {
      return 0
    } else {
      return pos / 100
    }

  }

  async function onLinkClick() {
    await controls.start({scale : 0.8, transition : {duration: 0.1}});
    controls.start({scale: 1.0, transition : {duration: 0.1}});
  }

  return (
    <>
      <LandingCoverContainer source={sample1} opacity={String(getOpacity())}>
        <LandingSubTitle>
          19 FALL OUTFIT IDEAS
        </LandingSubTitle>
        <LandingTitle>가을을 위한 19가지 데일리룩 모음집</LandingTitle>
        <LandingLink
          onClick={onLinkClick}
          animate={controls}
          whileHover={{scale: 1.1}}
          // whileTap={{scale: 0.8, transition: {duration: 0.1}}}
        >영상 보러가기 </LandingLink>
      </LandingCoverContainer>

      <FixedHeader style={{opacity: getOpacityForFixedHeader()}}>

        <FixedHeaderInnerBox>
          <div>
            <NormalWeightHeaderText>
              19 FALL OUTFIT IDEAS
            </NormalWeightHeaderText>
            <BoldWeightHederText>
              가을을 위한 19가지 데일리룩 모음집
            </BoldWeightHederText>
            <NormalWeightHeaderText>
              19 FALL OUTFIT IDEAS
            </NormalWeightHeaderText>
            <BoldWeightHederText>
              가을을 위한 19가지 데일리룩 모음집
            </BoldWeightHederText>
            <NormalWeightHeaderText>
              19 FALL OUTFIT IDEAS
            </NormalWeightHeaderText>
            <BoldWeightHederText>
              가을을 위한 19가지 데일리룩 모음집
            </BoldWeightHederText>
          </div>
        </FixedHeaderInnerBox>
      </FixedHeader>
    </>
  );
};

const FixedHeader = styled(motion.div)`
  overflow: hidden;
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  background-color: white;
  height: 56px;
  margin-top: -32px;
  padding: 16px 14px;
  z-index: 99;


`;

const FixedHeaderInnerBox = styled.div`
  display: flex;
  color: #000000;
  //font-weight: 600;
  font-size: 20px;
  line-height: 140%;
/* identical to box height, or 28px */

  letter-spacing: -0.33px;
    //background: orange;
    height: 100%;
    //width: 400px;
    margin: 10px 380px;
    -webkit-animation-name: move;
    -moz-animation-name: move;
    -o-animation-name: move;
    animation-name: move;
    -webkit-animation-duration: 30s;
    -webkit-animation-iteration-count: infinite;
    -webkit-animation-direction: normal;
    -webkit-animation-timing-function: linear;
    :hover {
        -webkit-animation-play-state: paused;
    }
    width: 1000px;
    color: #000000;
`;

const NormalWeightHeaderText = styled.span`
  font-weight: normal;
  margin-right: 13px;
`
const BoldWeightHederText = styled.span`
  font-weight: 600;
  margin-right: 26px;
`

const LandingSubTitle = styled.div`
font-style: normal;
font-weight: normal;
font-size: 20px;
line-height: 140%;
/* or 28px */

letter-spacing: -0.33px;

color: #FFFFFF;
`;

const LandingTitle = styled.div`
font-style: normal;
font-weight: 600;
font-size: 20px;
line-height: 140%;
/* or 28px */

letter-spacing: -0.33px;

color: #FFFFFF;
`;

const LandingLink = styled(motion.div)`
margin-top: 8px;
font-style: normal;
font-weight: normal;
font-size: 16px;
line-height: 140%;
/* or 22px */

letter-spacing: -0.33px;
text-decoration-line: underline;

color: #FFFFFF;
width: fit-content;

:hover, :active {
border-radius: 10px;
background-color: #9b9b9b82;
cursor: pointer;
}
`;

const LandingCoverContainer = styled.div<{ source?: string, opacity: string }>`
display: flex;
flex-direction: column;
justify-content: flex-end;

padding: 45px 26px;

  //margin-bottom: 20px;
  
  width: 100%;
  height: 438px;
  opacity: ${props => props.opacity};
  
  background-size: cover;
  background-repeat: no-repeat  ;
  border-radius: 0 0 20px 20px;
  background-image: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.15) 100%), url(${props => props.source});
  //background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.3) 100%);
`;

export default LandingCover;
