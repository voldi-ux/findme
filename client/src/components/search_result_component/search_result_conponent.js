import React, { useState } from "react";
import { connect } from "react-redux";
import "./search_result_conponent.scss";
import ResultBox from "../result-box/result_box";
import Button from "../buttons/button";
import {
  fecthProfileSucceed,
  onFechingProfiles,
} from "../../redux/app_data_reducer/data_actions";

const SearchResult = ({ profiles, search, profilesCount, fecthProfiles }) => {
  const [loading, setLoading] = useState(false);
  const handleScroll = async (e) => {
    const isBottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (isBottom) {
      console.log({
        scrollHeight: e.target.scrollHeight,
        scrollTop: e.target.scrollTop,
        clientHeight: e.target.clientHeight,
      });
      try {
        setLoading(true);
        const profiles = await (
          await fetch(`/getProfiles/${profilesCount}`)
        ).json();
        console.log(profilesCount);
        fecthProfiles(profiles);
        if (profiles.length >= 1) {
        }
        setLoading(false);
      } catch (error) {
        alert("oops could not load more data");
      }
    }
  };
  return (
    <div className="search_result_container" onScroll={handleScroll}>
      {profiles.length ? (
        profiles.map((profile) => (
          <ResultBox key={profile._id} profile={profile} />
        ))
      ) : (
        <h1>Oops, nothing to show here</h1>
      )}
      {(loading && <h1>Loading...</h1>) || null}
    </div>
  );
};

const mapStateToProps = (state) => ({
  profilesCount: state.appData.profilesCount,
});

const mapDispatchToProps = (dispatch) => ({
  getProfiles: (pageNunber) => dispatch(onFechingProfiles(pageNunber)),
  fecthProfiles: (count) => dispatch(fecthProfileSucceed(count)),
});
export default connect(mapStateToProps, mapDispatchToProps)(SearchResult);
