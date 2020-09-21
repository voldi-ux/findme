import React, { Component,useEffect } from 'react'
import { connect} from 'react-redux'
import MinorRoom from '../../components/chat_components/minor_chat_room/minor_chat_room'
import MajorRoom from '../../components/chat_components/major_chat_room/major_component'
import {Route} from 'react-router-dom'
import { fetchingChats } from '../../redux/chat/chat_actions'
import withSpinner from '../../components/spinner/spinner'


import './chat_room.scss'

const MajorRoomWithSpinner = withSpinner(MajorRoom)

const ChatRoom = ({match,chats,getChats,curentUser,isLoading}) => {
   useEffect(()=> {
       getChats(curentUser._id)

   },[getChats,curentUser])
 
  return <div className='chatroom__container'>
        <Route exact path={match.path} render = {(props) => (<div className='chatroom__container__inner'>
           <h1 className='chatroom__heading'>
               Chats
           </h1>
            <div className='chatroom__minor'>
                {chats.length ? chats.map((chat,i) => <MinorRoom key={i} chat={chat} {...props}/>) : <h1>
                    no chats
                </h1> }
            </div>
        </div>)} />
        <Route path={`${match.path}/singlechat/:userId`} render={(props) => <MajorRoom  {...props} />}/>
    </div>
}


const mapDisptchToProps = dispatch => ({
    getChats: (id) => dispatch(fetchingChats(id)),
    
})
const mapStateToProps = state => ({
    chats: state.Chat.chats,
    isLoading:state.Chat.loading,
    curentUser: state.user.CurrentUser
})

export default connect(mapStateToProps,mapDisptchToProps)(ChatRoom)