import React, { createContext, useState } from 'react';
export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [wantToSignUp, setWantToSignUp] = useState(true);
  const [user, setUser] = useState({
    id: 1,
    username: '',
    email: '',
    joinedon: '',
  });

  // handleClick
  const onLogoutClick = () => setIsLoggedIn(false);
  const onSignUpClick = () => setWantToSignUp(true);
  const onLoginClick = () => setWantToSignUp(false);

  // display user information
  const displayUserInformation = ({ id, username, email, joinedon }) => {
    setUser({ ...user, id, username, email, joinedon });
  };

  // onChange
  const onUsernameChange = event => setUsername(event.target.value);
  const onEmailChange = event => setEmail(event.target.value);
  const onPasswordChange = event => setPassword(event.target.value);

  // handleSubmission
  const onRegisterSubmission = () => {
    // This code needs to be updated when backend is ready
    displayUserInformation({
      username,
      email,
      password,
      joinedon: new Date().toDateString(),
    });
    setIsLoggedIn(true);
  };
  const onLoginSubmission = () => {
    // This code needs to be updated when backend is ready
    displayUserInformation({
      username,
      email,
      password,
      joinedon: new Date().toDateString(),
    });
    setIsLoggedIn(true);
  };

  return (
    <UserContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        wantToSignUp,
        user,
        onLogoutClick,
        onSignUpClick,
        onLoginClick,
        onUsernameChange,
        onEmailChange,
        onPasswordChange,
        onRegisterSubmission,
        onLoginSubmission,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
