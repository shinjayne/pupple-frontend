import React from 'react';
import './App.css';
import {HashRouter, Switch, Route} from 'react-router-dom';
import PuppleContentsPage from "./pages/PuppleContentsPage/PuppleContentsPage";
import ApiProvider from "./ApiProvider";
import ContentsListPage from "./pages/ContentsListPage/ContentsListPage";


function App() {

  return (
    <>
      <ApiProvider>
        <HashRouter>
          <Switch>
            <Route path={'/pupple/:contentsId'} component={PuppleContentsPage}/>
            <Route exact path={'/'} component={ContentsListPage}/>
          </Switch>
        </HashRouter>
      </ApiProvider>
    </>
  );
}

export default App;
