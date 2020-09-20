import React, {useEffect, useState} from 'react';
import {useApi} from "../ApiProvider";
import MomentComponent from "./MomentComponent";
import FullScreenVoteComponent from "./FullScreenVoteComponent";
import VoteImageComponent from "./VoteImageComponent";
import VoteComponent from "./VoteComponent";
import useUserPk from "../hooks/useUserPk";
import ModelInfoComponent, {ModelInfoComponentFields} from "./ModelInfoComponent";
import CommentComponent, {CommentComponentField} from "./CommentComponent";
import QuoteComponent from "./QuoteComponent";

interface IProps {
  componentId: number
}

export interface GoodsInfo {
  pk: string,
  explain: string,
  name: string,
  category: string,
  main_img_url: string,
  price: number,
  tag_pk_list: number[],
  link: string,
}

export interface MomentComponentFields {
  title: string,
  explain: string,
  want_to_promote: boolean,
  look: {
    pk: number,
    title: string,
    main_img_url: string,
    main_img_aspect_ratio: number,
    like: number,
    items_pk_list: GoodsInfo[],
    liked_users_pk_list: number[]
  }
}

export interface VoteComponentsFields {
  title: string,
  explain: string,
  want_to_promote: boolean,
  img_url?: string,
  img_aspect_ratio: number,
  allowed_choice_num: number,
  choices: ChoiceResponse[]
}

export interface QuoteComponentsFields {
  title: string,
  explain: string,
  want_to_promote: boolean,
}

export interface ChoiceResponse {
  pk: number,
  name: string,
  img_url?: string,
  vote: number,
  voted_users_pk_list: []
}

export interface ComponentResponse {
  type: ComponentType
  fields: MomentComponentFields | VoteComponentsFields | ModelInfoComponentFields | CommentComponentField
}

type ComponentType =
  "LookItemInfoComponent"
  | "VoteComponent"
  | "ItemCategoryInfoComponent"
  | "ModelInfoComponent"
  | "CommentComponent"
  | "QuoteComponent";

const ComponentDecision: React.FC<IProps> = ({componentId}) => {

  const api = useApi();
  const userPk = useUserPk()
  const [componentInfo, setComponentInfo] = useState<ComponentResponse>();


  useEffect(() => {
    requestData()

    async function requestData() {
      try {
        const {data} = await api.get(`/components/${componentId}`) as { data: ComponentResponse }
        setComponentInfo(data)
      } catch (e) {
        console.log(e);
      }
    }
  }, [componentId, api])

  switch (componentInfo?.type) {
    case "LookItemInfoComponent":
      return (
        <>
          <MomentComponent userPk={userPk} componentData={componentInfo.fields as MomentComponentFields}/>
        </>
      )
    case "VoteComponent": {
      const voteComponentData = componentInfo.fields as VoteComponentsFields
      if (voteComponentData.want_to_promote) {
        return (
          <FullScreenVoteComponent userPk={userPk} data={voteComponentData}/>
        )
      } else if (voteComponentData.choices.length === 0) {
        return <></>
      } else if (voteComponentData.choices[0].img_url) {
        return (
          <VoteImageComponent userPk={userPk} data={voteComponentData}/>
        )
      } else {
        return (
          <VoteComponent userPk={userPk} data={voteComponentData}/>
        )
      }
    }
    case "ModelInfoComponent": {
      return (
        <ModelInfoComponent componentData={componentInfo.fields as ModelInfoComponentFields}/>
      )
    }
    case "CommentComponent": {
      return (
        <CommentComponent componentData={componentInfo.fields as CommentComponentField}/>
      )
    }
    case "QuoteComponent": {
      return (
        <QuoteComponent componentData={componentInfo.fields as QuoteComponentsFields}/>
      )
    }
    case "ItemCategoryInfoComponent":
    default:
      return (
        <>
        </>
      );
  }

};

export default ComponentDecision;
