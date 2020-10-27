import React,{useEffect} from "react"
import {connect} from 'react-redux'
import './Profile_page.scss'
import ProfilePageComponent from "../../components/profile_page_componet/profile_page_component"
import WithSpinner from '../../components/spinner/spinner'
import { onFetchUserProfile } from "../../redux/user/user_action"

const ProfilePageWithSpinner = WithSpinner(ProfilePageComponent)
const ProfilePage = ({match,getProfile, isLoading,IsProfileLoading}) => {
  
 useEffect(()=> {
    getProfile(match.params.userId)
 },[match.params.userId])
    return (<div className='profile_page'>
    <ProfilePageWithSpinner height='20rem'  isLoading={!isLoading || IsProfileLoading}/>
</div>)
}


const mapDispatchToProps = dispatch => ({
getProfile: (id) => dispatch(onFetchUserProfile(id))
})
const mapStateToProps = state => ({
   IsProfileLoading:state.user.IsProfileLoading,
   isLoading: !!state.user.profile
})
export default connect(mapStateToProps,mapDispatchToProps)(ProfilePage)