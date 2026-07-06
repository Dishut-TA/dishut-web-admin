import { useNavigate } from 'react-router-dom';
import { HiOutlineFunnel, HiOutlinePrinter, HiPlus } from 'react-icons/hi2';

const LaporanKeuangan = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-6 w-full max-w-screen-2xl mx-auto pb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Laporan Keuangan</h1>
        <div className="flex flex-wrap items-center gap-3">
          <button 
            onClick={() => navigate('/admin/kth/laporan-investasi/keuangan/create')}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#185325] text-white text-sm font-bold rounded-lg hover:bg-[#123d1c] transition-colors w-full sm:w-auto justify-center"
          >
            <HiPlus className="w-5 h-5" /> Buat Laporan Keuangan
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-300 text-gray-700 text-sm font-semibold rounded-lg hover:bg-gray-50 transition-colors flex-1 sm:flex-none justify-center">
            <HiOutlineFunnel className="w-5 h-5" /> Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-300 text-gray-700 text-sm font-semibold rounded-lg hover:bg-gray-50 transition-colors flex-1 sm:flex-none justify-center">
            <HiOutlinePrinter className="w-5 h-5" /> Print
          </button>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-max">
            <thead className="bg-[#DCECE0] text-[#3A4D3F] text-xs uppercase tracking-wider font-bold">
              <tr>
                <th className="px-6 py-4 text-center w-16">No</th>
                <th className="px-6 py-4">Tanggal</th>
                <th className="px-6 py-4">Investasi</th>
                <th className="px-6 py-4">Biaya Pendapatan</th>
                <th className="px-6 py-4">Biaya Pengeluaran</th>
                <th className="px-6 py-4">Keuntungan</th>
                <th className="px-6 py-4">Kerugian</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4 text-center text-sm text-gray-700">1</td>
                <td className="px-6 py-4 text-sm text-gray-700">24/08/2025</td>
                <td className="px-6 py-4 text-sm font-bold text-gray-800">
                  Investasi Ekowisata Kebun Stroberi
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">Rp 10.000.000</td>
                <td className="px-6 py-4 text-sm text-gray-700">Rp 5.000.000</td>
                <td className="px-6 py-4 text-sm text-gray-700">Rp 5.000.000</td>
                <td className="px-6 py-4 text-sm text-gray-700">-</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LaporanKeuangan;