import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineMagnifyingGlass, HiOutlinePlus, HiOutlineEye } from 'react-icons/hi2';

const IndexBibit: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data berdasarkan dokumen CV. Calakan Bina Lingkungan
  const mockBibit = [
    { id: 'BBT-001', nama: 'Kaliandra (Calliandra calothyrsus)', kategori: 'Tanaman Kehutanan', sertifikasi: 'Sertifikat/Non Sertifikat', rentangHarga: 'Rp 2.800 - Rp 8.000' },
    { id: 'BBT-002', nama: 'Akasia Mangium (Acacia mangium)', kategori: 'Tanaman Kehutanan', sertifikasi: 'Sertifikat', rentangHarga: 'Rp 2.800 - Rp 7.000' },
    { id: 'BBT-017', nama: 'Durian', kategori: 'MPTS / Buah', sertifikasi: 'Benih Sebar (Okulasi)', rentangHarga: 'Rp 37.000 (Tetap)' },
    { id: 'BBT-020', nama: 'Alpukat', kategori: 'MPTS / Buah', sertifikasi: 'Bersertifikat & Berlabel', rentangHarga: 'Rp 35.500 (Tetap)' },
  ];

  return (
    <div className="flex flex-col gap-6 w-full max-w-screen-2xl mx-auto pb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Manajemen Data Bibit & Harga</h1>
          <p className="text-sm text-gray-500 mt-1">Kelola master data bibit beserta spesifikasi harga per tinggi tanaman.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative w-full sm:w-64">
            <HiOutlineMagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Cari bibit..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-xl text-sm focus:ring-[#009262] focus:border-[#009262] outline-none shadow-sm transition-all" 
            />
          </div>
          <button 
            onClick={() => navigate('/admin/staff/donasi/bibit/create')}
            className="bg-primary text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:shadow-lg hover:-translate-y-0.5 transition-all"
          >
            <HiOutlinePlus className="w-4 h-4" strokeWidth={2.5} /> Tambah Bibit
          </button>
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-gray-100 overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left whitespace-nowrap">
            <thead className="bg-[#DCECE0]/50 text-[#3A4D3F] text-xs uppercase tracking-wider font-bold border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Kode</th>
                <th className="px-6 py-4">Nama Spesies / Bibit</th>
                <th className="px-6 py-4">Kategori</th>
                <th className="px-6 py-4">Rentang Harga</th>
                <th className="px-6 py-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {mockBibit.map((item) => (
                <tr key={item.id} className="hover:bg-emerald-50/30 transition-colors">
                  <td className="px-6 py-4 text-xs font-bold text-gray-400">{item.id}</td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-bold text-gray-800">{item.nama}</div>
                    <div className="text-[11px] text-gray-500 mt-0.5">{item.sertifikasi}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                      item.kategori.includes('Kehutanan') ? 'bg-emerald-100 text-emerald-800' : 'bg-orange-100 text-orange-800'
                    }`}>
                      {item.kategori}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-[#185325]">{item.rentangHarga}</td>
                  <td className="px-6 py-4 flex justify-center">
                    <button 
                      onClick={() => navigate(`/admin/staff/donasi/bibit/detail/${item.id}`)}
                      className="p-2 text-gray-400 hover:text-[#185325] hover:bg-[#DCECE0] rounded-xl transition-all"
                      title="Lihat Detail"
                    >
                      <HiOutlineEye className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default IndexBibit;