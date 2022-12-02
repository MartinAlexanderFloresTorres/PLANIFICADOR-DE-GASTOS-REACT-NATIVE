import React from 'react';
import PresupuestoProvider from './src/providers/PresupuestoProvider';
import Home from './src/views/Home';

const App = () => {
  return (
    <PresupuestoProvider>
      <Home />
    </PresupuestoProvider>
  );
};

export default App;
