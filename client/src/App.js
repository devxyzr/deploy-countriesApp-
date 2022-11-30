import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandigPage.jsx';
import Nav from './components/Nav/Nav';
import Home from './components/Home/Home';
import CountryDetail from './components/CountryDetail/CountryDetail';
import CreateActivityComponent from './components/CreateActivity/CreateActivity';
import Activities from './components/Actitvities/Activities';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path={'/'} component={Nav} />
        </Switch>
        <Route exact path={'/countries'} component={Home} />
        <Route exact path={'/countries/:id'} component={CountryDetail} />
        <Route
          exact
          path={'/activities/create'}
          component={CreateActivityComponent}
        />
        <Route exact path={'/activities'} component={Activities} />
      </div>
    </BrowserRouter>
  );
}

export default App;
