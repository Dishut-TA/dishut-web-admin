import React, { useState } from 'react';
import type { CPIDataRow } from './types';
import MapSection from './components/MapSection';
import CPITable from './components/CPITable';
import InputDataModal from './components/InputDataModal';
import DetailVerifikasiModal from './components/DetailVerifikasiModal';

const API_URL = import.meta.env.VITE_API_MASTER_URL || "http://127.0.0.1:8000/api";

const AnalisisLahanKritis: React.FC = () => {
  const [isInputModalOpen, setIsInputModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<CPIDataRow | null>(null);
  const [petaFilter, setPetaFilter] = useState('Keseluruhan');
  const [geoData, setGeoData] = useState<any>(null);
  const [tableData, setTableData] = useState<CPIDataRow[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(false);

  const handleUploadSuccess = async (responseData: any) => {
    const projectId = responseData?.data?.id;
    const token = localStorage.getItem("token");
    if (!projectId || !token) return;

    setIsLoadingData(true);
    try {
      const tableRes = await fetch(`${API_URL}/projects/${projectId}/table`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const tableJson = await tableRes.json();
      
      // Mapping respons API ke interface CPIDataRow
      const mappedTableData: CPIDataRow[] = (tableJson.data || []).map((row: any, idx: number) => ({
        id: idx,
        kabupaten: row.kota_kabupaten || row.kabupaten || '-',
        kecamatan: row.kecamatan || '-',
        desa: row.desa_kelurahan || row.desa || '-',
        statusKekritisan: row.status_lahan_kritis || '-',
        skorCPI: row.skor_cpi_rata2 ? Number(row.skor_cpi_rata2).toFixed(2) : '-',
        rekomendasi: row.rekomendasi_intervensi || '-',
        statusKelayakan: idx % 2 === 0 ? '-' : 'Layak', // Mock data kelayakan (sesuaikan dgn API asli nanti)
      }));
      setTableData(mappedTableData);

      const mapRes = await fetch(`${API_URL}/projects/${projectId}/map`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const mapJson = await mapRes.json();

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

  const handleViewDetail = (row: CPIDataRow) => {
    setSelectedRow(row);
    setIsDetailModalOpen(true);
  };

  return (
    <div className="flex flex-col w-full max-w-screen-2xl mx-auto animate-in fade-in duration-300">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <h1 className="text-xl md:text-2xl font-bold text-gray-800">
          Analisis Conservation Priority Index (CPI)
        </h1>
        <div className="flex items-center gap-3">
          <label className="text-xs font-bold text-gray-700">Pilih Peta</label>
          <select 
            value={petaFilter}
            onChange={(e) => setPetaFilter(e.target.value)}
            className="bg-white border border-gray-300 text-gray-700 text-xs rounded-lg focus:ring-[#185325] focus:border-[#185325] block px-4 py-2 outline-none cursor-pointer shadow-sm min-w-37.5"
          >
            <option value="Keseluruhan">Keseluruhan</option>
            <option value="Prioritas">Prioritas</option>
          </select>
        </div>
      </div>

      <MapSection 
        geoData={geoData} 
        isLoading={isLoadingData} 
        onOpenInputModal={() => setIsInputModalOpen(true)} 
      />

      <CPITable 
        data={tableData} 
        onViewDetail={handleViewDetail} 
      />

      <InputDataModal
        isOpen={isInputModalOpen}
        onClose={() => setIsInputModalOpen(false)}
        onSuccess={handleUploadSuccess}
      />

      <DetailVerifikasiModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        data={selectedRow}
      />

    </div>
  );
};

export default AnalisisLahanKritis;