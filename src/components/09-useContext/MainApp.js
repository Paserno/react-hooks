import React from 'react';
import { AppRouter } from './AppRouter';
import { UserContext } from './UserContext';

export const MainApp = () => {

  const user ={
    id: 123456,
    name: 'Diego',
    emial: 'diego@gmial.com'
  }

  return (
    <UserContext.Provider value={ user }>
      
      <AppRouter />

    </UserContext.Provider>

  )
};
