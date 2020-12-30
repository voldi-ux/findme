import React, { useEffect } from "react";
import { connect } from "react-redux";
import "./Profile_page.scss";
import ProfilePageComponent from "../../components/profile_page_componet/profile_page_component";
import WithSpinner from "../../components/spinner/spinner";
import { onFetchUserProfile } from "../../redux/user/user_action";

const ProfilePageWithSpinner = WithSpinner(ProfilePageComponent);
const ProfilePage = ({
  match,
  getProfile,
  userProfile,
  searchedProfile,
  isLoading,
  IsProfileLoading,
  history,
  ...props
}) => {
  if (history.location.search === "?current=true") {
    return (
      <div className="profile_page">
        <ProfilePageWithSpinner
          current={true}
          userProfile={userProfile}
          height="20rem"
          isLoading={false}
        />
      </div>
    );
  }

  return (
    <div className="profile_page">
      <ProfilePageWithSpinner
        userProfile={searchedProfile}
        height="20rem"
        isLoading={false}
      />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  getProfile: (id) => dispatch(onFetchUserProfile(id)),
});
const mapStateToProps = (state) => ({
  IsProfileLoading: state.user.IsProfileLoading,
  searchedProfile: state.user.searchedProfile,
  userProfile: state.user.profile,
});
export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
