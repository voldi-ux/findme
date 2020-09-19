import React, { Component } from 'react'
import MinorRoom from '../../components/chat_components/minor_chat_room/minor_chat_room'
import MajorRoom from '../../components/chat_components/major_chat_room/major_chat_room'
import {Route} from 'react-router-dom'
import './chat_room.scss'

const ChatRoom = ({match}) => {
  return <div className='chatroom__container'>
        <Route exact path={match.path} render = {(props) => (<div className='chatroom__container__inner'>
           <h1 className='chatroom__heading'>
               Chats
           </h1>
            <div className='chatroom__minor'>
                <MinorRoom {...props}/>
                <MinorRoom  {...props}/>
                <MinorRoom {...props}/>
                <MinorRoom {...props}/>
            </div>
        </div>)} />
        <Route path={`${match.path}/singlechat`} component={MajorRoom} />
    </div>
}


export default ChatRoom