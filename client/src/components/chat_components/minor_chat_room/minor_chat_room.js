import React from 'react';
import {useHistory,withRouter} from 'react-router-dom'
import './minor_chat_room.scss'

const MinorRoom =  ({match, id,chat}) => {
   const history = useHistory()

    return <div className='minor__container' onClick={()=> history.push(`${match.path}/singlechat/${chat._id}`)}>
                 <div className='minor__content'>
                    <img className='minor__image' src={chat.avatarUrl} alt='avatar'/>
                    <h3 className='minor__name'>
                       {chat.userName}
                    </h3>
                 </div>
            </div>
}

export default  withRouter(MinorRoom)