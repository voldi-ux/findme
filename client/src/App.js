import React from 'react';
import './App.css';
import NavigationBar from './components/navigation_bar/navigation_bar';
import Profile from './pages/profile_page/Profile_page'
import { Route , Switch} from 'react-router-dom';

import HomePage from './pages/homepage/Home_page'
import SignIn from './pages/signIn_page/sigIn_page';
import SignUp from './pages/siginUp_page/signUp';
import LandingPage from './pages/landing_page/landing_page';

function App() {
  return (
    <div className="App">
      <Switch>
       <Route exact path='/' component={LandingPage} />
       <Route exact path = '/signin' component={SignIn} />
       <Route exact path = '/signup' component={SignUp} />
       <NavigationBar />
     </Switch>
       <Switch>
       <Route exact path='/home' component={HomePage} />
       <Route path = '/profile' component={Profile} />
       </Switch>
    </div>
  );
}

export default App;
