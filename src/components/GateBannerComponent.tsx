import React from 'react';
import styled from "styled-components";
import {motion} from "framer-motion";

interface IProps {
}


const GateBannerComponent : React.FC<IProps> = () => {

  return (
    <>

      <Wrapper
        whileHover={{scale: 1.1}}
        whileTap={{scale: 0.8, transition: {duration: 0.1}}}
      >
        <BannerTitle>이번 영상에서 베스트룩은?</BannerTitle>
        <BannerDescription>가장 마음에 드는 룩을 Pick!</BannerDescription>
      </Wrapper>
    </>
  );
};

const BannerTitle = styled.div`
font-style: normal;
font-weight: 600;
font-size: 18px;
line-height: 140%;
/* or 25px */

text-align: center;
letter-spacing: -0.33px;

color: #FFFFFF;
`;

const BannerDescription = styled.div`
font-style: normal;
font-weight: 300;
font-size: 12px;
line-height: 140%;
/* identical to box height, or 17px */

text-align: center;
letter-spacing: -0.33px;

color: #FFFFFF;

margin-top: 4px;
`;

const Wrapper = styled(motion.div)`
/* logo3 */
padding: 20px 16px;

display: flex;
flex-direction: column;
align-items: center;
//background: conic-gradient(from 56.97deg at 50% 50%, #6D1EFF 0deg, #C800E9 30.8deg, #6D1EFF 360deg);
background: linear-gradient(to right, #6D1EFF, #C800E9);
border-radius: 10px;
width: 100%;
height: 80px;
margin-bottom: 20px;

:hover {
cursor: pointer;

}
`;

export default GateBannerComponent;
