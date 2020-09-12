import React, {useEffect, useState} from 'react';
import ContentsOverview from '../../components/ContentsOverview';
import MaxWidthRoot from "../../components/MaxWidthRoot";
import {useApi} from "../../ApiProvider";
import {PuppleContentsResponse} from "../PuppleContentsPage/PuppleContentsPage";
import Padding from "../../components/Padding";

interface IProps {
}


const ContentsListPage: React.FC<IProps> = () => {

  const api = useApi()

  const [contentsList, setContentsList] = useState<PuppleContentsResponse[]>();

  useEffect(() => {
    requestList();

    async function requestList() {
      try {
        const response = await api.get<{ data: PuppleContentsResponse[] }>('/contents/shoppable')
        setContentsList(response.data.data)
      } catch (e) {
        console.log(e);
      }
    }

  }, [api])
  return (
    <>
      <MaxWidthRoot>
        <Padding>
          {contentsList && contentsList.map(contents => <ContentsOverview key={contents.pk} data={contents}/>)}
        </Padding>
      </MaxWidthRoot>
    </>
  );
};

export default ContentsListPage;
