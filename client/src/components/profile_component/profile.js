import React from "react";
import "./profile.scss";
import Button from "../buttons/button";
import { useHistory } from "react-router-dom";
import {connect} from 'react-redux'
import {BsChatSquare} from 'react-icons/bs'
import {MdAccountCircle} from 'react-icons/md'
import {AiTwotoneMail} from 'react-icons/ai'
import {ImLocation} from 'react-icons/im'
import {AiOutlinePhone} from 'react-icons/ai'
import {MdLocationCity} from 'react-icons/md'
import {IconContext} from 'react-icons'

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
      <div className='profile__content-top'>
      <div className="profile__image">
        {/* must insert the user's avatar url here */}
        {console.log(isLoggedin && userProfile.avatarUrl)}
        <img src={`${isLoggedin && userProfile.avatarUrl ?'data:image/png;base64,'+ userProfile.avatarUrl: 'https://dmrmechanical.com/wp-content/uploads/2018/01/avatar-1577909_640.png'}`} />
      </div>
      <div className='d-flex flex-column .align-items-center
 '>
  <h3 className="profile__name">{`${isLoggedin && userProfile? userProfile.userName : 'Please sign in to view your profile'}`}</h3>
     <h3 className='profile__title'>
        Fullstack developer
     </h3>
      </div>
      <div>
      <span className="profile__online">
          <span className="profile__online__dot"></span>
          <span className="profile__online__text">online</span>
        </span>
        
      </div>
      </div>
      <div className='profile__content-bottom d-flex flex-column '>
          <IconContext.Provider value={{className:'profile__icon', size:'2.5rem'}}>
             <div className='d-flex align-items-center justify-content-center'>
                <BsChatSquare />
                {/* <MdAccountCircle /> */}
                <span>
                  Chats
                </span>
             </div>
            
            <div className='text-centered'>
              <span className='d-flex mb-2 align-items-center'>
            <AiTwotoneMail />
            <span>
              voldimuyumba@gmail.com
            </span>
              </span>
              <span className='d-flex mb-2 align-items-center'>
            <AiOutlinePhone />
            <span>
              0746443536
            </span>
              </span>
              <span className='d-flex mb-2 align-items-center'>
            <MdLocationCity />
            <span>
              Johannesburg
            </span>
              </span>
              <span className='d-flex mb-2 align-items-center'>
            <ImLocation />
            <span>
              Gauteng
            </span>
              </span>
            </div>
          </IconContext.Provider>
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
