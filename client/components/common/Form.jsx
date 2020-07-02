import React, { useState, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import Joi from '@hapi/joi';

/*
Default validation functions wil be used when custom
functions are not defined on props. Default settings
require Joi.
*/

const defaultFunctions = {
  /*
  Relies on schema from child class compared against value from
  input field. Input field name will match property from state data.
  Validates single propery for handleChange.
  */
  validateProperty: (input, joiSchema) => {
    const { name, value } = input;
    const fieldObj = { [name]: value };
    const fieldSchema = Joi.object({ [name]: joiSchema[name] });
    const { error } = fieldSchema.validate(fieldObj);

    // Will be set to state in handleChange
    return error ? error.message : null;
  },

  /*
  Validates entire input for handleSubmit verifying that the data is fit
  for fetch
  */
  validateInput: (data, joiSchema) => {
    const joiOptions = { abortEarly: false }; // Don't quit on first error
    const { error } = joiSchema.validate(data, joiOptions); // must match childClass schema name
    if (!error) return null;

    /*
    If we're here, we won't be sending a fetch request we'll be setting up notifications
    For client. This is all contingent on Joi returns (details array of error Objs)
    */
    const newStateErrorObj = error.details.reduce((stateErr, errObj) => {
      const { path: fieldName, message } = errObj; // Joi path is array
      stateErr[fieldName[0]] = message;
      return stateErr;
    }, {});
    return newStateErrorObj;
  },
};

/*
If using customized validateInput and validateProperty
they must return an error object if errors and null if not

validateProperty will need to take an eventObj parameter from the
built in handleChange function.

validateInput will need to take a data property that will be filled
with the form's state by the built in handleSubmit function
*/

const Form = ({
  doSubmit,
  initialState,
  classNameString,
  errorClassNameString,
  propertySchemaObj,
  formSchema,
  validateProperty,
  validateInput,
  children,
}) => {
  // Passing an initial state of empty strings prevents changing children
  // from uncontrolled components to controlled components
  const [data, setData] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleChange = ({ currentTarget: input }) => {
    const newErrors = { ...errors };
    const errorMessage = validateProperty(input, propertySchemaObj); // returns null if no errors
    if (errorMessage) newErrors[input.name] = errorMessage;
    else delete newErrors[input.name];

    // Update State with new values
    const newData = { ...data };
    newData[input.name] = input.value;

    setData(newData);
    setErrors(newErrors);
  };

  const handleSubmit = (eventObj) => {
    // prevent auto render of page
    eventObj.preventDefault();

    // Check for errors in entire form. If so prevent submit
    const formErrors = validateInput(data, formSchema); // returns null if no errors
    const stateErrors = formErrors || {};
    setErrors(stateErrors);
    if (formErrors) {
      console.log('formErrors', formErrors);
      return;
    }

    // No errors clear to submit via function defined on props
    doSubmit(data);
    setData(initialState);
    setErrors({});
  };

  const addPropsToChildren = (child) => {
    const elementType = child.type.name;
    if (elementType === 'Input') {
      return cloneElement(child, {
        onChange: handleChange,
        value: data[child.props.name],
        errorClassNameString,
        error: errors[child.props.name],
      });
    }

    if (elementType === 'FormButton') {
      return cloneElement(child, {
        isDisabled: validateInput(data, formSchema),
      });
    }
    return child;
  };

  return (
    <form className={classNameString} onSubmit={handleSubmit}>
      {Children.map(children, (child) => addPropsToChildren(child))}
    </form>
  );
};

export default Form;

Form.defaultProps = {
  validateProperty: defaultFunctions.validateProperty,
  validateInput: defaultFunctions.validateInput,
};
