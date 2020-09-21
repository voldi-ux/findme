import {combineReducers} from'redux'
import AppDataReducer from '../app_data_reducer/data_reducer'
import chatReducer from '../chat/chat_reducer';
import UserReducer from '../user/user_reducer';

const rootReduce = combineReducers({
    appData: AppDataReducer,
    user: UserReducer,
    Chat: chatReducer
})

export default rootReduce;