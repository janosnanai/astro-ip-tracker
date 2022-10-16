import { atom } from "nanostores";

export interface SnackbarData {
  type: "info" | "type-check-pass" | "type-check-fail" | "error";
  message: string;
  timer?: NodeJS.Timeout;
}

export const snackbarAtom = atom<SnackbarData | null>(null);

export function snackbarReset() {
  let oldTimer;

  if (snackbarAtom) {
    const snackShot = snackbarAtom.get();
    oldTimer = snackShot?.timer;
  }
  clearTimeout(oldTimer);
  snackbarAtom.set(null);
}

export function snackbarNotification(notification: SnackbarData, ttl = 5000) {
  const snackShot = snackbarAtom.get();
  const oldTimer = snackShot?.timer;

  clearTimeout(oldTimer);

  setTimeout(() => {
    const newTimer = setTimeout(() => {
      snackbarReset();
    }, ttl);
    snackbarAtom.set({ ...notification, timer: newTimer });
  }, 300);
}
