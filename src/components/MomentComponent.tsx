import React, {useState} from 'react';
import {motion, useAnimation, Variants} from "framer-motion";
import styled from "styled-components";

import LikeButton from './LikeButton';
import momentIconImg from "./moment.png";
import NewDrawer from "./NewDrawer";
import {MomentComponentFields} from "./ComponentDecision";
import {fullImageUrl} from "../utils";
import {useApi} from "../ApiProvider";

interface IProps {
  componentData: MomentComponentFields,
  userPk?: number,
}


const MomentComponent: React.FC<IProps> = ({componentData, userPk}) => {

  const [like, setLike] = useState((userPk !== undefined) ? (
      componentData.look.liked_users_pk_list.findIndex(pk => {
        return (pk === userPk)
      }) >= 0
    ) :
    false);
  const [likeCount, setLikeCount] = useState(componentData.look.like);
  const [showDrawer, setShowDrawer] = useState(false)

  const itemDrawerButtonControl = useAnimation();

  const api = useApi()

  const variants: Variants = {
    landing: {
      scale: 0.9
    },
    stable: {
      scale: 1
    }
  }

  function openItemDrawer() {
    setShowDrawer(true)
  }

  function closeItemDrawer() {
    setShowDrawer(false)
  }

  async function onClickItemButton() {
    await itemDrawerButtonControl.start({scale: 0.8, transition: {duration: 0.1}});
    itemDrawerButtonControl.start({scale: 1.0});
    openItemDrawer()
  }

  async function toggleLike() {
    try {
      if (like) {
        await api.get(`/contents/look/unlike/${componentData.look.pk}`);
        setLike(false);
        setLikeCount(likeCount - 1);
      } else {
        await api.get(`/contents/look/like/${componentData.look.pk}`);
        setLike(true);
        setLikeCount(likeCount + 1);
      }
    } catch (e) {
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
          componentData.look.main_img_url ? (
            <div style={{
              width: '100%',
              paddingTop: `${Math.floor(100 / componentData.look.main_img_aspect_ratio)}%`,
              backgroundColor: "white",
              borderRadius: '10px 10px 0 0',
              backgroundImage: `url(${fullImageUrl(componentData.look.main_img_url)})`,
              backgroundPositionX: "50%",
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
            <img alt={'moment'} style={{height: 17.6, width: 24}} src={momentIconImg}/>
          </div>

          <SubTitle style={{marginBottom: 4}}>
            {componentData.explain}
          </SubTitle>
          <Title3>
            {componentData.title}
          </Title3>
          <ButtonGroupAlignedRight>
            <Button
              onClick={onClickItemButton}
              whileHover={{scale: 1.1}}
              animate={itemDrawerButtonControl}
              // whileTap={{scale: 0.8, transition: {duration: 0.1}}}
            >👀 아이템 보기</Button>
            <LikeButton
              count={likeCount}
              style={{marginLeft: 16}}
              onClick={toggleLike}
              active={like}
            />

          </ButtonGroupAlignedRight>
        </div>

      </motion.div>
      <NewDrawer goodsList={componentData.look.items_pk_list} visible={showDrawer} onClose={closeItemDrawer}/>
    </>
  );
};

const SubTitle = styled.div`
          font-style: normal;
          font-weight: 500;
          font-size: 13px;
          line-height: 140%;
          /* or 18px */

          letter-spacing: -0.33px;

          color: rgba(0, 0, 0, 0.5);
          `;

const Title3 = styled.span`
          font-style: normal;
          font-weight: 500;
          font-size: 18px;
          line-height: 140%;
          /* or 25px */

          letter-spacing: -0.33px;
          `

const ButtonGroupAlignedRight = styled.div`
          margin-top: 16px;
          display: flex;
          justify-content: flex-end;
          width: 100%;
          `;

const Button = styled(motion.div)`
          padding: 18px 16px;
          background-color: #BB6BD9;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          border-radius: 10px;

          font-style: normal;
          font-weight: 500;
          font-size: 15px;
          line-height: 140%;
          /* identical to box height, or 21px */

          text-align: center;
          letter-spacing: -0.33px;

          color: #FFFFFF;
          :hover {
          background-color: #9440b0;
          cursor: pointer;

          }
          :active {
          background-color: #9440b0;
          }
          `;


export default MomentComponent;
