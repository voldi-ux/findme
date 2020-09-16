import React from "react";
import { FaMapMarkerAlt, FaMapMarkedAlt, FaFlag } from "react-icons/fa";
import { IconContext } from "react-icons";

import "./profile_page_copomenent.scss";
import Button from "../../components/buttons/button";
import { connect } from "react-redux";
const ProfilePageComponent = ({ match, isLoggedin, userProfile,profiles }) => {
  const CurentProfileUser = profiles.find(
    (user) => user._id == match.params.userId
  );
  console.log(CurentProfileUser)
  if (CurentProfileUser) {
    return (
      <div className="profile_page__container">
        <div className="profile_page__details">
          <img src={CurentProfileUser.avatarUrl} />

          <div className="profile_page__content">
            <div className="profile_page__name">
              {CurentProfileUser.name} {CurentProfileUser.surname}
            </div>
            <IconContext.Provider
              value={{ size: "1.5rem", className: "profile_page__icons" }}
            >
              <div className="profile_page__country">
                <strong> Country :</strong> <FaFlag />{" "}
                {CurentProfileUser.country}
              </div>

              <div className="profile_page__location">
                <strong> Current Location :</strong> <FaMapMarkedAlt />{" "}
                {CurentProfileUser.currentLocation}
              </div>
              <div className="profile_page__country">
                <strong>From :</strong> <FaMapMarkerAlt />{" "}
                {CurentProfileUser.town}
              </div>
            </IconContext.Provider>
            <div className="profile_page__bio">
              <h1 className="profile_page__bio__heading">
                Read to know  me more!!!
              </h1>
              <p>{CurentProfileUser.bio}</p>
            </div>
          </div>
        </div>
        <div className="profile_page__gallary">
          <h1>Photos</h1>
          <div className="profile_page__gallary__container ">
            {CurentProfileUser.gallary.map((item) => (
              <div key={item} className="profile_page__gallary__item">
                <img src={item} alt={`imaget`} />
              </div>
            ))}
          </div>
          <Button value="view gallary" />
        </div>
      </div>
    );
  } else {
    return (
      <div className="profile_page__container">
        <div className="profile_page__details">
          <img src={userProfile.avatarUrl} />

          <div className="profile_page__content">
            <div className="profile_page__name">{userProfile.name} {userProfile.surname}</div>
            <IconContext.Provider
              value={{ size: "1.5rem", className: "profile_page__icons" }}
            >
              <div className="profile_page__country">
                <strong> Country :</strong> <FaFlag />{" "}
                {userProfile.country.toUpperCase()}
              </div>
              <div className="profile_page__location">
                <strong> Current Location :</strong> <FaMapMarkedAlt />{" "}
                {userProfile.currentLocation.toUpperCase()}
              </div>
              <div className="profile_page__country">
                <strong>From :</strong> <FaMapMarkerAlt />{" "}
                {userProfile.town.toUpperCase()}
              </div>
            </IconContext.Provider>
            <div className="profile_page__bio">
              <h1 className="profile_page__bio__heading">
                Read to know  me more!!!
              </h1>
              <p>{userProfile.bio}</p>
            </div>
            <Button value="edit profile" />
          </div>
        </div>
        <div className="profile_page__gallary">
          <h1>Photos</h1>
          <div className="profile_page__gallary__container ">
            {userProfile.gallary.map((item) => (
              <div key={item} className="profile_page__gallary__item">
                <img src={item} alt={`imaget`} />
              </div>
            ))}
          </div>
          <Button value="add image" />
        </div>
      </div>
    );
  }
};
const mapStateToProps = (state) => ({
  isLoggedin: state.user.loggedIn,
  userProfile: state.user.profile,
    profiles: state.appData.data,
});

export default connect(mapStateToProps)(ProfilePageComponent);
