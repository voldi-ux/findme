import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "./major_chat_room.scss";
import io from "socket.io-client";
import chatData from "../../../testData/chat_data";
import { onGettingChatPrtner } from "../../../redux/chat/chat_actions";

const URI_STRING = "http://localhost:5000/";
let socket;

const MajorRoom = ({ location, currentUser, match,partner,room }) => {
  const userId1 = partner._id;
  const userId2 = currentUser._id;

  
  
  const [message, SetMessage] = useState("");
  const [messages, SetMessages] = useState(room.messages);

 
  //reach out to the data base and find a user and check if he has an existing realtionship with current user fetch(/getuser/user1id)

//   const existingRoom = true; //must use this to find if there is an existing room

  const onSubmit = (e) => {
    e.preventDefault();
    if (!message) return false;
   
    socket.emit("message", {
      roomId: room._id,
      name: currentUser.userName,
      msg: message,
    });
    SetMessage("");
  };
let dicsonnectCount = 0
   

  useEffect(() => {
   console.log(room)

    socket = io(URI_STRING,{transports:['websocket']});
   
      socket.emit("join", { roomId:room._id ,name: currentUser.userName,});
    

    

    return () => {
      socket.off();
      socket.emit("disconnect", {name:currentUser.userName});
    };
  }, [dicsonnectCount,match.url]);

  useEffect(() => {
    socket.on("recievedMsg", (msg) => {
      SetMessages([...messages, msg]);
    });
    socket.on("disconnect", (count) => {
      dicsonnectCount += count
    });
  },[messages])

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
            src={partner.avatarUrl}
            alt="avatar"
          />
          <h3 className="major__name">{partner.userName}</h3>
        </div>

        <div className="major__content">
          <div className="major__chats">
            {messages.map((msg) => {
              return msg.name === currentUser.userName ? (
                <p className="major__chats__right">{msg.msg} <span className='time'>{msg.time}</span></p>
            
              ) : (
                <p className="major__chats__left">{msg.msg} <span className='time'>{msg.time}</span></p>
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
  partner:state.Chat.partner,
  isLoading:state.Chat.loading,
  room:state.Chat.room
});
const mapDispatchToProps = (dispatch) => ({
  getPartner: id => dispatch(onGettingChatPrtner(id))
});

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(MajorRoom));
