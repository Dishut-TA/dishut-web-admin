import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineFunnel, HiOutlineEye, HiOutlinePlus } from 'react-icons/hi2';

interface InvestasiKTH {
  id: string;
  no: number;
  nama: string;
  target: number;
  tenggatWaktu: string;
  status: 'Active' | 'Menunggu' | 'Selesai';
}

const mockData: InvestasiKTH[] = [
  {
    id: 'INV-001',
    no: 1,
    nama: 'Investasi Ekowisata Kebun Stroberi',
    target: 100000000,
    tenggatWaktu: '17/09/2025',
    status: 'Active'
  }
];

const DataInvestasiKTH: React.FC = () => {
  const navigate = useNavigate();

  const formatRupiah = (angka: number) => {
    return new Intl.NumberFormat('id-ID', { 
      style: 'currency', 
      currency: 'IDR', 
      maximumFractionDigits: 0 
    }).format(angka);
  };

  const renderStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return <span className="px-3 py-1 bg-[#DCECE0] text-[#185325] rounded-full text-xs font-bold">Active</span>;
      case 'Menunggu':
        return <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-bold">Menunggu</span>;
      default:
        return <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-bold">{status}</span>;
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-screen-2xl mx-auto pb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-800">
          Investasi
        </h1>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate('/admin/kth/investasi/data/create')}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#185325] hover:bg-[#123d1c] text-white text-sm font-bold rounded-lg transition-colors shadow-sm active:scale-95"
          >
            <HiOutlinePlus className="w-4 h-4" strokeWidth={2.5} /> Buat Investasi
          </button>
          
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-300 text-gray-700 text-sm font-bold rounded-lg hover:bg-gray-50 transition-colors shadow-sm active:scale-95">
            <HiOutlineFunnel className="w-4 h-4" /> Filter
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mt-2">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse min-w-225">
            <thead className="bg-[#DCECE0] text-[#3A4D3F] text-xs uppercase tracking-wider font-bold">
              <tr>
                <th className="px-6 py-4 whitespace-nowrap text-center w-16">No</th>
                <th className="px-6 py-4 whitespace-nowrap">Nama</th>
                <th className="px-6 py-4 whitespace-nowrap">Target</th>
                <th className="px-6 py-4 whitespace-nowrap text-center">Tenggat Waktu</th>
                <th className="px-6 py-4 whitespace-nowrap text-center">Status</th>
                <th className="px-6 py-4 whitespace-nowrap text-center w-24">Aksi</th>
              </tr>
            </thead>
            
            <tbody className="divide-y divide-gray-100">
              {mockData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-gray-700 text-center">
                    {item.no}
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-gray-800 whitespace-nowrap">
                    {item.nama}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-500 whitespace-nowrap">
                    {formatRupiah(item.target)}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800 text-center whitespace-nowrap">
                    {item.tenggatWaktu}
                  </td>
                  <td className="px-6 py-4 text-center whitespace-nowrap">
                    {renderStatusBadge(item.status)}
                  </td>
                  <td className="px-6 py-4 flex justify-center whitespace-nowrap">
                    <button 
                      title="Lihat Detail"
                      onClick={() => navigate(`/admin/kth/investasi/detail/${item.id}`)}
                      className="p-1.5 text-gray-500 hover:text-[#185325] hover:bg-[#DCECE0] rounded-full transition-colors"
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

export default DataInvestasiKTH;