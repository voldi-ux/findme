import React, { useEffect, useState } from "react";
import { IconContext } from "react-icons";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiPaperclip } from "react-icons/fi";
import { FaPaperPlane } from "react-icons/fa";
import { connect } from "react-redux";
import { io } from "socket.io-client";
import moment from "moment";

import "./chat.scss";
import {
  fetchingChats,
  onrecieveMessage,
} from "../../../redux/chat/chat_actions";
import { toggleSideNav } from "../../../redux/controls/actions";
import Loader from "../../loader/loader";
const URI_STRING =
  process.env.NODE_ENV === "production" ? "/" : "http://localhost:5005/";
let socket;

const Chat = ({
  profile,
  messages,
  room,
  currentUser,
  updateMsg,
  getCurrentUserChats,
  toggleSide,
}) => {
  const [msg, setMsg] = useState("");
  useEffect(() => {
    getCurrentUserChats(currentUser._id);
  }, [msg, messages]);
  const [typing, setTyping] = useState(false);
  const [online, setOnline] = useState(false);
  useEffect(() => {
    socket = io.apply(URI_STRING);
    if (room && profile) {
      socket.emit("join", { roomId: room._id });
      socket.on("recievedMsg", (msg) => {
        updateMsg(msg);
        console.log(msg);
        setMsg("");
      });
      socket.on('typing', () => {
          setTyping(true)
      })
      
      socket.on('typingEnd', () => {
          setTyping(false)
      })

    }
    return () => {
      socket.off();
      socket.disconnect();
    };
  }, [room, profile]);
 useEffect(()=> {
  const el = document.getElementsByClassName('main-chat__message')
  if(el.length <= 0) return
  el[el.length - 1].scrollIntoView({behavior: "smooth"})
  
 },[messages])
  if (!profile) {
    return (
      <div className="noProfileContainer">
        <div className="content">
          <img src={currentUser.profile.avatarUrl} alt="avatar" />
          <h1>
            Hey {currentUser.profile.name} click on a chat to start chatting
          </h1>
          <div class="lds-heart heart"><div></div></div>
          <span onClick={toggleSide}>Open chats</span>
        </div>
      </div>
    );
  }
  if (!room) {
    return <Loader />;
  }
  const handleSubmit = () => {
    if (!msg) return;
    socket.emit("message", {
      roomId: room._id,
      name: currentUser.userName,
      msg,
    });
    setMsg("");
  };
  const handleChange = (e) => setMsg(e.target.value);
   const onKeyDown = () => socket.emit('typing',{ roomId: room._id,})
   const onKeyUp = () =>  setTimeout(() => {
    socket.emit('typingEnd',{ roomId: room._id,})
   },2000)

  const renderMesssages = (message, index) => {
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
            <p className=" main-chat__message__time">
              {moment(message.time).calendar()}
            </p>
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
        <img alt="..ddd" src={profile.profile.avatarUrl} />
        <div className="w-100 ">
          <div className="d-flex w-100  main-chat__message__content main-chat__message__content__left ">
            <p>{message.msg}</p>
          </div>
          <p className=" main-chat__message__time">
            {moment(message.time).calendar()}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="main-chat d-flex flex-column">
      <header className="main-chat__header d-flex align-items-center">
        <IconContext.Provider value={{ size: "2rem" }}>
          <span className="arrow-left" onClick={toggleSide}>
            &larr;
          </span>
        </IconContext.Provider>
        <img alt="..ddd" src={profile.profile.avatarUrl} />
        <div>
          <h1>
            {profile.profile.name} {profile.profile.surname}
          </h1>
  <small>{
     typing ? 'typing...' : "online"
    }</small>
        </div>
        <IconContext.Provider value={{ size: "2rem" }}>
          <BsThreeDotsVertical />
        </IconContext.Provider>
      </header>
      <main className="main-chat__main d-flex flex-column">
        {messages.map(renderMesssages)}
        {
          typing ? <div className='typingContainer'>
            <h6>{profile.profile.name} is typing</h6>
            <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
          </div> : null
        }
      </main>
      <footer className="main-chat__footer d-flex ">
        <textarea
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
          onChange={handleChange}
          value={msg}
          className="main-chat__footer__input"
          placeholder="Type a message"
        />
        <IconContext.Provider
          value={{ className: "footer__icons", size: "2rem" }}
        >
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
  getCurrentUserChats: (id) => dispatch(fetchingChats(id)),
  toggleSide: () => dispatch(toggleSideNav()),
});
export default connect(mapState, mapDispatch)(Chat);
