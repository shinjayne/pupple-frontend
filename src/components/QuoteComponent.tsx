import React from 'react';
import {QuoteComponentsFields} from "./ComponentDecision";
import {motion, Variants} from "framer-motion";
import quoteIconImg from "./quoteIcon.png";
import styled from "styled-components";

interface IProps {
  componentData: QuoteComponentsFields
}


const QuoteComponent: React.FC<IProps> = ({componentData}) => {

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
          height: 58,
          borderRadius: '10px 10px 0 0',
          backgroundColor: 'white',
        }}>
        </div>


        <div style={{
          position: "relative",
          width: '100%',
          // height: 169,
          borderRadius: '0 0 10px 10px',
          backgroundColor: 'white',
          padding: '34px 24px 40px 24px',
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
            <img alt={'moment'} style={{height: 11, width: 16}} src={quoteIconImg}/>
          </div>


          <Title3>
            {componentData.title}
          </Title3>
          <SubTitle style={{marginTop: 8}}>
            {componentData.explain}
          </SubTitle>
        </div>

      </motion.div>
    </>
  );
};


const SubTitle = styled.div`
          font-style: normal;
          font-weight: 500;
          font-size: 13px;
          line-height: 150%;
          /* or 18px */

          letter-spacing: -0.33px;

          color: rgba(0, 0, 0, 0.5);
          text-align: center;
          `;

const Title3 = styled.div`
          font-style: normal;
          font-weight: 500;
          font-size: 18px;
          line-height: 140%;
          /* or 25px */

          letter-spacing: -0.33px;
          text-align: center;
          `
export default QuoteComponent;
