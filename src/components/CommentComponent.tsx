import React, {useEffect, useState} from 'react';
import {motion, Variants} from "framer-motion";
import commentIconImg from "./commentIcon.png";
import styled from "styled-components";
import {fullImageUrl} from "../utils";
import {Fade, Modal} from '@material-ui/core';
import {useApi} from "../ApiProvider";
import moment from "moment";
import CloseVector from "./closeVector.svg";
import CommentInput from "./CommentInput";


interface IProps {
  componentData: CommentComponentField
}

export interface CommentComponentField {
  pk: number,
  title: string,
  explain: string,
  img_url: string,
  img_aspect_ratio: number,
  comments: CommentResponse[],
}

export interface CommentResponse {
  pk: number,
  writer: string,
  comment: string,
  like: number,
  liked_user_pk_list: number[],
  created_at: string,
}

const Comment: React.FC<{ mode: 'white' | 'dark', message: string, writer: string, date: string, }> = ({message, writer, date, mode = 'dark'}) => {
  return (
    <>
      <SingleCommentDiv>
        <CommentMetaBar>
          <CommentMetaLeft mode={mode}>
            {writer}
          </CommentMetaLeft>

        </CommentMetaBar>
        <CommentTextBox>
          {message}
          <CommentMetaRight>
            {date}
          </CommentMetaRight>
        </CommentTextBox>
      </SingleCommentDiv>
    </>
  )
};

const CommentComponent: React.FC<IProps> = ({componentData}) => {

  const variants: Variants = {
    landing: {
      scale: 0.9
    },
    stable: {
      scale: 1
    }
  }

  const [commentInput, setCommentInput] = useState<string>('');
  const [comments, setComments] = useState<CommentResponse[]>([]);
  const [open, setOpen] = useState(false);

  const api = useApi();

  useEffect(() => {

    setComments(componentData.comments);
  }, [componentData.comments]);

  function onCommentInputChange(v: string) {
    setCommentInput(v);
  }

  function onClickMore() {
    setOpen(true);
  }

  function onClickClose() {
    setOpen(false);
  }

  async function onSubmitClick() {
    if (commentInput === '') {
      return;
    }
    try {
      setCommentInput('');
      const {data} = await api.post(`/components/comment/create/${componentData.pk}/`, {comment: commentInput}) as { data: CommentResponse };
      setComments([...comments, data]);
    } catch (e) {
      console.log(e);
      return;
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
          componentData.img_url ? (
            <div style={{
              width: '100%',
              paddingTop: `${Math.floor(100 / componentData.img_aspect_ratio)}%`,
              backgroundColor: "white",
              borderRadius: '10px 10px 0 0',
              backgroundImage: `url(${fullImageUrl(componentData.img_url)})`,
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
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>
            <img alt={'moment'} style={{height: 16, width: 16}} src={commentIconImg}/>
          </div>


          <Title3>
            {componentData.title}
          </Title3>
          <SubTitle style={{marginTop: 8}}>
            {componentData.explain}
          </SubTitle>

          {
            comments.slice(comments.length - 3).map(comment => {
              return (
                <Comment mode={"dark"} key={comment.pk}
                         date={moment(comment.created_at).format('MM.DD A hh:mm').replace('PM', '오후').replace('AM', '오전')}
                         message={comment.comment} writer={comment.writer}/>
              )
            })
          }
          <MoreButton onClick={onClickMore}>더보기</MoreButton>


          <CommentInput onSubmitClick={onSubmitClick} onChange={onCommentInputChange} value={commentInput}/>

        </div>

      </motion.div>

      <Modal
        closeAfterTransition
        open={open} children={
        <>
          <Fade
            in={open} exit={!open} children={
            <div style={{
              background: "linear-gradient(180.02deg, rgba(0, 0, 0, 0.7) 0.02%, rgba(0, 0, 0, 0.4) 63.34%, rgba(0, 0, 0, 0) 114.52%, #000000 114.52%)",
              width: '100vw',
              height: '100vh',
              overflowX: "hidden",
              overflowY: "auto",
              display: "flex",
              justifyContent: "center"
            }}>
              <ModalHeader>
                <img alt={'close'} onClick={onClickClose} src={CloseVector}/>
              </ModalHeader>
              <div style={{maxWidth: '400px', width: '100vw'}}>
                <DrawerScrollArea>
                  {
                    comments.map(comment => {
                      return (
                        <Comment mode={"white"} key={comment.pk}
                                 date={moment(comment.created_at).format('MM.DD A hh:mm').replace('PM', '오후').replace('AM', '오전')}
                                 message={comment.comment} writer={comment.writer}/>
                      )
                    })
                  }
                </DrawerScrollArea>
                <DrawerBottomArea>
                  <div style={{width: '100%', maxWidth: '400px', padding: 14}}>
                    <CommentInput onSubmitClick={onSubmitClick}
                                  onChange={onCommentInputChange} value={commentInput}/>
                  </div>
                </DrawerBottomArea>
              </div>
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

const SubTitle = styled.div`
          font-style: normal;
          font-weight: 500;
          font-size: 13px;
          line-height: 150%;
          /* or 18px */

          letter-spacing: -0.33px;

          color: rgba(0, 0, 0, 0.5);
          `;

const Title3 = styled.div`
        margin-bottom: 16px;
          font-style: normal;
          font-weight: 500;
          font-size: 18px;
          line-height: 140%;
          /* or 25px */

          letter-spacing: -0.33px;
          `

const SingleCommentDiv = styled.div`
  margin-bottom: 16px;
  width: 100%;
`;
const CommentMetaBar = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const CommentMetaLeft = styled.div<{ mode: string }>`
font-style: normal;
font-weight: normal;
font-size: 13px;
line-height: 17px;
margin-left: 6px;
/* identical to box height */

letter-spacing: -0.33px;

/* secondary - text */

color: ${props => props.mode === 'dark' ? 'rgba(0, 0, 0, 0.5)' : 'white'} ;
`;

const CommentMetaRight = styled.div`
font-style: normal;
font-weight: normal;
font-size: 13px;
line-height: 17px;
/* identical to box height */

margin-top : 10px;
letter-spacing: -0.33px;

/* secondary - text */

color: rgba(0, 0, 0, 0.5);
`;

const CommentTextBox = styled.div`
  
background: #F5F5F8;
border-radius: 10px;
padding: 10px;

font-style: normal;
font-weight: normal;
font-size: 15px;
line-height: 19px;
letter-spacing: -0.33px;

color: #000000;
`;


const DrawerScrollArea = styled.div`
  width: 100%;
  height: calc(100% - 66px);
  
  padding: 150px 16px 32px 16px;
  overflow-y: auto;
  overflow-x: hidden;
`;


const DrawerBottomArea = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  min-height: 66px;
  height: fit-content;
  
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CloseButton = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 10px;
  background: #A640FF;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.18);
  background-size: cover;
  background-position-x: 50%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MoreButton = styled.div`
font-style: normal;
font-weight: normal;
font-size: 15px;
line-height: 19px;
/* identical to box height */
letter-spacing: -0.33px;
padding-left: 10px;

/* primary */

width: 100%;
color: #A640FF;

cursor: pointer;
`

export default CommentComponent;
