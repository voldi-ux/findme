import React, { useEffect, useState } from "react";
import moment from "moment";
import { colors } from "../../border colors/colors";
import { unSeenMsgCount } from "../../utils/chats.utils";
import Tick from "../tick/tick";

const SideChat = ({ chat, setChatData, toggleSide }) => {
  let c = unSeenMsgCount(chat);
  let [borderStyle, setborderStyle] = useState(null);
  let [count, setCount] = useState(0);
  useEffect(() => {
    setCount(c);
    return () => {
      setCount(0);
    };
  },[c]);
  
  useEffect(() => {
    setborderStyle({
      borderColor: colors[Math.floor(Math.random() * 28)],
    });
  }, [chat._id]);

  const renderUnseenMsg = () => {
    if (count) {
      return (
        <div className="side-nav__chats__chat__msg d-flex justify-content-between">
          <small className="side-nav__chats__chat__msg-1">
            {chat.messages[chat.messages.length - 1].msg.slice(0, 10)}...
          </small>
          <small className="side-nav__chats__chat__msg-2">{count}</small>
        </div>
      );
    } else if (chat.messages[chat.messages.length - 1].name !== chat.userName) {
      return (
        <div className="side-nav__chats__chat__msg  ">
          <Tick seen={chat.messages[chat.messages.length - 1].seen} />
          <small className="side-nav__chats__chat__msg-1 ms-1">
            {chat.messages[chat.messages.length - 1].msg.slice(0, 10)}...
          </small>
        </div>
      );
    }
    return (
      <div className="side-nav__chats__chat__msg  ">
        <small className="side-nav__chats__chat__msg-1 ms-1">
          {chat.messages[chat.messages.length - 1].msg.slice(0, 10)}...
        </small>
        <small></small>
      </div>
    );
  };
  return (
    <div
      className="list-group  mb-4 side-chat"
      onClick={() => {
        setCount(0);
        setChatData({
          room: chat.room,
          profile: chat,
          messages: chat.messages,
        });

        toggleSide();
      }}
    >
      <div
        className="list-group-item side-nav__chats__chat list-group-item-action d-flex"
        aria-current="true"
      >
        <img
          alt="..ddd"
          src={chat.profile.avatarUrl}
          alt="avatar"
          style={borderStyle}
        />
        <div className="ms-3 w-100">
          <div className="d-flex w-100 justify-content-between ">
            <h5 className="mb-2 side-nav__chats__chat__name">
              {chat.profile.name} {chat.profile.surname}
            </h5>
            <small className="side-nav__chats__chat__time">
              {/* {moment(chat.messages[chat.messages.length -1].time, '"YYYYMMDD"').fromNow()} */}
              {moment(chat.messages[chat.messages.length - 1].time).calendar()}
            </small>
          </div>
          {renderUnseenMsg()}
        </div>
      </div>
    </div>
  );
};

export default SideChat;
