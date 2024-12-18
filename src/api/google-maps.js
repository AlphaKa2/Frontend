import React, { useRef, useEffect, useState } from "react";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  useLoadScript,
} from "@react-google-maps/api";

const GOOGLE_MAPS_API_KEY = "AIzaSyCDoiGbTTs3Bw_93ymwbMvz9H-lKdaxwkY"; // 실제 API_KEY로 교체

const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

const GoogleMapsComponent = ({ center, markers, dayRoutes }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });

  const mapRef = useRef(null);

  const onLoad = (map) => {
    mapRef.current = map;
  };

  // 모든 마커에 맞추어 지도 범위 조정
  useEffect(() => {
    if (mapRef.current && markers && markers.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      markers.forEach((marker) => bounds.extend({ lat: marker.lat, lng: marker.lng }));
      mapRef.current.fitBounds(bounds);
    }
  }, [markers]);

  if (loadError) {
    console.error("Google Maps API Load Error:", loadError);
    return <div>지도 로딩 중 오류가 발생했습니다.</div>;
  }

  if (!isLoaded) return <div>Loading Google Maps...</div>;

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={center || { lat: 37.5665, lng: 126.978 }}
      zoom={10}
      onLoad={onLoad}
    >
      {/* 모든 마커 표시 */}
      {markers.map((marker, index) => (
        <Marker
          key={index}
          position={{ lat: marker.lat, lng: marker.lng }}
          label={{ text: marker.label, fontSize: "12px", color: "black" }}
          icon={{
            url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
            scaledSize: new window.google.maps.Size(40, 40),
          }}
        />
      ))}

      {/* 일차별 경로 표시 */}
      {dayRoutes && dayRoutes.map((routeObj, idx) => (
        <DirectionsRenderer
          key={idx}
          directions={routeObj.directions}
          options={{
            polylineOptions: {
              strokeColor: "#3b82f6",
              strokeWeight: 5,
            },
          }}
        />
      ))}
    </GoogleMap>
  );
};

export default React.memo(GoogleMapsComponent);
