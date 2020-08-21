import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import MomentComponent from "./components/MomentComponent";
import MaxWidthRoot from "./components/MaxWidthRoot";
import Drawer from "./components/Drawer";
import VoteComponent from "./components/VoteComponent";
import NewDrawer from "./components/NewDrawer";
import VoteImageComponent from "./components/VoteImageComponent";
import GateBannerComponent from "./components/GateBannerComponent";
import LandingCover from "./components/LandingCover";
import Padding from "./components/Padding";

function App() {
  const [modalVisible, setModalVisible] = useState(false)

  return (
    <>

      <MaxWidthRoot>
        <LandingCover/>
        <Padding>
          <GateBannerComponent/>
          <MomentComponent
            onClickItemShow={showDrawer}
          />
          <VoteComponent/>
          <VoteImageComponent/>


          {/*<Drawer visible={modalVisible} onClose={closeDrawer}/>*/}
          <NewDrawer visible={modalVisible} onClose={closeDrawer}/>
        </Padding>
      </MaxWidthRoot>
    </>
  );

  function showDrawer() {
    setModalVisible(true)
  }

  function closeDrawer() {
    setModalVisible(false)
  }
}

export default App;
