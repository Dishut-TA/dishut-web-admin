import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  HiOutlineChevronLeft,
  HiOutlineUser,
  HiOutlineMapPin,
  HiOutlinePencil,
  HiOutlineCheckCircle,
  HiOutlineBuildingOffice
} from 'react-icons/hi2';
import toast from 'react-hot-toast';

const VerifikasiCSR: React.FC = () => {
  const navigate = useNavigate();
//   const { id } = useParams();
  
  const [mitraCsr, setMitraCsr] = useState('');
  const [catatan, setCatatan] = useState('');

  // Mock data detail proposal
  const detailData = {
    kthPengusul: 'KTH Rimba',
    ketuaKTH: 'Adam Malik',
    kontakWhatsapp: '08123456789',
    lokasi: 'Desa Sukamulya, Subang Jawa Barat',
    rencanaKemitraan: 'Rehabilitasi Lahan Subang',
    anggaran: 'Rp 80.000.000'
  };

  const handleApprove = () => {
    if (!mitraCsr) {
      toast.error('Harap tentukan Mitra CSR sebelum merekomendasikan proposal.');
      return;
    }
    toast.success(`Proposal berhasil direkomendasikan ke ${mitraCsr}!`);
    navigate(-1);
  };

  const handleReject = () => {
    if (!catatan) {
      toast.error('Harap isi catatan alasan penolakan/revisi untuk Staff.');
      return;
    }
    toast.error('Proposal dikembalikan ke Staff untuk direvisi.');
    navigate(-1);
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto pb-12">
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
            <span className="text-xs font-medium text-gray-500">Kontak WhatsApp</span>
            <div className="flex items-center gap-2 font-bold text-gray-800 text-sm">
              <svg className="w-4 h-4 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              {detailData.kontakWhatsapp}
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
            <span className="text-xs font-medium text-gray-500">Rencana Kemitraan</span>
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

        </div>

        <div className="pt-8 grid grid-cols-1 md:grid-cols-2 gap-8 flex-1">
          <div>
            <label className="flex items-center gap-2 text-sm font-bold text-gray-800 mb-3">
              <HiOutlineBuildingOffice className="w-5 h-5 text-[#185325]" />
              Rekomendasikan Mitra CSR <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={mitraCsr}
              onChange={(e) => setMitraCsr(e.target.value)}
              placeholder="PT. Alfamart"
              className="w-full px-4 py-3 border border-gray-400 rounded-full text-sm font-medium focus:outline-none focus:ring-1 focus:ring-[#185325] focus:border-[#185325] transition-all"
            />
            <p className="text-[10px] text-gray-400 mt-2 leading-tight">
              Tunjuk korporasi swasta yang paling selaras dengan bidang usulan penanaman KTH ini.
            </p>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-800 mb-3">
              Catatan Disposisi Kepala Dinas <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <textarea
                value={catatan}
                onChange={(e) => setCatatan(e.target.value)}
                placeholder="Contoh: Sangat direkomendasikan karena ..."
                maxLength={100}
                className="w-full h-32 p-4 border border-gray-400 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#185325] focus:border-[#185325] resize-none"
              />
              <div className="absolute bottom-3 right-4 text-[10px] text-gray-400 font-medium">
                {catatan.length}/100
              </div>
            </div>
          </div>

        </div>

        <div className="pt-8 mt-auto flex flex-col-reverse sm:flex-row justify-end items-center gap-4">
          <button 
            onClick={handleReject}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-2.5 bg-white border border-gray-300 text-gray-600 text-sm font-bold rounded-full hover:bg-gray-50 transition-colors"
          >
            <HiOutlinePencil className="w-4 h-4" /> Tolak / Minta Revisi
          </button>
          <button 
            onClick={handleApprove}
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