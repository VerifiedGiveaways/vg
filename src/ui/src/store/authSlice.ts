import { GetState, SetState, StateCreator, StoreApi } from "zustand";
import { AuthClient, AuthClientLoginOptions } from "@dfinity/auth-client";
import { Identity } from "@dfinity/agent";
import { Ed25519KeyIdentity } from "@dfinity/identity";

// configuration
const identityProvider: string =
  process.env.II_PROVIDER_URL || "https://identity.ic0.app/#authorize";

console.log("identityProviderUrl", identityProvider);

const fakeProvider: boolean = process.env.II_PROVIDER_USE_FAKE == "true";

var authClient: AuthClient;

export interface AuthSlice {
  readonly identity: Identity | undefined;
  readonly error: string | undefined;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

// Encapsulates and abstracts AuthClient
// identity has a value when authenticated, otherwise it's undefined
// to get the principal, use identity?.getPrincipal()
const createAuthSlice: StateCreator<AuthSlice> | StoreApi<AuthSlice> = (
  set,
  get
) => ({
  identity: undefined,
  error: undefined,

  login: async (): Promise<void> => {
    if (!authClient) {
      if (fakeProvider) {
        // for local development, the identity can be generated
        // bypassing the Internet Identity login workflow
        authClient = await AuthClient.create({
          identity: Ed25519KeyIdentity.generate(),
        });
        set({ identity: authClient.getIdentity(), error: undefined });
      } else {
        // when using an Internet Identity provider, the Identity
        // is set after successfully logging in
        authClient = await AuthClient.create({});
        await authClient.login(<AuthClientLoginOptions>{
          onSuccess: async () => {
            set({ identity: authClient.getIdentity(), error: undefined });
          },
          onError: (error) => {
            set({ error });
          },
          identityProvider,
        });
      }
    }
  },

  logout: async () => {
    if (authClient) {
      if (!fakeProvider) {
        await authClient.logout();
      }
      set({ identity: undefined, error: undefined });
    }
  },
});

export default createAuthSlice as (
  set: SetState<AuthSlice>,
  get: GetState<AuthSlice>,
  api: StoreApi<AuthSlice>
) => AuthSlice;
