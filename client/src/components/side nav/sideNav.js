import React, { useState, lazy, useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import { IconContext } from "react-icons";
import { BsHouse } from "react-icons/bs";
import { MdAccountCircle } from "react-icons/md";
import LogOutBtn from "../notification_icons/notification_icons";
import { connect } from "react-redux";
import { fetchingChats, setChatData } from "../../redux/chat/chat_actions";
import {
  CustomCompose,
  modifiedChatArray,
  isMessagesEmpty,
} from "../../utils/chats.utils";
import { useHistory } from "react-router-dom";
import "./sideNav.scss";
import { toggleSideNav } from "../../redux/controls/actions";
import Header from "./header"
import SideChats  from "./sideChats"

const SideNav = ({
  chats,
  currentUser,
  toggleSide,
  showNav,
  // modifiedChats
}) => {
  const [term, setTerm] = useState("");
  const filter = (chat) => {
    return (
      chat.profile.name
        .toLowerCase()
        .includes(term.toLowerCase()) ||
      chat.profile.surname
        .toLowerCase()
        .includes(term.toLowerCase())
    );
  };
 let modifiedChats = CustomCompose(chats, currentUser)(
    isMessagesEmpty,
    modifiedChatArray
  ); 

  const history = useHistory();

  useEffect(() => {
    if (showNav === true) toggleSide();
    return () => {
      window.onpopstate = () => {
        if (showNav === true) toggleSide();
      };
    };
  }, [toggleSide]);

  const handleChange = (e) => {
    setTerm(e.target.value.trim());
  };

  const filteredChats = modifiedChats.filter(filter);

  return (
    <div className={`side-nav d-flex ${showNav ? "show" : "hide"}`}>
      <Header />
      <aside className="side-nav__chats">
        <div className="d-flex header__menu">
          <span></span>
          <span onClick={toggleSide}>&larr;</span>
        </div>
        <aside className="side-nav__bar align-items-center bar-phone ">
          <IconContext.Provider
            value={{ className: "side-nav__icons", size: "2.5rem" }}
          >
            <div className=" side-nav__link ">
              <BsHouse onClick={() => history.push("/home")} />
            </div>
            <div className="d-flex flex-column align-items-center side-nav__link">
              <MdAccountCircle
                onClick={() => history.push("/profile?current=true")}
              />
            </div>
          </IconContext.Provider>
          <LogOutBtn />
        </aside>
        <header>
          <IconContext.Provider
            value={{ className: "side-nav__chats__icon", size: "2rem" }}
          >
            <div className='input-group mb-3 w-100" side-nav__input__container my-4'>
              <input
                onChange={handleChange}
                type="text"
                className="form-control side-nav__input"
                placeholder="Search for chats"
                aria-describedby="basic-addon2"
              />
              <span
                className="input-group-text side-nav__search"
                id="basic-addon2"
              >
                <BsSearch />
              </span>
            </div>
          </IconContext.Provider>
        </header>
        <main>
          {modifiedChats.length ? (
            <SideChats filteredChats={filteredChats} />
          ) : (
            <h1> You Have No Chats</h1>
          )}
        </main>
      </aside>
    </div>
  );
};

const mapState = ({ Chat, user, controls }) => ({
  chats: Chat.chats,
  currentUser: user.CurrentUser,
  userId: user.CurrentUser._id,
  showNav: controls.isSideNavVisible,
});

const mapDispatch = (dispatch) => ({
  setChatData: (data) => dispatch(setChatData(data)),
  toggleSide: () => dispatch(toggleSideNav()),
});

export default connect(mapState, mapDispatch)(SideNav);
