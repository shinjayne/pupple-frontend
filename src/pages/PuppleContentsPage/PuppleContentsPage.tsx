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

  const api = useApi();


  useEffect(() => {
    requestContentsData();

    async function requestContentsData() {
      try {
        const {data} = await api.get(`/contents/shoppable/${puppleContentsId}`) as {
          data: PuppleContentsResponse
        }

        setContentsData(data);
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
        </>
      ) : (
        <CircularProgress style={{color: '#6D1EFF'}} />
      )
      }
    </>
  );

};

export default PuppleContentsPage;
