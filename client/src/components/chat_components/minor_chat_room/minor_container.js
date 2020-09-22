import React from 'react';
import {useHistory} from 'react-router-dom'
import MinorRoom from  './minor_chat_room'
import {connect} from 'react-redux'

import './minor_chat_room.scss'
import { modifiedChatArray } from '../../../utils/chats.utils';

const MinorRoomContainer =  ({chats, currentUser}) => {
  const modifiedChats = chats.length ? modifiedChatArray(chats,currentUser) : []
  
  console.log('modified',modifiedChats)
  console.log('old chats',chats)
  return <div className='chatroom__container__inner'>
  <h1 className='chatroom__heading'>
      Chats
  </h1>
   <div className='chatroom__minor'>
       {modifiedChats.length ? modifiedChats.map((chat,i) => chat.messages.length ? <MinorRoom key={i} chat={chat} />: null) : <h1>
           no chats
       </h1> }
   </div>
</div>
}

const mapStateToProps = (state) => ({
    currentUser: state.user.CurrentUser,
    chats: state.Chat.chats,

})
export default connect(mapStateToProps)(MinorRoomContainer)