import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "./major_chat_room.scss";
import io from "socket.io-client";
import chatData from "../../../testData/chat_data";

const URI_STRING = "http://localhost:5000/";
let socket;

const MajorRoom = ({ location, currentUser, match,getUser,partner }) => {
  const userId1 = match.userId1;
  const userId2 = currentUser._id;
  const chatRoomId = 1;
  const room = chatData.find((room) => room.id === chatRoomId); //this data should come from the database.
  const [userRoom, setRoom] = useState(room);
  const [message, SetMessage] = useState("");
  const [messages, SetMessages] = useState(userRoom.messages);

  const existingRoom =  currentUser.chatrooms.find((roomId,index) => partner.chatrooms[index] === roomId)

  //reach out to the data base and find a user and check if he has an existing realtionship with current user fetch(/getuser/user1id)

//   const existingRoom = true; //must use this to find if there is an existing room

  const onSubmit = (e) => {
    e.preventDefault();
    if (!message) return false;

    socket.emit("message", {
      roomId: 1,
      name: currentUser.userName,
      msg: message,
    });
    SetMessage("");
  };

  useEffect(() => {
    socket = io(URI_STRING);
    if(existingRoom) {
      socket.emit("jion", { roomId: existingRoom,name: currentUser.userName,});
    } else {
      socket.emit("createRoom", {userId1,userId2});
    }

    socket.on("recievedMsg", (msg) => {
      SetMessages([...messages, msg]);
    });

    return () => {
      socket.off();
      socket.emit("disconnect");
    };
  }, [messages]);

  // useEffect(() => {
  //    socket.on('sendRoom', room => {
  //       setRoom(room)
  //    })
  // },[messages])

  const handleChange = (e) => {
    const { name, value } = e.target;
    SetMessage(value);
  };

  return (
    <div className="major__container">
      <div className="major__container__inner">
        <div className="major__header">
          <img
            className="major__image"
            src="https://cdn.iconscout.com/icon/free/png-256/avatar-367-456319.png"
            alt="avatar"
          />
          <h3 className="major__name">{currentUser.userName}</h3>
        </div>

        <div className="major__content">
          <div className="major__chats">
            {messages.map((msg) => {
              return msg.name === currentUser.userName ? (
                <p className="major__chats__right">{msg.msg}</p>
              ) : (
                <p className="major__chats__left">{msg.msg}</p>
              );
            })}
          </div>
          <form className="major__form" onSubmit={onSubmit}>
            <div className="major__form__group">
              <input
                placeholder="type message..."
                onChange={handleChange}
                type="text"
                value={message}
                className="major__textInput"
              />
              <button className="major__button">send</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.user.CurrentUser,
});
const mapDispatchToProps = (dispatch) => ({
  getUser: '/ a function that get a user from a database / part of the chat redux'
});

export default connect(mapStateToProps)(withRouter(MajorRoom));
