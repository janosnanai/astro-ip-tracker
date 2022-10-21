import type { LatLngTuple, LeafletMouseEvent, Map } from "leaflet";

import { useEffect, useState, useCallback, useMemo, useRef } from "react";
import { useStore } from "@nanostores/react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Rectangle,
  useMap,
  useMapEvent,
} from "react-leaflet";
import { useEventHandlers } from "@react-leaflet/core";

import { ipGeoAtom } from "../utils/atoms/ipGeoAtom";

import "leaflet/dist/leaflet.css";

function MinimapBounds({ parentMap, zoom }: { parentMap: any; zoom: number }) {
  const minimap = useMap();

  // Clicking a point on the minimap sets the parent's map center
  const onClick = useCallback(
    (event: LeafletMouseEvent) => {
      parentMap.setView(event.latlng, parentMap.getZoom());
    },
    [parentMap]
  );
  useMapEvent("click", onClick);

  // Keep track of bounds in state to trigger renders
  const [bounds, setBounds] = useState(parentMap.getBounds());
  const onChange = useCallback(() => {
    setBounds(parentMap.getBounds());
    // Update the minimap's view to match the parent map's center and zoom
    minimap.setView(parentMap.getCenter(), zoom);
  }, [minimap, parentMap, zoom]);

  // Listen to events on the parent map
  const handlers = useMemo(() => ({ move: onChange, zoom: onChange }), []);
  useEventHandlers(
    // @ts-ignore
    { instance: parentMap },
    handlers
  );

  return <Rectangle bounds={bounds} pathOptions={{ weight: 1 }} />;
}

function MinimapControl({ zoom }: { zoom?: number }) {
  const parentMap = useMap();
  const mapZoom = zoom || 1;

  // Memoize the minimap so it's not affected by position changes
  const minimap = useMemo(
    () => (
      <MapContainer
        center={parentMap.getCenter()}
        zoom={mapZoom}
        dragging={false}
        doubleClickZoom={false}
        scrollWheelZoom={false}
        attributionControl={false}
        zoomControl={false}
        className="h-32 w-40"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MinimapBounds parentMap={parentMap} zoom={mapZoom} />
      </MapContainer>
    ),
    []
  );

  return (
    <div className="absolute right-5 bottom-7">
      <div className="leaflet-control leaflet-bar">{minimap}</div>
    </div>
  );
}

function LocationMarker({
  coords,
  popupContent,
}: {
  coords: LatLngTuple;
  popupContent?: string;
}) {
  const map = useMap();

  useEffect(() => {
    if (!coords) return;
    map.flyTo(coords, 13, { animate: true, duration: 1.5 });
  }, [coords]);
  return (
    <Marker position={coords}>
      <Popup>{popupContent}</Popup>
    </Marker>
  );
}

function LeafletMap() {
  const ipGeoData = useStore(ipGeoAtom);

  const coords: LatLngTuple | null = ipGeoData
    ? [Number(ipGeoData.latitude), Number(ipGeoData.longitude)]
    : null;

  return (
    <MapContainer
      center={coords || [0, 0]}
      zoom={coords ? 13 : 5}
      minZoom={3}
      zoomControl={false}
      className="min-h-[300px] h-full w-full z-0 !bg-zinc-700"
    >
      <p className="absolute bottom-5 z-50 text-red-500">{coords}</p>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        // trying to darkmode it, but looks meh...
        // className="invert contrast-200 hue-rotate-180 saturate-50 brightness-75"
        className="z-0"
      />
      {coords && (
        <LocationMarker
          coords={coords}
          popupContent={ipGeoData?.organization}
        />
      )}
      <MinimapControl />
    </MapContainer>
  );
}

export default LeafletMap;
