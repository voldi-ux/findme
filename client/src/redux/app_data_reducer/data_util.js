
export const filteredData = (oldData, filerterContent) => {
  console.log(filerterContent);
  const { gender, province, town } = filerterContent;

  return oldData.filter(
    (data) =>
      data.gender === gender || data.province === province || data.town === town
  );
  // return oldData
};

export const increntPageNum = (state) => {
  if (state.data.length) {
    return {
      ...state,
      page: state.page + 1,
    };
  }
  return state;
};
export const decrentPageNum = (state) => {
  return {
    ...state,
    page: state.page - 1,
  };
};

//filter the  users with the hasProfile property set to true, and return them.

export const fliterUsers = (profiles) => {
  return profiles.filter((profile) => profile.hasProfile === true);
};


//remove a duplicate obj from an array
export const removeDuplicates = (profiles) => {
const profileHolder = {};
 return profiles.reduce((acc, profile) => {
    if (!profileHolder[JSON.stringify(profile)]) {
      profileHolder[JSON.stringify(profile)] = true;
      acc.push(profile);
    }
    return acc;
  }, []);
};
