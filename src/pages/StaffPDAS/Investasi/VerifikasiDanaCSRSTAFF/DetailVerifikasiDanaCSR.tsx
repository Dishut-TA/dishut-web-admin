import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineChevronLeft, HiOutlineCheckCircle, HiOutlinePencil } from 'react-icons/hi2';
import toast from 'react-hot-toast';

const DetailVerifikasiDanaCSR: React.FC = () => {
  const navigate = useNavigate();
  const [catatan, setCatatan] = useState('');

  // Mock data untuk detail disesuaikan dengan gambar
  const detailData = {
    namaProgram: 'Rehabilitasi Citarum',
    lokasi: 'Bandung Barat',
    tahap: 'Tahap 1',
    danaDisalurkan: 'Rp 100.000.000',
    totalRealisasi: 'Rp 25.000.000',
    rincianAnggaran: [
      { kegiatan: 'Pembersihan Lahan', tanggal: '01/01/2024', nominal: 'Rp. 8.000.000', bukti: 'Lihat' }
    ],
  };

  const handleRevisi = () => {
    if (!catatan) {
      toast.error('Harap isi catatan verifikasi sebelum meminta revisi.');
      return;
    }
    toast.error('Berkas dikembalikan untuk direvisi.');
    navigate(-1);
  };

  const handleVerifikasi = () => {
    toast.success('Laporan dana berhasil diverifikasi!');
    navigate(-1);
  };

  // Komponen Helper untuk baris Informasi Program
  const InfoRow = ({ label, value }: { label: string, value: string }) => (
    <div className="grid grid-cols-[160px_20px_1fr] md:grid-cols-[200px_20px_1fr] mb-4 text-sm">
      <span className="text-gray-500">{label}</span>
      <span className="text-gray-500">:</span>
      <span className="font-bold text-gray-800">{value}</span>
    </div>
  );

  return (
    <div className="flex flex-col gap-6 w-full mx-auto pb-12">
      
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center gap-2 text-sm font-bold text-gray-800 hover:text-[#185325] self-start transition-colors cursor-pointer"
      >
        <HiOutlineChevronLeft className="w-4 h-4 stroke-2" /> Kembali
      </button>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-10">
        <div className="mb-10">
          <h1 className="text-2xl font-bold text-gray-800">
            Detail Verifikasi
          </h1>
        </div>

        {/* Informasi Program */}
        <div className="mb-10">
          <h3 className="font-bold text-gray-800 mb-6 border-b border-gray-100 pb-3 text-base">
            Informasi Program
          </h3>
          <InfoRow label="Nama Program" value={detailData.namaProgram} />
          <InfoRow label="Lokasi" value={detailData.lokasi} />
          <InfoRow label="Tahap" value={detailData.tahap} />
          <InfoRow label="Dana Disalurkan" value={detailData.danaDisalurkan} />
          <InfoRow label="Total Realisasi" value={detailData.totalRealisasi} />
        </div>

        {/* Rincian Penggunaan Dana */}
        <div className="mb-10">
          <h3 className="font-bold text-gray-800 mb-4 border-b border-gray-100 pb-3 text-base">
            Rincian Penggunaan Dana
          </h3>
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left text-sm mb-4">
              <thead className="border-y border-gray-200 text-gray-600 uppercase text-xs tracking-wider">
                <tr>
                  <th className="py-4 font-semibold px-2">KEGIATAN</th>
                  <th className="py-4 font-semibold">TANGGAL</th>
                  <th className="py-4 font-semibold">NOMINAL</th>
                  <th className="py-4 font-semibold">BUKTI TRANSAKSI</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 border-b border-gray-200">
                {detailData.rincianAnggaran.map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-2 text-gray-800 font-bold">{item.kegiatan}</td>
                    <td className="py-4 text-gray-600">{item.tanggal}</td>
                    <td className="py-4 text-gray-600">{item.nominal}</td>
                    <td className="py-4">
                      <button className="text-gray-600 underline hover:text-[#185325] transition-colors cursor-pointer">
                        {item.bukti}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Catatan Verifikasi */}
        <div className="mb-8">
          <h3 className="font-bold text-gray-800 mb-3 text-sm">
            Catatan Verifikasi
          </h3>
          <div className="relative">
            <textarea
              value={catatan}
              onChange={(e) => setCatatan(e.target.value)}
              placeholder="Contoh: Sangat direkomendasikan karena .."
              maxLength={100}
              className="w-full h-24 p-4 border border-gray-400 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#185325] focus:border-[#185325] resize-none text-gray-700 bg-gray-50/30"
            />
            <div className="absolute -bottom-6 right-2 text-[10px] text-gray-400 font-medium">
              {catatan.length}/100
            </div>
          </div>
        </div>

        {/* Tombol Aksi */}
        <div className="flex flex-col sm:flex-row items-center justify-end gap-4 mt-12">
          <button 
            onClick={handleRevisi}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-10 py-3 bg-white border border-gray-300 text-gray-600 text-sm font-bold rounded-full hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <HiOutlinePencil className="w-4 h-4" /> Revisi
          </button>
          
          <button 
            onClick={handleVerifikasi}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-10 py-3 bg-[#185325] hover:bg-[#123d1c] text-white text-sm font-bold rounded-full transition-colors shadow-sm cursor-pointer"
          >
            <HiOutlineCheckCircle className="w-5 h-5" /> Verifikasi
          </button>
        </div>

      </div>
    </div>
  );
};

export default DetailVerifikasiDanaCSR;