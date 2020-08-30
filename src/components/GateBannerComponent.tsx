import React, {useState} from 'react';
import styled from "styled-components";
import {motion, useAnimation} from "framer-motion";
import {Fade, Modal} from "@material-ui/core";
import ImageChoice from "./ImageChoice";

import CloseVector from './Vector.svg';
import {ChoiceResponse, VoteComponentsFields} from "./ComponentDecision";
import {useApi} from "../ApiProvider";

interface IProps {
  data: VoteComponentsFields,
}


const GateBannerComponent: React.FC<IProps> = ({data}) => {

  const controls = useAnimation();
  const finishButtonAnimate = useAnimation();

  const api = useApi()

  const [open, setOpen] = useState(false)
  const [showResult, setShowResult] = useState(false)

  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  async function onClickBanner() {
    await controls.start({scale: 0.8, transition: {duration: 0.1}});
    controls.start({scale: 1.0});
    setOpen(true)
  }

  function onClickClose() {
    setOpen(false)
  }

  function onChangedOf(newVal: ChoiceResponse) {
    if (selectedIds.findIndex(value => value === newVal.pk) < 0) {
      if (data.allowed_choice_num <= selectedIds.length) {
        return
      }

      setSelectedIds([...selectedIds, newVal.pk]);
    } else {
      setSelectedIds(selectedIds.filter(id => id !== newVal.pk));
    }
  }

  async function onFinishClick() {
    await finishButtonAnimate.start({scale: 0.8, transition: {duration: 0.1}});
    finishButtonAnimate.start({scale: 1.0});

    try {
      selectedIds.forEach(async (id) => {
        await api.get(`/components/vote/choice/${id}`)
      })

      setShowResult(true)
    }catch (e) {
      console.log(e)
    }

  }

  const totalVote = data.choices.reduce((totalVoteBuffer, currentValue) => { return totalVoteBuffer + currentValue.vote}, 0)

  return (
    <>

      <Wrapper
        onClick={onClickBanner}
        animate={controls}
        whileHover={{scale: 1.1}}
        // whileTap={{scale: 0.8, transition: {duration: 0.1}}}
      >
        <BannerTitle>{data.title}</BannerTitle>
        <BannerDescription>{data.explain}</BannerDescription>
      </Wrapper>

      <Modal
        closeAfterTransition
        style={{position: "sticky"}}
        open={open} children={
        <>
          <Fade
            in={open} exit={!open} children={
            <div style={{
              background: "linear-gradient(19.48deg, #F3904F 7.86%, #3B4371 100%)",
              width: '100vw',
              height: '100vh',
              overflowX: "hidden",
              overflowY: "auto"
            }}>
              <ModalHeader>
                <img onClick={onClickClose} src={CloseVector}/>
              </ModalHeader>
              <ModalBody>
                <ModalTitleArea>
                  <ModalTitle>{data.title}</ModalTitle>
                  <ModalSubtitle>{data.explain}  ({data.allowed_choice_num || 0} 개 선택)</ModalSubtitle>
                </ModalTitleArea>
                {
                  data.choices.map(
                    (choiceData, index) => {
                      const isThisSelected = selectedIds.findIndex(value => value === choiceData.pk) >= 0
                      const thisPercent = Math.round((choiceData.vote + (isThisSelected ? 1 : 0)) / (totalVote + 1) * 100);
                      return (
                        <ImageChoice
                          percent={showResult ? thisPercent : undefined }
                          key={choiceData.pk}
                          selected={isThisSelected}
                          data={choiceData}
                          onClick={newVal => onChangedOf(newVal)}
                          style={{marginBottom: 16}}
                          majorThreshold={ Math.round(100 / (data.choices.length+ 1)) + 10 }
                        />
                      )
                    }

                  )
                }
              </ModalBody>
              {
                selectedIds.length > 0 && !showResult && (
                  <StickyBottomButton onClick={onFinishClick} animate={finishButtonAnimate}>
                    선택 완료
                  </StickyBottomButton>
                )
              }

            </div>
          }/>


        </>
      }/>

    </>
  );
};

const ModalHeader = styled.div`
  position: fixed;
  z-index: 1000;
  top: 0;
  width: 100%;
  padding: 18px 20px;
  color: white;
`;

const ModalTitleArea = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #FFFFFF;
  margin-bottom: 30px;
`;

const ModalTitle = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 140%;
  
  text-align: center;
  letter-spacing: -0.33px;
`;

const ModalSubtitle = styled.div`
  margin-top: 16px;
  font-weight: 300;
  font-size: 16px;
  line-height: 140%;
  /* or 22px */
  
  text-align: center;
  letter-spacing: -0.33px;
`;

const ModalBody = styled.div`
  padding: 140px 30px 240px 30px;
    display: flex;  
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const StickyBottomButton = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 16px;
  left: 16px;
  height: 60px;
  width: calc(100% - 32px);
  background: #BB6BD9;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 140%;
  /* or 21px */
  
  text-align: center;
  letter-spacing: -0.33px;
  color: #FFFFFF;
  :hover {
  cursor: pointer;
  }
`;

const BannerTitle = styled.div`
font-style: normal;
font-weight: 600;
font-size: 18px;
line-height: 140%;
/* or 25px */

text-align: center;
letter-spacing: -0.33px;

color: #FFFFFF;
`;

const BannerDescription = styled.div`
font-style: normal;
font-weight: 300;
font-size: 12px;
line-height: 140%;
/* identical to box height, or 17px */

text-align: center;
letter-spacing: -0.33px;

color: #FFFFFF;

margin-top: 4px;
`;

const Wrapper = styled(motion.div)`
/* logo3 */
padding: 20px 16px;

display: flex;
flex-direction: column;
align-items: center;
//background: conic-gradient(from 56.97deg at 50% 50%, #6D1EFF 0deg, #C800E9 30.8deg, #6D1EFF 360deg);
background: linear-gradient(to right, #6D1EFF, #C800E9);
border-radius: 10px;
width: 100%;
height: 80px;
margin-bottom: 20px;

:hover {
cursor: pointer;

}
`;

export default GateBannerComponent;
