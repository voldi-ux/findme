import types from "./user_types";
import chatTypes from '../chat/chat_types'
import { addRoom } from "./user_utils";

const initState = {
  loggedIn: false,
  profile: null,
  CurrentUser: {},
  message: null,
  loading: false,
  searchedProfile:null,
  IsProfileLoading: false,
  LeftNavVisible: false,
  RightNavVisible: false,
};

const UserReducer = (state = initState, action) => {
  switch (action.type) {
    case types.LOG_IN_SUCCECEDED:
      return {
        ...state,
        loggedIn: true,
        profile:action.payload.user.profile,
        CurrentUser: action.payload.user,
      };
    case types.FETCH_USER_PROFILE_START:
      return {
        ...state,
        IsProfileLoading: true,
      };
      case chatTypes.GET_ROOM_SUCCECED: 
      return {
        ...state,
        CurrentUser: {
          ...state.CurrentUser,
          chatroomIds: addRoom(action.payload, state.CurrentUser.chatroomIds)
        }
      }
    case types.FETCH_USER_PROFILE_SUCCECEDED:
      return {
        ...state,
        IsProfileLoading: false,
        profile: action.payload.profile,
      };
    case types.LOG_IN_FAIL:
      return {
        ...state,
        message: action.payload,
      };
    case types.LOG_OUT:
      return {
        ...state,
        profile: null,
        CurrentUser: {},
        loggedIn: false,
      };

    case types.UPDATE_USER_PROFILE_SUCCECEDED:
      return {
        ...state,
        profile: action.payload.user.profile,
        CurrentUser: action.payload.user,
      };
      case types.SET_SEARCHED_PROFILE: 
      return {
        ...state,
        searchedProfile: action.payload
        }
      
    default:
      return state;
  }
};

export default UserReducer;
