import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineChevronLeft } from 'react-icons/hi2';

const DetailLaporanDana: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-6 mx-auto pb-12">
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center gap-2 text-sm font-bold text-gray-700 hover:text-[#185325] transition-colors self-start"
      >
        <HiOutlineChevronLeft className="w-4 h-4" strokeWidth={2.5} /> Kembali
      </button>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-10 relative">
        <div className="mb-8">
          <h1 className="text-xl font-bold text-gray-800 mb-3">Detail Laporan Penggunaan Dana</h1>
          <span className="inline-block px-4 py-1 bg-[#DCECE0] text-[#185325] text-xs font-bold rounded-full">
            Disetujui
          </span>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-[200px_auto] gap-y-6 text-sm">
            <span className="text-gray-500">Nama Proyek</span>
            <span className="font-bold text-gray-800">: Rehabilitasi Citarum</span>

            <span className="text-gray-500">Tahap Laporan</span>
            <span className="font-bold text-gray-800">: Tahap 1</span>

            <span className="text-gray-500">Rincian Penggunaan Anggaran</span>
            <div className="flex gap-2">
              <span className="font-bold text-gray-800">:</span>
              <div className="grid grid-cols-2 gap-x-8 text-sm w-full max-w-sm">
                <div>
                  <div className="font-bold text-gray-800 mb-2">Kategori Pengeluaran</div>
                  <div className="text-[#185325] font-medium">Pengadaan Bibit</div>
                </div>
                <div className="border-l pl-8 border-gray-300">
                  <div className="font-bold text-gray-800 mb-2">Nominal</div>
                  <div className="text-[#185325] font-medium">Rp 10.000.000</div>
                </div>
              </div>
            </div>

            <span className="text-gray-500">Total Bibit Ditanam</span>
            <span className="font-bold text-gray-800">: 150 Bibit</span>

            <span className="text-gray-500">Dokumen Pendukung</span>
            <span className="font-bold underline text-gray-800 cursor-pointer hover:text-[#185325] italic">
              : KwitansiTahap1.pdf
            </span>

            <span className="text-gray-500">Ringkasan Saldo</span>
            <div className="flex gap-2">
              <span className="font-bold text-gray-800">:</span>
              <div className="grid grid-cols-2 gap-x-8 text-sm w-full max-w-sm">
                <div>
                  <div className="font-bold text-gray-800 mb-2">Total Pengeluaran Tahap 1</div>
                  <div className="text-[#185325] font-medium">Rp 10.000.000</div>
                </div>
                <div className="border-l pl-8 border-gray-300">
                  <div className="font-bold text-gray-800 mb-2">Sisa Saldo</div>
                  <div className="text-[#185325] font-medium">Rp 90.000.000</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailLaporanDana;