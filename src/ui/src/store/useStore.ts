import create, { GetState, SetState, StoreApi } from "zustand";
import { devtools } from "zustand/middleware";
import createAppSlice, { AppSlice } from "./appSlice";
import createUserSlice, { UserSlice } from "./userSlice";
import createAuthSlice, { AuthSlice } from "./authSlice";

interface IStore extends AuthSlice, AppSlice, UserSlice {}

export const useStore = create<IStore>(
  devtools((set, get, api) => ({
    ...createAuthSlice(
      set as SetState<AuthSlice>,
      get as GetState<AuthSlice>,
      api as StoreApi<AuthSlice>
    ),
    ...createAppSlice(
      set as SetState<AppSlice>,
      get as GetState<AppSlice>,
      api as StoreApi<AppSlice>
    ),
    ...createUserSlice(
      set as SetState<UserSlice>,
      get as GetState<UserSlice>,
      api as StoreApi<UserSlice>
    ),
  }))
);
