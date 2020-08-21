import React from 'react';
import styled from "styled-components";
import sample1 from './sample1.png';

interface IProps {
}


const GoodsItemOverview: React.FC<IProps> = () => {

  return (
    <>
      <Wrapper>

        <TextNormal style={{marginBottom: 4}}>하의</TextNormal>
        <TextBold>₩ 19,000</TextBold>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
display: flex;
flex-flow: column nowrap;
justify-content: flex-end;
align-items: flex-start;

  border-radius: 10px;
  width: calc((100vw - 16px * 3) / 2);
  height: calc((100vw - 16px * 3) / 2);
  
  padding: 12px;
  
background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.15) 100%);
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
