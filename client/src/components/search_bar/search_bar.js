import React, {
  useState,
  useContext,
  useEffect,
  useRef,
  usefocus,
} from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { IconContext } from "react-icons";
import "./search_bar.scss";
import { onFechingFilterProfiles } from "../../redux/app_data_reducer/data_actions";
import SearchBox from "../searchBox/searchBox";
import { FilterProfileContext } from "../../context/filter_Data_context/filter.data";
const URI_STRING =
  process.env.NODE_ENV === "production" ? "/" : "http://localhost:5005/";

const SeacrhBar = ({ onSearch }) => {
  const { setVisible, setProfiles, profiles, visible } = useContext(
    FilterProfileContext
  );
  const [width, setWidth] = useState(window.innerWidth);
  const [searchTerm, setTerm] = useState("");

  const checkWindowSize = () => {
    const Width = window.innerWidth;
    setWidth(Width);
  };
  const onSubmit = (e) => {
    e.preventDefault();
  };

  const onFocus = () => {};
  const fetchProfiles = async (str) => {
    try {
      const data = await (await fetch(`${URI_STRING}search/${str}`)).json();
      console.log(data);
      setProfiles(data);
    } catch (error) {
      error.message= 'oops, we are unable to load data right now, please make sure you have an internet connection and try again.'
      alert(error.message);
    }
  };
  const onblur = () => {
    setVisible(false);
  };

  const handleChange = (e) => {
    setTerm(e.target.value);
  };

  useEffect(() => {
    if (width < 550 && visible) {
      setVisible(true);
    }
    window.addEventListener("resize", checkWindowSize);
    return () => window.removeEventListener("resize", checkWindowSize);
  }, []);

  useEffect(() => {
    if (searchTerm.length) {
      fetchProfiles(searchTerm);
    } else {
      setProfiles([]);
    }
  }, [searchTerm]);

  const showSearchBar = () => {
    if (width < 550) {
      if (visible === false) {
        setVisible(true);
      }
    }
  };

  return (
    <div className="search_bar__container">
      <form autoComplete="off" onSubmit={onSubmit}>
        <input
          autoComplete="off"
          onFocus={onFocus}
          onBlur={onblur}
          type="text"
          onChange={handleChange}
          value={searchTerm}
          name="searchquery"
          className={`search_bar__input ${visible ? "show" : null}`}
          placeholder="Enter name or title/occupation..."
        />
      </form>

      <IconContext.Provider
        value={{ size: "2rem", className: "search_bar__icon" }}
      >
        <BsSearch onClick={showSearchBar} />
      </IconContext.Provider>
    </div>
  );
};

const mapDispatchToProps = (dispacth) => ({
  onSearch: (data) => dispacth(onFechingFilterProfiles(data)),
});
export default connect(null, mapDispatchToProps)(SeacrhBar);
