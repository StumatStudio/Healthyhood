import React from 'react';
import PropTypes from 'prop-types';

const Input = ({
  name,
  label,
  onChange,
  instructions,
  type,
  value,
  placeholder,
}) => {
  return (
    <div className="formField">
      <label htmlFor={name}>{label}</label>
      <input
        name={name}
        id={name}
        onChange={onChange}
        type={type}
        value={value}
        placeholder={placeholder}
        className="inputField"
      />
      {instructions && <div>{instructions}</div>}
    </div>
  );
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  instructions: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.any,
  placeholder: PropTypes.string,
};

export default Input;
