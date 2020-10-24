import React, { useEffect,  } from "react";
import { withRouter } from "react-router-dom";
import chatBox from './major_chat_room'
import { connect } from "react-redux";
import withSpinner from "../../spinner/spinner";
import { onGettingChatPrtner ,onGettingRoom} from "../../../redux/chat/chat_actions";

import "./major_chat_room.scss";


const ChatBoxWithSpinner = withSpinner(chatBox)

const MajorRoom = ({ isLoading, match,getPartner,getRoom ,currentUserId,loading,room}) => {
  const userId1 = match.params.userId;
    useEffect(()=> {
      getRoom(userId1,currentUserId)
      getPartner(userId1)
    },[userId1])

  return (
       <ChatBoxWithSpinner isLoading={isLoading  || !room}/>
  )
};


const mapStateToProps = (state) => ({
   isLoading:state.Chat.isGettingPartner,
   loading:state.Chat.loading,
   room: !!state.Chat.room,
   currentUserId:state.user.CurrentUser._id,
});
const mapDispatchToProps = (dispatch) => ({
  getPartner: id => dispatch(onGettingChatPrtner(id)),
  getRoom: (id1,id2) => dispatch(onGettingRoom(id1,id2))
});

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(MajorRoom));
