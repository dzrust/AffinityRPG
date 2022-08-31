import { useMemo } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@affinity-rpg/data/store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useIsLoading = () => {
  const appState = useAppState();
  return useMemo(() => {
    return appState.loadingCount > 0;
  }, [appState, appState.loadingCount]);
};

export const useAppState = () => {
  return useAppSelector((appState) => appState.app);
};

export const useUserState = () => {
  return useAppSelector((appState) => appState.user);
};
