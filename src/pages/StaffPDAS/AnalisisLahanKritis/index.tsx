import { useState } from 'react';
import { HiOutlineDocumentPlus, HiOutlineMap } from 'react-icons/hi2';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; 
import InputDataModal from './components/InputDataModal';

// --- DUMMY DATA GEOJSON ---
const dummyGeoJSON = {
    type: "FeatureCollection",
    features: [
        {
            type: "Feature",
            properties: {
                kabupaten: "Bandung",
                kecamatan: "Lembang",
                desa: "Cikole",
                status: "Sangat Kritis",
                cpi_score: 85.5
            },
            geometry: {
                type: "Polygon",
                // Format koordinat: [Longitude, Latitude]
                coordinates: [[
                    [107.60, -6.82],
                    [107.65, -6.82],
                    [107.65, -6.78],
                    [107.60, -6.78],
                    [107.60, -6.82]
                ]]
            }
        },
        {
            type: "Feature",
            properties: {
                kabupaten: "Bandung Barat",
                kecamatan: "Parongpong",
                desa: "Cihideung",
                status: "Kritis",
                cpi_score: 65.2
            },
            geometry: {
                type: "Polygon",
                coordinates: [[
                    [107.50, -6.85],
                    [107.55, -6.85],
                    [107.55, -6.80],
                    [107.50, -6.80],
                    [107.50, -6.85]
                ]]
            }
        },
        {
            type: "Feature",
            properties: {
                kabupaten: "Bandung",
                kecamatan: "Ciwidey",
                desa: "Panundaan",
                status: "Tidak Kritis",
                cpi_score: 25.1
            },
            geometry: {
                type: "Polygon",
                coordinates: [[
                    [107.40, -7.15],
                    [107.45, -7.15],
                    [107.45, -7.10],
                    [107.40, -7.10],
                    [107.40, -7.15]
                ]]
            }
        }
    ]
};
// ---------------------------

const AnalisisLahanKritis = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    // Memasukkan dummyGeoJSON sebagai nilai default di state
    const [geoData, setGeoData] = useState<any>(dummyGeoJSON);

    const handleUploadSuccess = (responseData: any) => {
        console.log("Upload berhasil! Data API:", responseData);
        const gisGeoJSON = responseData?.data?.geojson || responseData?.geojson || responseData;
        setGeoData(gisGeoJSON);
    };

    const getFeatureStyle = (feature: any) => {
        const status = feature.properties?.status?.toLowerCase() || feature.properties?.kriteria?.toLowerCase() || '';
        
        if (status.includes('sangat kritis')) {
            return { color: '#EF4444', fillColor: '#fca5a5', fillOpacity: 0.7, weight: 1 }; 
        }
        if (status.includes('kritis')) {
            return { color: '#F59E0B', fillColor: '#fde047', fillOpacity: 0.7, weight: 1 }; 
        }
        return { color: '#10B981', fillColor: '#86efac', fillOpacity: 0.7, weight: 1 }; 
    };

    return (
        <div className="flex flex-col gap-4 md:gap-6 relative">
            <h1 className="text-xl md:text-2xl font-bold text-gray-800">
                Dashboard Analisis CPI
            </h1>

            <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 border border-gray-100">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4 md:mb-6">
                    <div>
                        <h2 className="text-base md:text-lg font-bold text-gray-800">
                            Peta Prioritas Rehabilitasi Jawa Barat:
                        </h2>
                        <p className="text-xs md:text-sm text-gray-500">
                            Conservation Priority Index (CPI)
                        </p>
                    </div>

                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="w-full cursor-pointer sm:w-auto bg-[#185325] hover:bg-[#113d1b] text-white px-5 py-2.5 rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-2 shadow-sm"
                    >
                        Input File <HiOutlineDocumentPlus className="w-5 h-5" />
                    </button>
                </div>

                <div className="w-full h-75 md:h-100 lg:h-125 bg-blue-50/50 rounded-lg border border-blue-100 overflow-hidden relative flex items-center justify-center z-0">
                    {geoData ? (
                        <MapContainer 
                            center={[-6.9204, 107.6046]} 
                            zoom={10} // Aku ubah zoom dari 8 ke 10 agar areanya terlihat lebih jelas di sekitar Bandung
                            style={{ height: '100%', width: '100%' }}
                        >
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <GeoJSON 
                                key={Math.random()}
                                data={geoData} 
                                style={getFeatureStyle}
                                onEachFeature={(feature, layer) => {
                                    const status = feature.properties?.status || feature.properties?.kriteria || 'Tidak Diketahui';
                                    layer.bindPopup(`<strong>Status Lahan:</strong> ${status}`);
                                }}
                            />
                        </MapContainer>
                    ) : (
                        <div className="flex flex-col items-center text-gray-400">
                            <HiOutlineMap className="w-12 h-12 mb-2 opacity-50" />
                            <span className="text-sm md:text-base text-center px-4">
                                Belum ada data. Silakan Input File GIS.
                            </span>
                        </div>
                    )}
                </div>

                {geoData && (
                    <div className="flex items-center gap-6 mt-4 justify-center md:justify-start">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <div className="w-4 h-4 rounded bg-[#86efac] border border-[#10B981]"></div> Tidak Kritis
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <div className="w-4 h-4 rounded bg-[#fde047] border border-[#F59E0B]"></div> Kritis
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <div className="w-4 h-4 rounded bg-[#fca5a5] border border-[#EF4444]"></div> Sangat Kritis
                        </div>
                    </div>
                )}
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto w-full">
                    <table className="w-full min-w-200 text-sm text-left">
                        <thead className="text-[#3A4D3F] bg-[#DCECE0]">
                            <tr>
                                <th className="px-4 md:px-6 py-3 md:py-4 font-bold whitespace-nowrap">Kabupaten/Kota</th>
                                <th className="px-4 md:px-6 py-3 md:py-4 font-bold whitespace-nowrap">Kecamatan</th>
                                <th className="px-4 md:px-6 py-3 md:py-4 font-bold whitespace-nowrap">Desa</th>
                                <th className="px-4 md:px-6 py-3 md:py-4 font-bold whitespace-nowrap text-center">Status Lahan</th>
                                <th className="px-4 md:px-6 py-3 md:py-4 font-bold whitespace-nowrap text-center">Skor CPI</th>
                                <th className="px-4 md:px-6 py-3 md:py-4 font-bold whitespace-nowrap text-center">Rekomendasi Intervensi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {geoData && geoData.features && geoData.features.length > 0 ? (
                                geoData.features.slice(0, 10).map((feature: any, idx: number) => (
                                    <tr key={idx} className="border-b border-gray-50 hover:bg-gray-50/50">
                                        <td className="px-4 md:px-6 py-4">{feature.properties?.kabupaten || '-'}</td>
                                        <td className="px-4 md:px-6 py-4">{feature.properties?.kecamatan || '-'}</td>
                                        <td className="px-4 md:px-6 py-4">{feature.properties?.desa || '-'}</td>
                                        <td className="px-4 md:px-6 py-4 text-center font-bold">
                                            {feature.properties?.status || feature.properties?.kriteria || '-'}
                                        </td>
                                        <td className="px-4 md:px-6 py-4 text-center text-[#185325] font-bold">
                                            {feature.properties?.cpi_score ? Number(feature.properties.cpi_score).toFixed(2) : '-'}
                                        </td>
                                        <td className="px-4 md:px-6 py-4 text-center text-[#185325] font-bold">
                                            -
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                                        Belum ada hasil analisis. Silakan unggah data GIS.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <InputDataModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={handleUploadSuccess}
            />
        </div>
    );
};

export default AnalisisLahanKritis;