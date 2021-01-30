import React from "react";
import FilterComponent from "../../components/filter_components/filters_container";
import HomeContent from "../../components/search_result_component/search_result_conponent";
import ProfileComponent from "../../components/profile_component/profile";

//responsive components

import RespProfile from "../../responsive/profile_component/profile";

import "./Home_page.scss";
import { connect } from "react-redux";
import { ToggleSlideInleft } from "../../redux/user/user_action";
import NavigationBar from "../../components/navigation_bar/navigation_bar";
import HomeLoader from "../../components/homeLoader/homeLoader";


const HomePage = ({
  profiles,
  isLoading,
  
}) => {
 
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
