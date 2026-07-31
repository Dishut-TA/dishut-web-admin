import React, { useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  HiOutlineArrowLeft, 
  HiOutlineUser, 
  HiOutlineMapPin, 
  HiOutlineCheckCircle,
  HiOutlineXCircle,
  HiOutlineBuildingOffice,
  HiOutlineClipboardDocumentCheck,
  HiCheck,
  HiXMark
} from 'react-icons/hi2';
import toast from 'react-hot-toast';

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
    status: 'Menunggu Persetujuan',
  },
  {
    id: 'CSR-002', // Simulasi Disetujui
    kth: 'KTH Rimba',
    ketua: 'Adam Malik',
    file: 'proposal_csr.pdf',
    lokasi: 'Desa Sukamulya, Subang Jawa Barat',
    namaProgram: 'Rehabilitasi Lahan Subang',
    anggaran: 'Rp 80.000.000',
    luas: '120 Ha',
    jenisPohon: 'Mahoni',
    jumlahBibit: '200 Bibit',
    status: 'Disetujui',
    catatanStaff: 'Lorem ipsum dolor sit amet consectetur. Faucibus faucibus urna nulla amet at nascetur. Enim aliquam sed nibh bibendum. Pulvinar nec risus et vulputate consequat tortor. Quisque tristique in dapibus laoreet eu augue. Maecenas quam eget habitant non. Lobortis lobortis dui phasellus sodales consectetur faucibus mauris eros odio. Diam tortor massa et venenatis ornare tristique nulla.',
    rekomendasiMitra: 'PT. Alfamart',
    rekomendasiIntervensi: 'Agroforesty'
  },
  {
    id: 'CSR-003',
    kth: 'KTH Rimba',
    ketua: 'Adam Malik',
    file: 'proposal_csr.pdf',
    lokasi: 'Desa Sukamulya, Subang Jawa Barat',
    namaProgram: 'Rehabilitasi Lahan Subang',
    anggaran: 'Rp 80.000.000',
    luas: '120 Ha',
    jenisPohon: 'Mahoni',
    jumlahBibit: '200 Bibit',
    status: 'Ditolak',
    catatanStaff: 'Lorem ipsum dolor sit amet consectetur. Faucibus faucibus urna nulla amet at nascetur. Enim aliquam sed nibh bibendum. Pulvinar nec risus et vulputate consequat tortor. Quisque tristique in dapibus laoreet eu augue. Maecenas quam eget habitant non. Lobortis lobortis dui phasellus sodales consectetur faucibus mauris eros odio. Diam tortor massa et venenatis ornare tristique nulla.',
  }
];

const InfoItem = ({ 
  label, 
  value, 
  icon, 
  iconColor = "text-gray-400",
  isItalic = false 
}: { 
  label: string, 
  value: string, 
  icon?: React.ReactNode, 
  iconColor?: string,
  isItalic?: boolean 
}) => (
  <div className="flex flex-col gap-1.5">
    <span className="text-xs font-medium text-gray-500">{label}</span>
    <div className={`flex items-center gap-2 text-sm text-gray-800 ${isItalic ? 'italic hover:text-[#185325] hover:underline cursor-pointer font-medium' : 'font-bold'}`}>
      {icon && <span className={iconColor}>{icon}</span>}
      {value}
    </div>
  </div>
);

const VerifikasiBerkasCSR: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams(); 

  const [rekomendasiMitra, setRekomendasiMitra] = useState('');
  const [rekomendasiIntervensi, setRekomendasiIntervensi] = useState('');
  const [catatan, setCatatan] = useState('');
  const MAX_NOTES_LENGTH = 100;

  const detailData = useMemo(() => {
    return mockDatabase.find((item) => item.id === id) || mockDatabase[0];
  }, [id]);

  const handleSubmit = (e: React.FormEvent, isApproved: boolean) => {
    e.preventDefault();
    
    if (isApproved && (!rekomendasiMitra || !rekomendasiIntervensi)) {
      toast.error('Silakan lengkapi form rekomendasi terlebih dahulu.');
      return;
    }

    if (!isApproved && !catatan) {
      toast.error('Catatan/Alasan penolakan wajib diisi.');
      return;
    }

    if (isApproved) {
      toast.success('Berkas disetujui dan diteruskan ke Kepala PDAS!');
    } else {
      toast.error('Berkas ditolak / dikembalikan untuk revisi.');
    }
    
    navigate(-1);
  };

  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto pb-12 animate-in fade-in duration-300">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm font-bold text-[#185325] hover:underline self-start transition-colors cursor-pointer mb-6"
      >
        <HiOutlineArrowLeft className="w-4 h-4 stroke-2" /> Kembali
      </button>

      {/* Main Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
        
        {/* Header Verifikasi */}
        <div className="mb-10 border-b border-gray-100 pb-6">
          <span className="inline-block px-3 py-1.5 bg-[#EBF8F1] text-[#185325] text-[10px] font-bold rounded-md mb-3 border border-[#C6EBD6]">
            {detailData.id}
          </span>
          <h1 className="text-2xl font-bold text-gray-800">Lembar Verifikasi CSR</h1>
        </div>

        {/* Informasi Atas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-10 gap-x-8 pb-10 border-b border-gray-100">
          <InfoItem label="Kelompok Tani Hutan Pengusul" value={detailData.kth} icon={<HiOutlineUser className="w-4 h-4" />} iconColor="text-[#185325]" />
          <InfoItem label="Nama Ketua KTH" value={detailData.ketua} icon={<HiOutlineUser className="w-4 h-4" />} />
          <InfoItem label="File Proposal" value={detailData.file} isItalic />

          <InfoItem label="Lokasi Lahan Kegiatan" value={detailData.lokasi} icon={<HiOutlineMapPin className="w-4 h-4" />} iconColor="text-[#185325]" />
          <InfoItem label="Nama Program" value={detailData.namaProgram} />
          <InfoItem label="Alokasi Anggaran Diajukan" value={detailData.anggaran} />

          <InfoItem label="Luas Lahan" value={detailData.luas} />
          <InfoItem label="Jenis Pohon" value={detailData.jenisPohon} />
          <InfoItem label="Jumlah Bibit" value={detailData.jumlahBibit} />
        </div>

        {/* Deskripsi Kegiatan */}
        <div className="pt-8 pb-8">
          <h3 className="text-sm font-bold text-gray-800 mb-2">Rencana Kegiatan Rehabilitasi</h3>
          <p className="text-sm text-gray-500 leading-relaxed text-justify">
            Lorem ipsum dolor sit amet consectetur. Faucibus faucibus urna nulla amet at nascetur. Enim aliquam sed nibh bibendum. Pulvinar nec risus et vulputate consequat tortor. Quisque tristique in dapibus laoreet eu augue. Maecenas quam eget habitant non. Lobortis lobortis dui phasellus sodales consectetur faucibus mauris eros odio. Diam tortor massa et venenatis ornare tristique nulla.
          </p>
        </div>

        {/* LOGIKA TAMPILAN BERDASARKAN STATUS */}
        
        {/* === TAMPILAN 1: MENUNGGU PERSETUJUAN (FORM) === */}
        {detailData.status === 'Menunggu Persetujuan' && (
          <form className="animate-in fade-in duration-300 border-t border-gray-100 pt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-[#185325] mb-2">
                  <HiOutlineBuildingOffice className="w-5 h-5" /> Rekomendasikan Mitra CSR
                </label>
                <select 
                  value={rekomendasiMitra}
                  onChange={(e) => setRekomendasiMitra(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-full px-4 py-3 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#185325] focus:border-[#185325] transition-all cursor-pointer shadow-sm appearance-none"
                >
                  <option value="" disabled>-- Pilih Rekomendasi Mitra --</option>
                  <option value="PT_A">PT Pertamina (Persero)</option>
                  <option value="PT_B">Bank BJB</option>
                  <option value="PT_C">PT Telkom Indonesia</option>
                </select>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-[#185325] mb-2">
                  <HiOutlineClipboardDocumentCheck className="w-5 h-5" /> Rekomendasi Intervensi
                </label>
                <select 
                  value={rekomendasiIntervensi}
                  onChange={(e) => setRekomendasiIntervensi(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-full px-4 py-3 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#185325] focus:border-[#185325] transition-all cursor-pointer shadow-sm appearance-none"
                >
                  <option value="" disabled>-- Pilih Rekomendasi Intervensi --</option>
                  <option value="Agroforesty">Agroforesty</option>
                  <option value="Silvopastura">Silvopastura</option>
                </select>
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-sm font-bold text-gray-800 mb-2">
                Catatan Staff PDAS
              </label>
              <div className="relative">
                <textarea 
                  rows={3}
                  maxLength={MAX_NOTES_LENGTH}
                  value={catatan}
                  onChange={(e) => setCatatan(e.target.value)}
                  placeholder="Ketik persetujuan administrasi atau rincian perbaikan jika dokumen ditolak..."
                  className="w-full bg-white border border-gray-300 rounded-3xl px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#185325] focus:border-[#185325] transition-all resize-none shadow-sm"
                ></textarea>
                <div className="absolute -bottom-6 right-2 text-[10px] font-bold text-gray-400">
                  {catatan.length}/{MAX_NOTES_LENGTH}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-end gap-4 mt-6">
              <button 
                type="button"
                onClick={(e) => handleSubmit(e, false)}
                className="w-full sm:w-auto px-8 py-3.5 bg-white border border-gray-300 text-gray-600 text-sm font-bold rounded-full hover:bg-gray-50 transition-colors active:scale-95 flex items-center justify-center gap-2"
              >
                <HiOutlineXCircle className="w-5 h-5" /> Tolak / Minta Revisi
              </button>
              <button 
                type="button"
                onClick={(e) => handleSubmit(e, true)}
                className="w-full sm:w-auto px-8 py-3.5 bg-[#185325] hover:bg-[#123d1c] text-white text-sm font-bold rounded-full transition-colors active:scale-95 shadow-md flex items-center justify-center gap-2"
              >
                <HiOutlineCheckCircle className="w-5 h-5" /> Setuju & Teruskan
              </button>
            </div>
          </form>
        )}

        {/* === TAMPILAN 2 & 3: DISETUJUI / DITOLAK (READ ONLY) === */}
        {detailData.status !== 'Menunggu Persetujuan' && (
          <div className="flex flex-col gap-6 animate-in fade-in duration-300 border-t border-gray-100 pt-8">
            
            <div className="flex flex-col gap-2">
              <h4 className="text-sm font-bold text-gray-800">Catatan Staff PDAS</h4>
              <p className="text-sm text-gray-500 text-justify leading-relaxed">{detailData.catatanStaff}</p>
            </div>

            {/* Field Tambahan Khusus Disetujui */}
            {detailData.status === 'Disetujui' && (
              <>
                <div className="flex flex-col gap-1.5">
                  <h4 className="text-sm font-bold text-gray-800">Rekomendasi Mitra CSR</h4>
                  <p className="text-sm text-gray-600">{detailData.rekomendasiMitra}</p>
                </div>
                <div className="flex flex-col gap-1.5">
                  <h4 className="text-sm font-bold text-gray-800">Rekomendasi Intervensi</h4>
                  <p className="text-sm text-gray-600">{detailData.rekomendasiIntervensi}</p>
                </div>
              </>
            )}

            <div className="flex items-center gap-3 mt-4">
              <span className="text-sm font-bold text-gray-800">Status :</span>
              <div className={`flex items-center gap-1.5 text-sm font-bold ${detailData.status === 'Disetujui' ? 'text-[#185325]' : 'text-red-600'}`}>
                {detailData.status} 
                {detailData.status === 'Disetujui' ? <HiCheck className="w-4 h-4 stroke-2" /> : <HiXMark className="w-4 h-4 stroke-2" />}
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default VerifikasiBerkasCSR;