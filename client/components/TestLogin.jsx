import React from 'react';
import Joi from '@hapi/joi';
import Form from './common/Form';
import Input from './common/Input';
import FormButton from './common/FormButton';

const TestLogin = () => {
  // Define State Schema and prevent uncontrolled to controlled component switch
  const initialState = {
    Test1: '',
    Test2: '',
    Test3: '',
  };

  const schema = {
    Test1: Joi.string().min(10),
    Test2: Joi.number(),
    Test3: Joi.string(),
  };

  const joiSchema = Joi.object(schema);

  const doSubmit = (data) => {
    console.log('submitted', data);
  };

  return (
    <Form
      propertySchemaObj={schema}
      formSchema={joiSchema}
      initialState={initialState}
      doSubmit={doSubmit}
    >
      <Input name={'Test1'} label={'Test1'}>
        Test this NOw
      </Input>
      <Input name={'Test2'} label={'Test2'} />
      <Input name={'Test3'} label={'Test3'} />
      <FormButton label="Submit" />
    </Form>
  );
};

export default TestLogin;
