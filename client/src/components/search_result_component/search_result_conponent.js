import React from 'react'
import {connect} from 'react-redux'
import './search_result_conponent.scss'
import ResultBox from '../result-box/result_box'



const SearchResult = ({Users}) => {

   if(Users.data.length) {
    return  (<div className='search_result_container'>
                  {Users.data.map(user => <ResultBox key={user.id} user={user} />)} 
            </div>)

   } else {
      console.log(Users)
    return  (<div className='search_result_container'>
            <h1 className='search_result__heading'>
               your seacrh paremeters did not match any results
            </h1> 
      </div>)

   }
}
const mapStateToProps = state => ({
   Users: state.appData
})
export default connect(mapStateToProps)(SearchResult)