import React from "react"
import { Route,Switch  } from 'react-router-dom'
import './Profile_page.scss'
import Button from "../../components/buttons/button"
import ProfilePageComponent from "../../components/profile_page_componet/profile_page_component"

const ProfilePage = ({match}) => (<div className='profile_page'>
     <Switch>
         <Route exact path={`${match.path}`} component={ProfilePageComponent}/>
         <Route path ={`${match.path}/:userId`} render= {(match) => <ProfilePageComponent {...match}/>} />
     </Switch>
</div>)

export default ProfilePage