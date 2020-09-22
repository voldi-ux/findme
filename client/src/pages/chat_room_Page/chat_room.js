import React, { Component,useEffect } from 'react'
import { connect} from 'react-redux'
import MinorRoomContainer from '../../components/chat_components/minor_chat_room/minor_container'

import MajorRoom from '../../components/chat_components/major_chat_room/major_component'
import {Route} from 'react-router-dom'
import { fetchingChats } from '../../redux/chat/chat_actions'
import withSpinner from '../../components/spinner/spinner'


import './chat_room.scss'

const MinorRoomContainerWithSpinner = withSpinner(MinorRoomContainer)

const ChatRoom = ({match,chats,getChats,curentUser,isLoading,isGettingRoom}) => {
   useEffect(()=> {
       getChats(curentUser._id)

   },[match.path])
 console.log('from the room',isLoading)
  return <div className='chatroom__container'>
        <Route exact path={match.path} render={() => <MinorRoomContainerWithSpinner  isLoading={isLoading} height='40rem' />} />
        <Route path={`${match.path}/singlechat/:userId`} render={(props) => <MajorRoom  {...props} />}/>
    </div>
}



const mapDisptchToProps = dispatch => ({
    getChats: (id) => dispatch(fetchingChats(id)),
    
})
const mapStateToProps = state => ({
    isLoading:state.Chat.loading,
    curentUser: state.user.CurrentUser,
    
})

export default connect(mapStateToProps,mapDisptchToProps)(ChatRoom)