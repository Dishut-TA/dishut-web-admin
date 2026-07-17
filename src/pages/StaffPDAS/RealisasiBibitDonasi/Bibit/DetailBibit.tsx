import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineArrowLeft, HiOutlinePencilSquare, HiOutlineCheckBadge } from 'react-icons/hi2';

const DetailBibit: React.FC = () => {
  const navigate = useNavigate();

  // Mock data yang merefleksikan dokumen CV. Calakan Bina Lingkungan (Akasia Mangium)
  const bibitData = {
    id: 'BBT-002',
    nama: 'Akasia Mangium (Acacia mangium)',
    kategori: 'Tanaman Kehutanan',
    sertifikasi: 'Sertifikat',
    spesifikasiHarga: [
      { id: 1, spek: 'Tinggi Batang 30 - 60 cm', harga: 2800 },
      { id: 2, spek: 'Tinggi Batang 61 - 100 cm', harga: 3500 },
      { id: 3, spek: 'Tinggi Batang > 100 cm', harga: 7000 },
    ]
  };

  const formatRupiah = (angka: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka);
  };

  return (
    <div className="w-full max-w-4xl mx-auto pb-12">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="p-2.5 rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors shadow-sm"
          >
            <HiOutlineArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Detail Master Bibit</h1>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 text-gray-700 text-sm font-bold rounded-xl hover:bg-gray-50 transition-colors shadow-sm">
          <HiOutlinePencilSquare className="w-4 h-4" /> Edit Data
        </button>
      </div>

      <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white overflow-hidden p-8">
        
        {/* Header Profil Bibit */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-10 pb-8 border-b border-gray-100">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase tracking-wider rounded-full">
                {bibitData.kategori}
              </span>
              <span className="text-xs font-bold text-gray-400">ID: {bibitData.id}</span>
            </div>
            <h2 className="text-3xl font-black text-[#185325] mb-2">{bibitData.nama}</h2>
            <div className="flex items-center gap-1.5 text-sm font-semibold text-gray-600">
              <HiOutlineCheckBadge className="w-5 h-5 text-blue-500" />
              Status: {bibitData.sertifikasi}
            </div>
          </div>
        </div>

        {/* Tabel Harga Berdasarkan Ukuran */}
        <div>
          <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-4">Struktur Harga Berdasarkan Spesifikasi</h3>
          
          <div className="border border-gray-200 rounded-2xl overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-600 text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4 border-b border-gray-200">Spesifikasi Ukuran Tanaman</th>
                  <th className="px-6 py-4 border-b border-gray-200 text-right">Harga Per Batang</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {bibitData.spesifikasiHarga.map((item) => (
                  <tr key={item.id} className="hover:bg-emerald-50/30 transition-colors">
                    <td className="px-6 py-4 text-sm font-bold text-gray-700">
                      {item.spek}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-lg font-black text-[#185325]">
                        {formatRupiah(item.harga)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-4 p-4 bg-blue-50/50 rounded-xl border border-blue-100 flex items-start gap-3">
            <div className="mt-0.5 text-blue-500 font-bold text-lg">ℹ</div>
            <p className="text-xs text-blue-800 leading-relaxed">
              Harga di atas dihitung berdasarkan penawaran katalog vendor dan digunakan sistem untuk mengkalkulasi estimasi anggaran secara otomatis saat Kelompok Tani atau CSR melakukan penyusunan RAB rehabilitasi lahan.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DetailBibit;