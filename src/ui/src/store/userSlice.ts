import { GetState, SetState, StateCreator, StoreApi } from "zustand";
import { ActorSubclass, AnonymousIdentity } from "@dfinity/agent";
import { canisterId, createActor } from "../../../../.dfx/local/canisters/app";
import { _SERVICE } from "../../../../.dfx/local/canisters/app/app.did";
import { useStore } from "./useStore";

// the identity must be explicity passed to the actor reference
// or the canister function's caller will be the anonymous identity
function getActor(): ActorSubclass<_SERVICE> {
  return createActor(canisterId as string, {
    agentOptions: {
      identity: useStore.getState().identity || new AnonymousIdentity(),
    },
  });
}

export interface UserSlice {
  readonly userPrincipalId: string | undefined;
  getUserPrincipalId: () => Promise<void>;
}

// proxies calls to the app canister and caches the results
// todo: add error handling
const createUserSlice: StateCreator<UserSlice> | StoreApi<UserSlice> = (
  set,
  get
) => ({
  userPrincipalId: undefined,

  getUserPrincipalId: async (): Promise<void> => {
    const myUserPrincipalId = await getActor().whoAmI();
    set({ userPrincipalId: myUserPrincipalId });
  },
});

export default createUserSlice as (
  set: SetState<UserSlice>,
  get: GetState<UserSlice>,
  api: StoreApi<UserSlice>
) => UserSlice;
