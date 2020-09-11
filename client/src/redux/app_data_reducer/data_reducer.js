import types from './data_types'
import TestData from '../../testData/user'
import { filteredData } from './data_util'
const InitialState = {
    data:TestData
}


const AppDataReducer = (state=InitialState,action) => {
     
    switch (action.type) {
        case types.FILTER_DATA:
            return {
                ...state,
                data:filteredData(state.data, action.payload)
            }
     
    
        default:
            return state
    }
}

export default AppDataReducer