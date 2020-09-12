import {combineReducers} from'redux'
import AppDataReducer from '../app_data_reducer/data_reducer'
import UserReducer from '../user/user_reducer';

const rootReduce = combineReducers({
    appData: AppDataReducer,
    user: UserReducer
})

export default rootReduce;