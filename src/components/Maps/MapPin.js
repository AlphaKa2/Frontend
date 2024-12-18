import React, { forwardRef, useEffect, useRef } from "react";

const MapPin = forwardRef(function MapPin({ children }, ref) {
  const myRef = useRef(null);

  useEffect(() => {
    if (typeof ref === "function") {
      const initPin = new window.google.maps.marker.PinElement({
        background: "#db4455", // 핀 배경색
        borderColor: "#881824", // 핀 테두리색
      });

      myRef.current?.appendChild(initPin.element);
      ref(myRef.current);

      return () => {
        myRef.current?.removeChild(initPin.element);
      };
    }
  }, [ref]);

  return <div ref={myRef}>{children}</div>;
});

export default MapPin;
