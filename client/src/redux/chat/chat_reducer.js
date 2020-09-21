import types from "./chat_types";
import userTypes from '../user/user_types'
import {} from "./chat_util";

const intial = {
  loading: true,
  isGettingPartner:false,
  chats: [],
  room:null,
  messages:[],
  partner: null,
};

//must add error actions to the reducer

const chatReducer = (state = intial, action) => {
  switch (action.type) {
    case types.GET_CHAT_PARTNER_START:
      return {
        ...state,
        isGettingPartner: true,
        loading:true
      };
    case types.GET_CHAT_PARTNER_SUCCECED:
      return {
        ...state,
        isGettingPartner: false,
        partner: action.payload,
      };
    case types.GET_ROOM_SUCCECED:
      return {
        ...state,
        loading: false,
        messages:action.payload.messages,
        room: action.payload,
      };
    case types.FETCHING_CHATS_START:
    case types.GET_ROOM_START:
      return {
        ...state,
        loading: true,
      };
    case types.FETCHING_CHATS_SUCCECED:
      return {
        ...state,
        loading: false,
        chats: action.payload,
      };
    case userTypes.LOG_IN_SUCCECEDED:
      return {
        ...state,
        partner:null,
        chats: [],
        room:null,
      };
      // case types.FETCHING_CHATS_FAIL:
      // case types.GET_CHAT_PARTNER_FAIL:
      // case types.GET_MESSAGES_FAIL: 
      //   return {
      //     ...state, 
      //     loading:true,
      //     isGettingPartner:true
      //   }
    default:
      return state;
  }
};

export default chatReducer;
