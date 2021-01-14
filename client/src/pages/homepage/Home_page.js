import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import FilterComponent from "../../components/filter_components/filters_container";
import HomeContent from "../../components/search_result_component/search_result_conponent";
import ProfileComponent from "../../components/profile_component/profile";

//responsive components
import RespFilterComponent from "../../responsive/components/filter_components/filters_container";
import RespProfile from "../../responsive/components/profile_component/profile";

import "./Home_page.scss";
import { onFechingProfiles } from "../../redux/app_data_reducer/data_actions";
import { connect } from "react-redux";
import withSpinner from "../../components/spinner/spinner";
import { ToggleSlideInleft } from "../../redux/user/user_action";
import NavigationBar from "../../components/navigation_bar/navigation_bar";
import HomeLoader from "../../components/homeLoader/homeLoader";

const HomeContentWithSpinner = withSpinner(HomeContent);

const HomePage = ({
  getProfiles,
  profiles,
  isLoading,
  match,
  toggleNav,
  location,
}) => {
  useEffect(() => {
    const width = window.innerWidth;
    console.log("window width", profiles);
  });

  return (
    <>
      <NavigationBar />
      <div className="home_page">
        <div className="filter">
          <FilterComponent />
        </div>
          {
            isLoading ? <HomeLoader /> : <HomeContent profiles={profiles} />
          }
        <ProfileComponent />
        <RespProfile />
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  isLoading: state.appData.loading,
  profiles: state.appData.data,
});

const mapDispatchToProps = (dispatch) => ({
  toggleNav: () => dispatch(ToggleSlideInleft()),
});
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
