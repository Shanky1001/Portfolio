import React from 'react';
import { Route } from 'react-router-dom';
import RouterProvider from './providers/RouterProvider.tsx';
import Firebase from './Firebase.tsx';
import Home from './page/home/Home.tsx';

function App() {
  return (
    <Firebase>
      <RouterProvider>
        <Route path="/" element={<Home />} />
      </RouterProvider>
    </Firebase>
  );
}

export default App;
