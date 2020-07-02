import React from 'react';

const FormButton = ({ label, classNameString, isDisabled }) => {
  return (
    <button disabled={isDisabled} className={classNameString} type="submit">
      {label}
    </button>
  );
};

export default FormButton;
