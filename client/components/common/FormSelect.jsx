import React from 'react';
import PropTypes from 'prop-types';

const FormSelect = ({
  name,
  label,
  options,
  onChange,
  error,
  instruction,
  value,
  errorClassString,
  containerClassString,
  fieldClassString,
}) => {
  const createOptions = (optionObj) => {
    const { _id, name: optionName } = optionObj;
    return (
      <option key={_id} value={_id}>
        {optionName}
      </option>
    );
  };

  // Ensure first option is null --Experimental!
  const newOptions = [{ _id: 'null', name: '' }, ...options];

  return (
    <div className={containerClassString}>
      <label htmlFor={name}>{label}</label>
      <select
        name={name}
        id={name}
        onChange={onChange}
        className={fieldClassString}
        value={value}
      >
        {newOptions.map((optionObj) => createOptions(optionObj))}
      </select>

      {/* Conditionally Render Error messages under field */}
      {error && <div className={errorClassString}>{error}</div>}
      {!error && instruction && <div>{instruction}</div>}
    </div>
  );
};

export default FormSelect;

FormSelect.defaultProps = {
  error: null,
  instruction: '',
  value: '',
  errorClassString: '',
  containerClassString: '',
  fieldClassString: '',
  onChange: (event) =>
    console.log('onChange unhandled for Select Tag:', event.currentTarget.name),
};

FormSelect.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      name: PropTypes.string,
    })
  ).isRequired,
  error: PropTypes.any,
  instruction: PropTypes.string,
  value: PropTypes.string,
  errorClassString: PropTypes.string,
  containerClassString: PropTypes.string,
  fieldClassString: PropTypes.string,
};
