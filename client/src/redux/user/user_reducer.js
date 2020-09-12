import types from './user_types'

const initState = {
    loggedIn:false,
    profile:null,
    message:null,
    loading: false
}


const UserReducer = (state= initState,action) => {
    switch(action.type) {
       case types.LOG_IN_SUCCECEDED:
           return {
               ...state,
               loggedIn:true,
               CurrentUser: action.payload.user
           }
           case types.FETCH_USER_PROFILE_START:
               return {
                   ...state, 
                       loading:true
               }
           case types.FETCH_USER_PROFILE_SUCCECEDED:
               return {
                   ...state, 
                       loading:false,
                       profile:action.payload.profile
               }
        case types.LOG_IN_FAIL:
            return {
                ...state, message:action.payload
            }
           default:
               return state
    }
}

export default UserReducer