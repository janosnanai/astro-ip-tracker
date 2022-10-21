import { atom } from "nanostores";

export const ipGeoAtom = atom<IpGeoResponseData | null>(null);

export function setIpGeoAtom(update: IpGeoResponseData) {
  ipGeoAtom.set(update);
}

export function resetIpGeoAtom() {
  ipGeoAtom.set(null);
}
