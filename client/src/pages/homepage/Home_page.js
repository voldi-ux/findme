import React,{useEffect} from 'react'
import FilterComoponent from '../../components/filter_components/filters_container'
import HomeContent from '../../components/search_result_component/search_result_conponent'
import ProfileComponent from '../../components/profile_component/profile'

import './Home_page.scss'
import { onFechingProfiles } from '../../redux/app_data_reducer/data_actions'
import { connect } from 'react-redux'
import withSpinner from '../../components/spinner/spinner'

const HomeContentWithSpinner = withSpinner(HomeContent)

const HomePage = ({getProfiles,isLoading,profiles}) => {

    return (
        <div className='home_page'>
            <FilterComoponent />
            <HomeContentWithSpinner height='50rem' profiles={profiles} isLoading={isLoading}/>
            <ProfileComponent />
        </div>
    )
}

const mapStateToProps = state => ({
    isLoading: state.appData.loading,
    profiles: state.appData.data
 })
export default connect(mapStateToProps)(HomePage)