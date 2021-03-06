import types from "./user_types";
import chatTypes from "../chat/chat_types";
import { addRoom } from "./user_utils";

const initState = {
  loggedIn: false,
  profile: null,
  CurrentUser: {},
  message: null,
  loading: false,
  searchedProfile: null,
  IsProfileLoading: false,
  LeftNavVisible: false,
  RightNavVisible: false,
  notificationCount: 0,
};

const UserReducer = (state = initState, action) => {
  switch (action.type) {
    case types.UPDATE_USER_NOTICATIONS:
      return {
        ...state,
        notificationCount: action.payload.count,
      };
    case types.CLEAR_USER_NOTICATIONS:
      return {
        ...state,
        notificationCount: 0,
      };
    case types.LOG_IN_SUCCECEED:
      return {
        ...state,
        loggedIn: true,
        profile: action.payload.user.profile,
        CurrentUser: action.payload.user,
        notificationCount:action.payload.notifications
      };
    case types.FETCH_USER_PROFILE_START:
      return {
        ...state,
        IsProfileLoading: true,
      };
    case chatTypes.GET_ROOM_SUCCEED:
      return {
        ...state,
        CurrentUser: {
          ...state.CurrentUser,
          chatroomIds: addRoom(action.payload, state.CurrentUser.chatroomIds),
        },
      };
    case types.FETCH_USER_PROFILE_SUCCECEED:
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
        loggedIn: false,
        profile: null,
        CurrentUser: {},
        message: null,
        loading: false,
        searchedProfile: null,
        IsProfileLoading: false,
        LeftNavVisible: false,
        RightNavVisible: false,
        notificationCount: 0,
      };

    case types.UPDATE_USER_PROFILE_SUCCECEED:
      return {
        ...state,
        profile: action.payload.user.profile,
        CurrentUser: action.payload.user,
      };
    case types.SET_SEARCHED_PROFILE:
      return {
        ...state,
        searchedProfile: action.payload,
      };

    default:
      return state;
  }
};

export default UserReducer;
