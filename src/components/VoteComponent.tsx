import React, {useState} from 'react';
import {motion, Variants} from "framer-motion";
import styled from "styled-components";
import sample1 from './sample1.png';
import voteImgIcon from './vote.png';
import momentImg from './moment.png';
import {url} from "inspector";
import {ChoiceResponse, VoteComponentsFields} from "./ComponentDecision";
import {fullImageUrl} from "../utils";
import {useApi} from "../ApiProvider";
import TextChoice from "./TextChoice";

interface IProps {
  data: VoteComponentsFields,
}


const VoteComponent: React.FC<IProps> = ({data}) => {

  const variants: Variants = {
    landing: {
      scale: 0.9
    },
    stable: {
      scale: 1
    }
  }

  const api = useApi()
  const firstChoice = data.choices[0]
  const secondChoice = data.choices[1]
  const firstPercent = Math.round((firstChoice.vote / (firstChoice.vote + secondChoice.vote + 1)) * 100)
  const secondPercent = Math.round((secondChoice.vote / (firstChoice.vote + secondChoice.vote + 1)) * 100)


  const [selected, setSelected] = useState<ChoiceResponse>();

  async function clickSelect(firstOrSecond: 'first' | 'second') {
    const votePk = firstOrSecond ==='first' ? firstChoice.pk : secondChoice.pk
    try {
      await  api.get(`/components/vote/choice/${votePk}`)
      setSelected(firstOrSecond === 'first' ? firstChoice : secondChoice);
    }
    catch (e) {
      console.log(e)
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

        {
          data.img_url ? (
            <div style={{
              width: '100%',
              paddingTop: `${Math.floor(100 / data.img_aspect_ratio)}%`,
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
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>
            <img style={{width: 24, height: 24}} src={voteImgIcon}/>
          </div>

          <SubTitle style={{marginBottom: 4}}>
            {data.explain}
          </SubTitle>
          <Title3>
            {data.title}
          </Title3>
          {
            selected ? (

                <ButtonGroup>
                  <ButtonResult
                    whileHover={{scale: 1.1}}
                    // whileTap={{scale: 0.8, transition: {duration: 0.1}}}
                    initial={{
                      opacity: 0,
                      scale: 0.9,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                    }}

                  >
                    <TextChoice data={firstChoice} selected={firstChoice.pk === selected.pk} percent={firstPercent} />
                    <TextChoice data={secondChoice} selected={secondChoice.pk === selected.pk} percent={secondPercent} />

                  </ButtonResult>
                </ButtonGroup>
              ) :
              (
                <ButtonGroup>
                  <Button
                    onClick={()=> clickSelect('first')}
                    whileHover={{scale: 1.1}}
                    // whileTap={{scale: 0.8, transition: {duration: 0.1}}}
                  >{firstChoice.name}</Button>
                  <Button
                    onClick={() => clickSelect('second')}
                    whileHover={{scale: 1.1}}
                    // whileTap={{scale: 0.8, transition: {duration: 0.1}}}
                  >{secondChoice.name}</Button>
                </ButtonGroup>
              )
          }

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
  padding: 4px;
  width: 48%;
  border-radius: 11px;
`;

const SelectedGradientFont = styled.div`
font-style: normal;
font-weight: 600;
font-size: 24px;
line-height: 100%;
/* identical to box height, or 34px */

text-align: center;
letter-spacing: -0.33px;

/* logo3 */

color:  #6D1EFF;
margin-right: 8px;
flex-grow: 1;
`
const UnSelectedGradientFont = styled.div`
font-style: normal;
font-weight: 300;
font-size: 24px;
line-height: 100%;
/* identical to box height, or 34px */

text-align: center;
letter-spacing: -0.33px;

/* logo3 */

color: #BDBDBD;

margin-right: 8px;
flex-grow: 1;
`

const TextOnButton = styled.div`
  flex-grow: 2;
  font-style: normal;
font-weight: 500;
font-size: 15px;
line-height: 140%;

text-align: center;
letter-spacing: -0.33px;

color: #000000;
`;

const ButtonResultChildNotSelected = styled.div`

display: flex;
justify-content: flex-start;
align-items: center;
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
display: flex;
justify-content: flex-start;
align-items: center;
  padding: 18px 16px;
  background: #FFFFFF;
//box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
filter: drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.1));
  border-radius: 7px;
  
font-style: normal;
font-weight: 500;
font-size: 15px;
line-height: 140%;
width: 100%;
height: 100%;
/* identical to box height, or 21px */

text-align: center;
letter-spacing: -0.33px;

color: #000000;

`;

const Button = styled(motion.div)`
  padding: 18px 16px;
  background: #FFFFFF;
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


export default VoteComponent;
