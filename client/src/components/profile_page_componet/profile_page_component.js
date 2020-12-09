import React, { useRef, useState } from "react";
import {
  FaMapMarkerAlt,
  FaMapMarkedAlt,
  FaFlag,
  FaPhone,
  FaMailBulk,
  FaImage,
  FaStar
} from "react-icons/fa";
import { IconContext } from "react-icons";
import { useHistory } from "react-router-dom";

import "./profile_page_copomenent.scss";
import Button from "../../components/buttons/button";
import { connect } from "react-redux";
import { onUserProfilePicUpdate } from "../../redux/user/user_action";
import SButton from "../buttons/secondary-btn";
const ProfilePageComponent = ({
  match,
  isLoggedin,
  userProfile,
  profiles,
  currentUser,
  updateProfile,
}) => {
  const [imageSelected, selectImage] = useState(null);
  const history = useHistory();
  const fileInput = useRef(null);
  const uri = "data:image/png;base64,";

  const handleChange = (e) => {
    if (e.target.files.length === 1) {
      let file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        const result = e.target.result;
        selectImage(btoa(result).toString());
      };

      reader.readAsBinaryString(file);
    }
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (imageSelected) {
      updateProfile({
        profileUrl: imageSelected,
        userId: currentUser._id,
      });
    }
  };

  const handleClick = () => {
    fileInput.current.click();
  };
  return (
    <div className="profile_page__container">
      <div className="profile_page__details">
        <div className="profile_page__content">
          <div className="profile_page__content-top d-flex mb-4">
            {/* <Button value="Home" className='align-self-center4' onClick={() => history.push("/home")} /> */}
            <div className="mx-4">
              <div className="position-relative">
                <img src={uri + userProfile.avatarUrl} />
                <IconContext.Provider
                  value={{
                    size: "4rem",
                    className: "profile_page__details__image-icon",
                  }}
                >
                  {currentUser._id === userProfile.userId._id ? (
                    <FaImage onClick={handleClick} />
                  ) : null}
                </IconContext.Provider>
              </div>
              <form
                onSubmit={onSubmit}
                method="post"
                encType="multipart/form-data"
              >
                <input
                  ref={fileInput}
                  accept="image/*"
                  name="profile-image"
                  type="file"
                  style={{ display: "none" }}
                  onChange={handleChange}
                />
                <input type="hidden" value={currentUser._id} name="userId" />
                {imageSelected ? <button>Save</button> : null}
              </form>
            </div>
            <div className="profile_page__name align-self-cente ml-4 bt-3">
              <h1 className="mb-2">
                {userProfile.name} {userProfile.surname}
              </h1>
              <h3>FullStack developer</h3>
            </div>
          </div>

          <IconContext.Provider
            value={{ size: "2rem", className: "profile_page__icons" }}
          >
            <div className="profile_page__content-bottom">
              <div className="profile_page__detail">
                <span>
                  <h4>Country</h4>
                  <span>{userProfile.country}</span>
                </span>
                <FaFlag />
              </div>

              <div className="profile_page__detail">
                <span>
                  <h4>Current Location</h4>
                  <span>{userProfile.currentLocation}</span>
                </span>
                <FaMapMarkedAlt />
              </div>
              <div className="profile_page__detail">
                <span>
                  <h4>City</h4>

                  {userProfile.town}
                </span>
                <FaMapMarkerAlt />
              </div>
              <div className="profile_page__detail">
                <span>
                  <h4>E-mail</h4>
                  <span>findmeat@gmail.com</span>
                </span>
                <FaMailBulk />
              </div>
              <div className="profile_page__detail">
                <span>
                  <h4>Phone</h4>
                  <span>078 783 3732</span>
                </span>
                <FaPhone />
              </div>
            </div>
          </IconContext.Provider>

          {currentUser._id === userProfile.userId._id ? (
            <Button outline={true} value="edit profile" />
          ) : null}
        </div>
      </div>
      <div className="profile_page__gallary">
        <div className="profile_page__bio">
          <h1 className="profile_page__bio__heading">About Me</h1>
          <p>{userProfile.bio}</p>
        </div>
        <h1 className="profile_page__bio__heading">
          My skills and specialities
        </h1>
        <div>
          <div className="profile_page__content-right">
          <IconContext.Provider
            value={{ size: "2rem", className: "profile_page__right__icons" }} >
            <div className="profile_page__right__detail d-flex justify-content-between ">
              <span>
                <h4>rugby player</h4>
              </span>
              <FaStar/>
            </div>

            <div className="profile_page__right__detail d-flex justify-content-between">
              <span>
                <h4>engineer</h4>
              </span>
              <FaStar />
            </div>
            <div className="profile_page__right__detail d-flex justify-content-between ">
              <span>
                <h4>singer</h4>
              </span>
              <FaStar />
            </div>
            <div className="profile_page__right__detail d-flex justify-content-between ">
              <span>
                <h4>Gamer</h4>
              </span>
              <FaStar />
            </div>
            <div className="profile_page__right__detail d-flex justify-content-between ">
              <span>
                <h4>footballer</h4>
              </span>
              <FaStar />
            </div>
            </IconContext.Provider>
          </div>
        </div>
        {currentUser._id === userProfile.userId._id ? (
          <Button outline={true} value="Edit" />
        ) : null}
      </div>
      {currentUser._id === userProfile.userId._id ? null : (
        <p className="profile_page__infor">
          is this the person you are looking for ?{" "}
          <Button
            className="profile_page__btn"
            onClick={() =>
              history.push(`/chatroom/singlechat/${userProfile.userId._id}`)
            }
          >
            leave a message
          </Button>{" "}
          or{" "}
          <Button outline
            className="profile_page__btn"
            onClick={() => history.push("/home")}
          >
            keep searching
          </Button>
        </p>
      )}
    </div>
  );
};
const mapStateToProps = (state) => ({
  isLoggedin: state.user.loggedIn,
  userProfile: state.user.profile,
  profiles: state.appData.data,
  currentUser: state.user.CurrentUser || {},
});

const mapDispatchToprops = (dispatch) => ({
  updateProfile: (profile) => dispatch(onUserProfilePicUpdate(profile)),
});

export default connect(
  mapStateToProps,
  mapDispatchToprops
)(ProfilePageComponent);
