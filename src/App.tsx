import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import MomentComponent from "./components/MomentComponent";
import MaxWidthRoot from "./components/MaxWidthRoot";
import Drawer from "./components/Drawer";
import VoteComponent from "./components/VoteComponent";
import NewDrawer from "./components/NewDrawer";

function App() {
  const [modalVisible, setModalVisible] = useState(false)

  return (
    <MaxWidthRoot>
      <MomentComponent
        onClickItemShow={showDrawer}
      />
      <VoteComponent />


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
