import React, { createContext, useReducer } from "react";

const init = {
  visible: false,
  profiles: [],
  filters: {
    province: "",
    city: "",
    gender: "",
  }
};

const types = {
  SET_VISIBLE: "SET_VISIBLE",
  SET_PROFILES: " SET_PROFILES",
  SET_FILTER_DATA: "SET_FILTER_DATA",
};

const reducer = (state, action) => {
  switch (action.type) {
    case types.SET_PROFILES:
      return {
        ...state,
        profiles:action.payload,
      };
    case types.SET_VISIBLE:
      return {
        ...state,
        visible:!state.visible,
        profiles: [],
      };
      
    case types.SET_FILTER_DATA:
      return {
        ...state,
        filters: action.payload
      };

    default:
      return state;
  }
};

export const FilterProfileContext = createContext();

const FilterProfileContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, init);

  const setVisible = () =>
    dispatch({
      type: types.SET_VISIBLE,
    });

  const setProfiles = (data) =>
    dispatch({
      type: types.SET_PROFILES,
      payload: data,
    });
  const setfilterData = (data) =>
    dispatch({
      type: types.SET_FILTER_DATA,
      payload: data,
    });

  return (
    <FilterProfileContext.Provider
      value={{
        setProfiles,setVisible,
        setfilterData,
      ...state

      }}
    >
      {props.children}
    </FilterProfileContext.Provider>
  );
};

export default FilterProfileContextProvider;
