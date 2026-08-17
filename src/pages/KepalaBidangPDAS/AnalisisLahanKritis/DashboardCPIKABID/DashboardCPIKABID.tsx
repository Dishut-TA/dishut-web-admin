import React, { useState, useEffect } from 'react';
import type { SummaryStats, CPIDataRow } from './types';
import DashboardHeader from './components/DashboardHeader';
import SummaryCards from './components/SummaryCards';
import MapSection from './components/MapSection';
import CPITable from './components/CPITable';
import * as turf from '@turf/turf'; 

const API_URL = "http://127.0.0.1:8000/api";

const DashboardCPIKABID: React.FC = () => {
  const [periode, setPeriode] = useState<string>('2021-2026');
  const [projectId, setProjectId] = useState<number | null>(null);
  const [stats, setStats] = useState<SummaryStats | null>(null);
  const [tableData, setTableData] = useState<CPIDataRow[]>([]);
  const [geoData, setGeoData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchInitialProject = async () => {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      const headers: Record<string, string> = {};
      if (token) headers['Authorization'] = `Bearer ${token}`;

      try {
        const res = await fetch(`${API_URL}/projects?status=completed&per_page=1`, { headers });
        const json = await res.json();
        
        const projectData = json.payload || json.data || [];
        
        if (projectData.length > 0) {
          setProjectId(projectData[0].id);
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Gagal memuat project awal:", error);
        setIsLoading(false);
      }
    };
    fetchInitialProject();
  }, [periode]);

  useEffect(() => {
    if (!projectId) return;

    const fetchDashboardData = async () => {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      const headers: Record<string, string> = {};
      if (token) headers['Authorization'] = `Bearer ${token}`;

      try {
        const [resultRes, tableRes, mapRes] = await Promise.all([
          fetch(`${API_URL}/projects/${projectId}/result`, { headers }).catch(() => null),
          fetch(`${API_URL}/projects/${projectId}/table`, { headers }),
          fetch(`${API_URL}/projects/${projectId}/map`, { headers })
        ]);

        const tableJson = await tableRes.json();
        const mapJson = await mapRes.json();
        let resultJson = null;
        if (resultRes && resultRes.ok) resultJson = await resultRes.json();

        const rawTableRows = tableJson.payload || tableJson.data || [];
        const mappedTable = rawTableRows.map((row: any, idx: number) => ({
          id: row.zone_id || idx.toString(),
          kabupaten: row.kota_kabupaten || row.kabupaten || '-',
          kecamatan: row.kecamatan || '-',
          desa: row.desa_kelurahan || row.desa || '-',
          statusLahan: row.status_lahan_kritis || row.status || '-',
          skorCPI: row.skor_cpi_rata2 ? Number(row.skor_cpi_rata2).toFixed(2) : (row.skor_cpi ? Number(row.skor_cpi).toFixed(2) : '-'),
          rekomendasi: row.rekomendasi_intervensi || '-',
          statusVerifikasi: row.status_verifikasi || 'Menunggu Verifikasi',
        }));
        setTableData(mappedTable);

        let finalGeoData = null;
        if (mapJson.type === "FeatureCollection") {
          finalGeoData = mapJson;
        } else if (mapJson.geojson_url) {
          const directGeoRes = await fetch(mapJson.geojson_url);
          finalGeoData = await directGeoRes.json();
        } else if (mapJson.payload && mapJson.payload.geojson_url) {
          const directGeoRes = await fetch(mapJson.payload.geojson_url);
          finalGeoData = await directGeoRes.json();
        }
        setGeoData(finalGeoData);

        let calcTotalArea = 0;
        let calcKritisArea = 0;
        let calcSangatKritisArea = 0;

        if (finalGeoData && finalGeoData.features) {
          finalGeoData.features.forEach((feat: any) => {
             // Coba ambil dari properti, jika kosong/strip (-), hitung manual
             let areaHa = feat.properties?.luas_ha || feat.properties?.luas;
             
             if (!areaHa || areaHa === '-') {
                try {
                   // Turf menghitung dalam meter persegi, dibagi 10.000 untuk konversi ke Hektare
                   areaHa = turf.area(feat) / 10000; 
                } catch(e) {
                   areaHa = 0;
                }
             }
             
             const areaVal = Number(areaHa) || 0;
             calcTotalArea += areaVal;

             const status = (feat.properties?.status_lahan_kritis || feat.properties?.status || '').toLowerCase();
             if (status.includes('sangat kritis')) {
                 calcSangatKritisArea += areaVal;
             } else if (status.includes('kritis')) {
                 calcKritisArea += areaVal;
             }
          });
        }

        // Helper untuk format angka dengan pemisah ribuan
        const formatArea = (val: number) => {
            return val > 0 ? new Intl.NumberFormat('id-ID', { maximumFractionDigits: 2 }).format(val) : '0';
        };

        // --- MAPPING SUMMARY STATS ---
        const resultPayload = resultJson?.payload || resultJson?.data || resultJson?.hasil || {};
        
        // Sekarang memprioritaskan hasil kalkulasi Turf.js jika API tidak menyediakan field total area
        setStats({
          totalLuas: `${resultPayload.total_area || formatArea(calcTotalArea)} Ha`,
          totalKritis: `${resultPayload.total_kritis || formatArea(calcKritisArea)} Ha`,
          totalSangatKritis: `${resultPayload.total_sangat_kritis || formatArea(calcSangatKritisArea)} Ha`,
          totalWilayahPrioritas: resultPayload.zone_count || rawTableRows.length || (finalGeoData?.features?.length || 0),
          luasWilayahPrioritas: `${resultPayload.priority_area || formatArea(calcTotalArea)} Ha`,
          analisisTerakhir: resultPayload.updated_at ? new Date(resultPayload.updated_at).toLocaleDateString('id-ID') : new Date().toLocaleDateString('id-ID'),
        });

      } catch (error) {
        console.error("Gagal menarik data dashboard:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [projectId]);

  const handleApprove = (id: string) => {
    console.log('Kirim request approval untuk zone ID:', id);
  };

  return (
    <div className="w-full max-w-screen-2xl mx-auto animate-in fade-in duration-500">
      <DashboardHeader periode={periode} setPeriode={setPeriode} />
      
      {isLoading ? (
        <div className="flex flex-col items-center justify-center h-64 text-[#185325]">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#185325] mb-4"></div>
          <p className="font-bold">Memuat Data Dashboard KABID...</p>
        </div>
      ) : (
        <>
          {stats && <SummaryCards stats={stats} />}
          <MapSection geoData={geoData} />
          <CPITable data={tableData} onApprove={handleApprove} />
        </>
      )}
    </div>
  );
};

export default DashboardCPIKABID;