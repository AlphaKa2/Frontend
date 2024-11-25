import { LoadScript, GoogleMap, Marker } from "@react-google-maps/api";

// Google Maps API Key (환경 변수로 관리 권장)
const GOOGLE_MAPS_API_KEY = "Secret";

// Google Maps 컨테이너 스타일
export const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

// Google Maps 컴포넌트
export const GoogleMapsComponent = ({ center, zoom = 12, markers = [] }) => {
  return (
    <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={zoom}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={{ lat: parseFloat(marker.lat), lng: parseFloat(marker.lng) }}
            label={{
              text: marker.label,
              fontSize: "12px",
              fontWeight: "bold",
            }}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};