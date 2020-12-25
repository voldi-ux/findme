import React, { useEffect, useState } from "react";
import { IconContext } from "react-icons";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiPaperclip } from "react-icons/fi";
import { FaPaperPlane,FaArrowLeft } from "react-icons/fa";
import { connect } from "react-redux";
import { io } from "socket.io-client";

import "./chat.scss";
import { fetchingChats, onrecieveMessage } from "../../../redux/chat/chat_actions";
import {toggleSideNav} from '../../../redux/controls/actions'
const URI_STRING =
  process.env.NODE_ENV === "production"
    ? "http://localhost:5005/"
    : "http://localhost:5005/";
let socket;

const Chat = ({ profile, messages, room, currentUser, updateMsg ,getCurrentUserChats,toggleSide}) => {
  const [msg, setMsg] = useState("");
useEffect(()=> {
  getCurrentUserChats(currentUser._id)
},[msg, messages])

  useEffect(() => {
    socket = io("http://localhost:5005/");
    if(room && profile) {
      socket.emit("join", { roomId: room._id });
      socket.on("recievedMsg", (msg) => {
        updateMsg(msg);
        console.log(msg)
        setMsg("");
      });
    }
    return () => {
      socket.off();
      socket.disconnect();
    };
  }, [room,profile]);

  if (!profile) {
    return <h1>hey voldi, click on a chat to start to chatting</h1>;
  }
  if (!room) {
    return <h1>loading...</h1>;
  }
  const handleSubmit = () => {
    if (!msg) return;
    socket.emit("message", { roomId: room._id, name: currentUser.userName, msg });
  };
  const handleChange = (e) => setMsg(e.target.value);

  const renderMesssages = (message, index) => {
    console.log(message.name, currentUser.userName)
    if (message.name === currentUser.userName) {
      return (
        <div
        key={message._id}
          className=" main-chat__message main-chat__message__right d-flex"
          aria-current="true"
        >
          <div className="w-100 ms-auto">
            <div className="d-flex w-100  main-chat__message__content main-chat__message__content__right ">
              <p>{message.msg}</p>
            </div>
            <p className=" main-chat__message__time">{message.time}</p>
          </div>
          <img alt="..ddd" src={currentUser.profile.avatarUrl} />
        </div>
      );
    }

    return (
      <div
      key={message._id}
        className=" main-chat__message main-chat__message__left d-flex"
        aria-current="true"
      >
        <img alt="..ddd" src='http://127.0.0.1:5005/images/gallaries1603706623671image-1.jpg' />
        <div className="w-100 ">
          <div className="d-flex w-100  main-chat__message__content main-chat__message__content__left ">
            <p>{message.msg}</p>
          </div>
          <p className=" main-chat__message__time">{message.time}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="main-chat d-flex flex-column">
      <header className="main-chat__header d-flex align-items-center">
      <IconContext.Provider value={{ size: "2rem" }}>
          <FaArrowLeft onClick={toggleSide}/>
        </IconContext.Provider>
        <img alt="..ddd" src='http://127.0.0.1:5005/images/gallaries1603706623671image-1.jpg'/>
        <div>
          <h1>
            {profile.profile.name} {profile.profile.surname}
          </h1>
          <small>online</small>
        </div>
        <IconContext.Provider value={{ size: "2rem" }}>
          <BsThreeDotsVertical />
        </IconContext.Provider>
      </header>
      <main className="main-chat__main d-flex flex-column">{messages.map(renderMesssages)}</main>
      <footer className="main-chat__footer d-flex ">
        <textarea
          onChange={handleChange}
          value={msg}
          className="main-chat__footer__input"
          placeholder="Type a message"
        />
        <IconContext.Provider value={{className:'footer__icons', size: "2rem" }}>
          <div className="main-chat__footer__icons">
            <span className="paper-clip">
              <FiPaperclip />
            </span>
            <span className="paper-plane" onClick={handleSubmit}>
              <FaPaperPlane />
            </span>
          </div>
        </IconContext.Provider>
      </footer>
    </div>
  );
};

const mapState = ({ Chat, user }) => ({
  messages: Chat.messages,
  room: Chat.room,
  loading: Chat.laoding,
  currentUser: user.CurrentUser,
  profile: Chat.partner,
  
});

const mapDispatch = (dispatch) => ({
  updateMsg: (msg) => dispatch(onrecieveMessage(msg)),
  getCurrentUserChats: id => dispatch(fetchingChats(id)),
  toggleSide: () => dispatch(toggleSideNav())


});
export default connect(mapState, mapDispatch)(Chat);
