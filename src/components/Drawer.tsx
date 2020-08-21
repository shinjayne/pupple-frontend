import React from 'react';
import styled from "styled-components";
import {motion, Variants} from 'framer-motion';
import GoodsItemOverview from "./GoodsItemOverview";

interface IProps {
  visible?: boolean,
  onClose?: () => void,
}


const Drawer: React.FC<IProps> = ({visible = true, onClose}) => {

  const variants: Variants = {
    initial: {
      y: 1000,
    },
    stable: {
      y: 0,
    },
  }
  return (
    <>


      <>
        {visible &&
        <>
        <DrawerBackground onClick={onClose}/>
          <DrawerBody variants={variants} initial={'initial'}  animate={visible ? 'stable' : 'initial'} >
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
          </DrawerBody>
        </>
        }



      </>


    </>
  );
};

const DrawerBackground = styled.div`
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
`;
const DrawerBody = styled(motion.div)`
  position: fixed;
  z-index: 101;
  left: 0;
  top : 20vh;  
  border-radius: 10px 10px 0 0;
  background-color: white;
  width: 100%;
  padding: 20px 16px;
  height: 80vh;
  max-height: 80vh;
  min-height: 80vh;
  overflow-x: hidden;
  overflow-y: auto;
`

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

export default Drawer;
