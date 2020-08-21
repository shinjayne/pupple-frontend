import React, {useState} from 'react';
import {motion, Variants} from "framer-motion";
import styled from "styled-components";
import sample1 from './sample1.png';
import {url} from "inspector";

interface IProps {

}


const VoteImageComponent: React.FC<IProps> = () => {

  const variants: Variants = {
    landing: {
      scale: 0.9
    },
    stable: {
      scale: 1
    }
  }

  const [showResult, setShowResult] = useState(false);
  const [isFirst, setIsFirst] = useState(false);

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
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)'
          }}/>

          <SubTitle style={{marginBottom: 4}}>
            실용성 좋은 가방 고르기
          </SubTitle>
          <Title3>
            가을에 더 자주 들 것 같은 가방은?
          </Title3>
          {
            showResult ? (

                <ButtonGroup>
                  <ButtonResult
                    whileHover={{scale: 1.1}}
                    whileTap={{scale: 0.8, transition: {duration: 0.1}}}
                    initial={{
                      opacity: 0,
                      scale: 0.9,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                    }}

                  >
                    <ButtonResultChildNotSelected>싸다</ButtonResultChildNotSelected>
                    <GradientWrapper>
                      <ButtonResultChildSelected>😭비싸다</ButtonResultChildSelected>
                    </GradientWrapper>
                  </ButtonResult>
                </ButtonGroup>
              ) :
              (
                <ButtonGroup>
                  <ImageVoteButton
                    onClick={openResult}
                    whileHover={{scale: 1.1}}
                    whileTap={{scale: 0.8, transition: {duration: 0.1}}}
                  >
                    <ButtonImage source={sample1}/>
                    🚀싸다</ImageVoteButton>
                  <ImageVoteButton
                    onClick={openResult}
                    whileHover={{scale: 1.1}}
                    whileTap={{scale: 0.8, transition: {duration: 0.1}}}
                  >
                    <ButtonImage source={sample1}/>
                    😭비싸다</ImageVoteButton>
                </ButtonGroup>
              )
          }

        </div>

      </motion.div>
    </>
  );

  function openResult() {
    setShowResult(true);
  }
};

const Wrapper = styled.div`
border: 1px solid #F2F2F2;
box-sizing: border-box;
`;

const Title3 = styled.span`
font-style: normal;
font-weight: 500;
font-size: 18px;
line-height: 140%;
/* or 25px */

letter-spacing: -0.33px;
`

const SubTitle = styled.div`
font-style: normal;
font-weight: 500;
font-size: 13px;
line-height: 140%;
/* or 18px */

letter-spacing: -0.33px;

color: rgba(0, 0, 0, 0.5);
`;

const ButtonGroup = styled.div`
  margin-top: 16px;
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const ButtonResult = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  background: #FFFFFF;
box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  
font-style: normal;
font-weight: 500;
font-size: 15px;
line-height: 140%;
width: 100%;
/* identical to box height, or 21px */

text-align: center;
letter-spacing: -0.33px;

color: #000000;
:hover {
cursor: pointer;
}
`;

const GradientWrapper = styled.div`
  position: relative;
  background: linear-gradient(to right, #6D1EFF, #C800E9);
  padding: 2px;
  width: 48%;
  border-radius: 11px;
`;

const ButtonResultChildNotSelected = styled.div`
    width: 48%;
    padding: 18px 16px;
  background: #FFFFFF;
  border-radius: 10px;
  
font-style: normal;
font-weight: 500;
font-size: 15px;
line-height: 140%;
/* identical to box height, or 21px */

text-align: center;
letter-spacing: -0.33px;

color: #000000;
`;

const ButtonResultChildSelected = styled.div`
  padding: 18px 16px;
  background: #FFFFFF;
//box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
filter: drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.1));
  border-radius: 10px;
  
font-style: normal;
font-weight: 500;
font-size: 15px;
line-height: 140%;
width: 100%;
/* identical to box height, or 21px */

text-align: center;
letter-spacing: -0.33px;

color: #000000;

`;

const ImageVoteButton = styled(motion.div)`
  padding: 12px;
background: #F2F2F2;
box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  
font-style: normal;
font-weight: 500;
font-size: 15px;
line-height: 140%;
width: 48%;
/* identical to box height, or 21px */

text-align: center;
letter-spacing: -0.33px;

color: #000000;
:hover {
background-color: #d4cece;
cursor: pointer;

}
:active {
background-color: #d4cece;
}
`;

const ButtonImage = styled.div<{ source: string }>`
  background-image: url(${props => props.source});
            background-size: cover;
          background-repeat: no-repeat;
         
          padding-top: 100%;
          width: 100%;
          margin-bottom: 10px;
          border-radius: 10px;
          
`;

export default VoteImageComponent;
