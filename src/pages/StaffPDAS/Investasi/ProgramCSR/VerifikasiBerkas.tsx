import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  HiOutlineArrowLeft, 
  HiOutlineUser, 
  HiOutlineMapPin, 
  HiOutlineDocumentText, 
  HiOutlineCheckCircle
} from 'react-icons/hi2';
import toast from 'react-hot-toast';

const VerifikasiBerkasCSR: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams(); 

  const [rekomendasiMitra, setRekomendasiMitra] = useState('');
  const [catatan, setCatatan] = useState('');
  const MAX_NOTES_LENGTH = 100;

  const handleSubmit = (e: React.FormEvent, isApproved: boolean) => {
    e.preventDefault();
    
    if (isApproved && !rekomendasiMitra) {
      toast.error('Silakan pilih Rekomendasi Mitra CSR terlebih dahulu.');
      return;
    }

    if (!isApproved && !catatan) {
      toast.error('Catatan/Alasan penolakan wajib diisi.');
      return;
    }

    console.log({ isApproved, rekomendasiMitra, catatan, id });
    
    if (isApproved) {
      toast.success('Berkas disetujui dan diteruskan ke Kepala PDAS!');
    } else {
      toast.error('Berkas ditolak / dikembalikan untuk revisi.');
    }
    
    navigate(-1);
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-5xl mx-auto pb-12">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-gray-900 self-start transition-colors"
      >
        <HiOutlineArrowLeft className="w-4 h-4" strokeWidth={2.5} />
        Kembali
      </button>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 mt-2">
        <div className="mb-8 border-b border-gray-100 pb-6">
          <span className="inline-block px-3 py-1 bg-[#DCECE0] text-[#185325] text-xs font-bold rounded mb-3">
            Verifikasi Administrasi
          </span>
          <h1 className="text-2xl font-bold text-gray-800">Detail Dokumen KTH</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-8 gap-x-6 pb-8 border-b border-gray-100">
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-gray-500">Kelompok Tani Hutan Pengusul</span>
            <div className="flex items-center gap-2 font-bold text-gray-800 text-sm">
              <HiOutlineUser className="w-4 h-4 text-gray-400" />
              KTH Rimba
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-gray-500">Nama Ketua KTH</span>
            <div className="flex items-center gap-2 font-bold text-gray-800 text-sm">
              <HiOutlineUser className="w-4 h-4 text-gray-400" />
              Adam Malik
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-gray-500">File Proposal</span>
            <div className="flex items-center gap-2 font-bold text-gray-800 text-sm italic">
              proposal_csr.pdf
            </div>
          </div>

          {/* Baris 2 */}
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-gray-500">Lokasi Lahan Kegiatan</span>
            <div className="flex items-center gap-2 font-bold text-gray-800 text-sm">
              <HiOutlineMapPin className="w-4 h-4 text-[#185325]" />
              Desa Sukamulya, Subang Jawa Barat
            </div>
          </div>
          
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-gray-500">Nama Program</span>
            <div className="font-bold text-gray-800 text-sm">
              Rehabilitasi Lahan Subang
            </div>
          </div>
          
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-gray-500">Alokasi Anggaran Diajukan</span>
            <div className="font-bold text-gray-800 text-sm">
              Rp 80.000.000
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
        <form className="grid grid-cols-1 lg:grid-cols-2 gap-8 border-t border-gray-100 pt-8">
          <div>
            <label className="flex items-center gap-2 text-sm font-bold text-[#185325] mb-2">
              <HiOutlineDocumentText className="w-5 h-5" /> Rekomendasikan Mitra CSR <span className="text-red-500">*</span>
            </label>
            <select 
              value={rekomendasiMitra}
              onChange={(e) => setRekomendasiMitra(e.target.value)}
              className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#185325]/20 focus:border-[#185325] transition-all cursor-pointer shadow-sm mb-2"
            >
              <option value="" disabled>-- Pilih Rekomendasi Mitra --</option>
              <option value="PT_A">PT Pertamina (Persero)</option>
              <option value="PT_B">Bank BJB</option>
              <option value="PT_C">PT Telkom Indonesia</option>
            </select>
            <p className="text-[11px] text-gray-400">
              Tunjuk korporasi swasta yang paling selaras dengan bidang usulan penanaman KTH ini.
            </p>
          </div>

          <div>
            <label className="block text-sm font-bold text-[#185325] mb-2">
              Tulis Catatan / Verifikasi Lapangan <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <textarea 
                rows={3}
                maxLength={MAX_NOTES_LENGTH}
                value={catatan}
                onChange={(e) => setCatatan(e.target.value)}
                placeholder="Ketik persetujuan administrasi atau rincian perbaikan jika dokumen ditolak..."
                className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#185325]/20 focus:border-[#185325] transition-all resize-none shadow-sm"
              ></textarea>
              <div className="absolute -bottom-6 right-1 text-[11px] font-bold text-gray-400">
                {catatan.length}/{MAX_NOTES_LENGTH}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 flex flex-col sm:flex-row items-center justify-end gap-3 mt-4">
            <button 
              type="button"
              onClick={(e) => handleSubmit(e, false)}
              className="w-full sm:w-auto px-8 py-3 bg-white border border-gray-300 text-gray-600 text-sm font-bold rounded-full hover:bg-gray-50 transition-colors active:scale-95 flex items-center justify-center gap-2"
            >
              <HiOutlineArrowLeft className="w-4 h-4" /> Tolak / Minta Revisi
            </button>
            <button 
              type="button"
              onClick={(e) => handleSubmit(e, true)}
              className="w-full sm:w-auto px-8 py-3 bg-[#185325] hover:bg-[#123d1c] text-white text-sm font-bold rounded-full transition-colors active:scale-95 shadow-md shadow-[#185325]/20 flex items-center justify-center gap-2"
            >
              <HiOutlineCheckCircle className="w-5 h-5" /> Setuju & Teruskan
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

export default VerifikasiBerkasCSR;