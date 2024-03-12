// Home.tsx
import React from 'react';

function Home({ onLogin }: { onLogin: () => void }) {
  return (
    <div>
      <h1>Welcome to the App</h1>
      <button onClick={onLogin}>Googleでログイン</button>
    </div>
  );
}

export default Home;
