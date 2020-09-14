import React from 'react'
import {Spinner,SpinnerWrapper} from './spinner.styles'
const withSpinner = Component => ({isLoading, height,profiles}) => {
    if(isLoading) {
      return  <SpinnerWrapper height= {height} >
            <Spinner />
        </SpinnerWrapper>
    } else {
       return <Component profiles= {profiles}/>
    }
}

export  default withSpinner