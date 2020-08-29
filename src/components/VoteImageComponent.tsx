import React, {useState} from 'react';
import {motion, Variants} from "framer-motion";
import styled from "styled-components";
import ImageChoice from "./ImageChoice";
import voteImg from "./vote.png";
import {VoteComponentsFields} from "./ComponentDecision";
import {fullImageUrl} from "../utils";

interface IProps {
  data: VoteComponentsFields,
}


const VoteImageComponent: React.FC<IProps> = ({data}) => {

  const variants: Variants = {
    landing: {
      scale: 0.9
    },
    stable: {
      scale: 1
    }
  }
  const [showResult, setShowResult] = useState(false);


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
        {
          data.img_url ? (
            <div style={{
              width: '100%',
              height: `${Math.floor(100 / data.img_aspect_ratio)}%`,
              backgroundColor: "white",
              borderRadius: '10px 10px 0 0',
              backgroundImage: `url(${fullImageUrl(data.img_url)})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat"
            }}>
            </div>

          ) : (
            <div style={{
              width: '100%',
              height: 48,
              borderRadius: '10px 10px 0 0',
              background: 'linear-gradient(to right, #6D1EFF, #C800E9)',
            }}>
            </div>
          )
        }


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
            display: 'flex',
            justifyContent: "center",
            alignItems: "center",
          }}>
            <img style={{width: 24, height: 24}} src={voteImg}/>
          </div>

          <SubTitle style={{marginBottom: 4}}>
            {data.explain}
          </SubTitle>
          <Title3>
            {data.title}
          </Title3>

          <ButtonGroup>
            {
              data.choices.map((choiceData, index) => {
                  const totalVote = data.choices.reduce((sumBuffer, choiceData) => {
                    return sumBuffer + choiceData.vote
                  }, 0)

                  return (
                    <ImageChoice
                      immutable={showResult}
                      onChanged={
                      (value : boolean) => {
                        if (value) {
                          setShowResult(true)
                        }
                    }} data={choiceData} percent={showResult ? Math.round(choiceData.vote / totalVote * 100) : undefined}/>
                  )
                }
              )
            }
          </ButtonGroup>


        </div>

      </motion.div>
    </>
  );
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
