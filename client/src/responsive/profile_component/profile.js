import React from "react";
import "./profile.scss";
import Button from "../../components/buttons/button";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { BsChatSquare } from "react-icons/bs";
import { AiTwotoneMail } from "react-icons/ai";
import { ImLocation } from "react-icons/im";
import { AiOutlinePhone } from "react-icons/ai";
import { MdLocationCity } from "react-icons/md";
import { IconContext } from "react-icons";
import { setChatData } from "../../redux/chat/chat_actions";
import LogoutBtn from "../../components/notification_icons/notification_icons";
import { toggleProfileComponent } from "../../redux/controls/actions";
//should beautify the design

const ProfileComponent = ({
  isLoggedin,
  userProfile,
  setSearchProfile,
  showProfileComponent,
  toggleProfileComponent,
}) => {
  const disable = isLoggedin && userProfile ? "" : "true";
  const history = useHistory();
  let value = "GO TO PROFILE";

  return (
    <div
      className={`resp-profile-container ${
        showProfileComponent ? "slide-right" : null
      }`}
    > <span></span>
      <span className="close" onClick={toggleProfileComponent}>
      &larr;
      </span>
      <div className={`profile  Resp-profile`}>
        <div className="profile__content-top">
          <div className="profile__image">
            <img src={userProfile.avatarUrl} />
          </div>
          <div
            className="text-center"
          >
            <h2 className="profile__name">
              {userProfile.name} {userProfile.surname}
            </h2>
            <h3 className="profile__title light-bg">{userProfile.title}</h3>
          </div>
          <div>
            <span className="profile__online">
              <span className="profile__online__dot"></span>
              <span className="profile__online__text">online</span>
            </span>
          </div>
        </div>
        <div className="profile__content-bottom content-bottom d-flex flex-column ">
          <IconContext.Provider
            value={{ className: "profile__icon", size: "2.5rem" }}
          >
            <div
              onClick={() => {
                setSearchProfile({
                  profile: null,
                  room: null,
                  messages: null,
                });
                history.push("/chatroom");
              }}
              className="d-flex chat chat__bottom align-items-center justify-content-center bd"
            >
              <BsChatSquare />
              {/* <MdAccountCircle /> */}
              <span>Chats</span>
            </div>

            <div className="text-centered">
              <span className="d-flex mb-2 align-items-center">
                <AiTwotoneMail />
                <span>{userProfile.email}</span>
              </span>
              <span className="d-flex mb-2 align-items-center">
                <AiOutlinePhone />
                <span>{userProfile.phone}</span>
              </span>
              <span className="d-flex mb-2 align-items-center">
                <MdLocationCity />
                <span>{userProfile.city}</span>
              </span>
              <span className="d-flex mb-2 align-items-center">
                <ImLocation />
                <span>{userProfile.province}</span>
              </span>
            </div>
          </IconContext.Provider>
        </div>
        <Button
          disable={disable}
          value={value}
          onClick={() => history.push(`/profile/?current=true`)}
        />
        <LogoutBtn />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isLoggedin: state.user.loggedIn,
  userProfile: state.user.profile,
  showProfileComponent: state.controls.isProfileComponentIsVisible,
});

const mapDispatch = (dispatch) => ({
  setSearchProfile: (profile) => dispatch(setChatData(profile)),
  toggleProfileComponent: () => dispatch(toggleProfileComponent()),
});

export default connect(mapStateToProps, mapDispatch)(ProfileComponent);
