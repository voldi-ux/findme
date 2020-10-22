import React from "react";
import "./profile.scss";
import Button from "../buttons/button";
import { useHistory } from "react-router-dom";
import {connect} from 'react-redux'
//should recieve the currently loggedIn user

//should beautify the design 
 
const ProfileComponent = ({isLoggedin,userProfile}) => {
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
    <div className={`profile ${isLoggedin ? '' : 'profile__disable'}`}>
      <div className="profile__image">
        {/* must insery the user's avatar url here */}
        {console.log(userProfile.avatarUrl)}
        <img src={`${isLoggedin && userProfile.avatarUrl ? userProfile.avatarUrl: 'https://dmrmechanical.com/wp-content/uploads/2018/01/avatar-1577909_640.png'}`} />
      </div>
      <div>
  <h3 className="profile__name">{`${isLoggedin && userProfile? userProfile.userName : 'Please sign in to view your profile'}`}</h3>
      </div>
      <div>
      <span className="profile__online">
          <span className="profile__online__dot"></span>
          <span className="profile__online__text">online</span>
        </span>
        
      </div>

      <Button disable={disable}  value={value} onClick={() => {
        if(isLoggedin && userProfile.hasProfile) {
          history.push(`/profile/${userProfile._id}`)
        } else if(userProfile.hasProfile === false) {
          history.push("/updateprofile")
        }
        return false 
      }} />
    </div>
  );
};

const mapStateToProps = state => ({
  isLoggedin: state.user.loggedIn,
  userProfile: state.user.CurrentUser || {}
})

export default connect(mapStateToProps)(ProfileComponent);
