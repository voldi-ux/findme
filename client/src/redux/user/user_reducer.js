import types from './user_types'

const initState = {
    loggedIn:false,
    profile:null,
    CurrentUser:{},
    message:null,
    loading: false,
    IsProfileLoading:false,
    LeftNavVisible:false,
    RightNavVisible:false,
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
                    CurrentUser:{},
                    loggedIn:false
                }
        case types.TOGGLE_SLIDE_IN_LEFT: 
        return {
            ...state,
            LeftNavVisible:!state.LeftNavVisible
        }
        case types.TOGGLE_SLIDE_IN_RIGHT: 
        return {
            ...state,
            RightNavVisible:!state.RightNavVisible
        }
           default:
               return state
    }
}

export default UserReducer