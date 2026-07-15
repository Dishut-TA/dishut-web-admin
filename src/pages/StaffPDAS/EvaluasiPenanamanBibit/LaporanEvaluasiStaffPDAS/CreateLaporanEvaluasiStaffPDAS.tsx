import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineChevronLeft, HiOutlinePaperAirplane, HiOutlineDocumentDuplicate } from 'react-icons/hi2';
import toast from 'react-hot-toast';

const CreateLaporanEvaluasiStaffPDAS: React.FC = () => {
  const navigate = useNavigate();
  const [kesimpulanStaff, setKesimpulanStaff] = useState('');

  const autoData = {
    proyek: 'Rehabilitasi Lahan Kompensasi PT. Jawa Satu Power',
    hariTanggal: 'Selasa, 14 Juli 2026',
    persenTumbuh: '91.60%',
    tinggiRata: '119.6 cm',
    cpi: '3.45 (Prioritas Tinggi)',
    statusSistem: 'BERHASIL'
  };

  const handleAjukan = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Draft Laporan Evaluasi Berhasil Diajukan ke Kabid PDAS!');
    navigate(-1);
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto pb-12">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm font-bold text-gray-700 hover:text-[#185325] self-start">
        <HiOutlineChevronLeft className="w-4 h-4" strokeWidth={2.5} /> Kembali
      </button>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12 relative overflow-hidden">
        <div className="flex items-center justify-between border-b border-gray-200 pb-6 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Draft Berita Acara Evaluasi</h1>
            <p className="text-sm text-gray-500 mt-1">Sistem telah menyusun data secara otomatis. Silakan lengkapi kesimpulan akhir.</p>
          </div>
          <HiOutlineDocumentDuplicate className="w-10 h-10 text-gray-300" />
        </div>

        <div className="bg-[#f8fbf9] p-8 border border-[#DCECE0] rounded-xl text-sm text-gray-800 leading-relaxed font-serif shadow-inner mb-8">
          <h2 className="text-center font-bold text-base underline mb-6 uppercase">
            BERITA ACARA PENILAIAN KEBERHASILAN PENANAMAN
          </h2>
          
          <p className="text-justify mb-4">
            Pada hari ini, <strong>{autoData.hariTanggal}</strong>, kami yang bertanda tangan di bawah ini selaku Tim Penilai Keberhasilan Penanaman telah melakukan evaluasi lapangan pada program kegiatan <strong>{autoData.proyek}</strong>.
          </p>

          <p className="mb-2">Berdasarkan hasil pengolahan data spasial (WebGIS) dan perhitungan lapangan, diperoleh hasil sebagai berikut:</p>
          <ul className="list-disc list-inside ml-4 mb-4 space-y-1">
            <li>Persentase Keberhasilan Tumbuh: <span className="font-bold">{autoData.persenTumbuh}</span></li>
            <li>Rata-rata Tinggi Tanaman: <span className="font-bold">{autoData.tinggiRata}</span></li>
            <li>Konteks Lingkungan (Skor CPI): <span className="font-bold text-blue-600">{autoData.cpi}</span></li>
            <li>Status Klasifikasi Sistem: <span className="font-bold text-[#185325]">{autoData.statusSistem}</span></li>
          </ul>

          <p className="text-justify">
            Demikian Berita Acara ini dibuat berdasarkan data valid lapangan untuk dipergunakan sebagaimana mestinya dan diajukan pengesahannya kepada Kepala Bidang PDAS.
          </p>
        </div>

        <form onSubmit={handleAjukan}>
          <div className="mb-8">
            <label className="block text-sm font-bold text-gray-800 mb-2">Tambahkan Kesimpulan / Catatan Teknis (Opsional)</label>
            <textarea 
              rows={4}
              value={kesimpulanStaff}
              onChange={(e) => setKesimpulanStaff(e.target.value)}
              placeholder="Contoh: Secara umum pertumbuhan sangat baik, namun disarankan dilakukan penyiangan gulma di Petak Ukur 3..."
              className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:ring-[#185325] outline-none resize-none"
            />
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-4 border-t border-gray-100 pt-6">
            <button type="submit" className="w-full md:w-auto px-8 py-3.5 bg-[#185325] hover:bg-[#123d1c] text-white text-sm font-bold rounded-xl shadow-sm transition-colors flex items-center justify-center gap-2">
              <HiOutlinePaperAirplane className="w-5 h-5 -rotate-45 mb-1" /> Ajukan Laporan Evaluasi
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default CreateLaporanEvaluasiStaffPDAS;