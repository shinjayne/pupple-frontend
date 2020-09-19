import React, {useEffect, useState} from 'react';
import {motion, Variants} from "framer-motion";
import styled from "styled-components";
import ImageChoice from "./ImageChoice";
import voteImg from "./vote.png";
import {ChoiceResponse, VoteComponentsFields} from "./ComponentDecision";
import {fullImageUrl} from "../utils";
import {useApi} from "../ApiProvider";

interface IProps {
  data: VoteComponentsFields,
  userPk?: number,
}


const VoteImageComponent: React.FC<IProps> = ({userPk, data}) => {

  const variants: Variants = {
    landing: {
      scale: 0.9
    },
    stable: {
      scale: 1
    }
  }



  const [showResult, setShowResult] = useState(false);
  const [selected, setSelected] = useState<ChoiceResponse | undefined>(undefined);
  const [selectAtThisSession, setSelectAtThisSession] = useState(false);
  const [percentMap , setPercentMap] = useState<{[k: string]: number}>({});

  const api = useApi()

  useEffect(() => {
    function whichIVoted(): ChoiceResponse | undefined {
      if (userPk === undefined) {
        return undefined
      }

      const votedChoices: ChoiceResponse[] = data.choices.filter(choice => choice.voted_users_pk_list.findIndex(pk => pk === userPk) >= 0)
      return votedChoices.length > 0 ? votedChoices[0] : undefined
    }
    const iVoted = whichIVoted()
    setShowResult(iVoted !== undefined)
    setSelected(iVoted);
  }, [userPk, data]);

  useEffect(() => {
    const idPercentMap :  { [k : string]: number } = {};

    data.choices.forEach(choiceData => {
      idPercentMap[`${choiceData.pk}`] = 0
    })

    const onlySelected = data.choices.filter(choiceData => choiceData.vote > 0 || (selected && choiceData.pk === selected.pk));
    onlySelected.forEach((choiceData, index) => {
      const isLast = index + 1 === onlySelected.length



      if (isLast) {
        idPercentMap[`${choiceData.pk}`] = 100 - Object.values(idPercentMap).reduce((buf, val) => buf + val , 0)
      }
      else  {
        const totalVote = data.choices.reduce((sumBuffer, choiceData) => {
          return sumBuffer + choiceData.vote
        }, 0)
        const amISelected = selected && (selected.pk === choiceData.pk)
        const addValue = amISelected && selectAtThisSession ? 1 : 0
        const totalVoteAddValue =  selectAtThisSession ? 1 : 0
        idPercentMap[`${choiceData.pk}`] = Math.round(((choiceData.vote + addValue) / (totalVote + totalVoteAddValue)) * 100)
      }
    })
    setPercentMap(idPercentMap);
  }, [selected, selectAtThisSession]);


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
              background: 'linear-gradient(to right, #9733EE, #7A1FC9)',
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
            <img alt={'voteImg'} style={{width: 24, height: 24}} src={voteImg}/>
          </div>


          <Title3>
            {data.title}
          </Title3>

          <SubTitle style={{marginTop: 8}}>
            {data.explain}
          </SubTitle>

          <ButtonGroup>
            {
              data.choices.map((choiceData, index) => {

                  const amISelected = selected && (selected.pk === choiceData.pk)


                  return (
                    <ImageChoice
                      selected={amISelected}
                      onClick={
                        async (value: ChoiceResponse) => {
                          if (!showResult) {
                            try {

                              await api.get(`/components/vote/choice/${value.pk}`)
                              setSelected(value)
                              setShowResult(true)
                              setSelectAtThisSession(true)
                            } catch (e) {
                              console.log(e)
                            }
                          }
                        }} data={choiceData} percent={showResult ? percentMap[`${choiceData.pk}`] : undefined}/>
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





styled(motion.div)`
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



export default VoteImageComponent;
