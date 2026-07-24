import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  HiOutlineChevronLeft,
  HiOutlineUser,
  HiOutlineMapPin,
  HiOutlineXMark,
  HiOutlineCheckCircle
} from 'react-icons/hi2';
import toast from 'react-hot-toast';

const VerifikasiAPBD: React.FC = () => {
  const navigate = useNavigate();
//   const { id } = useParams(); // Nantinya bakal ambil ID dari URL parameter

  const detailData = {
    kthPenerima: 'KTH Rimba',
    ketuaKTH: 'Adam Malik',
    kontakWhatsapp: '08123456789',
    lokasi: 'Desa Sukamulya, Subang Jawa Barat',
    rencanaKegiatan: 'Rehabilitasi Lahan Subang',
    anggaran: 'Rp 120.000.000'
  };

  const handleApprove = () => {
    toast.success('Program APBD berhasil disahkan!');
    navigate(-1);
  };

  return (
    <div className="flex flex-col gap-6 w-full mx-auto pb-12">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm font-bold text-gray-700 hover:text-[#185325] self-start transition-colors"
      >
        <HiOutlineChevronLeft className="w-4 h-4" strokeWidth={2.5} />
        Kembali
      </button>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-10 flex flex-col">
        <div className="mb-8">
          <span className="inline-block px-3 py-1 bg-[#DCECE0] text-[#185325] text-xs font-bold rounded-md mb-3">
            Lembar Sahkan APBD
          </span>
          <h1 className="text-2xl font-bold text-gray-800">Lembar Sahkan APBD</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-8 gap-x-6 pb-8 border-b border-gray-100">
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-gray-500">Kelompok Tani Hutan</span>
            <div className="flex items-center gap-2 font-bold text-gray-800 text-sm">
              <HiOutlineUser className="w-4 h-4 text-gray-400" />
              {detailData.kthPenerima}
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-gray-500">Nama Ketua KTH</span>
            <div className="flex items-center gap-2 font-bold text-gray-800 text-sm">
              <HiOutlineUser className="w-4 h-4 text-gray-400" />
              {detailData.ketuaKTH}
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-gray-500">Luas Lahan</span>
            <div className="flex items-center gap-2 font-bold text-gray-800 text-sm">
              120 Ha
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-gray-500">Lokasi Lahan</span>
            <div className="flex items-center gap-2 font-bold text-gray-800 text-sm">
              <HiOutlineMapPin className="w-4 h-4 text-[#185325]" />
              {detailData.lokasi}
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-gray-500">Nama Program</span>
            <div className="font-bold text-gray-800 text-sm">
              {detailData.rencanaKegiatan}
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-gray-500">Anggaran APBD</span>
            <div className="font-bold text-gray-800 text-sm">
              {detailData.anggaran}
            </div>
          </div>
        </div>

        <div className="pt-8 flex-1">
          <label className="block text-sm font-bold text-gray-800 mb-3">
            Deskripsi Rencana Kegiatan
          </label>
          <div className="relative">
            <p>Lorem ipsum dolor sit amet consectetur. Sed arcu elementum eu feugiat mattis posuere. Tempus quis consequat in amet. Commodo dignissim sed tellus mi. Rhoncus lectus habitant leo urna et tortor nunc velit accumsan. Adipiscing sed turpis sit aliquet dictum iaculis posuere a.</p>
          </div>
        </div>

        <div className="pt-8 mt-auto flex flex-col-reverse sm:flex-row justify-end items-center gap-4">
          <button 
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 bg-white border border-gray-300 text-gray-600 text-sm font-bold rounded-full hover:bg-gray-50 transition-colors"
          >
            <HiOutlineXMark className="w-4 h-4" /> Tolak
          </button>
          <button 
            onClick={handleApprove}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-2.5 bg-[#185325] hover:bg-[#123d1c] text-white text-sm font-bold rounded-full transition-colors shadow-sm"
          >
            <HiOutlineCheckCircle className="w-5 h-5" /> Sahkan Program APBD
          </button>
        </div>

      </div>
    </div>
  );
};

export default VerifikasiAPBD;