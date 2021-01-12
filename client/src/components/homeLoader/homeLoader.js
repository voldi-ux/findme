import React from 'react'
import './homeLoader.scss'

const HomeLoader = () => {

    return <div className='homeLoader'> 
      <div className="lds-ripple"><div></div><div></div></div>
      <h4>
        Loading...
      </h4>
    </div>
}

export default HomeLoader