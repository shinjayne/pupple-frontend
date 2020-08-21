import React, {useState} from 'react';
import {motion, Variants} from "framer-motion";
import styled from "styled-components";
import sample1 from './sample1.png';
import {url} from "inspector";
import LikeButton from './LikeButton';

interface IProps {
  onClickItemShow: () => void,
}


const MomentComponent: React.FC<IProps> = ({onClickItemShow}) => {

  const [like, setLike] = useState(false);

  const variants: Variants = {
    landing: {
      scale: 0.9
    },
    stable: {
      scale: 1
    }
  }

  function toggleLike() {
    setLike(!like);
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
          height: 350,
          backgroundColor: "purple",
          borderRadius: '10px 10px 0 0',
          backgroundImage: `url(${sample1})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat"
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

          <Title3>
            세번째 가을룩 소개 장면
          </Title3>
          <ButtonGroupAlignedRight>
            <Button
              onClick={onClickItemShow}
              whileHover={{scale: 1.1}}
              whileTap={{scale: 0.8, transition: {duration: 0.1}}}
            >👀 아이템 보기</Button>
            <LikeButton
              style={{marginLeft: 16}}
              onClick={toggleLike}
              active={like}
            />

          </ButtonGroupAlignedRight>
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

// const LikeButton = styled(motion.div)`
//   padding: 18px 16px;
//   background-color: white;
//   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
//   border-radius: 10px;
//
//   font-style: normal;
// font-weight: 500;
// font-size: 15px;
// line-height: 140%;
// /* identical to box height, or 21px */
//
// text-align: center;
// letter-spacing: -0.33px;
//
// color: #BDBDBD;
//
// :hover {
// background-color: #d4cece;
// cursor: pointer;
//
// }
// :active {
// background-color: #d4cece;
// }
// `;
//
// const GradientWrapper = styled.div`
//   position: relative;
//   background: linear-gradient(to right, #6D1EFF, #C800E9);
//   padding: 2px;
//   border-radius: 11px;
//
// `;

export default MomentComponent;
