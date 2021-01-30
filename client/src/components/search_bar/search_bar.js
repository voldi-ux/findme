import React, {
  useContext,
 
} from "react";
import { BsSearch } from "react-icons/bs";
import { IconContext } from "react-icons";
import "./search_bar.scss";
import { FilterProfileContext } from "../../context/filter_Data_context/filter.data";

const SeacrhBar = () => {
  const { setVisible,  visible } = useContext(
    FilterProfileContext
  );
  
  return (
    <div className="search_bar__container">
 
      <form autoComplete="off" >
        <input
          autoComplete="off"
          onFocus={setVisible}
          type="text"
          name="searchquery"
          className={`search_bar__input ${visible ? "show" : null}`}
          placeholder="Enter name or title/occupation..."
        />
      </form>

      <IconContext.Provider
        value={{ size: "2rem", className: "search_bar__icon" }}
      >
        <BsSearch onClick={setVisible} />
      </IconContext.Provider>
    </div>
  );
};


export default SeacrhBar;
