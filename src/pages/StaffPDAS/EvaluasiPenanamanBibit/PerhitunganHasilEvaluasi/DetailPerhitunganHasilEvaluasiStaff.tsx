import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  HiOutlineChevronLeft, 
  HiOutlineMap,
  HiOutlineCheckBadge,
  HiOutlineInformationCircle,
  HiOutlineDocumentText
} from 'react-icons/hi2';
import toast from 'react-hot-toast';

const DetailPerhitunganHasilEvaluasiStaff: React.FC = () => {
  const navigate = useNavigate();
  const [isCalculating, setIsCalculating] = useState(false);
  const [hasCalculated, setHasCalculated] = useState(false);
  const [isLoadingMap, setIsLoadingMap] = useState(false);
  const [showMap, setShowMap] = useState(false);

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

  const [hasilIntegrasi, setHasilIntegrasi] = useState({
    persenTumbuhGlobal: '0.00',
    skorCPILingkungan: '0.00', // Diambil dari Modul Analisis CPI
    statusEvaluasiLahan: '-',  // Hasil gabungan persentase + CPI
    rekomendasiTindakLanjut: '' // Rekomendasi otomatis dari sistem
  });

  const hitungPersenPerPU = (rencana: number, tumbuh: number) => {
    if (rencana === 0) return "0.00";
    return ((tumbuh / rencana) * 100).toFixed(2);
  };

  const handleHitung = () => {
    setIsCalculating(true);
    const loading = toast.loading('Sistem sedang menghitung persentase, menarik skor CPI, dan merumuskan rekomendasi...');
    
    setTimeout(() => {
      // 1. Hitung rata-rata persen tumbuh dari semua PU
      let totalPersen = 0;
      dataPetakUkur.forEach(p => {
        totalPersen += parseFloat(hitungPersenPerPU(p.rencana, p.tumbuh));
      });
      const rataRataTumbuh = (totalPersen / dataPetakUkur.length).toFixed(2);

      // 2. Simulasi Sistem: "Menarik Skor CPI dari Modul Analisis CPI Berdasarkan Lokasi"
      // Dan "Menggabungkan Persentase Keberhasilan Tumbuh dengan Skor CPI"
      const mockSkorCPI = '3.45'; // Skala 1-4 (Kategori Prioritas Tinggi)
      
      // 3. Sistem "Mengklasifikasikan Status Evaluasi Lahan" & "Membuat Rekomendasi"
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

  // Alur AD 3: Mengklik tombol Lihat Peta
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
    toast.success('Hasil perhitungan, klasifikasi CPI, dan peta berhasil disetujui!');
    navigate(-1);
  };

  return (
    <div className="flex flex-col gap-6 w-full mx-auto pb-12">
      <button onClick={() => navigate(-1)} className="flex cursor-pointer items-center gap-2 text-sm font-bold text-primary hover:text-tertiary self-start transition-colors">
        <HiOutlineChevronLeft className="w-4 h-4" strokeWidth={2.5} /> Kembali
      </button>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-10">
        <div className="border-b border-gray-100 pb-6 mb-8">
          <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">Detail Perhitungan Hasil Evaluasi</h1>
          <div className="bg-[#f8fbf9] border border-[#DCECE0] rounded-xl p-5 text-sm text-gray-700 space-y-2">
            <p><span className="font-semibold text-gray-500 inline-block w-32">Program</span>: <span className="font-bold text-[#185325]">{infoTugas.namaProyek}</span></p>
            <p><span className="font-semibold text-gray-500 inline-block w-32">No. Penugasan</span>: <span className="font-bold">{infoTugas.noSurat}</span></p>
            <p><span className="font-semibold text-gray-500 inline-block w-32">Lokasi Lahan</span>: <span className="font-bold">{infoTugas.lokasi}</span></p>
          </div>
        </div>

        {/* 1. DATA DASAR PETAK UKUR */}
        <div className="mb-8">
          <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-4">1. Data Dasar Petak Ukur (Dataset Tervalidasi)</h3>
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
                  <th className="px-5 py-3">Bukti Foto</th>
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
                        <span className={`font-bold ${isLulus ? 'text-[#00A859]' : 'text-red-500'}`}>
                          {persen}%
                        </span>
                      </td>
                      <td className="px-5 py-3 text-center">{item.tinggi} cm</td>
                      <td className="px-5 py-3 text-xs text-gray-500 font-medium">{item.koordinat}</td>
                      <td className="px-5 py-3 text-xs text-gray-500 font-medium">-</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {!hasCalculated && (
          <div className="flex justify-center py-6">
            <button 
              onClick={handleHitung} 
              disabled={isCalculating}
              className="px-10 py-3.5 bg-[#185325] hover:bg-[#123d1c] text-white text-sm font-bold rounded-full transition-colors shadow-md flex items-center justify-center gap-2 disabled:opacity-75"
            >
              {isCalculating ? 'Mengkalkulasi & Mengintegrasikan CPI...' : 'Hitung Total Persentase Tumbuh Tanaman & Tarik Konteks Lingkungan'}
            </button>
          </div>
        )}

        {/* 2. HASIL INTEGRASI PERHITUNGAN DAN SKOR CPI */}
        {hasCalculated && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-8">
            <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider border-t border-gray-100 pt-8">
              2. Hasil Perhitungan & Konteks Lingkungan (CPI)
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-sm">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Total Persentase Tumbuh Tanaman</p>
                <p className="text-4xl font-bold text-primary">{hasilIntegrasi.persenTumbuhGlobal}%</p>
                <span className="mt-2 text-[10px] bg-green-50 text-primary px-2.5 py-1 rounded-md font-bold border border-green-100">MEMENUHI STANDAR</span>
              </div>

              <div className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-primary text-white text-[9px] font-bold px-2 py-0.5 rounded-bl-md uppercase tracking-wider">
                  Modul CPI Connected
                </div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Skor CPI Lingkungan</p>
                <p className="text-4xl font-bold text-primary">{hasilIntegrasi.skorCPILingkungan}</p>
                <span className="mt-2 text-[10px] bg-green-50 text-primary px-2.5 py-1 rounded-md font-bold border border-green-100 flex items-center gap-1">
                  <HiOutlineInformationCircle className="w-3.5 h-3.5" /> PRIORITAS KONSERVASI TINGGI
                </span>
              </div>

              <div className="bg-[#DCECE0] border border-[#185325]/20 rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-sm">
                <p className="text-xs font-bold text-[#3A4D3F] uppercase tracking-wider mb-2">Status Klasifikasi Lahan</p>
                <p className="text-xl font-bold text-[#185325] leading-tight uppercase">{hasilIntegrasi.statusEvaluasiLahan}</p>
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
              <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <HiOutlineDocumentText className="w-4 h-4 text-[#185325]" /> Rekomendasi Tindak Lanjut Sistem
              </h4>
              <p className="text-sm text-gray-600 leading-relaxed font-medium">
                {hasilIntegrasi.rekomendasiTindakLanjut}
              </p>
            </div>

            {!showMap && (
              <div className="flex justify-center">
                <button 
                  onClick={handleLihatPeta} 
                  disabled={isLoadingMap}
                  className="px-10 py-3.5 bg-primary hover:bg-tertiary text-white text-sm font-bold rounded-full transition-colors shadow-md flex items-center justify-center gap-2"
                >
                  <HiOutlineMap className={`w-5 h-5 ${isLoadingMap ? 'animate-spin' : ''}`} /> 
                  {isLoadingMap ? 'Memuat Komponen Spasial...' : 'Lihat Peta Spasial'}
                </button>
              </div>
            )}
            
            {showMap && (
              <div className="animate-in fade-in zoom-in-95 duration-700 space-y-6">
                <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider border-t border-gray-100 pt-8">
                  3. Visualisasi Spasial pada WebGIS
                </h3>

                <div className="bg-gray-100 rounded-2xl border border-gray-200 overflow-hidden relative h-100 flex items-center justify-center shadow-inner">
                  <img 
                    src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1200&auto=format&fit=crop" 
                    alt="Satelit WebGIS" 
                    className="absolute inset-0 w-full h-full object-cover opacity-80"
                  />
                  <div className="relative z-10 flex flex-col items-center bg-white/95 px-5 py-3 rounded-xl shadow-md border border-gray-100 max-w-sm text-center">
                    <HiOutlineMap className="w-8 h-8 text-[#185325] mb-2 animate-pulse" />
                    <span className="text-xs font-bold text-gray-800 mb-1">Layer WebGIS Terintegrasi Berhasil Dimuat</span>
                    <span className="text-[10px] text-gray-500">Menampilkan 4 Titik Geotagging PU Berkonteks Skor CPI Lahan</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-end gap-4 border-t border-gray-100 pt-6">
                  <button 
                    onClick={() => {
                      setHasCalculated(false);
                      setShowMap(false);
                    }} 
                    className="px-6 py-3.5 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 text-sm font-bold rounded-xl transition-colors"
                  >
                    Kalkulasi Ulang
                  </button>
                  <button 
                    onClick={handleSetujuiHasil} 
                    className="px-8 py-3.5 bg-[#185325] hover:bg-[#123d1c] text-white text-sm font-bold rounded-xl shadow-sm transition-colors flex items-center justify-center gap-2"
                  >
                    <HiOutlineCheckBadge className="w-5 h-5" /> Setujui Hasil & Peta Spasial
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default DetailPerhitunganHasilEvaluasiStaff;