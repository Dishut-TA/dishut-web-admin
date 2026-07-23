import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  HiOutlineChevronLeft,
  HiOutlineUserGroup,
  HiOutlineIdentification,
  HiOutlineMapPin,
  HiOutlineXCircle,
  HiOutlineCheckCircle
} from 'react-icons/hi2';

const DetailPendanaanAPBD: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Mock data disesuaikan dengan desain mockup
  const data = {
    id: id || 'APBD-001',
    kth: 'KTH Rimba',
    ketuaKth: 'Adam Malik',
    targetLuas: '120 Ha',
    lokasi: 'Desa Sukamulya, Subang Jawa Barat',
    namaProgram: 'Rehabilitasi Lahan Subang',
    anggaran: 'Rp 80.000.000',
    deskripsi: 'Lorem ipsum dolor sit amet consectetur. Sed arcu elementum eu feugiat mattis posuere. Tempus quis consequat in amet. Commodo dignissim sed tellus mi. Rhoncus lectus habitant leo urna et tortor nunc velit accumsan. Adipiscing sed turpis sit aliquet dictum iaculis posuere a.',
    catatanPdas: 'Lorem ipsum dolor sit amet consectetur. Sed arcu elementum eu feugiat mattis posuere. Tempus quis consequat in amet. Commodo dignissim sed tellus mi. Rhoncus lectus habitant leo urna et tortor nunc velit accumsan. Adipiscing sed turpis sit aliquet dictum iaculis posuere a.'
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-screen-2xl mx-auto pb-8 text-gray-800">
      
      {/* Tombol Kembali */}
      <div>
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-sm font-semibold hover:text-[#2E7D32] transition-colors cursor-pointer"
        >
          <HiOutlineChevronLeft className="w-4 h-4 stroke-2" />
          Kembali
        </button>
      </div>

      {/* Card Konten Utama */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10">
        
        {/* Header Section */}
        <div className="mb-6">
          <span className="inline-block px-3 py-1.5 bg-[#DCECE0]/70 text-[#185325] text-xs font-bold rounded-md mb-4">
            Detail Administrasi
          </span>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Lembar Konfirmasi Program APBD
          </h1>
        </div>

        <hr className="border-gray-100 mb-8" />

        {/* Grid Informasi (3 Kolom) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-6 mb-8">
          
          {/* Baris 1 */}
          <div>
            <p className="text-sm text-gray-500 mb-2">Kelompok Tani Hutan</p>
            <div className="flex items-center gap-2 text-base font-bold text-gray-800">
              <HiOutlineUserGroup className="w-5 h-5 text-[#2E7D32]" />
              {data.kth}
            </div>
          </div>
          
          <div>
            <p className="text-sm text-gray-500 mb-2">Nama Ketua KTH</p>
            <div className="flex items-center gap-2 text-base font-bold text-gray-800">
              <HiOutlineIdentification className="w-5 h-5 text-[#2E7D32]" />
              {data.ketuaKth}
            </div>
          </div>
          
          <div>
            <p className="text-sm text-gray-500 mb-2">Target Luas Lahan</p>
            <div className="text-base font-bold text-gray-800">
              {data.targetLuas}
            </div>
          </div>

          {/* Baris 2 */}
          <div>
            <p className="text-sm text-gray-500 mb-2">Lokasi Lahan</p>
            <div className="flex items-center gap-2 text-base font-bold text-gray-800">
              <HiOutlineMapPin className="w-5 h-5 text-[#2E7D32]" />
              {data.lokasi}
            </div>
          </div>
          
          <div>
            <p className="text-sm text-gray-500 mb-2">Nama Program</p>
            <div className="text-base font-bold text-gray-800">
              {data.namaProgram}
            </div>
          </div>
          
          <div>
            <p className="text-sm text-gray-500 mb-2">Anggaran APBD</p>
            <div className="text-base font-bold text-gray-800">
              {data.anggaran}
            </div>
          </div>
        </div>

        <hr className="border-gray-100 mb-8" />

        {/* Deskripsi Section */}
        <div className="mb-8">
          <h3 className="text-base font-bold text-gray-800 mb-3">
            Deskripsi Rencana Kegiatan
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed text-justify">
            {data.deskripsi}
          </p>
        </div>

        <hr className="border-gray-100 mb-8" />

        {/* Catatan Kepala PDAS Section */}
        <div className="mb-10">
          <h3 className="text-base font-bold text-gray-800 mb-3">
            Catatan Kepala PDAS
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed text-justify">
            {data.catatanPdas}
          </p>
        </div>

        {/* Tombol Aksi */}
        <div className="flex items-center justify-end gap-4 mt-8 pt-4">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 px-8 py-3 border border-gray-300 text-gray-500 rounded-full font-semibold hover:bg-gray-50 transition-colors cursor-pointer active:scale-95"
          >
            <HiOutlineXCircle className="w-5 h-5" />
            Tolak
          </button>
          
          <button 
            onClick={() => {
              navigate(-1);
            }}
            className="flex items-center justify-center gap-2 px-8 py-3 bg-[#185325] text-white rounded-full font-semibold hover:bg-[#123d1c] transition-colors cursor-pointer active:scale-95 shadow-sm"
          >
            <HiOutlineCheckCircle className="w-5 h-5" />
            Konfirmasi
          </button>
        </div>

      </div>
    </div>
  );
};

export default DetailPendanaanAPBD;