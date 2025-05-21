import React from 'react';
import { Route } from 'react-router-dom';
import RouterProvider from './providers/RouterProvider.tsx';
import Firebase from './Firebase.tsx';
import Root from './Root.tsx';

function App() {
  return (
    <Firebase>
      <RouterProvider>
        <Route path="/" element={<Root />} />
      </RouterProvider>
    </Firebase>
  );
}

export default App;
