import React, { useEffect, useState, useRef } from "react";
import { IconContext } from "react-icons";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiPaperclip } from "react-icons/fi";
import { FaPaperPlane } from "react-icons/fa";
import { connect } from "react-redux";
import { io } from "socket.io-client";
import moment from "moment";
import Pop from "../../pop box/pop";
import "./chat.scss";
import {
  fetchingChats,
  onrecieveMessage,
} from "../../../redux/chat/chat_actions";
import { toggleSideNav } from "../../../redux/controls/actions";
import Loader from "../../loader/loader";
import Tick from "../../tick/tick";
import { colors } from "../../../border colors/colors";

const URI_STRING =
  process.env.NODE_ENV === "production" ? "/" : "http://localhost:5005/";
let socket;
let notificationSocket;
const Chat = ({
  profile,
  userMessages,
  room,
  currentUser,
  updateMsg,
  getCurrentUserChats,
  toggleSide,
  notiSocket,
}) => {
  useEffect(() => {
    getCurrentUserChats(currentUser._id);
  }, [getCurrentUserChats, room]);

  const [typing, setTyping] = useState(false);
  const imagePaths = [
    "/images/wallpapers/bg (1).jpg",
    "/images/wallpapers/bg (2).jpg",
    "/images/wallpapers/bg (3).jpg",
    "/images/wallpapers/bg (4).jpg",
    "/images/wallpapers/bg (5).jpg",
    "/images/wallpapers/bg (6).jpg",
    "/images/wallpapers/bg (7).jpg",
    "/images/wallpapers/bg (8).jpg",
    "/images/wallpapers/bg (9).jpg",
    "/images/wallpapers/bg (10).jpg",
  ];

  // const [online, setOnline] = useState(false);
  const [active, setActive] = useState(false);
  let [imagePath, setImagePath] = useState(imagePaths[0]);
  let [borderStyle, setborderStyle] = useState(null);
  const [showPop, setPop] = useState(false);
  const [messages, setMessages] = useState(userMessages);
  useEffect(() => {
    //preloading image
    imagePaths.forEach((imageUrl) => {
      const img = new Image();
      img.src = imageUrl;
    });
  }, []);

  useEffect(() => {
    setActive(false);
    setborderStyle({
      borderColor: colors[Math.floor(Math.random() * 28)],
    });
    return () => {
      setActive(false);
    };
  }, [room]);

  useEffect(() => {
    socket = io(`${URI_STRING}`);
    if (room && profile) {
      socket.emit("join", { roomId: room._id });
      socket.emit("OnActive", { roomId: room._id });
      socket.on("recievedMsg", (msg) => {
        updateMsg(msg);
        setMessages(msg);
        getCurrentUserChats(currentUser._id);
      });
      notiSocket.on("recievedMsg", (msg) => {
        updateMsg(msg);

        getCurrentUserChats(currentUser._id);
      });

      socket.on("active", () => {
        setActive(true);
        socket.emit("OnActive2", { roomId: room._id });
      });
      socket.on("onUnActive", () => {
        setActive(false);
        console.log("going offline", active);
      });
      socket.on("ActiveRecieved", () => {
        setActive(true);
      });
      socket.on("typing", () => {
        setTyping(true);
      });

      socket.on("typingEnd", () => {
        setTyping(false);
      });
      socket.on("onSeen", async (data) => {
        await getCurrentUserChats(currentUser._id);
        // setMessages(userMessages);
      });
    }
    return () => {
      if (room) {
        socket.emit("unActive", { roomId: room._id });
      }
      socket.off();
      socket.disconnect();
    };
  }, [room, profile, updateMsg]);

  useEffect(() => {
    const el = document.getElementsByClassName("main-chat__message");
    if (el.length <= 0) return;
    el[el.length - 1].scrollIntoView();
  }, [userMessages]);

  useEffect(() => {
    window.addEventListener("click", (e) => {
      if (showPop && e.target.className.baseVal !== "dots__icon")
        return setPop(false);
    });

    return () => {
      window.removeEventListener("click", (e) => {
        if (showPop) return setPop(false);
      });
    };
  }, [showPop]);

 
  useEffect(() => {
    if (!room) return;
    if (!active)
      notiSocket.emit("seen", {
        userId: profile._id,
        roomId: room._id,
        name: currentUser.userName,
      });
    socket.emit("seen", { roomId: room._id, name: currentUser.userName });
  }, [room, messages]);

  if (!profile) {
    return (
      <div className="noProfileContainer">
        <div className="content">
          <img src={currentUser.profile.avatarUrl} alt="avatar" />
          <h1>
            Hey {currentUser.profile.name} click on a chat to start chatting
          </h1>
          <div className="lds-heart heart">
            <div></div>
          </div>
          <span onClick={toggleSide}>Open chats</span>
        </div>
      </div>
    );
  }
  if (!room) {
    return <Loader />;
  }
  const renderStatus = () => {
    if (typing) {
      return <span className="small">{"typing..."}</span>;
    } else if (active) {
      return <span className="small">{"active"}</span>;
    }
    return null;
  };
  const changeImg = (id) => {
    setImagePath(imagePaths[id]);
  };
  const handleSubmit = () => {
      const inputRef = document.getElementsByTagName("textarea")[0];
    if(!inputRef.value.trim().length) return;
    if (!socket.connected || !notiSocket.connected) {
      socket.open();
      notiSocket.open();
      return;
    }
    if (!active) {
      notiSocket.emit("notify", {
        userId: profile._id,
        roomId: room._id,
        name: currentUser.userName,
        msg:inputRef.value,
        seen: false,
      });
    } else {
      socket.emit("message", {
        roomId: room._id,
        name: currentUser.userName,
        msg:inputRef.value,
        seen: true,
      });
    }

  inputRef.value = ''.trim()
  };
  const handleChange = (e) => {
    if (!room) return;
    if (e.target.value && document.activeElement === e.target) {
      socket.emit("typing", { roomId: room._id })
    } else {
      socket.emit("typingEnd", { roomId: room._id });
    }
  };

  const renderMesssages = (message, index) => {
    if (message.name === currentUser.userName) {
      return (
        <div
          key={message._id}
          className=" main-chat__message main-chat__message__right d-flex"
          aria-current="true"
        >
          <div className="w-100 ms-auto">
            <div className=" w-100  main-chat__message__content main-chat__message__content__right ">
              <p className="w-br">{message.msg}</p>
              <div className="d-flex justify-content-between">
                <small className=" main-chat__message__time">
                  {moment(message.time).calendar()}
                </small>
                <Tick seen={message.seen} />
              </div>
            </div>
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
        <img
          alt="..ddd"
          src={profile.profile.avatarUrl}
          alt="avatar"
          style={borderStyle}
        />
        <div className="w-100 ">
          <div className=" w-100  main-chat__message__content main-chat__message__content__left ">
            <p className="w-br">{message.msg}</p>
            <small className=" main-chat__message__time">
              {moment(message.time).calendar()}
            </small>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className="main-chat d-flex flex-column"
      style={{
        backgroundImage: `url('${imagePath}')`,
      }}
    >
      <header className="main-chat__header d-flex align-items-center">
        <IconContext.Provider value={{ size: "2rem" }}>
          <span className="arrow-left" onClick={toggleSide}>
            &larr;
          </span>
        </IconContext.Provider>

        <img
          alt="..ddd"
          src={profile.profile.avatarUrl}
          alt="avatar"
          style={borderStyle}
        />
        <div>
          <h1>
            {profile.profile.name} {profile.profile.surname}
          </h1>
          {renderStatus()}
        </div>
        <IconContext.Provider value={{ size: "2rem", className: "dots__icon" }}>
          <div className="dots">
            {showPop ? <Pop setPop={setPop} changeImg={changeImg} /> : null}
            <BsThreeDotsVertical onClick={() => setPop(true)} />
          </div>
        </IconContext.Provider>
      </header>
      <main className="main-chat__main d-flex flex-column">
        {messages.length
          ? messages.map(renderMesssages)
          : userMessages.map(renderMesssages)}
        {typing ? (
          <div className="typingContainer">
            <h6>{profile.profile.name} is typing</h6>
            <div className="lds-ellipsis">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        ) : null}
      </main>
      <footer className="main-chat__footer d-flex ">
        <textarea
          onBlur={() => socket.emit("typingEnd", { roomId: room._id })}
          onChange={handleChange}
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
  userMessages: Chat.messages,
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
