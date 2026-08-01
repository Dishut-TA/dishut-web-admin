import React from 'react';
import { HiOutlineMap } from 'react-icons/hi2';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; 

const MapSection: React.FC = () => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm mb-6">
      <div className="flex items-center gap-2 mb-4">
        <HiOutlineMap className="w-5 h-5 text-gray-700" />
        <h2 className="text-base font-bold text-gray-800">Peta GIS Analisis CPI</h2>
      </div>

      <div className="w-full h-80 md:h-100 rounded-lg border border-gray-200 overflow-hidden relative z-0">
        <MapContainer 
          center={[-6.9204, 107.6046]} 
          zoom={9}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {/* Nanti render <GeoJSON data={...} /> di sini kaya di kode lama */}
        </MapContainer>

        <div className="absolute top-4 right-4 z-400 bg-white px-4 py-2 rounded-lg shadow-md border border-gray-100 flex gap-4 text-[10px] font-bold">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 bg-green-500 rounded-sm"></div> Tidak Kritis
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 bg-yellow-400 rounded-sm"></div> Kritis
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 bg-red-600 rounded-sm"></div> Sangat Kritis
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapSection;