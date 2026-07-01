import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  HiOutlineArrowLeft, 
  HiOutlineUserGroup, 
  HiOutlineUser, 
  HiOutlinePhone, 
  HiOutlineMapPin, 
  HiOutlineDocumentText, 
  HiOutlineBanknotes, 
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-6 mb-10">
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Kelompok Tani Hutan Pengusul</span>
            <div className="flex items-center gap-2 text-gray-800 font-bold">
              <HiOutlineUserGroup className="w-5 h-5 text-[#185325]" />
              KTH Rimba
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Nama Ketua KTH</span>
            <div className="flex items-center gap-2 text-gray-800 font-bold">
              <HiOutlineUser className="w-5 h-5 text-[#185325]" />
              Adam Malik
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Kontak WhatsApp</span>
            <div className="flex items-center gap-2 text-gray-800 font-bold">
              <HiOutlinePhone className="w-5 h-5 text-[#185325]" />
              08123456789
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Lokasi Lahan Kegiatan</span>
            <div className="flex items-start gap-2 text-gray-800 font-bold">
              <HiOutlineMapPin className="w-5 h-5 text-[#185325] shrink-0 mt-0.5" />
              <span>Desa Sukamulya, Subang Jawa Barat</span>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Rencana Kemitraan</span>
            <div className="flex items-start gap-2 text-gray-800 font-bold">
              <HiOutlineDocumentText className="w-5 h-5 text-[#185325] shrink-0 mt-0.5" />
              <span>Rehabilitasi Lahan Subang</span>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Alokasi Anggaran Diajukan</span>
            <div className="flex items-start gap-2 text-gray-800 font-bold">
              <HiOutlineBanknotes className="w-5 h-5 text-[#185325] shrink-0 mt-0.5" />
              <span>Rp 80.000.000</span>
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