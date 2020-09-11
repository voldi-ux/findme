import {combineReducers} from'redux'
import AppDataReducer from '../app_data_reducer/data_reducer'

const rootReduce = combineReducers({
    appData: AppDataReducer
})

export default rootReduce;