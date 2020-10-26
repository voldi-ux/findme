import React from 'react'
import { ImBubble2 } from 'react-icons/im'
import {FaBell} from 'react-icons/fa'
import {IconContext} from 'react-icons'
import {useHistory}from 'react-router-dom'


import './notification_icons.scss'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logOut } from '../../../redux/user/user_action'

const NotificationContainer = ({isLoggedin,logout}) => {
const history = useHistory()

   return (<div className='resp-notification__container'>
   <span className='resp-notification__icons' >
      <IconContext.Provider value={{className:'resp-notification__icon',size:'3rem'}} >
       <span className=' resp-notification__icon__container' onClick={()=> history.push('/chatroom')}>
          <ImBubble2 />
          <span className='resp-notification__icon__count'>
               5
          </span>
          </span>
       <span className=' resp-notification__icon__container'>
            <FaBell />
            <span className='resp-notification__icon__count'>
               50
          </span>
          </span>
      </IconContext.Provider>
      
      </span>
      {isLoggedin ? <span className='resp-notification__login' onClick={logout}>
         LogOut
      </span> : <Link to='/signin' className='resp-notification__login'>
       signin
    </Link>}
</div>)
}

const mapStateToProps = state => ({
   isLoggedin: state.user.loggedIn
})
const mapDispatchToProps = dispacth => ({
   logout: () => dispacth(logOut())
 })
export default connect(mapStateToProps,mapDispatchToProps)(NotificationContainer)