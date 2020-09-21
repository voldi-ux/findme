import React from 'react'
import {Spinner,SpinnerWrapper} from './spinner.styles'
const withSpinner = Component => ({isLoading, height,...props}) => {
    if(isLoading) {
      return  <SpinnerWrapper height= {height} >
            <Spinner />
        </SpinnerWrapper>
    } else {
       return <Component {...props}/>
    }
}

export  default withSpinner