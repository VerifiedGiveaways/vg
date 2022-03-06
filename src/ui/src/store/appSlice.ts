import { GetState, SetState, StateCreator, StoreApi } from "zustand";
import { ActorSubclass, AnonymousIdentity } from "@dfinity/agent";
import { canisterId, createActor } from "../../../../.dfx/local/canisters/app";
import { _SERVICE } from "../../../../.dfx/local/canisters/app/app.did";
import { epochTimeToShortDate, epochTimeToShortTime } from "../utils";
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

export interface AppSlice {
  readonly data: string | undefined;
  readonly serverTime: string | undefined;
  readonly appPrincipalId: string | undefined;
  setData: (data: string) => Promise<void>;
  getData: () => Promise<void>;
  getServerTime: () => Promise<void>;
  getAppPrincipalId: () => Promise<void>;
}

// proxies calls to the app canister and caches the results
// todo: add error handling
const createAppSlice: StateCreator<AppSlice> | StoreApi<AppSlice> = (
  set,
  get
) => ({
  data: undefined,
  serverTime: undefined,
  appPrincipalId: undefined,

  setData: async (data: string): Promise<void> => {
    await getActor().setData(data);
  },

  getData: async (): Promise<void> => {
    const data = await getActor().getData();
    set({ data });
  },

  getServerTime: async (): Promise<void> => {
    const epochTime = await getActor().getTime();
    const serverTime =
      epochTimeToShortDate(epochTime) + " " + epochTimeToShortTime(epochTime);
    set({ serverTime });
  },

  getAppPrincipalId: async (): Promise<void> => {
    const myPrincipalId = await getActor().whoAmI();
    set({ appPrincipalId: myPrincipalId });
  },
});

export default createAppSlice as (
  set: SetState<AppSlice>,
  get: GetState<AppSlice>,
  api: StoreApi<AppSlice>
) => AppSlice;
