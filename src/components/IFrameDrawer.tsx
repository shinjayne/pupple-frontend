import React from 'react';
import {Drawer} from "@material-ui/core";
import styled from "styled-components";
import CloseCircleIcon from './close-circle.png';

interface IProps {
  visible?: boolean,
  onClose?: () => void,
  link: string,
  title?: string,
}


const IFrameDrawer: React.FC<IProps> = ({title,link, visible, onClose}) => {

  return (
    <>
      <Drawer
        anchor={'bottom'}
        open={visible} onClose={onClose}
        PaperProps={{
          style: {
            borderRadius: '10px 10px 0 0',
            padding: '20px 0',
            height: '80vh',
            // max-height: '80vh',
            // min-height: '80vh',
            overflowX: 'hidden',
            overflowY: 'auto'
          }
        }}
      >
        <img alt={'close'} width={24} height={24} src={CloseCircleIcon}
        onClick={onClose}
             style={{
          position: "fixed",
          zIndex: 100,
          bottom: 'calc(80% + 16px)',
          left : '49%',
          cursor: 'pointer'
        }} />
        <div style={{marginBottom: 20, padding: '0 16px'}}>
          <Title2>{title || link}</Title2>
        </div>

        <iframe
          src={link}
          title={title}
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
          }}
        />
      </Drawer>
    </>
  );
};



const Title2 = styled.span`
font-style: normal;
font-weight: 600;
font-size: 18px;
line-height: 140%;
/* or 25px */

letter-spacing: -0.33px;

color: #000000;
`

export default IFrameDrawer;
