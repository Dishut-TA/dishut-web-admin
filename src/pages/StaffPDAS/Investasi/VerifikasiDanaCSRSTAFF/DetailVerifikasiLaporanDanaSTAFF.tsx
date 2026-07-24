import React, { useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { HiOutlineChevronLeft, HiOutlineCheckCircle, HiOutlinePencil } from 'react-icons/hi2';
import toast from 'react-hot-toast';

const mockDatabase = [
  {
    id: 'CSR-001',
    namaProgram: 'Rehabilitasi Citarum',
    lokasi: 'Bandung Barat',
    tahap: 'Tahap 1',
    danaDisalurkan: 'Rp 100.000.000',
    totalRealisasi: 'Rp 20.000.000',
    rincianAnggaran: [
      { kegiatan: 'Pembersihan Lahan', tanggal: '01/01/2024', nominal: 'Rp. 8.000.000', bukti: 'Lihat' }
    ],
    status: 'Menunggu Verifikasi'
  },
  {
    id: 'CSR-002',
    namaProgram: 'Rehabilitasi Citarum',
    lokasi: 'Bandung Barat',
    tahap: 'Tahap 1',
    danaDisalurkan: 'Rp 100.000.000',
    totalRealisasi: 'Rp 20.000.000',
    rincianAnggaran: [
      { kegiatan: 'Pembelian Bibit', tanggal: '05/01/2024', nominal: 'Rp. 12.000.000', bukti: 'Lihat' }
    ],
    status: 'Terverifikasi'
  },
  {
    id: 'APBD-001',
    namaProgram: 'Rehabilitasi Citarum',
    lokasi: 'Bandung Barat',
    tahap: 'Tahap 1',
    danaDisalurkan: 'Rp 100.000.000',
    totalRealisasi: 'Rp 20.000.000',
    rincianAnggaran: [
      { kegiatan: 'Pembersihan Lahan', tanggal: '01/01/2024', nominal: 'Rp. 8.000.000', bukti: 'Lihat' }
    ],
    status: 'Revisi'
  }
];

const DetailVerifikasiLaporanDanaSTAFF: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams(); 

  const [catatan, setCatatan] = useState('');

  const detailData = useMemo(() => {
    return mockDatabase.find((item) => item.id === id) || mockDatabase[0];
  }, [id]);

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

  const InfoRow = ({ label, value }: { label: string, value: string }) => (
    <div className="grid grid-cols-[160px_20px_1fr] md:grid-cols-[200px_20px_1fr] mb-4 text-sm">
      <span className="text-gray-500">{label}</span>
      <span className="text-gray-500">:</span>
      <span className="font-bold text-gray-800">{value}</span>
    </div>
  );

  return (
    <div className="flex flex-col gap-6 w-full mx-auto pb-12 px-4 sm:px-0">
      
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center gap-2 text-sm font-bold text-gray-800 hover:text-[#185325] self-start transition-colors cursor-pointer"
      >
        <HiOutlineChevronLeft className="w-4 h-4 stroke-2" /> Kembali
      </button>

      <div>
        <div className="mb-10">
          <h1 className="text-2xl font-bold text-gray-800 inline-block pb-1">
            Detail Verifikasi
          </h1>
        </div>

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

        <div className="mb-10">
          <h3 className="font-bold text-gray-800 mb-4 border-b border-gray-100 pb-3 text-base">
            Rincian Penggunaan Dana
          </h3>
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left text-sm mb-4 border-b border-gray-300">
              <thead className="border-y border-gray-200 text-gray-600 uppercase text-xs tracking-wider">
                <tr>
                  <th className="py-4 font-semibold px-2 w-1/3">KEGIATAN</th>
                  <th className="py-4 font-semibold text-center w-1/4">TANGGAL</th>
                  <th className="py-4 font-semibold text-center w-1/4">NOMINAL</th>
                  <th className="py-4 font-semibold text-center">BUKTI TRANSAKSI</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {detailData.rincianAnggaran.map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-2 text-gray-800 font-bold">{item.kegiatan}</td>
                    <td className="py-4 text-gray-800 text-center">{item.tanggal}</td>
                    <td className="py-4 text-gray-800 text-center">{item.nominal}</td>
                    <td className="py-4 text-center">
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

        {detailData.status === 'Menunggu Verifikasi' ? (
          <div className="animate-in fade-in duration-300 mt-12">
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
                  className="w-full h-24 p-4 border border-gray-400 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#185325] focus:border-[#185325] resize-none text-gray-700 bg-white"
                />
                <div className="absolute -bottom-6 right-2 text-[10px] text-gray-400 font-medium">
                  {catatan.length}/100
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-end gap-4 mt-12">
              <button 
                onClick={handleRevisi}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-10 py-3 bg-white border border-gray-300 text-gray-600 text-sm font-bold rounded-full hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <HiOutlinePencil className="w-4 h-4" /> Minta Revisi
              </button>
              
              <button 
                onClick={handleVerifikasi}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-10 py-3 bg-[#185325] hover:bg-[#123d1c] text-white text-sm font-bold rounded-full transition-colors shadow-sm cursor-pointer"
              >
                <HiOutlineCheckCircle className="w-5 h-5" /> Verifikasi
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-12 flex items-center gap-4 animate-in fade-in duration-300">
            <span className="font-bold text-gray-800 text-base">Status :</span>
            <span className={`font-bold text-base ${
              detailData.status === 'Terverifikasi' ? 'text-[#185325]' : 'text-red-600'
            }`}>
              {detailData.status}
            </span>
          </div>
        )}

      </div>
    </div>
  );
};

export default DetailVerifikasiLaporanDanaSTAFF;