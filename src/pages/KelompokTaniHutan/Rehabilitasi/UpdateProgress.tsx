import React from 'react';
import { HiOutlineArrowUpTray } from 'react-icons/hi2';

const UpdateProgres: React.FC = () => {

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle submit logic
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-3xl mx-auto pb-12">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-10">
        <div className="mb-8 pb-6 border-b border-gray-100">
          <h1 className="text-xl font-bold text-gray-800 tracking-tight">
            Update Progres Rehabilitasi
          </h1>
          <p className="text-sm text-gray-500 mt-2 leading-relaxed">
            Laporkan kemajuan berkala dari proyek rehabilitasi kelompok Anda agar mitra CSR dapat memantau perkembangan di lapangan secara transparan.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Pilih Proyek Rehabilitasi Berjalan</label>
            <select className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#185325] focus:border-[#185325] bg-white cursor-pointer appearance-none">
              <option disabled selected>-- Pilih Proyek Rehabilitasi --</option>
              <option>Rehabilitasi Lahan Subang (CSR-001)</option>
              <option>Reboisasi DAS Cimanuk (CSR-042)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Status Tahapan</label>
            <select className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#185325] focus:border-[#185325] bg-white cursor-pointer appearance-none">
              <option>Tahapan 1: Persiapan Lahan</option>
              <option>Tahapan 2: Penanaman Bibit</option>
              <option>Tahapan 3: Pemeliharaan</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Gambar Kegiatan</label>
            <div className="relative w-full">
              <input 
                type="file" 
                id="file-upload"
                className="hidden"
              />
              <label 
                htmlFor="file-upload" 
                className="flex items-center justify-between w-full px-4 py-3 border border-gray-300 rounded-xl text-sm text-gray-500 cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <span>Upload file...</span>
                <HiOutlineArrowUpTray className="w-5 h-5 text-gray-400" />
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Keterangan</label>
            <div className="relative">
              <textarea 
                required
                placeholder="Tambahkan keterangan pada kegiatan yang dilaporkan..."
                className="w-full h-32 px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#185325] focus:border-[#185325] resize-none transition-all"
              />
              <span className="absolute bottom-3 right-4 text-[10px] text-gray-400 font-medium">0/500</span>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-gray-100 flex justify-end">
            <button 
              type="submit"
              className="px-8 py-3 bg-[#185325] hover:bg-[#123d1c] text-white text-sm font-bold rounded-full transition-colors shadow-sm"
            >
              Kirim Laporan
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default UpdateProgres;