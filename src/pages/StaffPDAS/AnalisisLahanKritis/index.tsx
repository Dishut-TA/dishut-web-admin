import { useState } from 'react';
import { HiOutlineDocumentPlus, HiOutlineMap } from 'react-icons/hi2';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; 
import InputDataModal from './components/InputDataModal';

const API_URL = import.meta.env.VITE_API_MASTER_URL || "http://127.0.0.1:8000/api";

const AnalisisLahanKritis = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [geoData, setGeoData] = useState<any>(null);
    const [tableData, setTableData] = useState<any[]>([]);
    const [isLoadingData, setIsLoadingData] = useState(false);

    const handleUploadSuccess = async (responseData: any) => {
        console.log("Upload berhasil! Data API:", responseData);
        
        const projectId = responseData?.data?.id;
        const token = localStorage.getItem("token");

        if (!projectId || !token) return;

        setIsLoadingData(true);

        try {
            const tableRes = await fetch(`${API_URL}/projects/${projectId}/table`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const tableJson = await tableRes.json();
            setTableData(tableJson.data || []);

            const mapRes = await fetch(`${API_URL}/projects/${projectId}/map`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const mapJson = await mapRes.json();

            // Sesuai dengan controller Anda, kadang kembaliannya langsung GeoJSON, 
            // kadang bentuk url { geojson_url: "..." }
            if (mapJson.type === "FeatureCollection") {
                setGeoData(mapJson);
            } else if (mapJson.geojson_url) {
                const directGeoRes = await fetch(mapJson.geojson_url);
                const directGeoJson = await directGeoRes.json();
                setGeoData(directGeoJson);
            }
            
        } catch (error) {
            console.error("Gagal menarik data hasil analisis dari server:", error);
        } finally {
            setIsLoadingData(false);
        }
    };

    const getFeatureStyle = (feature: any) => {
        const status = feature.properties?.status_lahan_kritis?.toLowerCase() || feature.properties?.status?.toLowerCase() || '';
        
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
                    {isLoadingData ? (
                        <div className="flex flex-col items-center text-[#185325]">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#185325] mb-3"></div>
                            <span className="font-bold">Merender Peta Spasial...</span>
                        </div>
                    ) : geoData ? (
                        <MapContainer 
                            center={[-6.9204, 107.6046]} 
                            zoom={10}
                            style={{ height: '100%', width: '100%' }}
                        >
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <GeoJSON 
                                key={geoData.projectId}
                                data={geoData} 
                                style={getFeatureStyle}
                                onEachFeature={(feature, layer) => {
                                    const namaDesa = feature.properties?.desa_kelurahan || feature.properties?.desa || 'Tidak Diketahui';
                                    const status = feature.properties?.status_lahan_kritis || feature.properties?.status || 'Tidak Diketahui';
                                    const skor = feature.properties?.skor_cpi_rata2 ? Number(feature.properties.skor_cpi_rata2).toFixed(2) : '-';
                                    
                                    layer.bindPopup(
                                        `<strong>Desa:</strong> ${namaDesa}<br/>
                                         <strong>Status Lahan:</strong> ${status}<br/>
                                         <strong>Skor CPI:</strong> ${skor}`
                                    );
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

            {/* TABEL DATA ZONAL STATISTICS */}
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
                            {tableData && tableData.length > 0 ? (
                                tableData.map((row: any, idx: number) => (
                                    <tr key={idx} className="border-b border-gray-50 hover:bg-gray-50/50">
                                        <td className="px-4 md:px-6 py-4">{row.kota_kabupaten || row.kabupaten || '-'}</td>
                                        <td className="px-4 md:px-6 py-4">{row.kecamatan || '-'}</td>
                                        <td className="px-4 md:px-6 py-4">{row.desa_kelurahan || row.desa || '-'}</td>
                                        <td className="px-4 md:px-6 py-4 text-center font-bold">
                                            {row.status_lahan_kritis || '-'}
                                        </td>
                                        <td className="px-4 md:px-6 py-4 text-center text-[#185325] font-bold">
                                            {row.skor_cpi_rata2 ? Number(row.skor_cpi_rata2).toFixed(2) : '-'}
                                        </td>
                                        <td className="px-4 md:px-6 py-4 text-center text-[#185325] font-bold">
                                            {row.rekomendasi_intervensi || '-'}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                                        Belum ada hasil analisis zonal. Silakan unggah data GIS.
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