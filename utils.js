function changeFilterData(data) {
  const keys = Object.keys(data);
  return keys.map((key) => {
    const property = `profile.${key}`;
    return { [property]: data[key] };
  });
}

module.exports = { changeFilterData };
