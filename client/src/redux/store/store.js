import {createStore,applyMiddleware} from 'redux'
import rootReducer from '../root_reducer/root_reducer'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import storage from 'redux-persist/lib/storage'
import {persistStore,persistReducer} from 'redux-persist'


let middlewares = [thunk]

if(process.env.NODE_ENV !== 'production') middlewares = [...middlewares, logger] 


const persistConfig = {
  key:'root',
  storage,
  whitelist: ['user', 'Chat']
}
const persistedRootReducer =  persistReducer(persistConfig,rootReducer),
 store = createStore(persistedRootReducer, applyMiddleware(...middlewares))

export const persistor = persistStore(store)


export default store