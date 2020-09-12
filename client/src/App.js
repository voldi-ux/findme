import React from 'react';
import './App.css';
import NavigationBar from './components/navigation_bar/navigation_bar';
import Profile from './pages/profile_page/Profile_page'
import { Route , Switch,Redirect} from 'react-router-dom';

import HomePage from './pages/homepage/Home_page'
import SignIn from './pages/signIn_page/sigIn_page';
import SignUp from './pages/siginUp_page/signUp';
import LandingPage from './pages/landing_page/landing_page';
import VeryEmailPage from './pages/email_veryfication_page/email_verifiaction_page';
import { connect } from 'react-redux';

function App({isloggedin}) {
  console.log(isloggedin)
  return (
    <div className="App">
      <Switch>
       <Route exact path = '/' render={(props)=> isloggedin ? <Redirect to='/home' /> : <LandingPage {...props} /> } />
       <Route exact path = '/signin' render={(props)=> isloggedin ? <Redirect to='/home' /> : <SignIn {...props} /> } />
       <Route exact path = '/signup' render={(props)=> isloggedin ? <Redirect to='/home' /> : <SignUp {...props}/> } />
       <Route exact path = '/getcredentials' component={SignUp} />
       <Route exact path='/emailverification'  component={VeryEmailPage} />
       <NavigationBar />
     </Switch>
       <Switch>
       <Route exact path='/home' component={HomePage} />
       <Route path = '/profile' component={Profile} />
       </Switch>
    </div>
  );
}

const mapStateToProps = state => ({
  isloggedin: state.user.loggedIn
})

export default connect(mapStateToProps)(App);
