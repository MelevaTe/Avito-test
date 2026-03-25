import { useSyncExternalStore } from "react";

const QUERY = "(prefers-color-scheme: dark)";
const getSnapshot = () => {
  if (typeof window === "undefined") return false;
  return window.matchMedia(QUERY).matches;
};
const getServerSnapshot = () => false;

const subscribe = (callback: () => void) => {
  if (typeof window === "undefined") return () => {};
  const mediaQueryList = window.matchMedia(QUERY);
  mediaQueryList.addEventListener("change", callback);
  return () => mediaQueryList.removeEventListener("change", callback);
};

export function usePrefersDark(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
