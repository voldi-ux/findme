import React from 'react'
import FilterComoponent from '../../components/filter_components/filters_container'
import HomeContent from '../../components/search_result_component/search_result_conponent'
import ProfileComponent from '../../components/profile_component/profile'

import './Home_page.scss'


const HomePage = () => (
    <div className='home_page'>
        <FilterComoponent />
        <HomeContent />
        <ProfileComponent />
    </div>
)

export default HomePage