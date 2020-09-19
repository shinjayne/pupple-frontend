import React, {CSSProperties, useState} from 'react';
import {Button, Input} from "@material-ui/core";
import styled from "styled-components";

interface IProps {
  onChange: (v: string) => void,
  value: string,
  onSubmitClick: () => any,
  style?: CSSProperties,
}


const CommentInput: React.FC<IProps> = ({value, onChange, onSubmitClick, style}) => {


  function onCommentInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    onChange(event.target.value);
  }

  return (
    <>
      <Container style={style}>
        <StyledInput placeholder={'자유롭게 댓글을 남겨보세요!'} disableUnderline={true} multiline={true} value={value} onChange={onCommentInputChange}/>
        <StyledButton onClick={onSubmitClick}>등록</StyledButton>
      </Container>
    </>
  );
};

const Container = styled.div`

display: flex;
align-items: flex-end;

background: #FFFFFF;
margin-top: 16px;
border: 1px solid #000000;
box-sizing: border-box;
border-radius: 10px;
padding: 10px;
`

const StyledInput = styled(Input)`
font-style: normal;
font-weight: normal;
font-size: 15px;
line-height: 19px;
display: flex;
align-items: center;
letter-spacing: -0.33px;
width: 90%;
padding: 0;
`

const StyledButton = styled.div`
font-weight: 600;
font-size: 15px;
line-height: 19px;
display: flex;
align-items: center;
text-align: center;
letter-spacing: -0.33px;

color: #A640FF;
  cursor: pointer;
`;

export default CommentInput;
