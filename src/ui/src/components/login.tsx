import * as React from 'react';
import {
    InternetIdentityProvider,
    useInternetIdentity
} from '@identity-labs/react-ic-ii-auth';

const AuthButton = () => {
    const { authenticate, signout, isAuthenticated, identity } = useInternetIdentity();
    
    console.log('>> initialize your actors with', { identity });

    return (
        <div>
            <div>{ identity?.getPrincipal().toString() || "Unathenticated" }</div>
            <br/>
            <button onClick={isAuthenticated ? signout : authenticate}>
                {isAuthenticated ? 'Logout' : 'Login with Internet Identity'}
            </button>
        </div>
    );
};

const Login = () => {
    return (
      <>
        <InternetIdentityProvider
            authClientOptions={{
                onSuccess: (identity) => console.log(
                    ">> initialize your actors with", {identity}
                ),
                // NOTE: Overwrite identityProvider in dev mode
                // defaults to "https://identity.ic0.app/#authorize"
                identityProvider: `http://${process.env.II_CANISTER_ID}.localhost:8000/#authorize`
            }}
        >
            <AuthButton />
        </InternetIdentityProvider>
      </>
    );
  };
  
  export default Login;