import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineChevronLeft, HiOutlineCheckCircle, HiOutlineXCircle } from 'react-icons/hi2';
import toast from 'react-hot-toast';

const PengesahanLaporanEvaluasiKabid: React.FC = () => {
  const navigate = useNavigate();
  const [showRevisi, setShowRevisi] = useState(false);

  const handleSahkan = () => {
    // Simulasi men-generate PDF
    const loading = toast.loading('Menandatangani digital & Menerbitkan PDF Berita Acara...');
    setTimeout(() => {
      toast.success('Laporan Resmi Disahkan! Dokumen Final tersedia di Dashboard.', { id: loading });
      navigate(-1);
    }, 2000);
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-5xl mx-auto pb-12">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm font-bold text-gray-700 hover:text-[#185325] self-start">
        <HiOutlineChevronLeft className="w-4 h-4" strokeWidth={2.5} /> Kembali
      </button>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-10">
        <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">Pengesahan Laporan Evaluasi</h1>
        <p className="text-sm text-gray-500 mb-8 border-b border-gray-100 pb-5">Tinjau draft Berita Acara sebelum pengesahan final.</p>

        {/* SPLIT SCREEN: KIRI (INFO) & KANAN (PREVIEW PDF) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          
          {/* Kolom Kiri: Matriks Data (Sesuai AD) */}
          <div className="space-y-6">
            <h3 className="text-sm font-bold text-[#185325] uppercase tracking-wider">Matriks & Visualisasi Laporan</h3>
            <div className="bg-gray-50 p-5 rounded-2xl border border-gray-200">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-bold text-gray-500">Persentase Tumbuh</span>
                <span className="text-lg font-black text-[#00A859]">91.60%</span>
              </div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-bold text-gray-500">Skor Konservasi (CPI)</span>
                <span className="text-lg font-black text-blue-600">3.45</span>
              </div>
              <div className="flex justify-between items-center border-t border-gray-200 pt-3">
                <span className="text-sm font-bold text-gray-800">Status Akhir</span>
                <span className="bg-[#DCECE0] text-[#185325] px-3 py-1 text-xs font-bold rounded-full">BERHASIL</span>
              </div>
            </div>

            {/* Peta Mini */}
            <div className="bg-gray-100 h-48 rounded-2xl border border-gray-200 overflow-hidden relative flex items-center justify-center">
              <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=600&auto=format&fit=crop" alt="Peta" className="absolute inset-0 w-full h-full object-cover opacity-70" />
              <span className="relative z-10 bg-white px-3 py-1 text-xs font-bold rounded-md shadow-sm">Peta P0 Telah Dilampirkan</span>
            </div>
          </div>

          {/* Kolom Kanan: Preview Berita Acara */}
          <div className="bg-[#f8fbf9] p-6 border border-[#DCECE0] rounded-xl text-xs text-gray-800 font-serif shadow-inner flex flex-col justify-between">
            <div>
              <h2 className="text-center font-bold text-sm underline mb-4 uppercase">DRAFT BERITA ACARA PENILAIAN</h2>
              <p className="text-justify mb-3">
                Pada hari ini, Selasa, 14 Juli 2026, kami yang bertanda tangan di bawah ini selaku Tim Penilai Keberhasilan Penanaman telah melakukan evaluasi lapangan pada program kegiatan <strong>Rehabilitasi Lahan PT. Jawa Satu Power</strong>.
              </p>
              <p className="mb-2">Hasil Akhir Evaluasi:</p>
              <ul className="list-disc ml-4 mb-4">
                <li>Persentase Tumbuh: 91.60% (Memenuhi)</li>
                <li>Rata-rata Tinggi: 119.6 cm</li>
                <li>Skor Lingkungan (CPI): 3.45 (Prioritas Tinggi)</li>
              </ul>
              <p className="font-bold italic text-gray-600">Catatan Tim Penilai: Secara umum pertumbuhan sangat baik, namun disarankan dilakukan penyiangan gulma di PU-3.</p>
            </div>
            
            {/* Simulasi TTD Digital */}
            <div className="mt-8 text-center text-gray-400 border-2 border-dashed border-gray-300 rounded-xl p-4">
              [Area Tanda Tangan Digital Kepala Bidang PDAS Akan Dicetak Di Sini]
            </div>
          </div>
        </div>

        {/* DECISION AREA */}
        <div className="border-t border-gray-100 pt-6 flex flex-col sm:flex-row justify-end gap-4">
          <button 
            onClick={() => setShowRevisi(!showRevisi)} 
            className="px-8 py-3.5 bg-white border-2 border-red-500 text-red-600 hover:bg-red-50 text-sm font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <HiOutlineXCircle className="w-5 h-5 stroke-2" /> Kembalikan (Revisi)
          </button>
          <button 
            onClick={handleSahkan} 
            className="px-8 py-3.5 bg-[#185325] hover:bg-[#123d1c] text-white text-sm font-bold rounded-xl shadow-sm transition-colors flex items-center justify-center gap-2"
          >
            <HiOutlineCheckCircle className="w-5 h-5" /> Sahkan & Terbitkan Dokumen PDF
          </button>
        </div>

      </div>
    </div>
  );
};

export default PengesahanLaporanEvaluasiKabid;