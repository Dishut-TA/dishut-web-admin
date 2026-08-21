import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineArrowLeft, HiOutlineCalendar, HiOutlineMapPin, HiOutlineUser, HiOutlineInformationCircle } from 'react-icons/hi2';
import { PiLeafFill } from 'react-icons/pi';

const DetailPenugasanPenyulaman: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full mx-auto pb-12">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Detail Penugasan Penyulaman</h1>
        <p className="text-sm text-gray-500">Informasi lengkap penugasan kegiatan penyulaman yang diberikan kepada KTH.</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm mb-6 p-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 flex-1">
          <div className="w-16 h-16 rounded-full bg-[#FEF3C7] flex items-center justify-center shrink-0 border border-[#FEF08A]">
            <PiLeafFill className="w-8 h-8 text-[#D97706]" />
          </div>
          <div>
            <div className="px-2 py-0.5 bg-[#FEF3C7] text-[#D97706] border border-[#FEF08A] text-[10px] font-bold rounded mb-2 inline-block uppercase tracking-wider">
              Penyulaman
            </div>
            <h2 className="text-lg font-bold text-gray-900 mb-1">Rehabilitasi Lahan Desa Sukamaju</h2>
            <p className="text-xs font-medium text-gray-500 flex items-center gap-1.5">
              <HiOutlineMapPin className="w-3.5 h-3.5" /> Desa Sukamaju, Kecamatan Cikalongwetan
            </p>
          </div>
        </div>

        <div className="flex items-center gap-8 border-l border-gray-100 pl-8">
          <div>
            <p className="text-[10px] font-medium text-gray-500 mb-1 flex items-center gap-1.5">
                Status Program
            </p>
            <span className="px-3 py-1 bg-[#F0FDF4] text-[#16A34A] border border-[#DCFCE7] text-xs font-bold rounded-lg inline-block mt-1">
              Aktif
            </span>
          </div>
          <div>
            <p className="text-[10px] font-medium text-gray-500 mb-2 flex items-center gap-1.5">
              <HiOutlineCalendar className="w-3.5 h-3.5" /> Periode Program
            </p>
            <p className="text-xs font-bold text-gray-900">Juni - Juli 2025</p>
          </div>
          <div>
            <p className="text-[10px] font-medium text-gray-500 mb-2 flex items-center gap-1.5">
              <HiOutlineUser className="w-3.5 h-3.5" /> Penyuluh
            </p>
            <p className="text-xs font-bold text-gray-900">Bapak Dedi Rahmat</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="font-bold text-gray-900 flex items-center gap-2">
            <PiLeafFill className="w-5 h-5 text-[#D97706]" /> Informasi Penyulaman
          </h3>
          <p className="text-xs text-gray-500 mt-1 ml-7">Berikut adalah jenis tanaman dan jumlah yang perlu disulam pada lokasi program.</p>
        </div>

        <div className="p-6">
          <div className="border border-gray-200 rounded-xl overflow-hidden mb-4">
            <table className="w-full text-left text-sm text-gray-700">
              <thead className="bg-[#DCECE0]/50 text-[#3A4D3F] text-xs font-bold uppercase border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 w-16 text-center">No.</th>
                  <th className="px-6 py-4">Jenis Tanaman</th>
                  <th className="px-6 py-4 text-center">Jumlah yang Perlu Disulam</th>
                  <th className="px-6 py-4 text-center">Alasan Penyulaman</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium text-center">
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-center">1</td>
                  <td className="px-6 py-4 text-left">Sengon</td>
                  <td className="px-6 py-4">30 pohon</td>
                  <td className="px-6 py-4 text-gray-500">Tidak tumbuh</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-center">2</td>
                  <td className="px-6 py-4 text-left">Suren</td>
                  <td className="px-6 py-4">10 pohon</td>
                  <td className="px-6 py-4 text-gray-500">Tidak tumbuh</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-center">3</td>
                  <td className="px-6 py-4 text-left">Alpukat</td>
                  <td className="px-6 py-4">6 pohon</td>
                  <td className="px-6 py-4 text-gray-500">Rusak / mati</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-center">4</td>
                  <td className="px-6 py-4 text-left">Nangka</td>
                  <td className="px-6 py-4">4 pohon</td>
                  <td className="px-6 py-4 text-gray-500">Rusak / mati</td>
                </tr>
                <tr className="bg-[#FEF3C7]/40 border-t-2 border-[#FEF08A]">
                  <td colSpan={2} className="px-6 py-4 text-center font-bold text-[#D97706]">Total</td>
                  <td className="px-6 py-4 font-bold text-[#D97706]">50 pohon</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-[#FEF3C7]/40 border border-[#FEF08A] p-4 rounded-lg flex items-start gap-3">
            <HiOutlineInformationCircle className="w-5 h-5 text-[#D97706] shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-[#D97706] mb-1">Alasan Penyulaman</p>
              <p className="text-[11px] text-[#B45309] font-medium leading-relaxed">
                Penyulaman dilakukan untuk mengganti tanaman yang tidak tumbuh atau rusak agar target tanaman dapat tercapai.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button onClick={() => navigate(-1)} className="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-gray-50 transition-colors shadow-sm">
          <HiOutlineArrowLeft className="w-4 h-4" /> Kembali
        </button>
      </div>
    </div>
  );
};

export default DetailPenugasanPenyulaman;