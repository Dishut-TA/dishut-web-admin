import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineChevronLeft, HiOutlinePlusCircle } from 'react-icons/hi2';
import toast from 'react-hot-toast';

const CreateProgramAPBD: React.FC = () => {
  const navigate = useNavigate();
  const [lokasi, setLokasi] = useState('');
  const [namaProgram, setNamaProgram] = useState('');
  const [pilihIntervensi, setPilihIntervensi] = useState('Agroforesty');
  const [anggaran, setAnggaran] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  
  const MAX_DESC_LENGTH = 100;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ lokasi, namaProgram, pilihIntervensi, anggaran, deskripsi });
    
    toast.success('Draft Program APBD berhasil dikirim ke Kepala PDAS untuk ditinjau!');
    navigate(-1);
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-5xl mx-auto pb-12 animate-in fade-in duration-300">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm font-bold text-gray-800 hover:text-gray-600 self-start transition-colors"
      >
        <HiOutlineChevronLeft className="w-4 h-4 stroke-2" />
        Kembali ke Daftar Program
      </button>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-10 mt-2">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
             <HiOutlinePlusCircle className="w-6 h-6 text-[#185325]" strokeWidth={2} />
             <h1 className="text-xl font-bold text-gray-800">Rancang Program APBD Baru</h1>
          </div>
          <p className="text-sm text-gray-500 font-medium">
            Rancang program rehabilitasi APBD berdasarkan lahan prioritas di Jawa Barat.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <label className="block text-xs font-bold text-gray-800 mb-2">
              Lokasi Lahan Prioritas <span className="text-red-500">*</span>
            </label>
            <select 
              required
              value={lokasi}
              onChange={(e) => setLokasi(e.target.value)}
              className="w-full bg-white border border-gray-400 rounded-full px-4 py-3 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#185325] focus:border-[#185325] transition-all cursor-pointer shadow-sm appearance-none"
            >
              <option value="" disabled>-- Pilih Lokasi Prioritas --</option>
              <option value="Hulu Citarum">Hulu Citarum</option>
              <option value="DAS Cisadane">DAS Cisadane</option>
              <option value="Blok Kertasari">Blok Kertasari</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-gray-800 mb-2">
                Rekomendasi Intervensi (Analisis CPI)
              </label>
              <input 
                type="text" 
                readOnly
                value="Agroforesty"
                className="w-full bg-gray-50 border border-gray-400 rounded-full px-4 py-3 text-sm text-gray-600 outline-none cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-800 mb-2">
                Luas Lahan (Analisis CPI)
              </label>
              <input 
                type="text" 
                readOnly
                value="120 Ha"
                className="w-full bg-gray-50 border border-gray-400 rounded-full px-4 py-3 text-sm text-gray-600 outline-none cursor-not-allowed"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-gray-800 mb-2">
                Nama KTH (Analisis CPI)
              </label>
              <input 
                type="text" 
                readOnly
                value="KTH Rimba"
                className="w-full bg-gray-50 border border-gray-400 rounded-full px-4 py-3 text-sm text-gray-600 outline-none cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-800 mb-2">
                Nama Ketua KTH (Analisis CPI)
              </label>
              <input 
                type="text" 
                readOnly
                value="KTH Rimba"
                className="w-full bg-gray-50 border border-gray-400 rounded-full px-4 py-3 text-sm text-gray-600 outline-none cursor-not-allowed"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-800 mb-2">
              Nama Program <span className="text-red-500">*</span>
            </label>
            <input 
              type="text" 
              required
              value={namaProgram}
              onChange={(e) => setNamaProgram(e.target.value)}
              placeholder="Contoh: Rehabilitasi Lahan Kritis Citarum"
              className="w-full bg-white border border-gray-400 rounded-full px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#185325] focus:border-[#185325] transition-all shadow-sm"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-gray-800 mb-2">
                Pilih Intervensi <span className="text-red-500">*</span>
              </label>
              <select 
                required
                value={pilihIntervensi}
                onChange={(e) => setPilihIntervensi(e.target.value)}
                className="w-full bg-white border border-gray-400 rounded-full px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#185325] focus:border-[#185325] transition-all cursor-pointer shadow-sm appearance-none"
              >
                <option value="Agroforesty">Agroforesty</option>
                <option value="Silvopastura">Silvopastura</option>
                <option value="Penghijauan Lingkungan">Penghijauan Lingkungan</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-800 mb-2">
                Anggaran (Rp) <span className="text-red-500">*</span>
              </label>
              <input 
                type="number" 
                required
                value={anggaran}
                onChange={(e) => setAnggaran(e.target.value)}
                placeholder="Contoh: Rp 50.000.000"
                className="w-full bg-white border border-gray-400 rounded-full px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#185325] focus:border-[#185325] transition-all shadow-sm appearance-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-800 mb-2">
              Deskripsi Rencana Kegiatan
            </label>
            <div className="relative">
              <textarea 
                rows={4}
                maxLength={MAX_DESC_LENGTH}
                value={deskripsi}
                onChange={(e) => setDeskripsi(e.target.value)}
                placeholder="Masukkan rincian arahan kerja, jenis tanaman / pohon pelindung yang wajib ditanam, serta jangka waktu persiapan persemaian bibit unggul"
                className="w-full bg-white border border-gray-400 rounded-2xl px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#185325] focus:border-[#185325] transition-all resize-none shadow-sm"
              ></textarea>
              <div className="absolute -bottom-6 right-2 text-[10px] font-bold text-gray-500">
                {deskripsi.length}/{MAX_DESC_LENGTH}
              </div>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-end gap-4">
            <button 
              type="button"
              onClick={() => navigate(-1)}
              className="px-10 py-3 bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 text-sm font-bold rounded-full transition-colors active:scale-95 shadow-sm"
            >
              Batal
            </button>
            <button 
              type="submit"
              className="px-10 py-3 bg-[#185325] hover:bg-[#123d1c] text-white text-sm font-bold rounded-full transition-colors active:scale-95 shadow-sm"
            >
              Kirim ke Kepala PDAS
            </button>
          </div>

        </form>
      </div>

    </div>
  );
};

export default CreateProgramAPBD;