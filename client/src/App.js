import React, { useEffect, lazy, Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { io } from "socket.io-client";
import FiltercontextProvider from "./context/filter_Data_context/filter.data";
import Loader from "./components/loader/loader";
import { onFechingProfiles } from "./redux/app_data_reducer/data_actions";
import { fetchingChats } from "./redux/chat/chat_actions";
import Errorboundary from "./components/error boundary/ErrorBoundary";
import { updateUserNotifications } from "./redux/user/user_action";
import { getNotifications } from "./utils/chats.utils";

const Profile = lazy(() => import("./pages/profile_page/Profile_page"));
const HomePage = lazy(() => import("./pages/homepage/Home_page"));
const SignUp = lazy(() => import("./pages/siginUp_page/signUp"));
const LandingPage = lazy(() => import("./pages/landing_page/landing_page"));
const CreateProfilePage = lazy(() =>
  import("./pages/create_profile/create_profile")
);
const ChatRoom = lazy(() => import("./pages/chat_room_Page/chat_room"));
const URI_STRING =
  process.env.NODE_ENV === "production" ? "/" : "http://localhost:5005/";
let socket;

function App({
  isloggedin,
  getProfiles,
  hasProfile,
  getCurrentUserChats,
  userId,
  updateNotications,
}) {
  useEffect(() => {
    if (isloggedin) {
      getCurrentUserChats(userId);
    }
  },[]);
  useEffect(() => {
    if (!hasProfile) return;
    const grabNotifications = async () => {
      const count = await getNotifications(userId, "get");
      updateNotications(count);
    };
    grabNotifications();
  }, [userId]);

  useEffect(() => {
    if (!hasProfile) return;
     (async function g() {
      const count = await getNotifications(userId, "get");
      updateNotications(count);
    })()

    socket = io(`${URI_STRING}notifications`);
    socket.emit("join", { roomId: userId });
    socket.on("getNotify", () => {
      async function g() {
        const count = await getNotifications(userId, "get");
        updateNotications(count);
      }
      g();
      getCurrentUserChats(userId);
    });
    socket.on("onSeen", () => {
      getCurrentUserChats(userId);
    });
    return () => {
      socket.off();
      socket.disconnect();
    };
  }, [hasProfile, userId]);

  useEffect(() => {
    getProfiles(0);
  }, [getProfiles]);

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
                <Route
                  path="/chatroom"
                  render={() => <ChatRoom socket={socket} />}
                />
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
          <Errorboundary>
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
  updateNotications: (count) => dispatch(updateUserNotifications(count)),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
