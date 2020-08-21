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

function App() {
  const [modalVisible, setModalVisible] = useState(false)

  return (
    <MaxWidthRoot>
      <GateBannerComponent />
      <MomentComponent
        onClickItemShow={showDrawer}
      />
      <VoteComponent />
      <VoteImageComponent />


      {/*<Drawer visible={modalVisible} onClose={closeDrawer}/>*/}
      <NewDrawer visible={modalVisible} onClose={closeDrawer}/>
    </MaxWidthRoot>
  );

  function showDrawer() {
    setModalVisible(true)
  }
  function closeDrawer() {
    setModalVisible(false)
  }
}

export default App;
