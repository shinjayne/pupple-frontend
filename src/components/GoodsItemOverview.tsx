import React from 'react';
import styled from "styled-components";
import sample1 from './sample1.png';
import {GoodsInfo} from "./ComponentDecision";
import {fullImageUrl} from "../utils";

interface IProps {
  goods: GoodsInfo,
}


const GoodsItemOverview: React.FC<IProps> = ({goods}) => {

  function newWindow() {
    window.open(goods.link);
  }

  return (
    <>
      <Wrapper onClick={newWindow} source={fullImageUrl(goods.main_img_url)}>

        <TextNormal style={{marginBottom: 4}}>{goods.name}</TextNormal>
        <TextBold>₩ {goods.price.toLocaleString()}</TextBold>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div<{source: string}>`
display: flex;
flex-flow: column nowrap;
justify-content: flex-end;
align-items: flex-start;

  border-radius: 10px;
  width: calc((100vw - 16px * 3) / 2);
  height: calc((100vw - 16px * 3) / 2);
  
  padding: 12px;
  
  background-image: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.15) 100%), url(${props => props.source});
  background-size: cover;
  :hover {
  cursor: pointer;
  }
/* line */

border: 1px solid #F2F2F2;
margin-bottom: 16px;
`

const TextNormal = styled.span`
font-weight: 500;
font-size: 12px;
line-height: 14px;
/* identical to box height */


color: #FFFFFF;
`



const TextBold = styled.span`
font-style: normal;
font-weight: bold;
font-size: 14px;
line-height: 16px;

color: #FFFFFF;
`;

export default GoodsItemOverview;
