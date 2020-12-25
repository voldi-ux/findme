import {combineReducers} from'redux'
import AppDataReducer from '../app_data_reducer/data_reducer'
import chatReducer from '../chat/chat_reducer';
import UserReducer from '../user/user_reducer';
import Controls from '../controls/controls';

const rootReduce = combineReducers({
    appData: AppDataReducer,
    user: UserReducer,
    Chat: chatReducer,
    controls:Controls
})

export default rootReduce;