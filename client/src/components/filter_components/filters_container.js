import React, { useState, useContext } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import "./filter_container.scss";
import SelectComponent from "../form_inputs_components/select";
import RangeComponent from "../form_inputs_components/range";
import Button from "../buttons/button";
import Radio from "../form_inputs_components/radio";
import {
  filterData,
  onFechingFilterProfiles,
} from "../../redux/app_data_reducer/data_actions";
import { FilterProfileContext } from "../../context/filter_Data_context/filter.data";
import TextInputComponent from "../form_inputs_components/text";
import { provinces, ObjectCities } from "../../utils/citiesAndprovinces";

const FilterContainer = ({ onfilter }) => {
  const history = useHistory();
  const [profile, setProfile] = useState({
    province: "",
    city: "",
    gender: "",
  });

  const cities = ObjectCities[profile.province] || ["select a province first"];

  const onSubmit = (e) => {
     e.preventDefault()
     console.log(profile)
    if (
      profile.province === "" || profile.province === "select province"||
      profile.city === "select a province first" ||
      profile.gender === ""
    )
      return false;

    onfilter(profile);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProfile({ ...profile, [name]: value });
  };

  return (
    <form onSubmit={onSubmit} className="filter_container">
      <h3>Filter</h3>

      <div className="filter_group">
        <h3> Province</h3>
        <SelectComponent
          value={profile.province}
          name="province"
          options={provinces}
          handleChange={handleChange}
        />
      </div>
      <div className="filter_group">
        <h3> City</h3>
        <SelectComponent
          value={profile.city}
          name="city"
          options={cities}
          handleChange={handleChange}
        />
      </div>
      <div className="filter_group">
        <h3>gender</h3>
        <Radio
          handleChange={handleChange}
          label="male"
          name="gender"
          checked={profile.gender === "male"}
          value="male"
        />
        <Radio
          handleChange={handleChange}
          label="female"
          name="gender"
          value="Female"
          checked={profile.gender === "female"}
        />
        <Radio
          handleChange={handleChange}
          label="other"
          name="gender"
          value="other"
          checked={profile.gender === "other"}
        />
      </div>
      <Button onClick={onSubmit} value="filter" />
    </form>
  );
};
const mapDispatchToProps = (dispacth) => ({
  onfilter: (data) => dispacth(onFechingFilterProfiles(data)),
});
export default connect(null, mapDispatchToProps)(FilterContainer);
