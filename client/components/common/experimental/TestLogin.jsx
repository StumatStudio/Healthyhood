import React from 'react';
import Joi from '@hapi/joi';
import Form from '../Form';
import FormInput from '../FormInput';
import FormButton from '../FormButton';
import FormSelect from '../FormSelect';

const TestLogin = () => {
  // Define State Schema and prevent uncontrolled to controlled component switch
  const initialState = {
    Test1: '',
    Test2: '',
    Test3: '',
    OptionSelect: '',
  };

  const schema = {
    Test1: Joi.string().min(10),
    Test2: Joi.number(),
    Test3: Joi.string(),
    OptionSelect: Joi.string(),
  };

  const joiSchema = Joi.object(schema);

  const doSubmit = (data) => {
    console.log('submitted', data);
  };

  const options = [
    { _id: 1, name: 'Test1' },
    { _id: 2, name: 'Test2' },
    { _id: 3, name: 'Test3' },
    { _id: 4, name: 'Test4' },
    { _id: 5, name: 'Test5' },
  ];

  return (
    <Form
      propertySchemaObj={schema}
      formSchema={joiSchema}
      initialState={initialState}
      doSubmit={doSubmit}
      // checkErrorsOnSubmitOnly={false}
    >
      <FormInput name="Test1" label="Test1">
        Test this NOw
      </FormInput>
      <FormInput name="Test2" label="Test2" />
      <FormInput name="Test3" label="Test3" />
      <FormSelect name="OptionSelect" label="Pick One" options={options} />
      <FormButton label="Submit" />
    </Form>
  );
};

export default TestLogin;
