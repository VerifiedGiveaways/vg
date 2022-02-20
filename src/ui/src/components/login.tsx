import * as React from 'react';
import { useInternetIdentity } from '../context/internet-identity';

const Login = () => {
    const { authenticate, signout, isAuthenticated, identity } = useInternetIdentity();

    return (
        <>
            <h2>Log In/Out</h2>
            <div>
                <button onClick={isAuthenticated ? signout : authenticate}>
                    {isAuthenticated ? 'Logout' : 'Login with Internet Identity'}
                </button>
            </div>
            
            <br/>

            {isAuthenticated ?
                <div>Authenticated Principal: { identity?.getPrincipal().toString() || "???" }</div>
                :
                <div>Anonymous User</div>
            }
        </>
    );
  };
  
  export default Login;