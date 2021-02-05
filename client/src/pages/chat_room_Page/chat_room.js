import React, { lazy,useEffect } from "react";
import MainChatComponent from "../../components/chat_components/main chat/chat";
import {connect} from 'react-redux';
import "./chat_room.scss";
import { clearUserNotifications } from "../../redux/user/user_action";
const SideNav = lazy(() => import("../../components/side nav/sideNav"))

const ChatRoom = ({socket,clearNotification,notificationCount}) => {
 useEffect(()=>{
   if(notificationCount) {
    clearNotification()
   }
 },[notificationCount]) 
 useEffect(() => {
  //  document.body.requestFullscreen();
 },[])
  return (
    <div className="chatroom__container d-flex flex-row">
      <SideNav />
      <MainChatComponent notiSocket={socket}/>
    </div>
  );
};

const mapDispatch = dispatch =>( {
  clearNotification: () => dispatch(clearUserNotifications())
})
const mapState = ({user}) => ({
  notificationCount:user.notificationCount
})
export default connect(mapState,mapDispatch)(ChatRoom);
