import React from 'react';
import './App.css';
import NavigationBar from './components/navigation_bar/navigation_bar';
import Profile from './pages/profile_page/Profile_page'
import { Route , Switch} from 'react-router-dom';

import HomePage from './pages/homepage/Home_page'

function App() {
  return (
    <div className="App">
       <NavigationBar />
       <Switch>
       <Route exact path='/' component={HomePage} />
       <Route path = '/profile' component={Profile} />
       </Switch>
    </div>
  );
}

export default App;
