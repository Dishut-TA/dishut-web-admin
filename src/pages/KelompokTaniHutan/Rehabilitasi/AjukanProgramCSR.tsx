import React, { useState } from 'react';
import { HiOutlineDocumentPlus } from 'react-icons/hi2';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AjukanProgramCSR: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulasi API Call
    setTimeout(() => {
      toast.success('Formulir pengajuan CSR berhasil dikirim!');
      setIsSubmitting(false);
      navigate('/admin/kth/rehabilitasi/riwayat');
    }, 1000);
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-3xl mx-auto pb-12">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-10">
        <div className="flex items-center gap-3 mb-8 pb-6 border-b border-gray-100">
          <div className="p-3 bg-[#DCECE0] rounded-xl text-[#185325]">
            <HiOutlineDocumentPlus className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800 uppercase tracking-tight">
              Formulir Digital - Pengajuan CSR
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Isi formulir di bawah ini dengan data yang valid agar mudah diverifikasi Dinas.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Judul Program</label>
            <input 
              required
              type="text" 
              placeholder="Contoh: Reboisasi DAS Cimanuk..." 
              className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#185325] focus:border-[#185325] transition-all"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Luas Lahan Terindikasi Kritis (Hektar)</label>
              <input 
                required
                type="number" 
                placeholder="Contoh: 15" 
                className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#185325] focus:border-[#185325] transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Jenis Pohon / Tanaman Utama</label>
              <input 
                required
                type="text" 
                placeholder="Contoh: Mahoni, Jati Mas, Sengon" 
                className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#185325] focus:border-[#185325] transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Deskripsi Rencana Kerja & Teknis Pelaksanaan</label>
            <textarea 
              required
              placeholder="Tuliskan detail program, tujuan rehabilitasi, manfaat ekonomi kelompok, dan cara pelaksanan tanam..."
              className="w-full h-32 px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#185325] focus:border-[#185325] resize-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Total Estimasi Anggaran yang Diperlukan (Rupiah)</label>
            <input 
              required
              type="text" 
              placeholder="Contoh: Rp 80.000.000" 
              className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#185325] focus:border-[#185325] transition-all"
            />
          </div>

          <div className="pt-6 mt-6 border-t border-gray-100 flex items-center justify-between">
            <span className="text-xs text-gray-400 italic">
              * Pengajuan otomatis masuk ke dashboard Admin PDAS.
            </span>
            <button 
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 bg-[#185325] hover:bg-[#123d1c] text-white text-sm font-bold rounded-full transition-colors shadow-sm disabled:opacity-50"
            >
              {isSubmitting ? 'Mengirim...' : 'Kirim Berkas Pengajuan'}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default AjukanProgramCSR;