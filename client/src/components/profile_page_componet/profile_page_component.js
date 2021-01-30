import React, {  useState,useEffect } from "react";
import {
  FaMapMarkerAlt,
  FaMapMarkedAlt,
  FaFlag,
  FaPhone,
  FaMailBulk,
  FaStar,
} from "react-icons/fa";
import { IconContext } from "react-icons";

import "./profile_page_copomenent.scss";
import TextInput from "../form_inputs_components/text";
import Button from "../../components/buttons/button";
import { connect } from "react-redux";
import {
  onUserProfilePicUpdate,
  loginSucceed,
} from "../../redux/user/user_action";
import {colors } from '../../border colors/colors'
const ProfilePageComponent = ({
  userProfile,
  ProfileId,
  login,
}) => {
  const [skill, setSkill] = useState("");
  let [borderStyle,setborderStyle] = useState(null);
  useEffect(() => {
    setborderStyle({
      borderColor: colors[Math.floor(Math.random()*28 )],
    }) 
  },[]);

  const renderSkills = (skill) => {
    return (
      <div className="profile_page__right__detail d-flex justify-content-between ">
        <span>
          <h4>{skill}</h4>
        </span>
        <FaStar />
      </div>
    );
  };

  
  const handleChange = (e) => {
    setSkill(e.target.value);
  };
  const AddRemoveSkill = async (type) => {
    try {
      const resp = await fetch("/addRemoveSkills", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            userId: ProfileId,
            type,
            skill:skill.trimLeft().trimRight().toLowerCase(),
          },
        }),
      });
      const data = await resp.json();
      if (data.msg === "okay") {
        login(data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const addSkill = () => {
    if (skill.trim().length > 0) {
      AddRemoveSkill("add");
    }
    setSkill("");
  };
  const removeSkill = () => {
    if (skill.trim().length > 0) {
      AddRemoveSkill("remove");
    }
    setSkill("");
  };

  return (
    <div className="profile_page__container">
      <div className="profile_page__details">
        <div className="profile_page__content">
          <div className="profile_page__content-top d-flex mb-4">
            <div className="mx-4">
              <img src={userProfile.profile.avatarUrl} alt='avatar' style={borderStyle} />
            </div>
            <div className="profile_page__name align-self-cente ml-4 bt-3">
              <h1 className="mb-2">
                {userProfile.profile.name} {userProfile.profile.surname}
              </h1>
              <h3>{userProfile.profile.title}</h3>
            </div>
          </div>

          <IconContext.Provider
            value={{ size: "2rem", className: "profile_page__icons" }}
          >
            <div className="profile_page__content-bottom">
              <div className="profile_page__detail">
                <span>
                  <h4>Country</h4>
                  <span>{userProfile.profile.country}</span>
                </span>
                <FaFlag />
              </div>

              <div className="profile_page__detail">
                <span>
                  <h4>Province</h4>
                  <span>{userProfile.profile.province}</span>
                </span>
                <FaMapMarkedAlt />
              </div>
              <div className="profile_page__detail">
                <span>
                  <h4>City</h4>

                  {userProfile.profile.city}
                </span>
                <FaMapMarkerAlt />
              </div>
              <div className="profile_page__detail">
                <span>
                  <h4>E-mail</h4>
                  <span>{userProfile.profile.email}</span>
                </span>
                <FaMailBulk />
              </div>
              <div className="profile_page__detail">
                <span>
                  <h4>Phone</h4>
                  <span>{userProfile.profile.phone}</span>
                </span>
                <FaPhone />
              </div>
            </div>
          </IconContext.Provider>
          {console.log(userProfile.profile)}
          {ProfileId === userProfile.profile._id ? (
            <Button outline={true} value="edit profile" />
          ) : null}
        </div>
      </div>
      <div className="profile_page__gallary">
        <div className="profile_page__bio">
          <h1 className="profile_page__bio__heading">About Me</h1>
          <p>{userProfile.profile.bio}</p>
        </div>
        <h1 className="profile_page__bio__heading">
          My skills / Hobbies
        </h1>
        <div>
          <div className="profile_page__content-right">
            <IconContext.Provider
              value={{ size: "2rem", className: "profile_page__right__icons" }}
            >
              {userProfile.skills.length ? (
                userProfile.skills.map(renderSkills)
              ) : (
                <h3>No Skills/Hobbies Listed</h3>
              )}
              {ProfileId === userProfile._id ? (
                <div className="add-skill">
                  <div className="input">
                    <TextInput
                    value={skill}
                      handleChange={handleChange}
                      placeholder="Enter hobby/skill/speciality"
                    />
                  </div>
                  <div className="buttons">
                    <button
                      onClick={addSkill}
                      type="button"
                      className="btn btn-large btn-success"
                    >
                      add
                    </button>
                    <button
                      onClick={removeSkill}
                      type="button"
                      className="btn btn-large btn-danger"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ) : null}
            </IconContext.Provider>
          </div>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  isLoggedin: state.user.loggedIn,
  ProfileId: state.user.CurrentUser._id,
});

const mapDispatchToprops = (dispatch) => ({
  updateProfile: (profile) => dispatch(onUserProfilePicUpdate(profile)),
  login: (user) => dispatch(loginSucceed(user)),
});

export default connect(
  mapStateToProps,
  mapDispatchToprops
)(ProfilePageComponent);
