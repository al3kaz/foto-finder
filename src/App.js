import React from 'react';
import {Switch, Route} from 'react-router-dom';

import HomePage from './pages/homePage/homePage-component';
import SearchOverview from './pages/searchOverviw/SearchOverview-component'

import './App.css';

function App() {

  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={HomePage}/>
        <Route exact path="/:Id" component={SearchOverview}/>
      </Switch>
    </div>
  );
}
export default App;
