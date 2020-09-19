import {createStore,applyMiddleware} from 'redux'
import rootReducer from '../root_reducer/root_reducer'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import storage from 'redux-persist/lib/storage'
import {persistStore,persistReducer} from 'redux-persist'

const persistConfig = {
  key:'root',
  storage
}
const persistedRootReducer =  persistReducer(persistConfig,rootReducer),
 store = createStore(persistedRootReducer, applyMiddleware(thunk,logger))

export const persistor = persistStore(store)


export default store