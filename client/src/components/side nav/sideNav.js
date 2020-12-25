import React from "react";
import { BsSearch } from "react-icons/bs";
import { BsHouse } from "react-icons/bs";
import { MdAccountCircle } from "react-icons/md";
import { AiTwotoneMail } from "react-icons/ai";
import { ImLocation } from "react-icons/im";
import { AiOutlinePhone } from "react-icons/ai";
import { MdLocationCity } from "react-icons/md";
import { IconContext } from "react-icons";
import LogOutBtn from "../notification_icons/notification_icons";
import { connect } from "react-redux";
import { fetchingChats, setChatData } from "../../redux/chat/chat_actions";
import {CustomCompose, modifiedChatArray, isMessagesEmpty} from '../../utils/chats.utils'
import moment from 'moment'

import "./sideNav.scss";
import { toggleSideNav } from "../../redux/controls/actions";

const SideNav = ({chats, currentUser , setChatData ,getCurrentUserChats, userId,toggleSide, showNav}) => {

  const modifiedChats = CustomCompose(chats,currentUser)(isMessagesEmpty,modifiedChatArray)
  
React.useEffect(() => {
  getCurrentUserChats(userId)
  console.log(showNav)
  return () => {
    showNav === true ? toggleSide() : console.log(showNav)
  }
},[])
  const renderChats = (chat,index,arr) => {
   
    return <div key={chat._id} className="list-group  mb-4" onClick={() => {
     setChatData({
      room:chat.room,
      profile:chat,
      messages:chat.messages
     })
     toggleSide()
    }}>
    <div
      className="list-group-item side-nav__chats__chat list-group-item-action d-flex"
      aria-current="true"
    >
      <img
        alt="..ddd"
        src={chat.profile.avatarUrl}
      />
      <div className='ms-3 w-100'>
        <div className="d-flex w-100 justify-content-between ">
          <h5 className="mb-4 side-nav__chats__chat__name">
            {chat.profile.name} {chat.profile.surname}
          </h5>
          <small className="side-nav__chats__chat__time">
          {/* {moment(chat.messages[chat.messages.length -1].time, '"YYYYMMDD"').fromNow()} */}

            {moment(chat.messages[chat.messages.length -1].time, 'MMDDYYYY').fromNow()}
          </small>
        </div>
        <p className=" side-nav__chats__chat__msg">
        {chat.messages[chat.messages.length -1].msg}
        </p>
      </div>
    </div>
  </div>
  
  }

  return (
    <div className={`side-nav d-flex ${showNav ? 'show' : null}`} >
      <aside className="side-nav__bar d-flex flex-column">
        <div className="side-nav__icons__container">
          <IconContext.Provider
            value={{ className: "side-nav__icons", size: "2.5rem" }}
          >
            <div className="d-flex flex-column align-items-center side-nav__link ">
              <BsHouse />
              <h4 className="mt-3">HOME</h4>
            </div>
            <div  className="d-flex flex-column align-items-center side-nav__link">
              <MdAccountCircle />
              <h4 className="mt-3">PROFILE</h4>
            </div>
          </IconContext.Provider>
        </div>
        <LogOutBtn />
      </aside>
      <aside className="side-nav__chats">
        <header>
          <h1>Chats</h1>
          <IconContext.Provider
            value={{ className: "side-nav__chats__icon", size: "2rem" }}
          >
            <div className='input-group mb-3 w-100" side-nav__input__container my-4'>
              <input
                type="text"
                className="form-control side-nav__input"
                placeholder="Search for chats"
                aria-label="Recipient's username"
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
          
          {
            modifiedChats.length ? modifiedChats.map(renderChats) : <h1> you have no chats</h1>
          }
        </main>
      </aside>
    </div>
  );
};

const mapState = ({ Chat, user,controls }) => ({
 
  chats: Chat.chats,
  currentUser: user.CurrentUser,
  userId: user.CurrentUser._id,
  showNav:controls.isSideNavVisible
  
});

const mapDispatch = (dispatch) => ({
  setChatData: (data) => dispatch(setChatData(data)),
  getCurrentUserChats: id => dispatch(fetchingChats(id)),
  toggleSide: () => dispatch(toggleSideNav())

});



export default connect(mapState, mapDispatch)(SideNav);
