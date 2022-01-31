import React, { useContext } from 'react';
import { UserContext } from './UserContext';

export const LoginScreen = () => {

  
  const {user ,setUser} = useContext(UserContext);

  // 1. Obtener la referencia al userContext
  // 2. setUser

  const userNew = {
    id: 1234,
    name: 'Felipe'
  }
  
  

  return (
    <div>
        <h1>Login Screen</h1>
        <hr/>
        <pre>
                { JSON.stringify( user, null, 3)}
        </pre>
        <button
          className='btn btn-primary'
          onClick={() => setUser(userNew)}
        >
            Login
        </button>
    </div>
)
};
