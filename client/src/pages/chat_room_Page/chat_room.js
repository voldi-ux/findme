import React, { lazy,useEffect } from "react";
import MainChatComponent from "../../components/chat_components/main chat/chat";
import {connect} from 'react-redux';
import "./chat_room.scss";
import { clearUserNotifications } from "../../redux/user/user_action";
import {getNotifications} from '../../utils/chats.utils'


const SideNav = lazy(() => import("../../components/side nav/sideNav"))

const ChatRoom = ({socket,clearNotification,notificationCount,userId}) => {

 useEffect(()=>{
   if(notificationCount) {
    clearNotification()
  getNotifications(userId,'clear')
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
  notificationCount:user.notificationCount,
  userId: user.CurrentUser._id,
})
export default connect(mapState,mapDispatch)(ChatRoom);
