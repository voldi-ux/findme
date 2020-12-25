import React from "react";
import { connect } from "react-redux";
import "./search_result_conponent.scss";
import ResultBox from "../result-box/result_box";
import Button from "../buttons/button";
import { onFechingProfiles } from "../../redux/app_data_reducer/data_actions";

const SearchResult = ({
  profiles,
  pageNunber,
  getProfiles,
  incrementPageNum,
  decrementPageNum,
  search
}) => {
  const handleScroll = (e) => {

    const isBottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight
    if(isBottom) {
      console.log({
        scrollHeight:e.target.scrollHeight,
        scrollTop:e.target.scrollTop,
        clientHeight:e.target.clientHeight
      })
  
    }
  }
  return (
    <div className="search_result_container" onScroll={handleScroll}>
      {
        profiles.length ? profiles.map((profile) => (
          <ResultBox key={profile._id} profile={profile} />
        )) :  <h1>
           Oops, nothing to show here
        </h1>
      }
  
      </div>
  );
}

const mapStateToProps = (state) => ({
  pageNunber: state.appData.page,
});
let incre = () => ({
  type: "INCREMENT_PAGE_NUMBER",
});

let decre = () => ({
  type: "DECREMENT_PAGE_NUMBER",
});

const mapDispatchToProps = (disptach) => ({
  getProfiles: (pageNunber) => disptach(onFechingProfiles(pageNunber)),
  incrementPageNum: () => disptach(incre()),

  decrementPageNum: () => disptach(decre()),
});
export default connect(mapStateToProps, mapDispatchToProps)(SearchResult);
