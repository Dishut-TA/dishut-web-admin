import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  HiOutlineChevronLeft, 
  HiOutlineMap,
  HiOutlineCheckBadge,
  HiOutlineInformationCircle,
  HiOutlineDocumentText,
  HiOutlinePrinter
} from 'react-icons/hi2';
import toast from 'react-hot-toast';

const DetailPerhitunganHasilEvaluasiStaff: React.FC = () => {
  const navigate = useNavigate();
  
  // SIMULASI STATUS (Ubah ke 'SIAP DIHITUNG' atau 'HASIL TERVALIDASI' untuk test UI)
  const mockStatus: string = 'SIAP DIHITUNG'; 
  
  const [isCalculating, setIsCalculating] = useState(false);
  const [hasCalculated, setHasCalculated] = useState(mockStatus === 'HASIL TERVALIDASI');
  const [isLoadingMap, setIsLoadingMap] = useState(false);
  const [showMap, setShowMap] = useState(mockStatus === 'HASIL TERVALIDASI');

  const infoTugas = {
    noSurat: 'ST.76/TKTRH/RRPKH/DAS.04.03/B/03/2026',
    namaProyek: 'Rehabilitasi Lahan Kompensasi PT. Jawa Satu Power',
    lokasi: 'Hutan Lindung Desa Sudalarang, Kab. Garut',
  };

  const dataPetakUkur = [
    { pu: 'PU-1', rencana: 110, tumbuh: 108, tinggi: 123.2, koordinat: '-6.21, 106.82' },
    { pu: 'PU-2', rencana: 110, tumbuh: 100, tinggi: 120.5, koordinat: '-6.22, 106.83' },
    { pu: 'PU-3', rencana: 63, tumbuh: 60, tinggi: 115.0, koordinat: '-6.23, 106.84' },
    { pu: 'PU-4', rencana: 40, tumbuh: 28, tinggi: 110.0, koordinat: '-6.24, 106.85' }, 
  ];

  // State awal diset default, atau jika status tervalidasi, langsung terisi
  const [hasilIntegrasi, setHasilIntegrasi] = useState({
    persenTumbuhGlobal: mockStatus === 'HASIL TERVALIDASI' ? '91.65' : '0.00',
    skorCPILingkungan: mockStatus === 'HASIL TERVALIDASI' ? '3.45' : '0.00',
    statusEvaluasiLahan: mockStatus === 'HASIL TERVALIDASI' ? 'BERHASIL - PRIORITAS PEMELIHARAAN TINGGI' : '-',
    rekomendasiTindakLanjut: mockStatus === 'HASIL TERVALIDASI' ? 'Kondisi tanaman tumbuh sangat baik (91.65%), namun karena berada di zona dengan Skor CPI Tinggi (3.45), lahan ini memerlukan intervensi pemeliharaan ketat.' : ''
  });

  const hitungPersenPerPU = (rencana: number, tumbuh: number) => {
    if (rencana === 0) return "0.00";
    return ((tumbuh / rencana) * 100).toFixed(2);
  };

  const handleHitung = () => {
    setIsCalculating(true);
    const loading = toast.loading('Sistem sedang menghitung persentase, menarik skor CPI, dan merumuskan rekomendasi...');
    
    setTimeout(() => {
      let totalPersen = 0;
      dataPetakUkur.forEach(p => {
        totalPersen += parseFloat(hitungPersenPerPU(p.rencana, p.tumbuh));
      });
      const rataRataTumbuh = (totalPersen / dataPetakUkur.length).toFixed(2);
      const mockSkorCPI = '3.45'; 
      const statusLahan = 'BERHASIL - PRIORITAS PEMELIHARAAN TINGGI';
      const rekomendasi = 'Kondisi tanaman tumbuh sangat baik (91.65%), namun karena berada di zona dengan Skor CPI Tinggi (3.45), lahan ini memerlukan intervensi pemeliharaan ketat, pengayaan jenis vegetasi endemik, serta monitoring berkala untuk mencegah degradasi kembali.';

      setHasilIntegrasi({
        persenTumbuhGlobal: rataRataTumbuh,
        skorCPILingkungan: mockSkorCPI,
        statusEvaluasiLahan: statusLahan,
        rekomendasiTindakLanjut: rekomendasi
      });

      setIsCalculating(false);
      setHasCalculated(true);
      toast.success('Perhitungan & Integrasi Konteks Lingkungan CPI Berhasil!', { id: loading });
    }, 2000);
  };

  const handleLihatPeta = () => {
    setIsLoadingMap(true);
    const loading = toast.loading('Memuat visualisasi spasial pada WebGIS...');
    setTimeout(() => {
      setIsLoadingMap(false);
      setShowMap(true);
      toast.success('Visualisasi Spasial Berhasil Dimuat!', { id: loading });
    }, 1500);
  };

  const handleSetujuiHasil = () => {
    toast.success('Hasil evaluasi berhasil divalidasi!');
    navigate(-1);
  };

  // --- KOMPONEN BLOK YANG BISA DIGUNAKAN ULANG ---

  // Blok 1: Tabel Data Dasar
  const TableDataPetakUkur = () => (
    <div className="mb-8">
      <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-4 flex items-center gap-2">
        <HiOutlineDocumentText className="w-5 h-5 text-[#185325]" />
        {mockStatus === 'HASIL TERVALIDASI' ? 'Lampiran Data Petak Ukur' : '1. Data Dasar Petak Ukur (Dataset)'}
      </h3>
      <div className="overflow-x-auto border border-gray-200 rounded-xl">
        <table className="w-full text-sm text-left whitespace-nowrap">
          <thead className="bg-gray-50 text-gray-600 font-semibold border-b border-gray-200">
            <tr>
              <th className="px-5 py-3">Petak Ukur</th>
              <th className="px-5 py-3 text-center">Rencana (P0)</th>
              <th className="px-5 py-3 text-center">Tumbuh</th>
              <th className="px-5 py-3 text-center border-x border-gray-200">% Tumbuh PU</th>
              <th className="px-5 py-3 text-center">Rata-rata Tinggi</th>
              <th className="px-5 py-3">Koordinat GPS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {dataPetakUkur.map((item, idx) => {
              const persen = hitungPersenPerPU(item.rencana, item.tumbuh);
              const isLulus = parseFloat(persen) >= 75;
              return (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-5 py-3 font-bold text-[#185325]">{item.pu}</td>
                  <td className="px-5 py-3 text-center">{item.rencana}</td>
                  <td className="px-5 py-3 text-center">{item.tumbuh}</td>
                  <td className="px-5 py-3 text-center border-x border-gray-100 bg-gray-50/50">
                    <span className={`font-bold ${isLulus ? 'text-[#00A859]' : 'text-red-500'}`}>{persen}%</span>
                  </td>
                  <td className="px-5 py-3 text-center">{item.tinggi} cm</td>
                  <td className="px-5 py-3 text-xs text-gray-500 font-medium">{item.koordinat}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );

  // Blok 2: Dashboard Hasil Integrasi CPI
  const DashboardHasil = () => (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-6 mb-8">
      <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider border-t border-gray-100 pt-8">
        {mockStatus === 'HASIL TERVALIDASI' ? 'Ringkasan Hasil Evaluasi & Konteks Lingkungan' : '2. Hasil Perhitungan & Konteks Lingkungan (CPI)'}
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-sm">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Total Tumbuh Tanaman</p>
          <p className="text-4xl font-bold text-[#185325]">{hasilIntegrasi.persenTumbuhGlobal}%</p>
          <span className="mt-2 text-[10px] bg-green-50 text-[#185325] px-2.5 py-1 rounded-md font-bold border border-green-100">MEMENUHI STANDAR</span>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-blue-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-bl-md uppercase tracking-wider">
            WebGIS Connected
          </div>
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Skor CPI Lingkungan</p>
          <p className="text-4xl font-bold text-blue-600">{hasilIntegrasi.skorCPILingkungan}</p>
          <span className="mt-2 text-[10px] bg-blue-50 text-blue-700 px-2.5 py-1 rounded-md font-bold border border-blue-100 flex items-center gap-1">
            <HiOutlineInformationCircle className="w-3.5 h-3.5" /> PRIORITAS TINGGI
          </span>
        </div>

        <div className="bg-[#DCECE0] border border-[#185325]/20 rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-sm">
          <p className="text-xs font-bold text-[#3A4D3F] uppercase tracking-wider mb-2">Status Lahan</p>
          <p className="text-lg font-bold text-[#185325] leading-tight uppercase">{hasilIntegrasi.statusEvaluasiLahan}</p>
        </div>
      </div>

      <div className="bg-orange-50 border border-orange-100 rounded-2xl p-6 flex items-start gap-4">
        <HiOutlineInformationCircle className="w-6 h-6 text-orange-600 shrink-0 mt-0.5" />
        <div>
          <h4 className="text-xs font-bold text-orange-800 uppercase tracking-wider mb-1">
            Rekomendasi Tindak Lanjut Berbasis CPI
          </h4>
          <p className="text-sm text-orange-700 leading-relaxed font-medium">
            {hasilIntegrasi.rekomendasiTindakLanjut}
          </p>
        </div>
      </div>
    </div>
  );

  // Blok 3: Peta Spasial
  const PetaSpasial = () => (
    <div className="animate-in fade-in zoom-in-95 duration-700 space-y-6 mb-8">
      <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider">
        {mockStatus === 'HASIL TERVALIDASI' ? 'Peta WebGIS Terintegrasi' : '3. Visualisasi Spasial pada WebGIS'}
      </h3>
      <div className="bg-gray-100 rounded-2xl border border-gray-200 overflow-hidden relative h-96 flex items-center justify-center shadow-inner">
        <img 
          src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1200&auto=format&fit=crop" 
          alt="Satelit WebGIS" 
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
        <div className="relative z-10 flex flex-col items-center bg-white/95 px-5 py-4 rounded-xl shadow-md border border-gray-100 max-w-sm text-center">
          <HiOutlineMap className="w-8 h-8 text-[#185325] mb-2 animate-pulse" />
          <span className="text-sm font-bold text-gray-800 mb-1">Layer WebGIS Terintegrasi</span>
          <span className="text-xs text-gray-500">Menampilkan 4 Titik Geotagging Berkonteks CPI Lahan</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-6 w-full mx-auto pb-12">
      <button onClick={() => navigate(-1)} className="flex cursor-pointer items-center gap-2 text-sm font-bold text-gray-600 hover:text-gray-900 self-start transition-colors">
        <HiOutlineChevronLeft className="w-4 h-4" strokeWidth={2.5} /> Kembali ke Daftar
      </button>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-10">
        
        {/* HEADER AREA */}
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
            
            <div className="bg-[#f8fbf9] border border-[#DCECE0] rounded-xl p-5 text-sm text-gray-700 space-y-2 max-w-3xl">
              <p><span className="font-semibold text-gray-500 inline-block w-32">Program</span>: <span className="font-bold text-[#185325]">{infoTugas.namaProyek}</span></p>
              <p><span className="font-semibold text-gray-500 inline-block w-32">No. Penugasan</span>: <span className="font-bold">{infoTugas.noSurat}</span></p>
              <p><span className="font-semibold text-gray-500 inline-block w-32">Lokasi Lahan</span>: <span className="font-bold">{infoTugas.lokasi}</span></p>
            </div>
          </div>

          {/* Tombol Cetak (Hanya muncul jika sudah tervalidasi) */}
          {mockStatus === 'HASIL TERVALIDASI' && (
            <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-300 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm shrink-0">
              <HiOutlinePrinter className="w-5 h-5" /> Cetak Laporan
            </button>
          )}
        </div>

        {/* ======================================================== */}
        {/* LOGIKA CONDITIONAL RENDERING BERDASARKAN STATUS          */}
        {/* ======================================================== */}

        {mockStatus === 'SIAP DIHITUNG' ? (
          <>
            <TableDataPetakUkur />
            
            {!hasCalculated && (
              <div className="flex justify-center py-6">
                <button onClick={handleHitung} disabled={isCalculating} className="px-10 py-4 bg-[#185325] hover:bg-[#123d1c] text-white text-sm font-bold rounded-full transition-colors shadow-md flex items-center justify-center gap-2 disabled:opacity-75">
                  {isCalculating ? 'Mengkalkulasi...' : 'Hitung Persentase & Integrasikan CPI'}
                </button>
              </div>
            )}

            {hasCalculated && (
              <>
                <DashboardHasil />
                
                {!showMap ? (
                  <div className="flex justify-center mb-8">
                    <button onClick={handleLihatPeta} disabled={isLoadingMap} className="px-10 py-3.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-full transition-colors shadow-md flex items-center justify-center gap-2">
                      <HiOutlineMap className={`w-5 h-5 ${isLoadingMap ? 'animate-spin' : ''}`} /> 
                      {isLoadingMap ? 'Memuat WebGIS...' : 'Lihat Analisis Peta Spasial'}
                    </button>
                  </div>
                ) : (
                  <>
                    <PetaSpasial />
                    <div className="flex justify-end gap-4 border-t border-gray-100 pt-6">
                      <button onClick={() => { setHasCalculated(false); setShowMap(false); }} className="px-6 py-3.5 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 text-sm font-bold rounded-xl transition-colors">
                        Kalkulasi Ulang
                      </button>
                      <button onClick={handleSetujuiHasil} className="px-8 py-3.5 bg-[#185325] hover:bg-[#123d1c] text-white text-sm font-bold rounded-xl shadow-sm transition-colors flex items-center gap-2">
                        <HiOutlineCheckBadge className="w-5 h-5" /> Validasi & Setujui Evaluasi
                      </button>
                    </div>
                  </>
                )}
              </>
            )}
          </>
        ) : (
          /* JIKA STATUSNYA: HASIL TERVALIDASI (Urutan Dibalik) */
          <>
            <DashboardHasil />
            <PetaSpasial />
            <TableDataPetakUkur />
          </>
        )}

      </div>
    </div>
  );
};

export default DetailPerhitunganHasilEvaluasiStaff;