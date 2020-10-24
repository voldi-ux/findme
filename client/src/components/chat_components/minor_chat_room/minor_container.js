import React from 'react';
import {useHistory} from 'react-router-dom'
import MinorRoom from  './minor_chat_room'
import {connect} from 'react-redux'

import './minor_chat_room.scss'
import { modifiedChatArray,isMessagesEmpty,CustomCompose } from '../../../utils/chats.utils';

const MinorRoomContainer =  ({chats, currentUser}) => {
  const newChats = CustomCompose(chats,currentUser)(isMessagesEmpty,modifiedChatArray)
  return <div className='chatroom__container__inner'>
  <h1 className='chatroom__heading'>
      Chats
  </h1>
   <div className='chatroom__minor'>
       { newChats.length ? newChats.map((chat,i) => <MinorRoom key={i} chat={chat} /> ): <h1>
           You currently have no chats
       </h1> }
   </div>
</div>
}

const mapStateToProps = (state) => ({
    currentUser: state.user.CurrentUser,
    chats: state.Chat.chats,

})
export default connect(mapStateToProps)(MinorRoomContainer)