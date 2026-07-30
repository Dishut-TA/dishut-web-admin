import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { HiOutlineChevronLeft, HiXMark } from 'react-icons/hi2';

type StatusLaporan = 'Menunggu Verifikasi' | 'Diverifikasi' | 'Revisi';

const DATA_PENDAPATAN = [
  { tanggal: '01/01/2024', keterangan: 'Tiket Masuk', nominal: 'Rp. 80.000.000', dokumen: 'kwitansi.pdf' },
  { tanggal: '01/01/2024', keterangan: 'Camping', nominal: 'Rp. 40.000.000', dokumen: 'kwitansi.pdf' },
];

const DATA_PENGELUARAN = [
  { tanggal: '01/01/2024', keterangan: 'Gaji Pegawai', nominal: 'Rp. 40.000.000', dokumen: 'kwitansi.pdf' },
  { tanggal: '01/01/2024', keterangan: 'Operasional', nominal: 'Rp. 40.000.000', dokumen: 'kwitansi.pdf' },
];

const InfoRow = ({
  label,
  value,
  valueColor = "text-gray-800",
  isItalic = false
}: {
  label: string;
  value: string;
  valueColor?: string;
  isItalic?: boolean;
}) => (
  <div className="grid grid-cols-[200px_20px_1fr] items-start text-sm">
    <span className="text-gray-500">{label}</span>
    <span className="text-gray-500">:</span>
    <span className={`font-medium ${valueColor} ${isItalic ? 'italic' : ''}`}>{value}</span>
  </div>
);

const TransactionTable = ({
  title,
  data,
  total,
  isRevisi = false
}: {
  title: string;
  data: any[];
  total: string;
  isRevisi?: boolean;
}) => {
  return (
    <div className="mt-8">
      <h3 className="text-base font-bold text-gray-800 mb-4">{title}</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead>
            <tr className="border-b border-gray-300 text-gray-800">
              <th className="py-3 px-2 font-medium">Tanggal</th>
              <th className="py-3 px-2 font-medium">Keterangan</th>
              <th className="py-3 px-2 font-medium">Nominal</th>
              <th className="py-3 px-2 font-medium">Dokumen</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => {
              // Row menjadi merah jika statusnya Revisi DAN keterangannya 'Operasional' (sesuai gambar)
              const isError = isRevisi && row.keterangan === 'Operasional';
              const textColor = isError ? 'text-red-500' : 'text-gray-800';

              return (
                <tr key={idx} className={`border-b border-gray-200 ${textColor}`}>
                  <td className="py-3 px-2">{row.tanggal}</td>
                  <td className="py-3 px-2">{row.keterangan}</td>
                  <td className="py-3 px-2">{row.nominal}</td>
                  <td className="py-3 px-2 italic">{row.dokumen}</td>
                </tr>
              );
            })}
            <tr className="bg-[#DCECE0] text-gray-800 font-bold">
              <td colSpan={2} className="py-3 px-2">Total</td>
              <td colSpan={2} className="py-3 px-2">{total}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

const DetailLaporanKeuanganStaffBUPM: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [isModalRevisiOpen, setIsModalRevisiOpen] = useState(false);

  let statusLaporan: StatusLaporan = 'Menunggu Verifikasi';
  if (id === 'LK-002') statusLaporan = 'Diverifikasi';
  else if (id === 'LK-003') statusLaporan = 'Revisi';

  const getStatusDisplay = () => {
    if (statusLaporan === 'Menunggu Verifikasi') return { text: 'Menunggu Verifikasi', color: 'text-orange-500' };
    if (statusLaporan === 'Diverifikasi') return { text: 'Diverifikasi', color: 'text-emerald-600' };
    if (statusLaporan === 'Revisi') return { text: 'Revisi', color: 'text-red-500' };
    return { text: '', color: '' };
  };

  const statusDisplay = getStatusDisplay();

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto pb-20 animate-in fade-in duration-300 relative">
      <div className="relative mb-12 flex items-center justify-center">
        <button 
          onClick={() => navigate(-1)} 
          className="absolute left-0 flex items-center gap-2 text-sm font-bold text-[#185325] hover:underline"
        >
          <HiOutlineChevronLeft className="stroke-2" /> Kembali
        </button>
        <h1 className="text-2xl font-bold text-gray-800 mt-8 md:mt-0">Detail Laporan Keuangan</h1>
      </div>

      <div className="px-4 sm:px-0">
        <h3 className="text-base font-bold text-gray-800 mb-4">Informasi Laporan</h3>
        <div className="flex flex-col gap-3">
          <InfoRow label="Nama Investasi" value="Ekowisata Kebun Stroberi" />
          <InfoRow label="Periode" value="Januari - Juni 2025" />
          <InfoRow label="Tanggal Submit" value="5 Juli 2025" />
          <InfoRow label="Status" value={statusDisplay.text} valueColor={statusDisplay.color} />

          {statusLaporan === 'Revisi' && (
            <InfoRow
              label="Catatan"
              value="*Nominal biaya operasional tidak sesuai. Silakan perbaiki laporan kemudian kirim ulang.*"
              isItalic={true}
            />
          )}

          <div className="mt-4 flex flex-col gap-3">
            <InfoRow label="Total Pendapatan" value="Rp 120.000.000" />
            <InfoRow label="Total Pengeluaran" value="Rp 80.000.000" />
            <InfoRow label="Laba Bersih" value="Rp 40.000.000" />
          </div>
        </div>

        <TransactionTable
          title="Tabel Pendapatan"
          data={DATA_PENDAPATAN}
          total="Rp 120.000.000"
        />

        <TransactionTable
          title="Pengeluaran"
          data={DATA_PENGELUARAN}
          total="Rp 80.000.000"
          isRevisi={statusLaporan === 'Revisi'} 
        />

        <div className="bg-[#DCECE0] rounded-xl p-6 mt-10 max-w-2xl">
          <h3 className="text-base font-bold text-gray-800 mb-4">Ringkasan Pembagian Keuntungan</h3>
          <div className="flex flex-col gap-3">
            <InfoRow label="Laba Bersih" value="Rp 40.000.000" />
            <InfoRow label="KTH (60%)" value="Rp 24.000.000" />
            <InfoRow label="Investor (40%)" value="Rp 16.000.000" />
          </div>
        </div>

        {statusLaporan === 'Menunggu Verifikasi' && (
          <div className="flex flex-col sm:flex-row gap-4 mt-12 max-w-2xl">
            <button 
              onClick={() => setIsModalRevisiOpen(true)}
              className="flex-1 py-3.5 bg-[#FF0000] text-white text-sm font-bold rounded-full hover:bg-red-700 transition-colors shadow-sm active:scale-95"
            >
              Revisi
            </button>
            <button 
              className="flex-1 py-3.5 bg-[#185325] text-white text-sm font-bold rounded-full hover:bg-[#123d1c] transition-colors shadow-sm active:scale-95"
            >
              Setujui
            </button>
          </div>
        )}

      </div>

      {isModalRevisiOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl w-full max-w-md flex flex-col shadow-2xl relative animate-in zoom-in-95 duration-200 overflow-hidden border border-gray-100">
            
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
              <h2 className="text-base font-bold text-[#185325] mx-auto">Buat Revisi</h2>
              <button 
                onClick={() => setIsModalRevisiOpen(false)} 
                className="absolute right-4 p-1.5 text-gray-400 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors border border-gray-200"
              >
                <HiXMark className="w-4 h-4" strokeWidth={2} />
              </button>
            </div>

            <div className="p-6 flex flex-col gap-4">
              <div>
                <label className="text-sm font-bold text-gray-700 block mb-2">Deskripsi</label>
                <textarea 
                  rows={4} 
                  placeholder="Tulis keterangan perubahan" 
                  className="w-full text-sm p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#185325] resize-none"
                ></textarea>
              </div>
              <button 
                onClick={() => {
                  setIsModalRevisiOpen(false);
                }}
                className="w-full py-3 mt-2 bg-[#185325] text-white text-sm font-bold rounded-full hover:bg-[#123d1c] transition-colors shadow-sm active:scale-95"
              >
                Kirim
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default DetailLaporanKeuanganStaffBUPM;