import types from "./data_types";
import {
 removeDuplicates
} from "./data_util";
const InitialState = {
  data: [],
  itemsPerPage: 4,
  page: 1,
  loading: true,
  msg: null,
  profilesCount: 0,
};

const AppDataReducer = (state = InitialState, action) => {
  switch (action.type) {
    case types.FETCHING_PROFILES_START:
      return {
        ...state,
        loading: true,
      };
    case types.FETCHING_PROFILES_SUCCEED:
      return {
        ...state,
        profilesCount:
          action.payload.profiles.length >= 1
            ? state.profilesCount + action.payload.profiles.length
            : state.profilesCount,
        msg: null,
        loading: false,
        data: removeDuplicates([...state.data, ...action.payload.profiles]),
      };
    case types.FETCHING_FilTER_DATA_SUCCEED:
      return {
        ...state,

        data: [...action.payload.profiles],
      };

    case types.FETCHING_FilTER_DATA_FAIL:
    case types.FETCHING_PROFILES_FAIL:
      return {
        ...state,
        msg: action.payload.msg,
      };

    default:
      return state;
  }
};

export default AppDataReducer;
