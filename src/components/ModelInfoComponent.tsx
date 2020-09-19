import React from 'react';
import {motion, Variants} from "framer-motion";
import infoIconImg from "./infoVector.png";
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
  height_unit : string,
  top: string,
  top_unit: string,
  bottom: string,
  bottom_unit: string,
  shoes: string
  shoes_unit: string,
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
          background: 'linear-gradient(to right, #9733EE, #7A1FC9)',
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
            <img alt={'moment'} style={{height: 16, width: 6}} src={infoIconImg}/>
          </div>


          <Title3>
            {componentData.title}
          </Title3>
          <SubTitle style={{marginTop: 4, marginBottom : 16}}>
            {componentData.explain}
          </SubTitle>
          {
            componentData && componentData.height !== '' && (
              <InfoBox>
                <InfoBoxLeft>
                  <InfoBoxLeftIcon source={heightIcon}/>
                  <InfoBoxLeftTextArea>
                    <InfoBoxLeftTextAreaBig>Height</InfoBoxLeftTextAreaBig>
                    <InfoBoxLeftTextAreaSmall>{componentData.height_unit}</InfoBoxLeftTextAreaSmall>
                  </InfoBoxLeftTextArea>
                </InfoBoxLeft>
                <InfoBoxRight>
                  {componentData.height}
                </InfoBoxRight>
              </InfoBox>
            )
          }

          {
            componentData.top && componentData.top !== '' && (
              <InfoBox>
                <InfoBoxLeft>
                  <InfoBoxLeftIcon source={topIcon}/>
                  <InfoBoxLeftTextArea>
                    <InfoBoxLeftTextAreaBig>Top</InfoBoxLeftTextAreaBig>
                    <InfoBoxLeftTextAreaSmall>{componentData.top_unit}</InfoBoxLeftTextAreaSmall>
                  </InfoBoxLeftTextArea>
                </InfoBoxLeft>
                <InfoBoxRight>
                  {componentData.top}
                </InfoBoxRight>
              </InfoBox>
            )}

          {
            componentData.bottom && componentData.bottom !== '' && (
              <InfoBox>
                <InfoBoxLeft>
                  <InfoBoxLeftIcon source={bottomIcon}/>
                  <InfoBoxLeftTextArea>
                    <InfoBoxLeftTextAreaBig>Bottom</InfoBoxLeftTextAreaBig>
                    <InfoBoxLeftTextAreaSmall>{componentData.bottom_unit}</InfoBoxLeftTextAreaSmall>
                  </InfoBoxLeftTextArea>
                </InfoBoxLeft>
                <InfoBoxRight>
                  {componentData.bottom}
                </InfoBoxRight>
              </InfoBox>
            )
          }
          {
            componentData.shoes && componentData.shoes !== '' && (
              <InfoBox>
                <InfoBoxLeft>
                  <InfoBoxLeftIcon source={shoesIcon}/>
                  <InfoBoxLeftTextArea>
                    <InfoBoxLeftTextAreaBig>Shoes</InfoBoxLeftTextAreaBig>
                    <InfoBoxLeftTextAreaSmall>{componentData.shoes_unit}</InfoBoxLeftTextAreaSmall>
                  </InfoBoxLeftTextArea>
                </InfoBoxLeft>
                <InfoBoxRight>
                  {componentData.shoes}
                </InfoBoxRight>
              </InfoBox>
            )}
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

const InfoBoxLeftIcon = styled.div<{ source: string }>`
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


export default ModelInfoComponent;
