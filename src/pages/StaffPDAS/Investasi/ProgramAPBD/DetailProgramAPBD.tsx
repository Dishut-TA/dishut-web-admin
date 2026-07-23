import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  HiOutlineChevronLeft,
  HiOutlineUserGroup,
  HiOutlineIdentification,
  HiOutlineMapPin
} from 'react-icons/hi2';

const DetailProgramAPBD: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams(); 

  const data = {
    id: id || 'PRG-001',
    kth: 'KTH Rimba',
    ketuaKth: 'Adam Malik',
    targetLuas: '120 Ha',
    lokasi: 'Desa Sukamulya, Subang Jawa Barat',
    namaProgram: 'Rehabilitasi Lahan Subang',
    anggaran: 'Rp 80.000.000',
    deskripsi: 'Lorem ipsum dolor sit amet consectetur. Sed arcu elementum eu feugiat mattis posuere. Tempus quis consequat in amet. Commodo dignissim sed tellus mi. Rhoncus lectus habitant leo urna et tortor nunc velit accumsan. Adipiscing sed turpis sit aliquet dictum iaculis posuere a.'
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-screen-2xl mx-auto pb-8 text-gray-800">
      <div>
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-sm font-semibold hover:text-[#2E7D32] transition-colors cursor-pointer"
        >
          <HiOutlineChevronLeft className="w-4 h-4 stroke-2" />
          Kembali
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10">
        <div className="mb-6">
          <span className="inline-block px-3 py-1.5 bg-[#DCECE0]/70 text-[#185325] text-xs font-bold rounded-md mb-4">
            Detail Administrasi
          </span>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Detail Rancangan Rehabilitasi APBD
          </h1>
        </div>

        <hr className="border-gray-100 mb-8" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-6 mb-8">
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

        <div className="mb-8">
          <h3 className="text-base font-bold text-gray-800 mb-3">
            Deskripsi Rencana Kegiatan
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed text-justify">
            {data.deskripsi}
          </p>
        </div>

        <hr className="border-gray-100" />
      </div>
      
    </div>
  );
};

export default DetailProgramAPBD;