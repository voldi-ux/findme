import React, { useState } from "react";
import { connect } from "react-redux";
import "./search_result_conponent.scss";
import ResultBox from "../result-box/result_box";
import Button from "../buttons/button";
import {
  fecthProfileSucceed,
  onFechingProfiles,
} from "../../redux/app_data_reducer/data_actions";


//=============================================
//  const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
// the expression above will let you know if the scrollable container/element has reached the bottom. 
// ============================================


//must disbale the infinity scroll once all the profiles has been fetched from the database. i.e check if the fetch profiles function returns an empty array. if true, change the state variable that controls whether to fetch more profiles to false.

const SearchResult = ({ profiles, search, profilesCount, fecthProfiles }) => {
  const [loading, setLoading] = useState(false);
  const [allfetched,setFetched] = useState(false)

  const renderCaughtUp = ()=> {
    return <div className='caughtUpContainer'>
      <img src='/images/tick.png' alt='tick'/>
      <h3>
        You Are All Caught Up
      </h3>
      <h5>
        You Have Viewed All The Profiles
      </h5>
      <a href='/home'>Click here to refresh</a>
    </div>
  }
  const handleScroll = async (e) => {
    const isBottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (isBottom) {
     
      try {
        setLoading(true);
       setTimeout(async()=> {
        const profiles = await (
          await fetch(`/getProfiles/${profilesCount}`)
        ).json();
     
        if (profiles.profiles.length >= 1) {
          fecthProfiles(profiles);
        } else {
          setFetched(true)
        }
        setLoading(false);
       },2000)
      } catch (error) {
        alert("oops could not load more data, please make sure that you have an internet connection and try again");
      }
    }
  };
  return (
    <div className="search_result_container" onScroll={(e)=> {
      if(allfetched === false) {
        handleScroll(e)
      }
    }}>
      {profiles.length ? (
        profiles.map((profile) => (
          <ResultBox key={profile._id} profile={profile} />
        ))
      ) : (
        <h1>Oops, nothing to show here</h1>
      )}
      {loading ? <h1>Loading...</h1> : null}
      {allfetched && profiles.length >= 3 ? renderCaughtUp() : null}
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
