import React from "react";
import "./searchBox.scss";
import ResultBox from "../result-box/result_box";

const SearchBox = ({profiles, visible}) => {
  const renderProfiles = (profile) => {
    return <ResultBox profile={profile} />;
  };
  console.log('profile',profiles)
  return (
    <div className={`searchBox ${profiles.length ? 'fadeIn':'fadeOut'}`}>
       {
       profiles.filter((profile => profile.hasProfile === true)).map(renderProfiles)
       }
    </div>
  );
};

export default SearchBox;
