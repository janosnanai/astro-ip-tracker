import type { LatLngTuple } from "leaflet";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import { useStore } from "@nanostores/react";
import { ipGeoAtom } from "../utils/atoms/ipGeoAtom";

import "leaflet/dist/leaflet.css";

function LeafletMap() {
  const ipGeoData = useStore(ipGeoAtom);
  const coords: LatLngTuple = ipGeoData
    ? [Number(ipGeoData.latitude), Number(ipGeoData.longitude)]
    : [47.52558, 19.06413];

  return (
    <MapContainer
      center={coords}
      zoom={13}
      zoomControl={false}
      className="min-h-[300px] h-full w-full z-0 !bg-zinc-700"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        // trying to darkmode it, but looks meh...
        // className="invert contrast-200 hue-rotate-180 saturate-50 brightness-75"
      />
      <Marker position={coords}>
        <Popup>hello</Popup>
      </Marker>
    </MapContainer>
  );
}

export default LeafletMap;
