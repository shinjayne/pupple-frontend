import React from 'react';
import {motion, Variants} from "framer-motion";
import momentIconImg from "./moment.png";
import styled from "styled-components";

import heightIcon from './heightIcon.png';
import shoesIcon from './shoesIcon.png';
import topIcon from './topIcon.png';
import bottomIcon from './bottomIcon.png';

interface IProps {
  componentData: ModelInfoComponentFields
}

export interface ModelInfoComponentFields {
  title: string,
  explain: string,
  height: string,
  top: string,
  bottom: string,
  shoes: string
}


const ModelInfoComponent: React.FC<IProps> = ({componentData}) => {

  const variants: Variants = {
    landing: {
      scale: 0.9
    },
    stable: {
      scale: 1
    }
  }

  return (
    <>
      <motion.div variants={variants} initial={'landing'} animate={'stable'}
                  style={{
                    borderRadius: 10,
                    backgroundColor: 'white',
                    border: '1px solid #F2F2F2',
                    boxSizing: 'border-box',
                    marginBottom: 20,
                  }}>

        <div style={{
          width: '100%',
          height: 48,
          borderRadius: '10px 10px 0 0',
          background: 'linear-gradient(to right, #6D1EFF, #C800E9)',
        }}>
        </div>


        <div style={{
          position: "relative",
          width: '100%',
          // height: 169,
          borderRadius: '0 0 10px 10px',
          backgroundColor: 'white',
          padding: '34px 12px 16px 12px',
        }}>
          <div style={{
            backgroundColor: "white",
            borderRadius: 10,
            width: 36,
            height: 36,
            position: "absolute",
            top: -16,
            left: 12,
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>
            <img alt={'moment'} style={{height: 17.6, width: 24}} src={momentIconImg}/>
          </div>

          <SubTitle style={{marginBottom: 4}}>
            {componentData.explain}
          </SubTitle>
          <Title3>
            {componentData.title}
          </Title3>

          <InfoBox>
            <InfoBoxLeft>
              <InfoBoxLeftIcon source={heightIcon}/>
              <InfoBoxLeftTextArea>
                <InfoBoxLeftTextAreaBig>Height</InfoBoxLeftTextAreaBig>
                <InfoBoxLeftTextAreaSmall>cm</InfoBoxLeftTextAreaSmall>
              </InfoBoxLeftTextArea>
            </InfoBoxLeft>
            <InfoBoxRight>
              {componentData.height}
            </InfoBoxRight>
          </InfoBox>
          <InfoBox>
            <InfoBoxLeft>
              <InfoBoxLeftIcon source={topIcon}/>
              <InfoBoxLeftTextArea>
                <InfoBoxLeftTextAreaBig>Top</InfoBoxLeftTextAreaBig>
                <InfoBoxLeftTextAreaSmall>size</InfoBoxLeftTextAreaSmall>
              </InfoBoxLeftTextArea>
            </InfoBoxLeft>
            <InfoBoxRight>
              {componentData.top}
            </InfoBoxRight>
          </InfoBox>
          <InfoBox>
            <InfoBoxLeft>
              <InfoBoxLeftIcon source={bottomIcon}/>
              <InfoBoxLeftTextArea>
                <InfoBoxLeftTextAreaBig>Bottom</InfoBoxLeftTextAreaBig>
                <InfoBoxLeftTextAreaSmall>inch</InfoBoxLeftTextAreaSmall>
              </InfoBoxLeftTextArea>
            </InfoBoxLeft>
            <InfoBoxRight>
              {componentData.bottom}
            </InfoBoxRight>
          </InfoBox>
          <InfoBox>
            <InfoBoxLeft>
              <InfoBoxLeftIcon source={shoesIcon}/>
              <InfoBoxLeftTextArea>
                <InfoBoxLeftTextAreaBig>Shoes</InfoBoxLeftTextAreaBig>
                <InfoBoxLeftTextAreaSmall>cm</InfoBoxLeftTextAreaSmall>
              </InfoBoxLeftTextArea>
            </InfoBoxLeft>
            <InfoBoxRight>
              {componentData.shoes}
            </InfoBoxRight>
          </InfoBox>
          {/*<ButtonGroupAlignedRight>*/}
          {/*  <Button*/}
          {/*    onClick={onClickItemButton}*/}
          {/*    whileHover={{scale: 1.1}}*/}
          {/*    animate={itemDrawerButtonControl}*/}
          {/*    // whileTap={{scale: 0.8, transition: {duration: 0.1}}}*/}
          {/*  >👀 아이템 보기</Button>*/}
          {/*  <LikeButton*/}
          {/*    count={likeCount}*/}
          {/*    style={{marginLeft: 16}}*/}
          {/*    onClick={toggleLike}*/}
          {/*    active={like}*/}
          {/*  />*/}

          {/*</ButtonGroupAlignedRight>*/}
        </div>

      </motion.div>
    </>
  );
};

const InfoBox = styled.div`
  width: 100%;
  height: 64px;
  background-color: #F5F5F8;
  border-radius: 10px;
  margin-bottom: 12px;
  padding: 14px 20px 14px 14px;
  
  display: flex;
  align-items: center;
  justify-content: space-between;
`;


const InfoBoxLeft = styled.div`
display: flex;
align-items: center;
  height: 100%;
`;

const InfoBoxLeftIcon = styled.div<{source:  string}>`
  background-image: url(${props => props.source});
  background-size: cover;
  width: 36px;
  height: 36px;
`;

const InfoBoxLeftTextArea = styled.div`
  margin-left: 14px;
  display: flex;
  flex-direction: column;
  height: 100%;
`

const InfoBoxLeftTextAreaBig = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 21px;
  /* identical to box height */

  letter-spacing: -0.33px;

  color: #000000;
`;

const InfoBoxLeftTextAreaSmall = styled.div`
font-style: normal;
font-weight: normal;
font-size: 13px;
line-height: 17px;
letter-spacing: -0.33px;

/* secondary - text */

color: rgba(0, 0, 0, 0.5);
`;


const InfoBoxRight = styled.div`
display: flex;
align-items: center;
height: 100%;
  font-style: normal;
font-weight: 500;
font-size: 24px;
line-height: 31px;
text-align: right;
letter-spacing: -0.33px;
color: #A640FF;
`;

const SubTitle = styled.div`
          font-style: normal;
          font-weight: 500;
          font-size: 13px;
          line-height: 140%;
          /* or 18px */

          letter-spacing: -0.33px;

          color: rgba(0, 0, 0, 0.5);
          `;

const Title3 = styled.div`
          font-style: normal;
          font-weight: 500;
          font-size: 18px;
          line-height: 140%;
          /* or 25px */
          
          margin-bottom: 16px;

          letter-spacing: -0.33px;
          `

const ButtonGroupAlignedRight = styled.div`
          margin-top: 16px;
          display: flex;
          justify-content: flex-end;
          width: 100%;
          `;

const Button = styled(motion.div)`
          padding: 18px 16px;
          background-color: #BB6BD9;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          border-radius: 10px;

          font-style: normal;
          font-weight: 500;
          font-size: 15px;
          line-height: 140%;
          /* identical to box height, or 21px */

          text-align: center;
          letter-spacing: -0.33px;

          color: #FFFFFF;
          :hover {
          background-color: #9440b0;
          cursor: pointer;

          }
          :active {
          background-color: #9440b0;
          }
          `;

export default ModelInfoComponent;
