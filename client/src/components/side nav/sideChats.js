import React, {lazy } from "react";
import { connect } from "react-redux";
import {  setChatData } from "../../redux/chat/chat_actions";

import "./sideNav.scss";
import { toggleSideNav } from "../../redux/controls/actions";
const SideChat = lazy(() => import("./sideChat"));

const SideChats = ({
  setChatData,
  toggleSide,
  filteredChats
  // modifiedChats
}) => {
  

  const renderChat = (chat) => {
    return (
      <SideChat
        chat={chat}
        key={chat._id}
        toggleSide={toggleSide}
        setChatData={setChatData}
      />
    );
  };
    


  return <> 
   {filteredChats.map(renderChat)}
  </>
};

const mapDispatch = (dispatch) => ({
  setChatData: (data) => dispatch(setChatData(data)),
  toggleSide: () => dispatch(toggleSideNav()),
});

export default connect(null, mapDispatch)(SideChats);
