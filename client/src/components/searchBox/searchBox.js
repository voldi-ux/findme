import React from "react";
import "./searchBox.scss";
import ResultBox from "../result-box/result_box";

const SearchBox = ({profiles}) => {
  const renderProfiles = (profile) => {
    return <ResultBox key={profile._id} profile={profile} />;
  };
  return (
   <div className='searchBox' >
       {
       profiles.filter((profile => profile.hasProfile === true)).map(renderProfiles)
       }
      {/* <div className='searchBox__content'>
       </div> */}
  </div>
  );
};

export default SearchBox;
