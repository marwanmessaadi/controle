import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const TestMap = ({ setDeliveryCoordinates }) => {
  // Default coordinates (Morocco)
  const [position, setPosition] = useState([31.7917, -7.0926]);
  const [address, setAddress] = useState('');
  const [marker, setMarker] = useState(null);

  // Function to geocode the address
  const geocodeAddress = async () => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
      );
      const data = await response.json();

      if (data.length > 0) {
        const { lat, lon } = data[0];
        setPosition([parseFloat(lat), parseFloat(lon)]);
        setMarker([parseFloat(lat), parseFloat(lon)]);
        setDeliveryCoordinates([parseFloat(lat), parseFloat(lon)]);
      } else {
        alert('Address not found!');
      }
    } catch (error) {
      console.error('Error geocoding address:', error);
    }
  };

  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setPosition([lat, lng]);
        setMarker([lat, lng]);
        setDeliveryCoordinates([lat, lng]);
      },
    });
    return null;
  };

  return (
    <div>
      <div style={{ margin: '20px', textAlign: 'center' }}>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter an address"
          style={{ padding: '10px', width: '300px', marginRight: '10px' }}
        />
        <button onClick={geocodeAddress} style={{ padding: '10px' }}>
          Search
        </button>
      </div>

      <h1 style={{ textAlign: 'center' }}>Map</h1>
      <MapContainer center={position} zoom={13} style={{ height: '80vh', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <MapClickHandler />
        {marker && (
          <Marker position={marker}>
            <Popup>
              Your searched location. <br /> Coordinates: {marker[0]}, {marker[1]}
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default TestMap;