import React, { useRef, useEffect } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

// Google Maps API Key (환경 변수로 관리 권장)
const GOOGLE_MAPS_API_KEY = "AIzaSyBOwwtfHr0GEu8Z4H1gP_mGl0qClPZfSU8"; // 본인의 API 키로 대체하세요

// Google Maps 컨테이너 스타일
const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

// Google Maps 컴포넌트
const GoogleMapsComponent = ({ center, markers = [] }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });

  const mapRef = useRef(null);

  const onLoad = (map) => {
    mapRef.current = map;
  };

  // markers가 변경될 때마다 지도의 bounds를 업데이트
  useEffect(() => {
    if (mapRef.current && markers.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      markers.forEach((marker) => {
        bounds.extend({ lat: marker.lat, lng: marker.lng });
      });
      mapRef.current.fitBounds(bounds);
    }
  }, [markers]);

  if (loadError) {
    console.error("Google Maps API 로드 중 오류 발생:", loadError);
    return <div>지도 로딩 중 오류가 발생했습니다.</div>;
  }

  if (!isLoaded) {
    return <div>Loading Google Maps...</div>;
  }

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={center}
      onLoad={onLoad}
    >
      {markers.map((marker, index) => (
        <Marker
          key={index}
          position={{
            lat: parseFloat(marker.lat),
            lng: parseFloat(marker.lng),
          }}
          label={{
            text: marker.label,
            fontSize: "12px",
            fontWeight: "bold",
            fontFamily: "Poppins",
            color: "black",
          }}
          icon={{
            url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
            labelOrigin: { x: 15, y: 32 },
          }}
        />
      ))}
    </GoogleMap>
  );
};

// google-maps.js

export const mapStyles = [
  {
  "featureType": "all",
        "elementType": "labels.text",
        "stylers": [
            {
                "color": "#878787"
            }
        ]
      }
];


export default React.memo(GoogleMapsComponent);