import React from 'react';
import PropTypes from 'prop-types';

const FormButton = ({ label, classString, isDisabled }) => {
  return (
    <button disabled={isDisabled} className={classString} type="submit">
      {label}
    </button>
  );
};

export default FormButton;

FormButton.defaultProps = {
  classString: '',
  isDisabled: false,
};

FormButton.propTypes = {
  label: PropTypes.string.isRequired,
  classString: PropTypes.string,
  isDisabled: PropTypes.any,
};
