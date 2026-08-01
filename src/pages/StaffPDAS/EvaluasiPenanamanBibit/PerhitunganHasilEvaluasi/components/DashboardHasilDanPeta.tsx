import React from 'react';
import { HiOutlineInformationCircle, HiOutlineMap } from 'react-icons/hi2';

interface DashboardHasilDanPetaProps {
  mockStatus: string;
  hasilIntegrasi: {
    persenTumbuhGlobal: string;
    skorCPILingkungan: string;
    statusEvaluasiLahan: string;
    rekomendasiTindakLanjut: string;
  };
}

const DashboardHasilDanPeta: React.FC<DashboardHasilDanPetaProps> = ({ mockStatus, hasilIntegrasi }) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-8 mb-8 border-t border-gray-100 pt-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider">
            {mockStatus === 'HASIL TERVALIDASI' ? 'Ringkasan Hasil Evaluasi' : '2. Matriks Hasil Perhitungan'}
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white border border-gray-200 rounded-2xl p-5 flex flex-col items-center justify-center text-center shadow-sm">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Total Tumbuh Tanaman</p>
              <p className="text-4xl font-bold text-[#185325]">{hasilIntegrasi.persenTumbuhGlobal}%</p>
              {parseFloat(hasilIntegrasi.persenTumbuhGlobal) >= 75 ? (
                <span className="mt-2 text-[10px] bg-green-50 text-[#185325] px-2.5 py-1 rounded-md font-bold border border-green-100">MEMENUHI STANDAR</span>
              ) : (
                <span className="mt-2 text-[10px] bg-red-50 text-red-600 px-2.5 py-1 rounded-md font-bold border border-red-100">DI BAWAH STANDAR</span>
              )}
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-5 flex flex-col items-center justify-center text-center shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-blue-600 text-white text-[8px] font-bold px-2 py-0.5 rounded-bl-md uppercase tracking-wider">
                WebGIS Connected
              </div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Skor CPI Lingkungan</p>
              <p className="text-4xl font-bold text-blue-600">{hasilIntegrasi.skorCPILingkungan}</p>
              <span className="mt-2 text-[10px] bg-blue-50 text-blue-700 px-2.5 py-1 rounded-md font-bold border border-blue-100 flex items-center gap-1">
                <HiOutlineInformationCircle className="w-3 h-3" /> PRIORITAS TINGGI
              </span>
            </div>
          </div>

          <div className="bg-[#DCECE0] border border-[#185325]/20 rounded-2xl p-5 flex flex-col items-center justify-center text-center shadow-sm">
            <p className="text-xs font-bold text-[#3A4D3F] uppercase tracking-wider mb-1">Status Lahan Final</p>
            <p className="text-base font-bold text-[#185325] leading-tight uppercase">{hasilIntegrasi.statusEvaluasiLahan}</p>
          </div>

          <div className="bg-orange-50 border border-orange-100 rounded-2xl p-5 flex items-start gap-3">
            <HiOutlineInformationCircle className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-[11px] font-bold text-orange-800 uppercase tracking-wider mb-1">Rekomendasi Tindak Lanjut</h4>
              <p className="text-xs text-orange-700 leading-relaxed font-medium">
                {hasilIntegrasi.rekomendasiTindakLanjut}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6 flex flex-col h-full">
          <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider">
            {mockStatus === 'HASIL TERVALIDASI' ? 'Peta WebGIS Terintegrasi' : '3. Visualisasi Peta Spasial'}
          </h3>
          <div className="bg-gray-100 rounded-2xl border border-gray-200 overflow-hidden relative flex-1 min-h-75 flex items-center justify-center shadow-inner">
            <img 
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800&auto=format&fit=crop" 
              alt="Satelit WebGIS" 
              className="absolute inset-0 w-full h-full object-cover opacity-80"
            />
            <div className="relative z-10 flex flex-col items-center bg-white/95 px-5 py-4 rounded-xl shadow-md border border-gray-100 text-center">
              <HiOutlineMap className="w-8 h-8 text-[#185325] mb-2" />
              <span className="text-sm font-bold text-gray-800 mb-1">Layer Terintegrasi Aktif</span>
              <span className="text-xs text-gray-500">Konteks evaluasi telah dipetakan.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHasilDanPeta;