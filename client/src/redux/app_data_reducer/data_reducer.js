import types from './data_types'
import TestData from '../../testData/user'
import { decrentPageNum, filteredData, increntPageNum } from './data_util'
const InitialState = {
    data:null,
    itemsPerPage:4,
     page:1,
    loading:true,
    msg:null
}


const AppDataReducer = (state=InitialState,action) => {
     
    switch (action.type) {
        case types.FILTER_DATA:
            return {
                ...state,
                data:filteredData(state.data, action.payload)
            }
             
            case types.FETCHING_PROFILES_START:
                return {
                    ...state, 
                    loading:true
                }
            case types.FETCHING_PROFILES_SUCCECED:
                return {
                    ...state, 
                    msg:null,
                    loading:false,
                    data:action.payload.profiles
                }
            case types.FETCHING_FilTER_DATA_FAIL:
                return {
                    ...state, 
                    loading:false, 
                    msg:action.payload.msg
                }
                case "INCREMENT_PAGE_NUMBER": 
                return increntPageNum(state)

                case "DECREMENT_PAGE_NUMBER": 
                return decrentPageNum(state)
    
        default:
            return state
    }
}

export default AppDataReducer