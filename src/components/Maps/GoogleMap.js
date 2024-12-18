import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./GoogleMap.module.css";

const GoogleMap = ({ center, markers }) => {
  const [googleMap, setGoogleMap] = useState(null);
  const markersRef = useRef([]);

  const mapRef = useCallback((node) => {
    if (node && !googleMap && window.google && window.google.maps) {
      const map = new window.google.maps.Map(node, {
        center: center || { lat: 37.5665, lng: 126.9780 },
        zoom: 12,
        mapTypeId: "roadmap",
      });
      setGoogleMap(map);
    }
  }, [googleMap, center]);

  useEffect(() => {
    if (googleMap && markers) {
      // 기존 마커 제거
      markersRef.current.forEach(m => m.setMap(null));
      markersRef.current = [];

      if (markers.length > 0) {
        const bounds = new window.google.maps.LatLngBounds();

        markers.forEach(markerData => {
          if (!isNaN(markerData.lat) && !isNaN(markerData.lng)) {
            const marker = new window.google.maps.Marker({
              position: { lat: markerData.lat, lng: markerData.lng },
              map: googleMap,
              title: markerData.label || "",
            });
            markersRef.current.push(marker);
            bounds.extend({ lat: markerData.lat, lng: markerData.lng });
          }
        });

        if (!bounds.isEmpty()) {
          googleMap.fitBounds(bounds);
        } else if (center) {
          googleMap.setCenter(center);
          googleMap.setZoom(12);
        }
      } else if (center) {
        // 마커가 없고 center만 있는 경우
        googleMap.setCenter(center);
        googleMap.setZoom(12);
      }
    }
  }, [googleMap, markers, center]);

  return (
    <div ref={mapRef} id="map" className={styles["google-map"]}></div>
  );
};

export default GoogleMap;
