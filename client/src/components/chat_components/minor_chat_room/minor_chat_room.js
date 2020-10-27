import React from 'react';
import {useHistory,withRouter} from 'react-router-dom'
import './minor_chat_room.scss'

const MinorRoom =  ({match, id,chat}) => {
   const history = useHistory()

    return <div className='minor__container' onClick={()=> history.push(`${match.path}/singlechat/${chat._id}`)}>
                 <div className='minor__content'>
                      <div className='minor__content-top'>
                        <img className='minor__image' src={'data:image/png;base64,' + chat.avatarUrl} alt='avatar'/>
                        <h3 className='minor__name'>
                           {chat.name}
                        </h3>
                      </div>
                    <p className='minor__last-msg'>
                       {chat.messages.msg.slice(0, 10) + '...'}
                    </p>
                 </div>
            </div>
}

export default  withRouter(MinorRoom)