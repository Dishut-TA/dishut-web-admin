import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineChevronLeft, HiOutlineCloud, HiOutlinePaperAirplane } from 'react-icons/hi2';
import toast from 'react-hot-toast';

const CreateLaporanDana: React.FC = () => {
  const navigate = useNavigate();
  
  // State untuk form dinamis (multiple pengeluaran)
  const [pengeluaranList, setPengeluaranList] = useState([{ id: 1, kategori: '', nominal: '' }]);

  const handleAddBaris = () => {
    setPengeluaranList([...pengeluaranList, { id: Date.now(), kategori: '', nominal: '' }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Laporan dana berhasil dikirim!');
    navigate(-1);
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-3xl mx-auto pb-12">
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center gap-2 text-sm font-bold text-[#185325] transition-colors self-start hover:underline"
      >
        <HiOutlineChevronLeft className="w-4 h-4" strokeWidth={2.5} /> Kembali
      </button>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12">
        <h1 className="text-xl font-bold text-center text-gray-800 mb-10">
          Laporan Penggunaan Dana
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-2">Pilih Proyek Rehabilitasi Berjalan</label>
            <select className="w-full px-4 py-3 border border-gray-300 rounded-full text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#185325] bg-white cursor-pointer appearance-none">
              <option>Rehabilitasi Citarum #CSR-001</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-2">Tahapan Laporan</label>
            <select className="w-full px-4 py-3 border border-gray-300 rounded-full text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#185325] bg-white cursor-pointer appearance-none">
              <option>Tahap 1</option>
              <option>Tahap 2</option>
            </select>
          </div>

          {/* Form Dinamis Rincian Anggaran */}
          <div className="pt-2 border-t border-gray-100">
            <label className="block text-xs font-bold text-gray-700 mb-4">Rincian Penggunaan Anggaran</label>
            <div className="grid grid-cols-2 gap-4 text-xs font-bold text-[#185325] border-b border-gray-300 pb-3 mb-3">
              <div>Kategori Pengeluaran</div>
              <div>Nominal Realisasi Lapangan (Rupiah)</div>
            </div>

            {pengeluaranList.map((item) => (
              <div key={item.id} className="grid grid-cols-2 gap-4 mb-3">
                <input 
                  type="text" 
                  placeholder="Contoh: Pengadaan Bibit" 
                  className="w-full text-sm border-b border-gray-200 pb-2 focus:outline-none focus:border-[#185325] text-gray-800"
                />
                <div className="flex items-center text-sm border-b border-gray-200 pb-2 focus-within:border-[#185325]">
                  <span className="text-gray-500 mr-1">Rp</span>
                  <input 
                    type="number" 
                    placeholder="10.000.000" 
                    className="w-full outline-none text-gray-800"
                  />
                </div>
              </div>
            ))}

            <button 
              type="button" 
              onClick={handleAddBaris}
              className="text-xs font-medium text-gray-400 mt-2 hover:text-[#185325] transition-colors"
            >
              + Tambah baris pengeluaran
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2">Total Bibit Berhasil Ditanam</label>
              <input 
                type="text" 
                placeholder="Contoh: 150" 
                className="w-full px-4 py-3 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-[#185325]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2">Dokumen Bukti Pendukung</label>
              <div className="relative w-full">
                <input type="file" id="dokumen-upload" className="hidden" />
                <label 
                  htmlFor="dokumen-upload" 
                  className="flex items-center justify-between w-full px-4 py-3 border border-gray-300 rounded-full text-sm text-gray-500 cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <span>Upload Nota/Kwitansi Gabungan</span>
                  <HiOutlineCloud className="w-5 h-5 text-gray-500" />
                </label>
              </div>
            </div>
          </div>

          {/* Summary Box */}
          <div className="bg-[#DCECE0] rounded-xl p-6 mt-6">
            <h3 className="text-sm font-bold text-gray-800 mb-4">Ringkasan Saldo</h3>
            <div className="flex items-center text-sm mb-2">
              <span className="w-48 text-gray-600 font-medium">Total Pengeluaran Tahap 1</span>
              <span className="font-bold text-gray-800">: Rp 10.000.000</span>
            </div>
            <div className="flex items-center text-sm">
              <span className="w-48 text-gray-600 font-medium">Sisa Saldo Dana CSR</span>
              <span className="font-bold text-gray-800">: Rp 90.000.000</span>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button 
              type="submit"
              className="flex items-center justify-center gap-2 px-8 py-3 bg-[#185325] hover:bg-[#123d1c] text-white text-sm font-bold rounded-full transition-colors shadow-sm w-full md:w-auto"
            >
              <HiOutlinePaperAirplane className="w-4 h-4 -rotate-45 mb-0.5" /> Kirim Laporan
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default CreateLaporanDana;