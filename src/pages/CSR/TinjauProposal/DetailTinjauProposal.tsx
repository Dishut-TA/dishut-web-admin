import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  HiOutlineChevronLeft,
  HiOutlineUser,
  HiOutlineMapPin,
  HiOutlineXMark,
  HiOutlineCheckCircle,
} from "react-icons/hi2";
import toast from "react-hot-toast";

const DetailTinjauProposal: React.FC = () => {
  const navigate = useNavigate();
  // 1. Panggil useParams untuk mendapatkan ID dari URL saat ini
  const { id } = useParams(); 
  const [tanggapan, setTanggapan] = useState("");

  const detailData = {
    kthPengusul: 'KTH Rimba',
    ketuaKTH: 'Adam Malik',
    fileProposal: 'file.pdf',
    lokasi: 'Desa Sukamulya, Subang Jawa Barat',
    rencanaKemitraan: 'Rehabilitasi Lahan Subang',
    anggaran: 'Rp 80.000.000',
    rencanaKegiatan:
      "Lorem ipsum dolor sit amet consectetur. Faucibus faucibus urna nulla amet at nascetur. Enim aliquam sed nibh bibendum. Pulvinar nec risus et vulputate consequat tortor. Quisque tristique in dapibus laoreet eu augue. Maecenas quam eget habitant non. Lobortis lobortis dui phasellus sodales consectetur faucibus mauris eros odio. Diam tortor massa et venenatis ornare tristique nulla.",
  };

  const handleApprove = () => {
    if (!tanggapan) {
      toast.error("Harap isi tanggapan resmi perusahaan sebelum menyetujui.");
      return;
    }
    
    // 2. Arahkan ke halaman pendanaan dengan ID yang sama
    // Sesuaikan '/admin/csr/pendanaan/' dengan struktur routing di App.tsx kamu
    navigate(`/admin/csr/pendanaan/${id}`);
  };

  const handleReject = () => {
    if (!tanggapan) {
      toast.error("Harap isi tanggapan (alasan) sebelum menolak proposal.");
      return;
    }
    toast.error("Proposal ditolak.");
    navigate(-1);
  };

  return (
    <div className="flex flex-col gap-6 w-full mx-auto pb-12 relative">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm font-bold text-gray-700 hover:text-[#185325] self-start transition-colors cursor-pointer"
      >
        <HiOutlineChevronLeft className="w-4 h-4" strokeWidth={2.5} />
        Kembali
      </button>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-10 flex flex-col">
        <div className="mb-8">
          <span className="inline-block px-3 py-1 bg-[#DCECE0] text-[#185325] text-xs font-bold rounded-md mb-3">
            {id || 'CSR-001'}
          </span>
          <h1 className="text-2xl font-bold text-gray-800 uppercase">
            Tinjau Pengajuan
          </h1>
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

        <div className="pt-8 pb-8 border-b border-gray-100">
          <h3 className="text-sm font-bold text-gray-800 mb-2">
            Rencana Kegiatan Rehabilitasi
          </h3>
          <p className="text-sm text-gray-500 leading-relaxed text-justify">
            {detailData.rencanaKegiatan}
          </p>
        </div>

        <div className="pt-8 grid grid-cols-1 md:grid-cols-1 gap-8 flex-1">
          <div>
            <h1 className="text-sm font-bold text-gray-800 mb-2">
              Rekomendasi Mitra CSR
            </h1>
            <p className="mt-4 text-slate-500">PT. Indomaret</p>
          </div>
        </div>

        <div className="pt-8 flex-1">
          <label className="block text-sm font-bold text-gray-800 mb-3">
            Tanggapan Resmi Perusahaan <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <textarea
              value={tanggapan}
              onChange={(e) => setTanggapan(e.target.value)}
              placeholder="Tuliskan tanggapan atau catatan persetujuan pendanaan CSR di sini..."
              maxLength={500}
              className="w-full h-32 p-4 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#185325] focus:border-[#185325] resize-none"
            />
            <div className="absolute bottom-3 right-4 text-[10px] text-[#185325] font-medium">
              {tanggapan.length}/500
            </div>
          </div>
        </div>

        <div className="pt-8 mt-auto flex flex-col-reverse sm:flex-row justify-end items-center gap-4">
          <button
            onClick={handleReject}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-2.5 bg-gray-50 border border-gray-200 text-gray-600 text-sm font-bold rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <HiOutlineXMark className="w-4 h-4" /> Tolak Proposal
          </button>
          <button
            onClick={handleApprove}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-2.5 bg-[#185325] hover:bg-[#123d1c] text-white text-sm font-bold rounded-full transition-colors shadow-sm cursor-pointer"
          >
            <HiOutlineCheckCircle className="w-5 h-5" /> Setuju Pendanaan
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailTinjauProposal;