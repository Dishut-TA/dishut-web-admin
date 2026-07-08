import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineChevronLeft, HiOutlineDocumentArrowDown } from 'react-icons/hi2';
import toast from 'react-hot-toast';

const DetailLaporanKeuangan: React.FC = () => {
  const navigate = useNavigate();
//   const { id } = useParams();

  // Mock data untuk detail
  const detailData = {
    kthPelaksana: 'KTH Rimba',
    mitraCSR: 'PT Bank Jabar Banten',
    proyek: 'Rehabilitasi Citarum',
    tahapan: 'Tahap 1',
    rincianAnggaran: [
      { kategori: 'Pengadaan Bibit', nominal: 'Rp 10.000.000' }
    ],
    summary: {
      totalPengeluaran: 'Rp 10.000.000',
      sisaSaldo: 'Rp 90.000.000',
      dokumenBukti: 'KwitansiTahap1.pdf',
      totalBibit: '150 Pohon',
      isValid: true
    },
    catatanDinas: '"Berkas administrasi dan bukti kuitansi fisik telah diperiksa dan dinyatakan sesuai dengan target penanaman lapangan oleh Staff PDAS."'
  };

  const handleDownload = () => {
    toast.success('Mengunduh Surat Rekomendasi...');
  };

  return (
    <div className="flex flex-col gap-6 mx-auto pb-12">
      
      {/* Tombol Kembali */}
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center gap-2 text-sm font-bold text-gray-700 hover:text-[#185325] self-start transition-colors"
      >
        <HiOutlineChevronLeft className="w-4 h-4" strokeWidth={2.5} /> Kembali
      </button>

      {/* Container Utama */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-10">
        
        {/* Header Title */}
        <div className="mb-8 border-b border-gray-100 pb-6">
          <span className="inline-block px-3 py-1 bg-[#DCECE0] text-[#185325] text-xs font-bold rounded-md mb-3">
            Laporan Pertanggungjawaban Dana
          </span>
          <h1 className="text-2xl font-bold text-gray-800">
            Detail Realisasi Penggunaan Anggaran
          </h1>
        </div>

        {/* Grid Informasi Atas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12 mb-10 pb-8 border-b border-gray-100">
          <div>
            <p className="text-sm text-gray-500 mb-1">Kelompok Tani Hutan Pelaksana</p>
            <p className="text-sm font-bold text-gray-800">{detailData.kthPelaksana}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Nama Mitra CSR Pendana</p>
            <p className="text-sm font-bold text-gray-800">{detailData.mitraCSR}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Proyek Rehabilitasi</p>
            <p className="text-sm font-bold text-gray-800">{detailData.proyek}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Tahapan Laporan</p>
            <p className="text-sm font-bold text-gray-800">{detailData.tahapan}</p>
          </div>
        </div>

        {/* Tabel Rincian Anggaran */}
        <div className="mb-10">
          <h3 className="font-bold text-gray-800 mb-4 text-sm uppercase tracking-wide">Tabel Realisasi Anggaran KTH</h3>
          <div className="overflow-hidden border border-gray-200 rounded-xl max-w-xl">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#eff2ef] text-gray-600 font-semibold text-xs">
                <tr>
                  <th className="px-5 py-3">Kategori Pengeluaran</th>
                  <th className="px-5 py-3 text-right">Nominal Realisasi Lapangan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {detailData.rincianAnggaran.map((item, idx) => (
                  <tr key={idx} className="bg-white">
                    <td className="px-5 py-4 text-gray-800 font-medium">{item.kategori}</td>
                    <td className="px-5 py-4 text-right font-bold text-gray-800">{item.nominal}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary Fields */}
        <div className="mb-10 pb-8 border-b border-gray-100 space-y-3">
          <div className="flex items-center text-sm">
            <span className="w-56 text-gray-500">Total Pengeluaran Tahap 1</span>
            <span className="font-bold text-gray-800">: {detailData.summary.totalPengeluaran}</span>
          </div>
          <div className="flex items-center text-sm">
            <span className="w-56 text-gray-500">Sisa Saldo Dana CSR</span>
            <span className="font-bold text-gray-800">: {detailData.summary.sisaSaldo}</span>
          </div>
          <div className="flex items-center text-sm">
            <span className="w-56 text-gray-500">Dokumen Bukti Pendukung</span>
            <span className="font-bold underline text-gray-800 cursor-pointer hover:text-[#185325] italic">
              : {detailData.summary.dokumenBukti}
            </span>
          </div>
          <div className="flex items-center text-sm">
            <span className="w-56 text-gray-500">Total Bibit Tertanam</span>
            <div className="flex items-center gap-1 font-bold text-gray-800">
              : {detailData.summary.totalBibit} 
              {detailData.summary.isValid && <span className="text-[#185325]">(Valid)</span>}
            </div>
          </div>
        </div>

        {/* Catatan Dinas Kehutanan */}
        <div className="mb-12 text-sm flex items-start gap-2">
          <span className="w-48 text-gray-500 shrink-0">Catatan Dinas Kehutanan</span>
          <span className="font-bold text-gray-800 flex-1">
            : {detailData.catatanDinas}
          </span>
        </div>

        {/* Action Button */}
        <div className="flex justify-end">
          <button 
            onClick={handleDownload}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 bg-[#185325] hover:bg-[#123d1c] text-white text-sm font-bold rounded-full transition-colors shadow-sm"
          >
            <HiOutlineDocumentArrowDown className="w-5 h-5" /> Unduh Surat Rekomendasi (PDF)
          </button>
        </div>

      </div>
    </div>
  );
};

export default DetailLaporanKeuangan;