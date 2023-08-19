import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';

const LocationMap = ({ onLocationChange }) => {
  const [position, setPosition] = useState(null);

  const handleMapClick = (e) => {
    const { lat, lng } = e.latlng;
    setPosition({ lat, lng });
    onLocationChange({ latitude: lat, longitude: lng });
  };

  return (
    <MapContainer center={[0, 0]} zoom={13} style={{ height: '300px' }} onClick={handleMapClick}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {position && <Marker position={[position.lat, position.lng]} />}
    </MapContainer>
  );
};

export default LocationMap;
