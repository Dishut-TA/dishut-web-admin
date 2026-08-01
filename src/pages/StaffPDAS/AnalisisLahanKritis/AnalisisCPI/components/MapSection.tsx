import React from 'react';
import { HiOutlinePlus, HiOutlineDocumentArrowDown } from 'react-icons/hi2';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

interface MapSectionProps {
  geoData: any;
  isLoading: boolean;
  onOpenInputModal: () => void;
}

const MapSection: React.FC<MapSectionProps> = ({ geoData, isLoading, onOpenInputModal }) => {
  const getFeatureStyle = (feature: any) => {
    const status = feature.properties?.status_lahan_kritis?.toLowerCase() || feature.properties?.status?.toLowerCase() || '';
    if (status.includes('sangat kritis')) return { color: '#EF4444', fillColor: '#ef4444', fillOpacity: 0.9, weight: 1 }; 
    if (status.includes('kritis')) return { color: '#F59E0B', fillColor: '#facc15', fillOpacity: 0.9, weight: 1 }; 
    return { color: '#10B981', fillColor: '#4ade80', fillOpacity: 0.9, weight: 1 }; 
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 border border-gray-100 mb-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <div>
          <h2 className="text-sm font-bold text-gray-800">Peta Prioritas Rehabilitasi Jawa Barat:</h2>
          <p className="text-xs text-gray-500">Conservation Priority Index (CPI)</p>
        </div>
        <button
          onClick={onOpenInputModal}
          className="w-full sm:w-auto bg-[#185325] hover:bg-[#113d1b] text-white px-5 py-2.5 rounded-full text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow-sm active:scale-95"
        >
          Input File <HiOutlinePlus className="w-4 h-4 stroke-2" />
        </button>
      </div>

      <div className="w-full h-80 md:h-112.5 bg-blue-50/50 rounded-lg border border-blue-100 overflow-hidden relative flex items-center justify-center z-0 mb-4">
        {isLoading ? (
          <div className="flex flex-col items-center text-[#185325]">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#185325] mb-3"></div>
            <span className="font-bold text-sm">Merender Peta Spasial...</span>
          </div>
        ) : geoData ? (
          <MapContainer center={[-6.9204, 107.6046]} zoom={9} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              attribution='&copy; OpenStreetMap contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <GeoJSON 
              key={geoData.projectId || Math.random()}
              data={geoData} 
              style={getFeatureStyle}
              onEachFeature={(feature, layer) => {
                const desa = feature.properties?.desa_kelurahan || feature.properties?.desa || '-';
                const status = feature.properties?.status_lahan_kritis || feature.properties?.status || '-';
                layer.bindPopup(`<strong>Desa:</strong> ${desa}<br/><strong>Status:</strong> ${status}`);
              }}
            />
          </MapContainer>
        ) : (
          <div className="text-sm text-gray-400">Belum ada data spasial</div>
        )}

        {geoData && !isLoading && (
          <div className="absolute top-4 right-4 z-400 bg-white px-3 py-2 rounded-lg shadow-sm border border-gray-100 flex gap-3 text-[10px] font-bold tracking-wide uppercase">
            <div className="flex items-center gap-1.5"><div className="w-3 h-2 bg-[#4ade80] rounded-full"></div> Tidak Kritis</div>
            <div className="flex items-center gap-1.5"><div className="w-3 h-2 bg-[#facc15] rounded-full"></div> Kritis</div>
            <div className="flex items-center gap-1.5"><div className="w-3 h-2 bg-[#ef4444] rounded-full"></div> Sangat Kritis</div>
          </div>
        )}
      </div>

      <div className="flex justify-end">
        <button className="bg-[#185325] hover:bg-[#123d1c] text-white px-6 py-2.5 rounded-full text-xs font-bold flex items-center gap-2 transition-colors shadow-sm active:scale-95">
          <HiOutlineDocumentArrowDown className="w-4 h-4 stroke-2" /> Ekspor Laporan
        </button>
      </div>

    </div>
  );
};

export default MapSection;