import React from 'react';
import Firebase from './Firebase.tsx';
import Home from './page/home/Home.tsx';

function App() {
  return (
    <Firebase>
      <Home />
    </Firebase>
  );
}

export default App;
