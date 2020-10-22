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
}) => (
  <div className="search_result_container">
    {profiles.map((profile) => (
      <ResultBox key={profile._id} profile={profile} />
    ))}

   {
     search ? null : <div className="control__botton">
     {pageNunber > 1 ? (
       <Button
         onClick={async() => {
           await decrementPageNum()
           //   getProfiles(pageNunber)
         }}
         value="previuos"
       />
     ) : null}
     <Button
       value="next"
       onClick={async() => {
        await incrementPageNum()
        //  getProfiles(pageNunber)
       }}
     />
   </div>
   }
  </div>
);

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
