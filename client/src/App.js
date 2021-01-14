import React, { useState, useEffect, lazy, Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import FiltercontextProvider from "./context/filter_Data_context/filter.data";
import Loader from "./components/loader/loader";
import { onFechingProfiles } from "./redux/app_data_reducer/data_actions";
import { fetchingChats } from "./redux/chat/chat_actions";
import Errorboundary from "./components/error boundary/ErrorBoundary";
// import HomePage from "./pages/homepage/Home_page";
// import SignIn from "./pages/signIn_page/sigIn_page";
// import SignUp from "./pages/siginUp_page/signUp";
// import LandingPage from "./pages/landing_page/landing_page";
// import VeryEmailPage from "./pages/email_veryfication_page/email_verifiaction_page";
// import CreateProfilePage from "./pages/create_profile/create_profile";
// import ChatRoom from "./pages/chat_room_Page/chat_room";

const Profile = lazy(() => import("./pages/profile_page/Profile_page"));
const HomePage = lazy(() => import("./pages/homepage/Home_page"));
const SignUp = lazy(() => import("./pages/siginUp_page/signUp"));
const LandingPage = lazy(() => import("./pages/landing_page/landing_page"));
const CreateProfilePage = lazy(() =>
  import("./pages/create_profile/create_profile")
);
const ChatRoom = lazy(() => import("./pages/chat_room_Page/chat_room"));

function App({
  isloggedin,
  getProfiles,
  pageNunber,
  hasProfile,
  getCurrentUserChats,
  userId,
}) {
  useEffect(() => {
    getProfiles(0);
  }, []);

  useEffect(() => {
    if (isloggedin) {
      getCurrentUserChats(userId);
    }
  });

  if (isloggedin) {
    if (!hasProfile) {
      return (
        <div className="App">
          <Errorboundary>
            <Suspense fallback={<Loader />}>
              <Route
                path="/"
                render={() => <Redirect to="/update-profile" />}
              />
              <Route
                exact
                path="/update-profile"
                component={CreateProfilePage}
              />
            </Suspense>
          </Errorboundary>
        </div>
      );
    }

    return (
      <FiltercontextProvider>
        <div className="App">
          <Switch>
            <Errorboundary>
              <Suspense fallback={<Loader />}>
                <Route path="/chatroom" component={ChatRoom} />
                <Route exact path="/getcredentials" component={SignUp} />
                <Route exact path="/profile" component={Profile} />
                <Route exact path="/home" component={HomePage} />
                <Route path="/" render={() => <Redirect to="/home" />} />
              </Suspense>
            </Errorboundary>
          </Switch>
        </div>
      </FiltercontextProvider>
    );
  }

  return (
    <FiltercontextProvider>
      <div className="App">
        <Switch>
          <Errorboundary >
          <Suspense fallback={<Loader />}>
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
          </Suspense>
          </Errorboundary>
        </Switch>
      </div>
    </FiltercontextProvider>
  );
}

const mapStateToProps = (state) => ({
  hasProfile: state.user.CurrentUser.hasProfile,
  isloggedin: state.user.loggedIn,
  pageNunber: state.appData.page,
  userId: state.user.CurrentUser._id,
});

const mapDispatchToProps = (dispatch) => ({
  getProfiles: (num) => dispatch(onFechingProfiles(num)),
  getCurrentUserChats: (id) => dispatch(fetchingChats(id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
