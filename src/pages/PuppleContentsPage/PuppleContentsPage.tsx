import React, {useEffect, useState} from 'react';
import LandingCover from "../../components/LandingCover";
import Padding from "../../components/Padding";
import GateBannerComponent from "../../components/GateBannerComponent";
import MomentComponent from "../../components/MomentComponent";
import VoteComponent from "../../components/VoteComponent";
import VoteImageComponent from "../../components/VoteImageComponent";
import NewDrawer from "../../components/NewDrawer";
import MaxWidthRoot from "../../components/MaxWidthRoot";
import useRouter from "use-react-router";
import {useApi} from "../../ApiProvider";
import { CircularProgress } from '@material-ui/core';
import sample1 from '../../components/sample1.png';
import ComponentDecision from "../../components/ComponentDecision";
import styled from "styled-components";
import {motion, useAnimation} from "framer-motion";

interface IProps {
}

export interface YoutubeContentsInfo {
  title: string,
  creator?: {
    name: string,
    explain: string,
    profile_img_url: string,
  },
  link: string
}

export interface PuppleContentsResponse {
  pk: number,
  title: string,
  explain: string,
  img_url: string,
  components_pk_list: number[],
  youtube_contents_list: YoutubeContentsInfo[],
}

const PuppleContentsPage: React.FC<IProps> = () => {

  const {match} = useRouter<{ contentsId: string }>();
  const puppleContentsId = match.params.contentsId;

  const [contentsData, setContentsData] = useState<PuppleContentsResponse>();
  const [closed, setClosed] = useState(false)

  const animateYoutubeBox = useAnimation()

  const api = useApi();


  useEffect(() => {
    requestContentsData();

    async function requestContentsData() {
      try {
        const {data} = await api.get(`/contents/shoppable/${puppleContentsId}`) as {
          data: PuppleContentsResponse
        }

        setContentsData(data);
        animateYoutubeBox.start({height: 174, transition: {delay : 4}})
      } catch (e) {
        console.log(e);
        setContentsData({
          pk: 0,
          title: 'Error Page',
          explain: 'Error Occurred.',
          img_url: sample1,
          components_pk_list: [1,2,3,4],
          youtube_contents_list: [
            {
              title: 'yt title',
              link: 'https://youtube.com'
            }
          ]
        });
      }
    }

  }, [puppleContentsId]);

  async function onCloseYoutubeBox() {
    if (closed) {
      await animateYoutubeBox.start({height: 174})
      setClosed(false)
    }else {
      await animateYoutubeBox.start({height : 0})
      setClosed(true)
    }


  }

  return (
    <>
      {contentsData ? (
        <>
          <MaxWidthRoot>
            <LandingCover puppleContentsData={contentsData}/>
            <Padding>
              {contentsData.components_pk_list.map(componentId => {
                return (
                  <ComponentDecision componentId={componentId}/>
                )
              })}

            </Padding>
          </MaxWidthRoot>
  {/*        <FixedPlayer initial={{height: 0}} animate={ animateYoutubeBox }>*/}
  {/*          <PlayerHeader onClick={onCloseYoutubeBox}>*/}
  {/*            <PlayerClose />*/}
  {/*          </PlayerHeader>*/}
  {/*          <iframe width="256" height="144" src="https://www.youtube.com/embed/f-E-vIhxWt0" frameBorder="0"*/}
  {/*allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"*/}
  {/*allowFullScreen/>*/}
  {/*        </FixedPlayer>*/}
        </>
      ) : (
        <CircularProgress style={{color: '#6D1EFF'}} />
      )
      }
    </>
  );

};

const PlayerClose = styled.div`
  width: 20px;
  height: 5px;
  background-color: darkgray;
  border-radius: 2.5px;
`;

const PlayerHeader = styled.div`
  height: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const FixedPlayer = styled(motion.div)`
 position: fixed;
 //width: 256px;
 //height: 144px;
 padding: 0 10px 10px 10px  ;
 border-radius: 10px 10px 0 0;
 z-index: 1000;
 bottom: 0;
 right: 20px;
 background-color: white;
 border: 1px solid rgb(242, 242, 242);
`;

export default PuppleContentsPage;
