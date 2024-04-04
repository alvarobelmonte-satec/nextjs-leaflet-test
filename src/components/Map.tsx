'use client';

import "leaflet/dist/leaflet.css";

 import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";

import "leaflet-defaulticon-compatibility";

import React from 'react';
import styles from './Map.module.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

export const Map = () => {
  return (
 
        <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false} style={{ height: "400px", width: "600px" }}>
        <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[51.505, -0.09]}>
            <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
        </Marker>
        </MapContainer>
   
  );
};

