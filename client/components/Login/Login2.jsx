import React from 'react';
import Joi from '@hapi/joi';
import { useDispatch } from 'react-redux';
import Form from '../common/Form';
import FormInput from '../common/FormInput';
import FormButton from '../common/FormButton';
import { login } from '../../store/entities/userEntity';
import './Login.css';

const Login = () => {
  const dispatch = useDispatch();
  // Set up data and structure
  const inputFields = {
    userName: 'email',
    password: 'password',
    remember: 'remember',
  };

  const initialState = {
    [inputFields.userName]: '',
    [inputFields.password]: '',
    [inputFields.remember]: '',
  };

  const schema = {
    [inputFields.userName]: Joi.string().min(3).max(55).required(),
    [inputFields.password]: Joi.string().min(3).max(55).required(),
    [inputFields.remember]: Joi.any(),
  };

  const loginUser = (data) => {
    dispatch(login(data));
  };

  const joiSchema = Joi.object(schema);

  const doSubmit = (data) => {
    console.log('submitting', data);
    const user = loginUser(data);
    console.log('user', user);
  };

  return (
    <div className="login__componentContainer">
      <div className="login__formContainer">
        <Form
          propertySchemaObj={schema}
          formSchema={joiSchema}
          initialState={initialState}
          doSubmit={doSubmit}
          checkErrorsOnSubmitOnly={false}
        >
          <FormInput name={inputFields.userName} label="Email:" />
          <FormInput
            name={inputFields.password}
            label="Password"
            type="password"
          />
          <FormInput
            name={inputFields.remember}
            label="Remember Me"
            type="checkbox"
          />

          <FormButton label="Submit" />
        </Form>
        <div className="lh-copy mt3">
          <a href="/signup" className="f7 link dim black db">
            Sign up instead?
          </a>

          <a href="#0" className="f7 link dim black db">
            Forgot your password?
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
