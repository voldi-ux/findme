import React from 'react'
import './major_chat_room.scss'
const MajorRoom =  () => {
    return <div className='major__container'>
            <div className='major__container__inner'>
           <div className='major__header'>
           <img className='major__image' src='https://cdn.iconscout.com/icon/free/png-256/avatar-367-456319.png' alt='avatar'/>
                    <h3 className='major__name'>
                       voldi muyumba
                    </h3>
           </div>
           
            <div className='major__content'>
               <div className='major__chats'>
                       <p className='major__chats__left'>
                          hey!!!!
                       </p>
                       <p className='major__chats__right'>
                          hey!!!!
                       </p>
                       <p className='major__chats__left'>
                          hud?
                       </p>
                       <p className='major__chats__right'>
                       Am finished rejoiced drawings so he elegance. Set lose dear upon had two its what seen. Held she sir how know what such whom. Esteem put uneasy set piqued son depend her others.
                       </p>
               </div>
               <form className='major__form'>
                   <div className='major__form__group'>
                     <input placeholder='type message...' type='text'  className='major__textInput'/>
                     <button className='major__button'>send</button>
                   </div>
               </form>
            </div>
        </div>
            </div>
}

export default MajorRoom