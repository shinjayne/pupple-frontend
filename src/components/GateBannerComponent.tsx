import React, {useState} from 'react';
import styled from "styled-components";
import {motion} from "framer-motion";
import {Fade, Modal} from "@material-ui/core";
import ImageTextButton from "./ImageTextButton";

import CloseVector from './Vector.svg';

interface IProps {
}


const GateBannerComponent: React.FC<IProps> = () => {

  const [open, setOpen] = useState(false)
  function onClickBanner() {
    setOpen(true)
  }
  function onClickClose() {
    setOpen(false)
  }
  return (
    <>

      <Wrapper
        onClick={onClickBanner}
        whileHover={{scale: 1.1}}
        whileTap={{scale: 0.8, transition: {duration: 0.1}}}
      >
        <BannerTitle>이번 영상에서 베스트룩은?</BannerTitle>
        <BannerDescription>가장 마음에 드는 룩을 Pick!</BannerDescription>
      </Wrapper>

      <Modal
        closeAfterTransition
        style={{position: "sticky"}}
        open={open} children={
        <>
          <Fade
            in={open} exit={!open} children={
            <div style={{background: "linear-gradient(19.48deg, #F3904F 7.86%, #3B4371 100%)", width: '100vw', height: '100vh', overflowX: "hidden", overflowY : "auto"}}>
              <ModalHeader>
                <img onClick={onClickClose} src={CloseVector}/>
              </ModalHeader>
              <ModalTitle>
                이번 영상의 베스트룩은?
              </ModalTitle>
              <ModalBody>
                <ImageTextButton style={{marginBottom: 16}}/>
                <ImageTextButton style={{marginBottom: 16}}/>
                <ImageTextButton style={{marginBottom: 16}}/>
                <ImageTextButton style={{marginBottom: 16}}/>
                <ImageTextButton style={{marginBottom: 16}}/>
                <ImageTextButton style={{marginBottom: 16}}/>
              </ModalBody>
            </div>
          }/>


        </>
      }/>

    </>
  );
};

const ModalHeader = styled.div`
  position: sticky;
  z-index: 1000;
  top: 0;
  width: 100%;
  padding: 18px 20px;
  color: white;
`;

const ModalTitle = styled.div`
  position: sticky;
  top: 60px;
  width: 100%;
  margin-top: 94px;
  display: flex;
  justify-content: center;
  align-items: center;
  
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 140%;
  
  text-align: center;
  letter-spacing: -0.33px;
  
  color: #FFFFFF;
`;

const ModalBody = styled.div`
  padding: 67px 30px;
    display: flex;  
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

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
