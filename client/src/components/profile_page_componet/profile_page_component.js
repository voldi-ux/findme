import React,{useRef,useState } from "react";
import { FaMapMarkerAlt, FaMapMarkedAlt, FaFlag,FaPhone,FaMailBulk,FaImage } from "react-icons/fa";
import { IconContext } from "react-icons";
import {useHistory} from 'react-router-dom'

import "./profile_page_copomenent.scss";
import Button from "../../components/buttons/button";
import { connect } from "react-redux";
import { onUserProfilePicUpdate } from "../../redux/user/user_action";
import SButton from "../buttons/secondary-btn";
const ProfilePageComponent = ({ match, isLoggedin, userProfile,profiles,currentUser,updateProfile }) => {
  const [imageSelected,selectImage] = useState(null)
  const history  = useHistory()
 const fileInput = useRef(null)
 const uri = 'data:image/png;base64,'

 const handleChange = e => {
    if(e.target.files.length === 1) {
       let file = e.target.files[0]
      const reader = new FileReader()
      
      reader.onload = (e) => {
       const result = e.target.result
       selectImage(btoa(result).toString())
      }

      reader.readAsBinaryString(file)

      
    }
 }
 const onSubmit = (e) => {
   e.preventDefault()
   if(imageSelected) {
      updateProfile({
        profileUrl:imageSelected,
        userId:currentUser._id
      })
   }
 }

 const handleClick = () => {
   fileInput.current.click()
 }
  return (
    <div className="profile_page__container">
      <div className="profile_page__details">
        <SButton value='Home' onClick={() => history.push('/home')} />
        <img src={uri + userProfile.avatarUrl} />
      <IconContext.Provider value={{size:'4rem', className:'profile_page__details__image-icon'}}>
      {
          currentUser._id === userProfile.userId._id ?  <FaImage onClick={handleClick} /> : null
        }
        
      </IconContext.Provider>
        <form onSubmit={onSubmit}  method='post' encType="multipart/form-data">
           <input ref={fileInput} accept='image/*' name='profile-image' type='file' style={{display:'none'}} onChange={handleChange} />
           <input type='hidden'  value={currentUser._id} name='userId'/>
           {imageSelected ? <button>Save</button> : null}
        </form>
        <div className="profile_page__content">
          <div className="profile_page__name">
            {userProfile.name} {userProfile.surname}
          </div>
          <IconContext.Provider
            value={{ size: "1.5rem", className: "profile_page__icons" }}
          >
            <div className="profile_page__detail">
            <strong> <FaFlag /> Country </strong>
            <span>
            {userProfile.country}
            </span>
            </div>

            <div className="profile_page__detail">
            <strong><FaMapMarkedAlt /> Current Location </strong> 
            <span>
            {userProfile.currentLocation}
            </span>
            </div>
            <div className="profile_page__detail">
           <strong> <FaMapMarkerAlt />  From </strong> 
              {userProfile.town}
            </div>
            <div className="profile_page__detail">
            <strong><FaMailBulk />   E-mail </strong> 
              <span>
              findmeat@gmail.com
              </span>
            </div>
            <div className="profile_page__detail">
            <strong><FaPhone />  Phone </strong> 
              <span>
              078 783 3732
              </span>
            </div>
          </IconContext.Provider>
          <div className="profile_page__bio">
            <h1 className="profile_page__bio__heading">
              About Me
            </h1>
            <p>{userProfile.bio}</p>
          </div>
          {
          currentUser._id === userProfile.userId._id ? <Button value="edit profile" /> : null
        }
        </div>
      </div>
      <div className="profile_page__gallary">
        <h1 className='profile_page__bio__heading'>Photos</h1>
           <div className="profile_page__gallary__container ">
          {userProfile.gallary.map((item) => (
            <div key={item} className="profile_page__gallary__item">
              <img src={uri + item} alt={'gallery item'} />
            </div>
          ))}
        </div>
        {
          currentUser._id === userProfile.userId._id ? <Button value="add photos" /> : null
        }
      </div>
      {currentUser._id === userProfile.userId._id ? null :<p className='profile_page__infor'>
        is this the person you are looking for ? <button className='profile_page__btn'onClick={() => history.push(`/chatroom/singlechat/${userProfile.userId._id}`) } >leave a message</button> or <button className='profile_page__btn' onClick={() => history.push('/home') }>keep searching</button>
        </p> 
    }</div>
  );
};
const mapStateToProps = (state) => ({
  isLoggedin: state.user.loggedIn,
  userProfile: state.user.profile,
  profiles: state.appData.data,
  currentUser: state.user.CurrentUser || {}
});

const mapDispatchToprops = dispatch => ({
  updateProfile: profile => dispatch(onUserProfilePicUpdate(profile))
})

export default connect(mapStateToProps,mapDispatchToprops)(ProfilePageComponent);
