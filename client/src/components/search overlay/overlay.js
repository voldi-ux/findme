import React, { useContext, useState,useEffect,useRef } from "react";
import { BsSearch,BsX } from "react-icons/bs";
import { IconContext } from "react-icons";
import "./overlay.scss";
import SearchBox from "../searchBox/searchBox";

import { FilterProfileContext } from "../../context/filter_Data_context/filter.data";
const URI_STRING =
  process.env.NODE_ENV === "production" ? "/" : "http://localhost:5005/";

const SearchOverlay = () => {
  const [searchTerm, setTerm] = useState("");
  const { setVisible,  profiles, setProfiles } = useContext(
    FilterProfileContext
  );
  let searchRef = useRef(null)

  useEffect(() => {
    let input = document.querySelector('.search-overlay__input')
    console.log(input)
    input.focus()
  },[])
  const fetchProfiles = async () => {
    try {
      const data = await (
        await fetch(`${URI_STRING}search/${searchTerm}`)
      ).json();
      
      setProfiles(data);
      // if(data.length) return setTerm("");

    } catch (error) {
      error.message =
        "oops, we are unable to load data right now, please make sure you have an internet connection and try again.";
      alert(error.message);
    }
  };

  const handleChange = (e) => {
    setTerm(e.target.value);
  };

  return (
    <div className="search-overlay__container">
      <div className="search-overlay__content__top">
        <IconContext.Provider
          value={{ className: "search-overlay__icon", size: "2rem" }}
        >
        <span className="search-overlay__close" onClick={setVisible}>
          <BsX />
        </span>
          <div className='input-group  w-100" search-overlay__input__container '>
            <input
            ref={(ref) =>  searchRef = ref}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  if (searchTerm.trim() === "") return false;
                  fetchProfiles();
                }
              }}
              onChange={handleChange}
              value={searchTerm}
              type="text"
              className="form-control search-overlay__input"
              placeholder="Search for profiles"
              aria-describedby="basic-addon2"
            />
            <span
              className="input-group-text search-overlay__search"
              id="basic-addon2"
            >
              <BsSearch  onClick={fetchProfiles}/>
            </span>
          </div>
        </IconContext.Provider>
      </div>
            <h4>{profiles.length} search results found for {searchTerm}</h4>

      <SearchBox profiles={profiles} />
    </div>
  );
};

export default SearchOverlay;
