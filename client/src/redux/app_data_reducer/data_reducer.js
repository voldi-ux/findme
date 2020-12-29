import types from "./data_types";
import TestData from "../../testData/user";
import {
  decrentPageNum,
  filteredData,
  increntPageNum,
  fliterUsers,
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
    case types.FILTER_DATA:
      return {
        ...state,
        data: filteredData(state.data, action.payload),
      };

    case types.FETCHING_PROFILES_START:
      return {
        ...state,
        loading: true,
      };
    case types.FETCHING_PROFILES_SUCCEED:
      return {
        ...state,
        profilesCount: action.payload.profiles.length >= 1
          ? state.profilesCount + action.payload.profiles.length
          : state.profilesCount,
        msg: null,
        loading: false,
        data: [...state.data, ...action.payload.profiles],
      };
    case types.FETCHING_FilTER_DATA_FAIL:
      return {
        ...state,
        loading: false,
        msg: action.payload.msg,
      };
    case "INCREMENT_PAGE_NUMBER":
      return increntPageNum(state);

    case "DECREMENT_PAGE_NUMBER":
      return decrentPageNum(state);

    default:
      return state;
  }
};

export default AppDataReducer;
