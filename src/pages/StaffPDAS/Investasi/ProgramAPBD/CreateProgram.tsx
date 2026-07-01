import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineArrowLeft, HiOutlineUserGroup } from 'react-icons/hi2';
import toast from 'react-hot-toast';

const CreateProgramAPBD: React.FC = () => {
  const navigate = useNavigate();
  const [lokasi, setLokasi] = useState('');
  const [namaProgram, setNamaProgram] = useState('');
  const [anggaran, setAnggaran] = useState('');
  const [luas, setLuas] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  
  const MAX_DESC_LENGTH = 100;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ lokasi, namaProgram, anggaran, luas, deskripsi });
    
    toast.success('Draft Program APBD berhasil dikirim ke Kepala PDAS untuk ditinjau!');
    navigate(-1);
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-5xl mx-auto pb-12">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-gray-900 self-start transition-colors"
      >
        <HiOutlineArrowLeft className="w-4 h-4" strokeWidth={2.5} />
        Kembali Ke Daftar Program
      </button>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 mt-2">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
             <h1 className="text-2xl font-bold text-gray-800">Desain & Rancang Program APBD Baru</h1>
          </div>
          <p className="text-sm text-gray-600">
            Rancang program reboisasi APBD dan kunci data koordinat satelit dari sistem sensor prioritas kritis (Modul CPI).
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            <div className="space-y-6">
              
              <div>
                <label className="block text-sm font-bold text-gray-800 mb-2">
                  Lokasi Lahan Prioritas (Dari Modul Data CPI) <span className="text-red-500">*</span>
                </label>
                <select 
                  required
                  value={lokasi}
                  onChange={(e) => setLokasi(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#185325]/20 focus:border-[#185325] transition-all cursor-pointer shadow-sm"
                >
                  <option value="" disabled>-- Pilih Lokasi Prioritas --</option>
                  <option value="Hulu Citarum">Hulu Citarum (Skor CPI: 0.85)</option>
                  <option value="DAS Cisadane">DAS Cisadane (Skor CPI: 0.76)</option>
                  <option value="Blok Kertasari">Blok Kertasari (Skor CPI: 0.91)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-800 mb-2">
                  Nama Program Kerja <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  required
                  value={namaProgram}
                  onChange={(e) => setNamaProgram(e.target.value)}
                  placeholder="Contoh: Rehabilitasi Lahan Kritis Citarum"
                  className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#185325]/20 focus:border-[#185325] transition-all shadow-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-2">
                    Anggaran APBD (Rp) <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="number" 
                    required
                    value={anggaran}
                    onChange={(e) => setAnggaran(e.target.value)}
                    placeholder="Contoh: 120000000"
                    className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#185325]/20 focus:border-[#185325] transition-all shadow-sm appearance-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-2">
                    Target Luas Lahan (Ha) <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="number" 
                    required
                    value={luas}
                    onChange={(e) => setLuas(e.target.value)}
                    placeholder="Contoh: 15"
                    className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#185325]/20 focus:border-[#185325] transition-all shadow-sm appearance-none"
                  />
                </div>
              </div>

            </div>

            <div className="space-y-6">
              
              <div>
                <label className="block text-sm font-bold text-gray-800 mb-2">
                  Kelompok Tani Hutan (KTH) Pelaksana (Auto-Generated)
                </label>
                <div className="bg-[#dcece0] border border-[#C8E0CD] rounded-xl p-4 flex gap-3 shadow-sm">
                   <div className="pt-0.5">
                     <HiOutlineUserGroup className="w-5 h-5 text-[#185325]" />
                   </div>
                   <div>
                     <h3 className="text-sm font-bold text-[#185325] mb-1">
                       KTH Pelaksana: Sistem akan mencocokan otomatis
                     </h3>
                     <p className="text-[11px] font-medium text-[#2E7D32] leading-relaxed">
                       KTH ditunjuk otomatis berdasarkan domisili wilayah terdekat dari peta prioritas CPI yang Anda pilih.
                     </p>
                   </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-[#185325] mb-2">
                  Deskripsi / Instruksi Rencana Kerja Lapangan
                </label>
                <div className="relative">
                  <textarea 
                    rows={4}
                    maxLength={MAX_DESC_LENGTH}
                    value={deskripsi}
                    onChange={(e) => setDeskripsi(e.target.value)}
                    placeholder="Masukkan rincian arahan kerja, jenis tanaman / pohon pelindung yang wajib ditanam, serta jangka waktu persiapan persemaian bibit unggul"
                    className="w-full bg-white border-2 border-[#185325] rounded-xl px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#185325]/20 transition-all resize-none shadow-sm"
                  ></textarea>
                  <div className="absolute -bottom-6 right-1 text-xs font-bold text-[#185325]">
                    {deskripsi.length}/{MAX_DESC_LENGTH}
                  </div>
                </div>
              </div>

            </div>
          </div>

          <div className="mt-12 flex items-center justify-end gap-3">
            <button 
              type="button"
              onClick={() => navigate(-1)}
              className="px-8 py-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 text-sm font-bold rounded-full transition-colors active:scale-95"
            >
              Batal
            </button>
            <button 
              type="submit"
              className="px-8 py-3 bg-[#185325] hover:bg-[#123d1c] text-white text-sm font-bold rounded-full transition-colors active:scale-95 shadow-md shadow-[#185325]/20"
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