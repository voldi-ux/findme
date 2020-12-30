import React, { createContext, useReducer } from "react";

const init = {
  visible: true,
  profiles: [],
};

const types = {
  SET_VISIBLE: "SET_VISIBLE",
  SET_PROFILES: " SET_PROFILES",
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

  return (
    <FilterProfileContext.Provider
      value={{
        setProfiles,setVisible,
      ...state

      }}
    >
      {props.children}
    </FilterProfileContext.Provider>
  );
};

export default FilterProfileContextProvider;
