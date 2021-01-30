
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
