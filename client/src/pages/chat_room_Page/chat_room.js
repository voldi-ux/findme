import React, { lazy } from "react";
import MainChatComponent from "../../components/chat_components/main chat/chat";

import "./chat_room.scss";
const SideNav = lazy(() => import("../../components/side nav/sideNav"))

const ChatRoom = () => {

  return (
    <div className="chatroom__container d-flex flex-row">
      <SideNav />
      <MainChatComponent />
    </div>
  );
};



export default ChatRoom;
