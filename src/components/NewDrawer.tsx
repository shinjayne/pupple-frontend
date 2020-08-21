import React from 'react';
import {Drawer} from "@material-ui/core";
import GoodsItemOverview from "./GoodsItemOverview";
import styled from "styled-components";

interface IProps {
  visible?: boolean,
  onClose?: () => void,
}


const NewDrawer: React.FC<IProps> = ({visible, onClose}) => {

  return (
    <>
      <Drawer
        anchor={'bottom'}
        open={visible} onClose={onClose}
        PaperProps={{
          style: {
            borderRadius: '10px 10px 0 0',
            padding: '20px 16px',
            height: '80vh',
            // max-height: '80vh',
            // min-height: '80vh',
            overflowX: 'hidden',
            overflowY: 'auto'
          }
        }}
      >

        <div style={{marginBottom: 20}}>
          <Title2>이 순간의 아이템들</Title2>
        </div>
        <GoodsGrid>
          <GoodsItemOverview/>
          <GoodsItemOverview/>
          <GoodsItemOverview/>
          <GoodsItemOverview/>
          <GoodsItemOverview/>
          <GoodsItemOverview/>
          <GoodsItemOverview/>
          <GoodsItemOverview/>
          <GoodsItemOverview/>
        </GoodsGrid>
      </Drawer>
    </>
  );
};

const StyledDrawer = styled(Drawer)`
  border-radius: 10px 10px 0 0;
  background-color: white;
  width: 100%;
  padding: 20px 16px;
  height: 80vh;
  max-height: 80vh;
  min-height: 80vh;
  overflow-x: hidden;
  overflow-y: auto;
`;

const GoodsGrid = styled.div`
  display: flex;  
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Title2 = styled.span`
font-style: normal;
font-weight: 600;
font-size: 18px;
line-height: 140%;
/* or 25px */

letter-spacing: -0.33px;

color: #000000;
`

export default NewDrawer;