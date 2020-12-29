import React from 'react'
import './searchBox.scss'
import ResultBox from '../result-box/result_box'

const SearchBox = (profiles) => {
    const renderProfiles = profile => {
        return <ResultBox profile={profile} />
    }
    return <div className='searchBox'>
        <h1>
            search
        </h1>
    </div>
}

export default SearchBox