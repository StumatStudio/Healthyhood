import React from 'react';
import PropTypes from 'prop-types';

const Input = ({
  name,
  label,
  onChange,
  error,
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
      {error && <div className="alert alert-danger">{error}</div>}
      {instructions && <div>{instructions}</div>}
    </div>
  );
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  instructions: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.any,
  placeholder: PropTypes.string,
};

export default Input;
