import React, {useState} from 'react';
import styled from "styled-components";
import OutLinkIconImg from './Outlink.png';
import {GoodsInfo} from "./ComponentDecision";
import {fullImageUrl} from "../utils";
import {useApi} from "../ApiProvider";
import IFrameDrawer from "./IFrameDrawer";

interface IProps {
  goods: GoodsInfo,
}


const GoodsItemOverview: React.FC<IProps> = ({goods}) => {

  const api = useApi()
  const [iFrameVisible, setIFrameVisible] = useState(false)

  async function newWindow() {
    try {
      await api.get(`/contents/item/hit/${goods.pk}`)
      setIFrameVisible(true)
    }
    catch (e){
      console.log(e)
    }


  }

  return (
    <>
      <Wrapper onClick={newWindow} source={fullImageUrl(goods.main_img_url)}>

        <OverlayBox>
          <TextArea>
            <TextNormal style={{marginBottom: 4}}>{goods.name}</TextNormal>
            <TextBold>₩ {goods.price.toLocaleString()}</TextBold>
          </TextArea>
          <img width={16} height={16} src={OutLinkIconImg}/>
        </OverlayBox>

      </Wrapper>
      <IFrameDrawer title={goods.name} link={goods.link} visible={iFrameVisible} onClose={()=>setIFrameVisible(false)}/>
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

const OverlayBox = styled.div`
width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const TextArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
`;

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
