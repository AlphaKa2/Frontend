import React, { useEffect } from "react";

const MapMarker = ({ map, day, onMarkersAdded }) => {
  useEffect(() => {
    if (!map || !day.schedules) return;
    const markerPositions = [];

    day.schedules.forEach((item) => {
      const lat = parseFloat(item.place.latitude);
      const lng = parseFloat(item.place.longitude);

      // 좌표 유효성 체크
      if (isNaN(lat) || isNaN(lng)) {
        console.warn(`Invalid coordinates for place: ${item.place.placeName}`);
        return;
      }

      const marker = new window.google.maps.Marker({
        position: { lat, lng },
        map,
        title: item.place.placeName,
      });

      markerPositions.push({ lat, lng });

      const infoWindow = new window.google.maps.InfoWindow({
        content: `<div style="font-size: 14px; font-weight: bold; text-align: center;">
                    ${item.place.placeName}
                  </div>`,
      });

      marker.addListener("click", () => {
        infoWindow.open(map, marker);
      });
    });

    // 마커 좌표 전달
    onMarkersAdded(markerPositions);
  }, [map, day, onMarkersAdded]);

  return null;
};

export default MapMarker;
