import React from 'react'
import { ImBubble2 } from 'react-icons/im'
import {FaBell, FaCommentAlt} from 'react-icons/fa'
import {IconContext} from 'react-icons'
import {useHistory}from 'react-router-dom'


import './notification_icons.scss'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logOut, ToggleSlideInRight } from '../../redux/user/user_action'

const NotificationContainer = ({isLoggedin,logout,currentUserPhoto,toggleNav}) => {
const history = useHistory()

   return (<div className='notification__container'>
   <span className='notification__icons' >
      <IconContext.Provider value={{className:'notification__icon',size:'2rem'}} >
       <span className=' notification__icon__container' onClick={()=> history.push('/chatroom')}>
          <ImBubble2 />
          <span className='notification__icon__count'>
               5
          </span>
          </span>
       <span className=' notification__icon__container'>
            <FaBell />
            <span className='notification__icon__count'>
               50
          </span>
          </span>
      </IconContext.Provider>
      
      </span>
      {isLoggedin ? <span className='notification__login' onClick={logout}>
         signOut
      </span> : <Link to='/signin' className='notification__login'>
       signin
    </Link>}
    <span className='notification__photo' onClick={toggleNav}>
        <img src={'data:image/png;base64,' +  currentUserPhoto} alt='avatar' />
      </span>
</div>)
}

const mapStateToProps = state => ({
   isLoggedin: state.user.loggedIn,
   currentUserPhoto: state.user.CurrentUser.avatarUrl || 'https://dmrmechanical.com/wp-content/uploads/2018/01/avatar-1577909_640.png'
})
const mapDispatchToProps = dispacth => ({
   logout: () => dispacth(logOut()),
   toggleNav:() => dispacth(ToggleSlideInRight())
 })
export default connect(mapStateToProps,mapDispatchToProps)(NotificationContainer)