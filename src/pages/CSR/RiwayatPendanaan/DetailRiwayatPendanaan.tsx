import React, { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  HiOutlineChevronLeft, 
  HiOutlineUser, 
  HiOutlineMapPin,
} from 'react-icons/hi2';
import { HiCheck, HiX } from 'react-icons/hi'; 

const mockDatabase = [
  {
    id: 'CSR-001',
    kth: 'KTH Rimba',
    ketua: 'Adam Malik',
    file: 'proposal_csr.pdf',
    lokasi: 'Desa Sukamulya, Subang Jawa Barat',
    namaProgram: 'Rehabilitasi Lahan Subang',
    anggaran: 'Rp 80.000.000',
    luas: '120 Ha',
    jenisPohon: 'Mahoni',
    jumlahBibit: '200 Bibit',
    status: 'Selesai',
    catatan: ''
  },
  {
    id: 'CSR-002',
    kth: 'KTH Rimba',
    ketua: 'Adam Malik',
    file: 'proposal_csr.pdf',
    lokasi: 'Desa Sukamulya, Subang Jawa Barat',
    namaProgram: 'Rehabilitasi Lahan Subang',
    anggaran: 'Rp 80.000.000',
    luas: '120 Ha',
    jenisPohon: 'Mahoni',
    jumlahBibit: '200 Bibit',
    status: 'Dihentikan',
    catatan: 'Program tidak berjalan dengan lancar, pendaaan harus dihentikan'
  }
];

const DetailRiwayatPendanaan: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const detailData = useMemo(() => {
    return mockDatabase.find((item) => item.id === id) || mockDatabase[0];
  }, [id]);

  return (
    <div className="flex flex-col gap-6 w-full mx-auto pb-12 px-4 sm:px-0">
      
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center gap-2 text-sm font-bold text-gray-800 hover:text-[#185325] self-start transition-colors cursor-pointer"
      >
        <HiOutlineChevronLeft className="w-4 h-4 stroke-2" /> Kembali
      </button>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-10">
        <div className="mb-8 border-b border-gray-100 pb-8">
          <span className="inline-block px-3 py-1 bg-[#DCECE0] text-[#185325] text-xs font-bold rounded mb-3">
            {detailData.id}
          </span>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Riwayat Program Pendanaan</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-8 gap-x-6 pb-8 border-b border-gray-100">
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-gray-600">Kelompok Tani Hutan Pengusul</span>
            <div className="flex items-center gap-2 font-bold text-gray-800 text-sm md:text-base">
              <HiOutlineUser className="w-5 h-5 text-[#185325]" />
              {detailData.kth}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-gray-600">Nama Ketua KTH</span>
            <div className="flex items-center gap-2 font-bold text-gray-800 text-sm md:text-base">
              <HiOutlineUser className="w-5 h-5 text-[#185325]" />
              {detailData.ketua}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-gray-600">File Proposal</span>
            <div className="font-bold text-gray-800 text-sm md:text-base italic">
              {detailData.file}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-gray-600">Lokasi Lahan Kegiatan</span>
            <div className="flex items-center gap-2 font-bold text-gray-800 text-sm md:text-base">
              <HiOutlineMapPin className="w-5 h-5 text-[#185325]" />
              {detailData.lokasi}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-gray-600">Nama Program</span>
            <div className="font-bold text-gray-800 text-sm md:text-base">
              {detailData.namaProgram}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-gray-600">Alokasi Anggaran Diajukan</span>
            <div className="font-bold text-gray-800 text-sm md:text-base">
              {detailData.anggaran}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-gray-600">Luas Lahan</span>
            <div className="font-bold text-gray-800 text-sm md:text-base">
              {detailData.luas}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-gray-600">Jenis Pohon</span>
            <div className="font-bold text-gray-800 text-sm md:text-base">
              {detailData.jenisPohon}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-gray-600">Jumlah Bibit</span>
            <div className="font-bold text-gray-800 text-sm md:text-base">
              {detailData.jumlahBibit}
            </div>
          </div>
        </div>

        <div className="pt-8 pb-8">
          <h3 className="text-sm md:text-base font-medium text-gray-600 mb-3">
            Rencana Kegiatan Rehabilitasi
          </h3>
          <p className="text-sm text-gray-400 leading-relaxed text-justify">
            Lorem ipsum dolor sit amet consectetur. Faucibus faucibus urna nulla amet at nascetur. Enim aliquam sed nibh bibendum. Pulvinar nec risus et vulputate consequat tortor. Quisque tristique in dapibus laoreet eu augue. Maecenas quam eget habitant non. Lobortis lobortis dui phasellus sodales consectetur faucibus mauris eros odio. Diam tortor massa et venenatis ornare tristique nulla.
          </p>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <span className="text-sm md:text-base font-medium text-gray-800">Status :</span>
          {detailData.status === 'Selesai' ? (
            <div className="flex items-center gap-1.5 text-[#185325] font-bold text-sm md:text-base">
              Selesai <HiCheck className="w-5 h-5 stroke-[2px]" />
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-red-600 font-bold text-sm md:text-base">
              Dihentikan <HiX className="w-5 h-5 stroke-[2px]" />
            </div>
          )}
        </div>

        {detailData.status === 'Dihentikan' && (
          <div className="mt-8 pt-4">
            <h3 className="text-sm md:text-base font-medium text-gray-600 mb-2">
              Catatan
            </h3>
            <p className="text-sm text-gray-800 italic font-medium">
              {detailData.catatan}
            </p>
          </div>
        )}

      </div>
    </div>
  );
};

export default DetailRiwayatPendanaan;