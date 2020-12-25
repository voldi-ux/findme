import React, { useState, useEffect } from "react";
import Profile from "./pages/profile_page/Profile_page";
import { Route, Switch, Redirect } from "react-router-dom";

import HomePage from "./pages/homepage/Home_page";
import SignIn from "./pages/signIn_page/sigIn_page";
import SignUp from "./pages/siginUp_page/signUp";
import LandingPage from "./pages/landing_page/landing_page";
import VeryEmailPage from "./pages/email_veryfication_page/email_verifiaction_page";
import { connect } from "react-redux";
import { onFechingProfiles } from "./redux/app_data_reducer/data_actions";
import FiltercontextProvider from "./context/filter_Data_context/filter.data";
import CreateProfilePage from "./pages/create_profile/create_profile";
import ChatRoom from "./pages/chat_room_Page/chat_room";
import { fetchingChats } from "./redux/chat/chat_actions";

function App({ isloggedin, getProfiles, pageNunber, hasProfile, getCurrentUserChats, userId}) {
  useEffect(() => {
    getProfiles(pageNunber);
  }, [getProfiles, pageNunber]);
    
  useEffect(() => {
     if(isloggedin) {
       getCurrentUserChats(userId)
     }
  })
    
  if (isloggedin) {
    if (!hasProfile) {
      return (
        <div className="App">
          <Route path="/" render={() => <Redirect to="/update-profile" />} />
          <Route exact path="/update-profile" component={CreateProfilePage} />
        </div>
      );
    }

    return (
      <FiltercontextProvider>
        <div className="App">
          <Switch>
            <Route path="/chatroom" component={ChatRoom} />
            <Route exact path="/getcredentials" component={SignUp} />
            <Route exact path="/emailverification" component={VeryEmailPage} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/home" component={HomePage} />
            <Route path="/" render={() => <Redirect to="/home" />} />
          </Switch>
        </div>
      </FiltercontextProvider>
    );
  }

  return (
    <FiltercontextProvider>
      <div className="App">
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => <LandingPage {...props} />}
          />
          <Route
            exact
            path="/signup"
            render={(props) => <SignUp {...props} />}
          />
          <Route path="/" render={() => <Redirect to="/" />} />
        </Switch>
      </div>
    </FiltercontextProvider>
  );
}

const mapStateToProps = (state) => ({
  hasProfile: state.user.CurrentUser.hasProfile,
  isloggedin: state.user.loggedIn,
  pageNunber: state.appData.page,
  userId: state.user.CurrentUser._id
});

const mapDispatchToProps = (dispatch) => ({
  getProfiles: (num) => dispatch(onFechingProfiles(num)),
  getCurrentUserChats: id => dispatch(fetchingChats(id))
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
