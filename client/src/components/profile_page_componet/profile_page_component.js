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
  ProfileId,
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
        ProfileId:ProfileId,
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
                <img src={userProfile.avatarUrl} />
  
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
                <input type="hidden" value={ProfileId} name="ProfileId" />
                {imageSelected ? <button>Save</button> : null}
              </form>
            </div>
            <div className="profile_page__name align-self-cente ml-4 bt-3">
              <h1 className="mb-2">
                {userProfile.name} {userProfile.surname}
              </h1>
                  <h3>{userProfile.title}</h3>
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
                  <h4>
                    Province
                  </h4>
                  <span>{userProfile.province}</span>
                </span>
                <FaMapMarkedAlt />
              </div>
              <div className="profile_page__detail">
                <span>
                  <h4>City</h4>

                  {userProfile.city}
                </span>
                <FaMapMarkerAlt />
              </div>
              <div className="profile_page__detail">
                <span>
                  <h4>E-mail</h4>
                  <span>{userProfile.email}</span>
                </span>
                <FaMailBulk />
              </div>
              <div className="profile_page__detail">
                <span>
                  <h4>Phone</h4>
                  <span>{userProfile.phone}</span>
                </span>
                <FaPhone />
              </div>
            </div>
          </IconContext.Provider>

          {ProfileId=== userProfile._id ? (
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
        {ProfileId === userProfile._id ? (
          <Button outline={true} value="Edit" />
        ) : null}
      </div>
      {ProfileId === userProfile._id ? null : (
        <p className="profile_page__infor">
          is this the person you are looking for ?{" "}
          <Button
            className="profile_page__btn"
            onClick={() =>
              history.push(`/chatroom/singlechat/${userProfile._id}`)
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
  ProfileId: state.user.CurrentUser.profileId
});

const mapDispatchToprops = (dispatch) => ({
  updateProfile: (profile) => dispatch(onUserProfilePicUpdate(profile)),
});

export default connect(
  mapStateToProps,
  mapDispatchToprops
)(ProfilePageComponent);
