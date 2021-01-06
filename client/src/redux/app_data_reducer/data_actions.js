import {
  fecthUserProfileStart,
  fecthUserProfileSucceed,
} from "../user/user_action";
import types from "./data_types";

export const filterData = (data) => ({
  type: types.FILTER_DATA,
  payload: data,
});

export const fetchProfilesStart = () => ({
  type: types.FETCHING_FilTER_DATA_START,
});

export const fetchProfilesFails = (msg) => ({
  type: types.FETCHING_PROFILES_FAIL,
  payload: msg,
});
export const fecthProfileSucceed = (profiles) => ({
  type: types.FETCHING_PROFILES_SUCCEED,
  payload: profiles,
});
export const fetchMoreProfilesStart = () => ({
  type: types.FETCHING_MORE_PROFILES_FAIL,
});

export const fetchMoreProfilesFails = (msg) => ({
  type: types.FETCHING_MORE_PROFILES_FAIL,
  payload: msg,
});
export const fecthMoreProfileSucceed = (profiles) => ({
  type: types.FETCHING_MORE_PROFILES_SUCCEED,
  payload: profiles,
});

export const onFechingProfiles = (itemsCount) => async (dispacth) => {
  dispacth(fetchProfilesStart);
  try {
    const resp = await fetch(`/getProfiles/${itemsCount}`);
    const profiles = await resp.json();
    dispacth(fecthProfileSucceed(profiles));
  } catch (error) {
    dispacth(fetchProfilesFails(error.message));
  }
};

export const onFechingMoreProfiles = (profilesCount) => async (dispacth) => {
  dispacth(fetchMoreProfilesStart);
  try {
    const resp = await fetch(`/getProfiles/4/${profilesCount}`);
    const profiles = await resp.json();
    dispacth(fecthMoreProfileSucceed(profiles));
  } catch (error) {
    dispacth(fetchMoreProfilesFails(error.message));
  }
};

export const fetchFilterProfilesFails = (msg) => ({
  type: types.FETCHING_FilTER_DATA_FAIL,
  payload: msg,
});
export const fecthFilterProfileSucceed = (profiles) => ({
  type: types.FETCHING_FilTER_DATA_SUCCEED,
  payload: profiles,
});

export const onFechingFilterProfiles = (FilteredData) => async (dispacth) => {
  try {
    const resp = await fetch(`/getfilteredProfiles`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({data:FilteredData}),
    });

    const profiles = await resp.json();
    dispacth(fecthFilterProfileSucceed(profiles));
  } catch (error) {
    console.log(error)
    dispacth(fetchProfilesFails(error.message));
  }
};
