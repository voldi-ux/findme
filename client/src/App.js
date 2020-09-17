import React,{useState,useEffect} from 'react';
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
import { onFechingProfiles } from './redux/app_data_reducer/data_actions';
import FiltercontextProvider from './context/filter_Data_context/filter.data';
import CreateProfilePage from './pages/create_profile/create_profile';

function App({isloggedin,getProfiles,pageNunber}) {
  useEffect(()=>{
    getProfiles(pageNunber)
  },[getProfiles,pageNunber])

  return (
    <FiltercontextProvider >
    <div className="App">
      <Switch>
       <Route exact path = '/' render={(props)=> isloggedin ? <Redirect to='/home' /> : <LandingPage {...props} /> } />
       <Route exact path = '/signin' render={(props)=> isloggedin ? <Redirect to='/home' /> : <SignIn {...props} /> } />
       <Route exact path = '/signup' render={(props)=> isloggedin ? <Redirect to='/home' /> : <SignUp {...props}/> } />
       <Route exact path = '/getcredentials' component={SignUp} />
       <Route exact path = '/updateprofile' component={CreateProfilePage} />
       <Route exact path='/emailverification'  component={VeryEmailPage} />
       <NavigationBar />
     </Switch>
       <Switch>
       <Route exact path='/home' component={HomePage} />
       <Route path = '/profile' component={Profile} />
       </Switch>
    </div>
    </FiltercontextProvider>
  );
}

const mapStateToProps = state => ({
  isloggedin: state.user.loggedIn,
  pageNunber: state.appData.page,
})


const mapDispatchToProps = (disptach) => ({
  getProfiles: (num) => disptach(onFechingProfiles(num))
})
export default connect(mapStateToProps,mapDispatchToProps)(App);
