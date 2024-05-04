import React from 'react';
import useAuth from './utils/auth/useAuth';
import { mediaQuery, useMediaQuery } from './utils/useMediaQuery';
import PcComponent from './PcComponents/PcComponent';
import SpComponent from './SpComponents/SpComponent';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

function App() {
  const { isLoggedIn, isLoading } = useAuth();
  const isSp = useMediaQuery(mediaQuery.sp)

  if (isLoading) return <div>Loading...</div>;

  const ComponentToRender = isSp ? SpComponent : PcComponent;

  return<QueryClientProvider client={queryClient}>
          <ComponentToRender isLoggedIn={isLoggedIn} />
        </QueryClientProvider >;
};

export default App;