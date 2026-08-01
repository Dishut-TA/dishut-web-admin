import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  HiOutlineChevronLeft, 
  HiOutlineCheckBadge,
  HiOutlineDocumentText,
  HiOutlineArrowRight
} from 'react-icons/hi2';
import toast from 'react-hot-toast';
import type { PetakUkur } from './types';
import DashboardHasilDanPeta from './components/DashboardHasilDanPeta';
import TableDataPetakUkur from './components/TableDataPetakUkur';

const DetailPerhitunganHasilEvaluasiStaff: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const mockStatus: string = 'SIAP DIHITUNG'; 
  
  const [isCalculating, setIsCalculating] = useState(false);
  const [hasCalculated, setHasCalculated] = useState(mockStatus === 'HASIL TERVALIDASI');

  const infoTugas = {
    noSurat: 'ST.76/TKTRH/RRPKH/DAS.04.03/B/03/2026',
    namaProyek: 'Rehabilitasi Lahan Kompensasi PT. Jawa Satu Power',
    lokasi: 'Hutan Lindung Desa Sudalarang, Kab. Garut',
    periode: 'Pemeliharaan II (P2)'
  };

  const [dataPetakUkur, setDataPetakUkur] = useState<PetakUkur[]>([
    { pu: 'PU-1', rencana: 110, tumbuh: 108, tinggi: 123.2, koordinat: '-6.21, 106.82', kondisiLahan: 'Baik / Normal' },
    { pu: 'PU-2', rencana: 110, tumbuh: 100, tinggi: 120.5, koordinat: '-6.22, 106.83', kondisiLahan: 'Baik / Normal' },
    { pu: 'PU-3', rencana: 63, tumbuh: 60, tinggi: 115.0, koordinat: '-6.23, 106.84', kondisiLahan: 'Baik / Normal' },
    { pu: 'PU-4', rencana: 40, tumbuh: 28, tinggi: 110.0, koordinat: '-6.24, 106.85', kondisiLahan: 'Banyak Gulma' },
  ]);

  const [hasilIntegrasi, setHasilIntegrasi] = useState({
    persenTumbuhGlobal: mockStatus === 'HASIL TERVALIDASI' ? '91.65' : '0.00',
    skorCPILingkungan: mockStatus === 'HASIL TERVALIDASI' ? '3.45' : '0.00',
    statusEvaluasiLahan: mockStatus === 'HASIL TERVALIDASI' ? 'BERHASIL - PRIORITAS PEMELIHARAAN TINGGI' : '-',
    rekomendasiTindakLanjut: mockStatus === 'HASIL TERVALIDASI' ? 'Kondisi tanaman tumbuh sangat baik (91.65%), namun karena berada di zona dengan Skor CPI Tinggi (3.45), lahan ini memerlukan intervensi pemeliharaan ketat.' : ''
  });

  const handleEdit = <K extends keyof PetakUkur>(index: number, field: K, value: PetakUkur[K]) => {
    const newData = [...dataPetakUkur];
    newData[index][field] = value;
    setDataPetakUkur(newData);
  };

  const handleGetLocation = (idx: number) => {
    if (!navigator.geolocation) {
      toast.error('Browser atau perangkat ini tidak mendukung fitur GPS.');
      return;
    }

    const loadingToast = toast.loading('Sedang mencari titik koordinat...');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude.toFixed(6);
        const lng = position.coords.longitude.toFixed(6);
        handleEdit(idx, 'koordinat', `${lat}, ${lng}`);
        toast.success('Titik koordinat berhasil diperbarui!', { id: loadingToast });
      },
      (error) => {
        console.error("Error GPS:", error);
        toast.error('Gagal mendapatkan lokasi. Pastikan GPS aktif.', { id: loadingToast });
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const hitungPersenPerPU = (rencana: number, tumbuh: number) => {
    if (rencana === 0) return "0.00";
    return ((tumbuh / rencana) * 100).toFixed(2);
  };

  const handleHitungDanMuatPeta = () => {
    setIsCalculating(true);
    const loading = toast.loading('Mengkalkulasi persentase tumbuh dari data terbaru & Menarik visualisasi spasial WebGIS...');
    
    setTimeout(() => {
      let totalPersen = 0;
      dataPetakUkur.forEach(p => {
        totalPersen += parseFloat(hitungPersenPerPU(p.rencana, p.tumbuh));
      });
      const rataRataTumbuh = (totalPersen / dataPetakUkur.length).toFixed(2);
      
      setHasilIntegrasi({
        persenTumbuhGlobal: rataRataTumbuh,
        skorCPILingkungan: '3.45',
        statusEvaluasiLahan: parseFloat(rataRataTumbuh) >= 75 ? 'BERHASIL - PRIORITAS PEMELIHARAAN TINGGI' : 'TIDAK BERHASIL - BUTUH PENYULAMAN',
        rekomendasiTindakLanjut: `Kondisi tanaman tumbuh (${rataRataTumbuh}%), namun karena berada di zona dengan Skor CPI Tinggi (3.45), lahan ini memerlukan intervensi pemeliharaan ketat.`
      });

      setIsCalculating(false);
      setHasCalculated(true);
      toast.success('Kalkulasi & Visualisasi Spasial Berhasil Dimuat!', { id: loading });
    }, 2500);
  };

  const handleSetujuiHasil = () => {
    toast.success('Data Perhitungan Tervalidasi! Silakan susun Berita Acara Laporan.');
    navigate('/admin/staff/evaluasi/laporan'); 
  };

  return (
    <div className="flex flex-col gap-6 w-full mx-auto pb-12 animate-in fade-in duration-300">
      <button onClick={() => navigate(-1)} className="flex cursor-pointer items-center gap-2 text-sm font-bold text-gray-600 hover:text-gray-900 self-start transition-colors">
        <HiOutlineChevronLeft className="w-4 h-4 stroke-2" /> Kembali ke Daftar Perhitungan
      </button>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-10">
        <div className="border-b border-gray-100 pb-6 mb-8 flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <h1 className="text-xl md:text-2xl font-bold text-gray-800">Detail Perhitungan Evaluasi</h1>
              {mockStatus === 'HASIL TERVALIDASI' && (
                <span className="bg-emerald-100 text-emerald-800 border border-emerald-200 px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider flex items-center gap-1">
                  <HiOutlineCheckBadge className="w-4 h-4" /> Hasil Tervalidasi
                </span>
              )}
            </div>
            
            <div className="bg-[#f8fbf9] border border-[#DCECE0] rounded-xl p-5 text-sm text-gray-700 space-y-2 max-w-3xl relative overflow-hidden">
              <HiOutlineDocumentText className="absolute -right-4 -bottom-4 w-24 h-24 text-[#185325] opacity-5" />
              <p><span className="font-semibold text-gray-500 inline-block w-32">Program</span>: <span className="font-bold text-[#185325]">{infoTugas.namaProyek}</span></p>
              <p><span className="font-semibold text-gray-500 inline-block w-32">No. Penugasan</span>: <span className="font-bold">{infoTugas.noSurat}</span></p>
              <p><span className="font-semibold text-gray-500 inline-block w-32">Periode</span>: <span className="font-bold">{infoTugas.periode}</span></p>
              <p><span className="font-semibold text-gray-500 inline-block w-32">Lokasi Lahan</span>: <span className="font-bold">{infoTugas.lokasi}</span></p>
            </div>
          </div>

          {mockStatus === 'HASIL TERVALIDASI' && (
            <button 
              onClick={() => navigate(`/admin/staff/evaluasi/laporan/create/${id || 'EVAL-002'}`)}
              className="flex items-center gap-2 px-6 py-3 bg-[#185325] text-white rounded-full text-sm font-bold hover:bg-[#123d1c] transition-colors shadow-sm shrink-0 active:scale-95"
            >
              Lanjut Susun Laporan <HiOutlineArrowRight className="w-4 h-4 stroke-2" />
            </button>
          )}
        </div>

        {mockStatus === 'SIAP DIHITUNG' ? (
          <>
            <TableDataPetakUkur 
              mockStatus={mockStatus}
              hasCalculated={hasCalculated}
              dataPetakUkur={dataPetakUkur}
              handleEdit={handleEdit}
              handleGetLocation={handleGetLocation}
              hitungPersenPerPU={hitungPersenPerPU}
            />
            
            {!hasCalculated ? (
              <div className="flex justify-end py-4 border-t border-gray-100">
                <button 
                  onClick={handleHitungDanMuatPeta} 
                  disabled={isCalculating} 
                  className="px-8 py-3.5 bg-[#185325] hover:bg-[#123d1c] text-white text-sm font-bold rounded-full transition-colors shadow-md flex items-center justify-center gap-2 disabled:opacity-75 active:scale-95"
                >
                  {isCalculating ? 'Memproses Data & Peta...' : 'Simpan, Hitung & Tampilkan WebGIS'}
                </button>
              </div>
            ) : (
              <>
                <DashboardHasilDanPeta mockStatus={mockStatus} hasilIntegrasi={hasilIntegrasi} />
                
                <div className="flex justify-end gap-4 border-t border-gray-100 pt-6">
                  <button 
                    onClick={() => setHasCalculated(false)} 
                    className="px-6 py-3.5 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 text-sm font-bold rounded-full transition-colors"
                  >
                    Edit Data & Kalkulasi Ulang
                  </button>
                  
                  <button 
                    onClick={handleSetujuiHasil} 
                    className="px-8 py-3.5 bg-[#185325] hover:bg-[#123d1c] text-white text-sm font-bold rounded-full shadow-sm transition-colors flex items-center gap-2 active:scale-95"
                  >
                    <HiOutlineCheckBadge className="w-5 h-5" /> Validasi & Lanjut Buat Laporan
                  </button>
                </div>
              </>
            )}
          </>
        ) : (
          <>
            <DashboardHasilDanPeta mockStatus={mockStatus} hasilIntegrasi={hasilIntegrasi} />
            <TableDataPetakUkur 
              mockStatus={mockStatus}
              hasCalculated={hasCalculated}
              dataPetakUkur={dataPetakUkur}
              handleEdit={handleEdit}
              handleGetLocation={handleGetLocation}
              hitungPersenPerPU={hitungPersenPerPU}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default DetailPerhitunganHasilEvaluasiStaff;