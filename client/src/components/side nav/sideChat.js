import React,{useEffect,useState} from 'react'
import moment from 'moment'
import { colors } from "../../border colors/colors";


const SideChat = ({chat,setChatData,toggleSide}) => {
    let [borderStyle,setborderStyle] = useState(null);
    useEffect(() => {
      setborderStyle({
        borderColor: colors[Math.floor(Math.random()*28 )],
      }) 
    },[chat._id]);
  
    return (
      <div
        className="list-group  mb-4 side-chat"
        onClick={() => {
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
          <img alt="..ddd" src={chat.profile.avatarUrl} alt='avatar' style={borderStyle} />
          <div className="ms-3 w-100">
            <div className="d-flex w-100 justify-content-between ">
              <h5 className="mb-2 side-nav__chats__chat__name">
                {chat.profile.name} {chat.profile.surname}
              </h5>
              <small className="side-nav__chats__chat__time">
                {/* {moment(chat.messages[chat.messages.length -1].time, '"YYYYMMDD"').fromNow()} */}
                {moment(
                  chat.messages[chat.messages.length - 1].time
                ).calendar()}
              </small>
            </div>
            <p className=" side-nav__chats__chat__msg">
              {chat.messages[chat.messages.length - 1].msg.slice(0,10)}...
            </p>
          </div>
        </div>
      </div>
    );
  };

  export default SideChat