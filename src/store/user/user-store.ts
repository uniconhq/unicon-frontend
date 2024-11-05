import { createStore } from "zustand";

import { UserPublic } from "@/client";

interface UserState {
  user?: UserPublic;
}

export const defaultUserState: UserState = {};

interface UserActions {
  setUser: (user: UserPublic) => void;
}

export type UserStore = UserState & UserActions;

export const createUserStore = (initState: UserState = defaultUserState) => {
  return createStore<UserStore>()((set) => ({
    ...initState,
    setUser: (user?: UserPublic) => set(() => ({ user })),
  }));
};
