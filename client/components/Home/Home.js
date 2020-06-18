import React, { useContext, useEffect } from 'react';
import SignUpOrLogin from './SignUpOrLogin';
import UserSection from './../UserSection/UserSection';
import { UserContext } from './../../contexts/UserContext';

const Home = () => {
  const { isLoggedIn } = useContext(UserContext);
  return <>{isLoggedIn ? <UserSection /> : <SignUpOrLogin />}</>;
};

export default Home;
