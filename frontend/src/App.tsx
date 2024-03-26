import React from 'react';
import './App.css';
import Auth from './utils/auth/Auth';
import { mediaQuery, useMediaQuery } from './utils/MediaQuery';
import PcComponent from './PcComponent';
import SpComponent from './SpComponent';

function App() {
  const { isLoggedIn, isLoading } = Auth();
  const isSp = useMediaQuery(mediaQuery.sp)
  if (isLoading) return <div>Loading...</div>;

  // スマホかPCかの判定を行い、ログイン状態をプロパティとして子コンポーネントに渡す
  return isSp ? (
    <SpComponent isLoggedIn={isLoggedIn} />
  ) : (
    <PcComponent isLoggedIn={isLoggedIn} />
  );
};

export default App;