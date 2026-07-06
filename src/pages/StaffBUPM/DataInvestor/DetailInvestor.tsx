import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  HiOutlineChevronLeft,
  HiOutlineUser,
  HiOutlineEnvelope,
  HiOutlinePhone,
  HiOutlineBanknotes,
  HiOutlineChartPie,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineDocumentText
} from 'react-icons/hi2';

const DetailInvestor: React.FC = () => {
  const navigate = useNavigate();

  // --- MOCK DATA ---
  const detailData = {
    nama: 'Rakha Nabila',
    email: 'rakha@gmail.com',
    noTelepon: '0812328212111',
    namaInvestasi: 'Pembangunan Ekowisata Kebun Stroberi',
    jumlahInvestasi: 'Rp. 250.000.000',
    persentase: '40%',
    tanggalMulai: '27 Desember 2025',
    dokumen: 'DokumenPerjanjianRakha.pdf'
  };

  return (
    <div className="flex flex-col gap-6 w-full mx-auto pb-12">
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center gap-2 text-sm font-bold text-[#185325] hover:underline self-start"
      >
        <HiOutlineChevronLeft className="w-4 h-4" strokeWidth={2.5} /> Kembali
      </button>

      <div className="bg-white/70 backdrop-blur-md rounded-3xl p-8 md:p-10 shadow-sm border border-white/60">
        <div className="flex items-center gap-4 mb-10 pb-6 border-b border-gray-200/60">
          <div className="w-14 h-14 bg-[#DCECE0] rounded-full flex items-center justify-center shrink-0">
            <HiOutlineUser className="w-7 h-7 text-[#185325]" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Detail Investor</h1>
            <p className="text-sm text-gray-500 font-medium mt-1">
              Rincian profil dan portofolio investasi pengguna.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
          <div>
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-5">
              Informasi Personal
            </h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <HiOutlineUser className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500 mb-1">Nama Investor</p>
                  <p className="text-sm font-bold text-gray-800">{detailData.nama}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <HiOutlineEnvelope className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500 mb-1">Email</p>
                  <p className="text-sm font-bold text-gray-800">{detailData.email}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <HiOutlinePhone className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500 mb-1">No Telepon</p>
                  <p className="text-sm font-bold text-gray-800">{detailData.noTelepon}</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-5">
              Rincian Investasi
            </h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <HiOutlineBriefcase className="w-5 h-5 text-[#185325] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500 mb-1">Nama Investasi</p>
                  <p className="text-sm font-bold text-gray-800">{detailData.namaInvestasi}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <HiOutlineBanknotes className="w-5 h-5 text-[#185325] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500 mb-1">Jumlah Investasi</p>
                  <p className="text-sm font-bold text-gray-800">{detailData.jumlahInvestasi}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <HiOutlineChartPie className="w-5 h-5 text-[#185325] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500 mb-1">Persentase Keuntungan</p>
                  <p className="text-sm font-bold text-gray-800">{detailData.persentase}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <HiOutlineCalendarDays className="w-5 h-5 text-[#185325] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500 mb-1">Tanggal Mulai Investasi</p>
                  <p className="text-sm font-bold text-gray-800">{detailData.tanggalMulai}</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div className="mt-10 pt-8 border-t border-gray-200/60">
          <div className="bg-[#f8fbf9] p-4 md:p-5 rounded-2xl border border-[#DCECE0] flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-2.5 bg-white rounded-xl shadow-sm">
                <HiOutlineDocumentText className="w-6 h-6 text-[#185325]" />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-0.5">Dokumen Perjanjian</p>
                <p className="text-sm font-bold text-[#185325] hover:underline cursor-pointer transition-all">
                  {detailData.dokumen}
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default DetailInvestor;