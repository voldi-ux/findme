import React,{useState,useEffect} from "react";
import "./profile.scss";
import Button from "../buttons/button";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { BsChatSquare } from "react-icons/bs";
import { AiTwotoneMail } from "react-icons/ai";
import { ImLocation } from "react-icons/im";
import { AiOutlinePhone } from "react-icons/ai";
import { MdLocationCity } from "react-icons/md";
import { IconContext } from "react-icons";
import { setChatData } from "../../redux/chat/chat_actions";
import {colors} from '../../border colors/colors'
//should beautify the design

const ProfileComponent = ({ isLoggedin, userProfile, setSearchProfile }) => {
  const disable = isLoggedin && userProfile ? "" : "true";
  const history = useHistory();
  let value = "GO TO PROFILE";
  let [borderStyle,setborderStyle] = useState(null);
  useEffect(() => {
    setborderStyle({
      borderColor: colors[Math.floor(Math.random()*28 )],
    }) 
  },[]);
  

  return (
    <div className={`profile ${isLoggedin ? "" : "profile__disable"}`}>
      <div className="profile__content-top">
        <div className="profile__image">
          <img src={`${userProfile.avatarUrl}`} alt="avatar url" style={borderStyle} />
        </div>
        <div
          className="d-flex flex-column .align-items-center
 "
        >
          <h2 className="profile__name">
            {userProfile.name} {userProfile.surname}
          </h2>
          <h5>{userProfile.title}</h5>
        </div>
        <div>
          <span className="profile__online">
            <span className="profile__online__dot"></span>
            <span className="profile__online__text">online</span>
          </span>
        </div>
      </div>
      <div className="profile__content-bottom d-flex flex-column ">
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
            className="d-flex chat align-items-center justify-content-center bd"
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
    </div>
  );
};

const mapStateToProps = (state) => ({
  isLoggedin: state.user.loggedIn,
  userProfile: state.user.profile,
});

const mapDispatch = (dispatch) => ({
  setSearchProfile: (profile) => dispatch(setChatData(profile)),
});

export default connect(mapStateToProps, mapDispatch)(ProfileComponent);
