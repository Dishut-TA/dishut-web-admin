import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  HiOutlineChevronLeft,
  HiOutlineUser,
  HiOutlineMapPin,
  HiOutlinePencil,
  HiOutlineCheckCircle,
} from 'react-icons/hi2';

const VerifikasiCSR: React.FC = () => {
  const navigate = useNavigate();
//   const { id } = useParams();
  
  // Mock data detail proposal
  const detailData = {
    kthPengusul: 'KTH Rimba',
    ketuaKTH: 'Adam Malik',
    fileProposal: 'file.pdf',
    lokasi: 'Desa Sukamulya, Subang Jawa Barat',
    rencanaKemitraan: 'Rehabilitasi Lahan Subang',
    anggaran: 'Rp 80.000.000'
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
            Validasi CSR
          </span>
          <h1 className="text-2xl font-bold text-gray-800">Lembar Rekomendasi CSR</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-8 gap-x-6 pb-8 border-b border-gray-100">
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-gray-500">Kelompok Tani Hutan Pengusul</span>
            <div className="flex items-center gap-2 font-bold text-gray-800 text-sm">
              <HiOutlineUser className="w-4 h-4 text-gray-400" />
              {detailData.kthPengusul}
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
            <span className="text-xs font-medium text-gray-500">File Proposal</span>
            <div className="flex items-center gap-2 font-bold text-gray-800 text-sm italic">
              {detailData.fileProposal}
            </div>
          </div>

          {/* Baris 2 */}
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-gray-500">Lokasi Lahan Kegiatan</span>
            <div className="flex items-center gap-2 font-bold text-gray-800 text-sm">
              <HiOutlineMapPin className="w-4 h-4 text-[#185325]" />
              {detailData.lokasi}
            </div>
          </div>
          
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-gray-500">Nama Program</span>
            <div className="font-bold text-gray-800 text-sm">
              {detailData.rencanaKemitraan}
            </div>
          </div>
          
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-gray-500">Alokasi Anggaran Diajukan</span>
            <div className="font-bold text-gray-800 text-sm">
              {detailData.anggaran}
            </div>
          </div>

          {/* Baris 3 */}
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-gray-500">Luas</span>
            <div className="flex items-center gap-2 font-bold text-gray-800 text-sm">
              120 Ha
            </div>
          </div>
          
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-gray-500">Jenis Pohon</span>
            <div className="font-bold text-gray-800 text-sm">
              Mahoni
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-gray-500">Jumlah Bibit</span>
            <div className="font-bold text-gray-800 text-sm">
              200 Bibit
            </div>
          </div>

        </div>

        <div className="pt-8 grid grid-cols-1 md:grid-cols-1 gap-8 flex-1">
          <div>
            <h1 className='font-semibold'>Rencana Kegiatan Rehabilitasi</h1>
            <p className='mt-4 text-slate-500'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perspiciatis placeat doloribus error ipsum officiis animi sed nulla sequi, aliquam maxime ipsam deleniti, sint ratione, rem veniam sapiente fugit tenetur. Maiores nisi vitae est provident quis magnam quibusdam ad accusantium dolores aut eum aperiam minima doloribus ullam, soluta enim at sequi.</p>
          </div>

          <div>
            <h1 className='font-semibold'>Catatan Staff PDAS</h1>
            <p className='mt-4 text-slate-500'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perspiciatis placeat doloribus error ipsum officiis animi sed nulla sequi, aliquam maxime ipsam deleniti, sint ratione, rem veniam sapiente fugit tenetur. Maiores nisi vitae est provident quis magnam quibusdam ad accusantium dolores aut eum aperiam minima doloribus ullam, soluta enim at sequi.</p>
          </div>

          <div>
            <h1 className='font-semibold'>Rekomendasi Mitra CSR</h1>
            <p className='mt-4 text-slate-500'>PT. Indomaret</p>
          </div>
        </div>

        <div className="pt-8 mt-auto flex flex-col-reverse sm:flex-row justify-end items-center gap-4">
          <button 
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-2.5 bg-white border border-gray-300 text-gray-600 text-sm font-bold rounded-full hover:bg-gray-50 transition-colors"
          >
            <HiOutlinePencil className="w-4 h-4" /> Tolak / Minta Revisi
          </button>
          <button 
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-2.5 bg-[#185325] hover:bg-[#123d1c] text-white text-sm font-bold rounded-full transition-colors shadow-sm"
          >
            <HiOutlineCheckCircle className="w-5 h-5" /> Rekomendasikan ke Mitra CSR
          </button>
        </div>

      </div>
    </div>
  );
};

export default VerifikasiCSR;