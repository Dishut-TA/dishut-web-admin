import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlinePaperAirplane, HiOutlineCloudArrowUp, HiOutlineChevronLeft } from 'react-icons/hi2';

const AjukanProgramCSR: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="mx-auto px-4">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-primary font-bold mb-4">
        <HiOutlineChevronLeft /> Kembali
      </button>

      <div className="p-8">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-xl font-bold text-primary">FORMULIR DIGITAL: PENGAJUAN CSR</h1>
        </div>
        <p className="text-sm text-gray-500 mb-8">Isi formulir digital di bawah ini dengan jujur & teliti agar mudah diverifikasi Dinas.</p>

        <hr className='border-primary mb-8'/>

        <form className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <label className="block">
                <span className="text-sm font-bold text-primary">Judul Program</span>
                <input className="mt-2 w-full px-5 py-3 border border-secondary rounded-full text-sm focus:ring-1 focus:ring-primary outline-none" placeholder="Contoh: Reboisasi DAS Hulu Sungai" />
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <label>
                <span className="text-sm font-bold text-primary">Luas Lahan Terbuka yang Direhab (Hektar)</span>
                <input className="mt-2 w-full px-5 py-3 border border-secondary rounded-full text-sm focus:ring-1 focus:ring-primary outline-none" placeholder="Contoh: 15" />
            </label>
            <label>
                <span className="text-sm font-bold text-primary">Jenis Pohon / Tanaman Utama</span>
                <input className="mt-2 w-full px-5 py-3 border border-secondary rounded-full text-sm focus:ring-1 focus:ring-primary outline-none" placeholder="Contoh: Mahoni, Jati Mas, Sengon" />
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <label>
                <span className="text-sm font-bold text-primary">Target Jumlah Bibit</span>
                <input className="mt-2 w-full px-5 py-3 border border-secondary rounded-full text-sm focus:ring-1 focus:ring-primary outline-none" placeholder="200 Bibit" />
            </label>
            <label>
                <span className="text-sm font-bold text-primary">Total Estimasi Anggaran (Rupiah)</span>
                <input className="mt-2 w-full px-5 py-3 border border-secondary rounded-full text-sm focus:ring-1 focus:ring-primary outline-none" placeholder="Contoh: Rp 850000000" />
            </label>
          </div>

          <label>
            <span className="text-sm font-bold text-primary">Upload Proposal CSR</span>
            <div className="mt-2 w-full px-5 py-3 border border-secondary rounded-full text-sm flex items-center justify-between text-gray-400">
                <span>Upload file</span>
                <HiOutlineCloudArrowUp className="w-5 h-5" />
            </div>
          </label>

          <label>
            <span className="text-sm font-bold text-primary">Deskripsi Rencana Kerja & Teknis Pelaksanaan</span>
            <textarea className="mt-2 w-full h-32 px-5 py-3 border border-secondary rounded-3xl text-sm focus:ring-1 focus:ring-primary outline-none" placeholder="Tuliskan detail program, tujuan rehabilitasi, manfaat ekonomi kelompok, dan cara pelaksanaan harian..." />
          </label>

          <div className="flex items-center justify-between pt-6 border-t border-gray-100">
            <p className="text-xs text-gray-500">ⓘ Pengajuan akan ditinjau secara berkala oleh staf teknis Dinas Kehutanan.</p>
            <button className="bg-primary text-white px-8 py-3 rounded-full text-sm font-bold flex items-center gap-2 hover:bg-[#113d1b]">
                <HiOutlinePaperAirplane /> Kirim Berkas Pengajuan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AjukanProgramCSR;