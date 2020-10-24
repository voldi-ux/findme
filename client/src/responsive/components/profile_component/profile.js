import React from "react";
import "./profile.scss";
import Button from "../../../components/buttons/button";
import { useHistory } from "react-router-dom";
import {connect} from 'react-redux'

import NotficationsIcons from '../notification_icons/notification_icons'
import { ToggleSlideInRight } from "../../../redux/user/user_action";

//should beautify the design 
 
const ProfileComponentResp = ({isLoggedin,userProfile,showNav,toggleNav}) => {
  const disable =  isLoggedin && userProfile ?'':'true'
  const history = useHistory();
  let value;

  if(isLoggedin && userProfile.hasProfile) {
    value = 'Go to Your Profile'
  } else if(userProfile.hasProfile === false) {
    value = 'Create Profile'
  } else {
    value = 'Not Signed In'
  }


  return (
    <div onClick={toggleNav} className={`resp-profile-container ${showNav ? 'slide-right' :null}`}>
         <div className={`Resp-profile ${isLoggedin ? '' : 'Resp-profile__disable'}`}>
      <div className="Resp-profile__image">
        <img src={`${isLoggedin && userProfile.avatarUrl ? userProfile.avatarUrl: 'https://dmrmechanical.com/wp-content/uploads/2018/01/avatar-1577909_640.png'}`} />
      </div>
      <div>
  <h3 className="Resp-profile__name">{`${isLoggedin && userProfile? userProfile.userName : 'Please sign in to view your profile'}`}</h3>
      </div>
      <div>
      <span className="Resp-profile__online">
          <span className="Resp-profile__online__dot"></span>
          <span className="Resp-profile__online__text">online</span>
        </span>
        
      </div>
       <NotficationsIcons />
      <Button disable={disable}  value={value} onClick={() => {
        if(isLoggedin && userProfile.hasProfile) {
          history.push(`/profile/${userProfile._id}`)
        } else if(userProfile.hasProfile === false) {
          history.push("/updateprofile")
        }
        return false 
      }} />
    </div>
    </div>
    
  );
};

const mapStateToProps = state => ({
  isLoggedin: state.user.loggedIn,
  userProfile: state.user.CurrentUser || {},
  showNav: state.user.RightNavVisible
})

const mapDispatchToProps = dispacth => ({
  toggleNav:() => dispacth(ToggleSlideInRight())
})

export default connect(mapStateToProps,mapDispatchToProps)(ProfileComponentResp);
