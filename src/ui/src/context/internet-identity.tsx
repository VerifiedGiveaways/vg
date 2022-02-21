/*
  Original context provider code from:
  https://github.com/InternetIdentityLabs/react-ic-ii-auth.

  Modified to include a fakeProvider based on this post:
  https://forum.dfinity.org/t/how-to-create-valid-principal-id-for-mocking-via-cli/7904/3
*/

/* eslint-disable no-unused-vars */
import { Identity } from '@dfinity/agent'
import { AuthClient, AuthClientLoginOptions } from '@dfinity/auth-client'
import { Ed25519KeyIdentity } from '@dfinity/identity';
import React, { useContext } from 'react'

interface InternetIdentityContextState {
  error: string | null
  authClient: AuthClient | null
  identityProvider: string
  isAuthenticated: boolean
  identity: Identity | null
  authenticate: () => void
  signout: () => void
}

export const InternetIdentityContext =
  React.createContext<InternetIdentityContextState>({
    error: null,
    authClient: null,
    identityProvider: '',
    isAuthenticated: false,
    identity: null,
    authenticate: () => null,
    signout: () => null
  })

interface AuthClientOptions extends Omit<AuthClientLoginOptions, 'onSuccess'> {
  onSuccess?: (identity: Identity) => void
}

interface UseInternetIdentityProps {
  authClientOptions?: AuthClientOptions,
  fakeProvider?: boolean
}

const useICIIAuth = ({
  authClientOptions: { onError, onSuccess, ...authClientOptions } = {},
  fakeProvider = false
}: UseInternetIdentityProps = {}) => {
  const [authClient, setAuthClient] = React.useState<AuthClient | null>(null);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const identityProvider = (
    authClientOptions.identityProvider || 'https://identity.ic0.app/#authorize'
  ).toString();

  const createAuthClient = React.useCallback(async () => {
    var authClient: React.SetStateAction<AuthClient | null>;
    if (fakeProvider) {
      authClient = await AuthClient.create({ identity: Ed25519KeyIdentity.generate() });
    } else {
      authClient = await AuthClient.create({});
    }
    setAuthClient(authClient)
  }, []);

  React.useEffect(() => {
    createAuthClient();
  }, [createAuthClient]);

  const setAuthStatus = React.useCallback(async (authClient) => {
    if (authClient) {
      const isAuthenticated = await authClient.isAuthenticated();
      return setIsAuthenticated(isAuthenticated);
    }
    return setIsAuthenticated(false);
  }, []);

  React.useEffect(() => {
    authClient && setAuthStatus(authClient);
  }, [authClient, setAuthStatus]);

  const handleOnSuccess = React.useCallback(
    (authClient) => {
      setIsAuthenticated(true);
      onSuccess && onSuccess(authClient.getIdentity());
    },
    [onSuccess]
  );

  const handleOnError = React.useCallback(
    (error) => {
      setError(error)
      onError && onError(error)
    },
    [onError]
  );

  const authenticate = React.useCallback(async () => {
    if (authClient) {

      if (fakeProvider) {
        handleOnSuccess(authClient);
      } else {
        await authClient.login({
          onSuccess: () => handleOnSuccess(authClient),
          onError: handleOnError,
          identityProvider,
          ...authClientOptions
        });
      }
    }
  }, [
    authClient,
    authClientOptions,
    handleOnError,
    handleOnSuccess,
    identityProvider
  ]);

  const signout = React.useCallback(async () => {
    if (authClient) {
      if (!fakeProvider) {
        await authClient.logout();
      }
      setIsAuthenticated(false);
    }
  }, [authClient]);

  console.log('identity', authClient?.getIdentity().getPrincipal().toString());

  return {
    error,
    authClient,
    identityProvider,
    isAuthenticated,
    identity: authClient ? authClient.getIdentity() : null,
    authenticate,
    signout
  };
};

interface InternetIdentityProviderProps {
  authClientOptions?: AuthClientOptions,
  fakeProvider?: boolean
};

export const InternetIdentityProvider: React.FC<InternetIdentityProviderProps> =
  ({ children, authClientOptions = {}, fakeProvider = false }) => {
    const authContext = useICIIAuth({ authClientOptions, fakeProvider })
    return (
      <InternetIdentityContext.Provider value={authContext}>
        {children}
      </InternetIdentityContext.Provider>
    )
  }

export const useInternetIdentity = () => {
  return useContext(InternetIdentityContext);
};
