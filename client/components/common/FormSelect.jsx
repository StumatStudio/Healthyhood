import React from 'react';
import PropTypes from 'prop-types';

const Select = ({
  name,
  label,
  options,
  onChange,
  error,
  instruction,
  value,
}) => {
  const createOptions = (optionObj) => {
    const { _id, name } = optionObj;
    return (
      <option key={_id} value={_id}>
        {name}
      </option>
    );
  };

  // Ensure first option is null --Experimental!
  const newOptions = [{ _id: 'null', name: '' }, ...options];

  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select
        name={name}
        id={name}
        onChange={onChange}
        className="form-control"
      >
        {newOptions.map((optionObj) => createOptions(optionObj))}
      </select>

      {/*Conditionally Render Error messages under field*/}
      {error && <div className="alert alert-danger">{error}</div>}
      {!error && instruction && <div>{instruction}</div>}
    </div>
  );
};

Select.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  // options: PropTypes.arrayOf(
  //   PropTypes.shape(
  //     {
  //       _id: PropTypes.string,
  //       name: PropTypes.string
  //     })),
  instruction: PropTypes.string,
};

export default Select;
