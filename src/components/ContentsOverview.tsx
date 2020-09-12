import React from 'react';
import {motion, Variants} from "framer-motion";
import {PuppleContentsResponse} from "../pages/PuppleContentsPage/PuppleContentsPage";
import {Link} from "react-router-dom";
import {fullImageUrl} from "../utils";

interface IProps {
  data: PuppleContentsResponse,
}


const ContentsOverview: React.FC<IProps> = ({data}) => {

  const variants: Variants = {
    landing: {
      scale: 0.9
    },
    stable: {
      scale: 1
    }
  }
  return (
    <>
      <Link to={`/pupple/${data.pk}`}>
        <motion.div variants={variants} initial={'landing'} animate={'stable'}
                    style={{
                      borderRadius: 10,
                      backgroundColor: 'white',
                      border: '1px solid #F2F2F2',
                      boxSizing: 'border-box',
                      marginBottom: 20,
                      height: 300,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}>
          <div>
            [{data.pk}] {data.title}
          </div>
          <img alt={data.title} src={fullImageUrl(data.img_url)} width={100}/>
        </motion.div>
      </Link>
    </>
  );
};

export default ContentsOverview;
