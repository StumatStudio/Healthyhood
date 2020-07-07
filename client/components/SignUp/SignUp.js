import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  setUsername,
  setEmail,
  setPassword,
  updateUser,
  updateErrors,
  setIsLoggedIn,
} from '../../store/entities/userEntity';
import './SignUp.css';

const SignUp = ({
  user: { username, email, password },
  setUsername,
  setEmail,
  setPassword,
  updateUser,
  updateErrors,
  setIsLoggedIn,
  errors,
}) => {
  /*
  displayer takes two required arguments as inputs:
  1) a message string, and
  2) a target tag (as a string).
  It displays that message in the target tag.
  Accommodates any HTML tags inside the message string
  */
  const displayer = (target, message) => {
    document.querySelector(target).innerHTML = message;
  };

  /*
  listifyArray takes an array as the first argument, and an optional boolean second argument. When no second argument is provided, the function returns an unordered list with all elements from array as list items. If the second argument is true, it returns an ordered list instead.
  */
  const listifyArray = (array, ordered = false) => {
    let listify = '';
    if (array.length > 0) {
      for (let i = 0; i < array.length; i++) {
        listify += '<li>' + array[i] + '</li>';
      }
      if (ordered) {
        listify = '<ol>' + listify + '</ol>';
      } else {
        listify = '<ul>' + listify + '</ul>';
      }
    }
    return listify;
  };

  const onUsernameChange = (event) => {
    displayer('#usernameErrors', ''); //clear the #usernameErrors div when typing
    const current = event.target.value;
    const errorsList = [];

    if (current.length === 0) {
      errorsList.push('Username is required');
    } else if (current.length < 4) {
      errorsList.push('Username must be 4 or more characters');
    }
    if (Number(current[0]) == current[0]) {
      errorsList.push('Username cannot start with a number');
    }
    if (current.length > 10) {
      errorsList.push('Username cannot be more than 10 characters');
    }

    updateErrors({
      ...errors,
      username: errorsList,
    });

    setUsername(current);
  };

  const onEmailChange = (event) => {
    displayer('#emailErrors', ''); //clear the #emailErrors div when typing
    const current = event.target.value;
    const errorsList = [];

    if (current.length === 0) {
      errorsList.push('Email is required');
    } else if (current.length < 5) {
      errorsList.push('Email must be 5 or more characters');
    }

    // Regex for email validation from: https://stackoverflow.com/a/46181/2040509
    // If you want to modify this regex, make sure the back end matches
    const regex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    if (!current.match(regex)) {
      errorsList.push('Email format is incorrect');
    }

    updateErrors({
      ...errors,
      email: errorsList,
    });

    setEmail(current);
  };

  const onPasswordChange = (event) => {
    displayer('#passwordErrors', ''); //clear the #passwordErrors div when typing
    const current = event.target.value;
    const errorsList = [];

    if (current.length === 0) {
      errorsList.push('Password is required');
    } else if (current.length < 4) {
      errorsList.push('Password must be between 4 and 10 characters');
    } else if (current.length > 10) {
      errorsList.push('Password must be between 4 and 10 characters');
    }
    // Password must include at least one numeric digit
    // Regex from: http://regexlib.com/REDetails.aspx?regexp_id=30
    // If you want to modify this regex, make sure the back end matches
    const regex = /^(?=.*\d)/;
    if (!current.match(regex)) {
      errorsList.push('Password must have at least one number');
    }

    updateErrors({
      ...errors,
      password: errorsList,
    });

    setPassword(current);
  };

  const onSignUpSubmission = () => {
    const errorsCount =
      errors.username.length + errors.email.length + errors.password.length;
    if (errorsCount > 0) {
      displayer('#usernameErrors', listifyArray(errors.username));
      displayer('#emailErrors', listifyArray(errors.email));
      displayer('#passwordErrors', listifyArray(errors.password));
    }

    updateUser({
      username,
      email,
      password,
      joinedon: new Date().toDateString(),
    });

    //switches page to UserSection component when isLoggedIn is set to true
    if (errorsCount === 0) setIsLoggedIn(true);
  };

  return (
    <main className="measure black-80 mv6 center shadow-4 pa5">
      <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
        <div className="errors" id="usernameErrors"></div>
        <div className="errors" id="emailErrors"></div>
        <div className="errors" id="passwordErrors"></div>

        <legend className="ph0 mh0 fw6 f4">Sign Up</legend>
        <div className="mt3">
          <label className="db fw4 lh-copy f6" htmlFor="name">
            Username
          </label>
          <input
            className="pa2 w-100 hover-black input-reset hover-bg-white ba bg-transparent f7"
            type="text"
            name="name"
            id="name"
            onChange={onUsernameChange}
          />
        </div>
        <div className="mt3">
          <label className="db fw4 lh-copy f6" htmlFor="email-address">
            Email Address
          </label>
          <input
            className="pa2 w-100 hover-black input-reset hover-bg-white ba bg-transparent f7"
            type="email"
            name="email-address"
            id="email-address"
            onChange={onEmailChange}
          />
        </div>
        <div className="mt3">
          <label className="db fw4 lh-copy f6" htmlFor="password">
            Password
          </label>
          <input
            className="b pa2 w-100 hover-black input-reset hover-bg-white ba bg-transparent f7"
            type="password"
            name="password"
            id="password"
            onChange={onPasswordChange}
          />
        </div>
      </fieldset>
      <div className="mt3">
        <NavLink
          exact
          to="/"
          className="b ph3 pv2 dib input-reset ba b--black bg-transparent grow pointer f6 no-underline"
          onClick={onSignUpSubmission}
        >
          Sign me up
        </NavLink>
      </div>
      <div className="lh-copy mt3">
        <a href="/login" className="f7 link dim black db">
          Already signed up? Login instead.
        </a>
      </div>
    </main>
  );
};

const mapStateToProps = (state) => ({
  user: state.users,
  errors: state.users.errors,
});

const mapDispatchToProps = {
  setUsername,
  setEmail,
  setPassword,
  updateUser,
  updateErrors,
  setIsLoggedIn,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
