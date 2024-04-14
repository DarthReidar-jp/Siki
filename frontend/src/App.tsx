import React from 'react';
import useAuth from './utils/auth/useAuth';
import { mediaQuery, useMediaQuery } from './utils/useMediaQuery';
import PcComponent from './PcComponents/PcComponent';
import SpComponent from './SpComponents/SpComponent';

function App() {
  const { isLoggedIn, isLoading } = useAuth();
  const isSp = useMediaQuery(mediaQuery.sp)

  if (isLoading) return <div>Loading...</div>;

  // PCかスマホか
  const ComponentToRender = isSp ? SpComponent : PcComponent;

  return <ComponentToRender isLoggedIn={isLoggedIn} />;
};

export default App;