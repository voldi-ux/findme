import types from './types'

const initState = {
  isSideNavVisible:false,
  isProfileComponentIsVisible:false,
};

const Controls = (state = initState, action) => {
  switch (action.type) {
      case types.TOGGLE_SIDE_NAV:
          return {
              ...state,
              isSideNavVisible: !state.isSideNavVisible
          }
      case types.TOGGLE_PROFILE_COMPONENT:
          return {
              ...state,
              isProfileComponentIsVisible: !state.isProfileComponentIsVisible
          }
    default:
      return state;
  }
};

export default Controls;
