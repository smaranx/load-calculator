import React, { Fragment } from 'react';
import { Routes, Route } from 'react-router-dom';
import { routeConstants } from './routes/constants';
import Home from './components/Home/Home';
import ChoosePlatform from './components/ChoosePlatform/ChoosePlatform';
import FirstPage from './components/First/FirstPage';
import Graphs from './components/Graphs/Graphs';

function App() {
  return (
    <Fragment>
      <Routes>
        <Route path={routeConstants.mainRoute} element={<ChoosePlatform />} />
        <Route path={routeConstants.firstPageRoute} element={<FirstPage />} />
        <Route path={routeConstants.GraphsRoute} element={<Graphs />} />
        <Route path={routeConstants.homeRoute} element={<Home />} />
      </Routes>
    </Fragment>
  );
}

export default App;
