import types from './user_types'

const initState = {
    loggedIn:false,
    profile:null,
    message:null,
    loading: false,
    IsProfileLoading:false,
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
                   IsProfileLoading:true
               }
           case types.FETCH_USER_PROFILE_SUCCECEDED:
               return {
                   ...state, 
                   IsProfileLoading:false,
                    profile:action.payload.profile
               }
        case types.LOG_IN_FAIL:
            return {
                ...state, message:action.payload
            }
            case types.LOG_OUT:
                return {
                    ...state,
                    profile: null,
                    loggedIn:false
                }
           default:
               return state
    }
}

export default UserReducer