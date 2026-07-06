import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineChevronLeft, HiOutlineCloud, HiPlus } from 'react-icons/hi2';
import toast from 'react-hot-toast';

const CreateLaporanProyek: React.FC = () => {
  const navigate = useNavigate();
  const [isAgreed, setIsAgreed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAgreed) return;
    toast.success('Laporan proyek berhasil dibuat!');
    navigate(-1);
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-2xl mx-auto pb-12">
      <div className="relative flex items-center justify-center mb-2">
        <button 
          onClick={() => navigate(-1)} 
          className="absolute left-0 flex items-center gap-2 text-sm font-bold text-[#185325] hover:underline transition-colors"
        >
          <HiOutlineChevronLeft className="w-4 h-4" strokeWidth={2.5} /> Kembali
        </button>
        <h1 className="text-xl font-bold text-gray-800">
          Buat Laporan Proyek
        </h1>
      </div>

      <div className="p-8 md:p-10">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">Investasi</label>
            <select 
              defaultValue=""
              className="w-full px-4 py-3 border border-gray-300 rounded-full text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#185325] focus:border-[#185325] bg-white cursor-pointer appearance-none"
            >
              <option value="" disabled>Pilih investasi</option>
              <option value="1">Investasi Ekowisata Kebun Stroberi</option>
              <option value="2">Investasi Wisata Dieng</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">Milestone</label>
            <input 
              type="text" 
              defaultValue="Milestone 2"
              className="w-full px-4 py-3 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-[#185325] focus:border-[#185325]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">Dokumen Perkembangan</label>
            <div className="relative w-full">
              <input type="file" id="dokumen-upload" className="hidden" />
              <label 
                htmlFor="dokumen-upload" 
                className="flex items-center justify-between w-full px-4 py-3 border border-gray-300 rounded-full text-sm text-gray-500 cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <span>Upload file</span>
                <HiOutlineCloud className="w-5 h-5 text-gray-500" />
              </label>
            </div>
            <p className="text-[11px] text-gray-500 italic mt-1.5 font-medium">
              **Jika ada 2 file atau lebih, mohon digabungkan dalam satu file
            </p>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">Dana Terpakai</label>
            <div className="relative flex items-center border border-gray-300 rounded-full overflow-hidden focus-within:border-[#185325] focus-within:ring-1 focus-within:ring-[#185325] transition-all">
              <span className="pl-4 pr-2 text-sm font-bold text-gray-600 bg-gray-50/50 py-3">Rp.</span>
              <input 
                type="number" 
                placeholder="0" 
                className="w-full px-2 py-3 text-sm outline-none bg-transparent" 
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">Sisa Dana</label>
            <div className="relative flex items-center border border-gray-300 rounded-full overflow-hidden focus-within:border-[#185325] focus-within:ring-1 focus-within:ring-[#185325] transition-all">
              <span className="pl-4 pr-2 text-sm font-bold text-gray-600 bg-gray-50/50 py-3">Rp.</span>
              <input 
                type="number" 
                placeholder="0" 
                className="w-full px-2 py-3 text-sm outline-none bg-transparent" 
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">Deskripsi</label>
            <textarea 
              placeholder="Tulis keterangan"
              className="w-full h-32 px-4 py-3 border border-gray-300 rounded-4xl text-sm focus:outline-none focus:ring-1 focus:ring-[#185325] focus:border-[#185325] resize-none transition-all"
            />
          </div>

          <div className="pt-4">
            <label className="flex items-start gap-3 cursor-pointer group mb-5">
              <div className="relative flex items-center justify-center shrink-0 mt-0.5">
                <input 
                  type="checkbox" 
                  className="peer appearance-none w-4.5 h-4.5 border-2 border-gray-300 rounded checked:bg-[#185325] checked:border-[#185325] transition-colors cursor-pointer"
                  checked={isAgreed}
                  onChange={(e) => setIsAgreed(e.target.checked)}
                />
                <svg className="absolute w-3 h-3 text-white pointer-events-none opacity-0 peer-checked:opacity-100" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-[11px] sm:text-xs text-gray-600 group-hover:text-gray-800 transition-colors">
                Dengan ini saya menyatakan bahwa laporan dibuat dengan sebenar-benarnya
              </span>
            </label>

            <button 
              type="submit"
              disabled={!isAgreed}
              className={`flex items-center justify-center gap-1 w-full py-3.5 text-white text-sm font-bold rounded-full transition-all duration-300 shadow-sm ${
                isAgreed 
                  ? 'bg-[#185325] hover:bg-[#123d1c]' 
                  : 'bg-[#9CA3AF] cursor-not-allowed opacity-80'
              }`}
            >
              Buat Laporan Proyek <HiPlus className="w-4 h-4 stroke-2" />
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default CreateLaporanProyek;