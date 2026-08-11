import { useNavigate } from 'react-router-dom';
import { HiOutlineFunnel, HiPlus, HiOutlineEye } from 'react-icons/hi2';

const LaporanKeuangan = () => {
  const navigate = useNavigate();

  const MOCK_DATA = [
    { id: 1, periode: 'Jan - Juni 2025', investasi: 'Ekowisata Kebun Stroberi', pendapatan: 'Rp 120.000.000', pengeluaran: 'Rp 80.000.000', laba: 'Rp 40.000.000', status: 'Menunggu Verifikasi' },
    { id: 2, periode: 'Jan - Juni 2025', investasi: 'Ekowisata Kebun Stroberi', pendapatan: 'Rp 120.000.000', pengeluaran: 'Rp 80.000.000', laba: 'Rp 40.000.000', status: 'Diverifikasi' },
    { id: 3, periode: 'Jan - Juni 2025', investasi: 'Ekowisata Kebun Stroberi', pendapatan: 'Rp 120.000.000', pengeluaran: 'Rp 80.000.000', laba: 'Rp 40.000.000', status: 'Revisi' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Menunggu Verifikasi': return 'text-orange-500 font-bold';
      case 'Diverifikasi': return 'text-emerald-600 font-bold';
      case 'Revisi': return 'text-red-500 font-bold';
      default: return 'text-gray-700';
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-screen-2xl mx-auto pb-8 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Laporan Keuangan</h1>
        <div className="flex flex-wrap items-center gap-3">
          <button 
            onClick={() => navigate('/admin/kth/laporan-investasi/keuangan/create')}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#185325] text-white text-sm font-bold rounded-lg hover:bg-[#123d1c] transition-colors shadow-sm w-full sm:w-auto justify-center"
          >
            <HiPlus className="w-4 h-4" /> Buat Laporan Keuangan
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-300 text-gray-700 text-sm font-bold rounded-lg hover:bg-gray-50 transition-colors shadow-sm flex-1 sm:flex-none justify-center">
            <HiOutlineFunnel className="w-4 h-4" /> Filter
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto min-h-75">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-[#DCECE0] text-[#3A4D3F] text-xs uppercase tracking-wider font-bold border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 w-16 text-center">No</th>
                <th className="px-6 py-4">Periode</th>
                <th className="px-6 py-4">Nama Proyek</th>
                <th className="px-6 py-4">Total Pendapatan</th>
                <th className="px-6 py-4">Total Pengeluaran</th>
                <th className="px-6 py-4">Laba Bersih</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
              {MOCK_DATA.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 text-center">{item.id}</td>
                  <td className="px-6 py-4">{item.periode}</td>
                  <td className="px-6 py-4 font-bold text-gray-800">{item.investasi}</td>
                  <td className="px-6 py-4">{item.pendapatan}</td>
                  <td className="px-6 py-4">{item.pengeluaran}</td>
                  <td className="px-6 py-4">{item.laba}</td>
                  <td className={`px-6 py-4 ${getStatusColor(item.status)}`}>{item.status}</td>
                  <td className="px-6 py-4 text-center">
                    <button onClick={() => {navigate (`/admin/kth/laporan-investasi/keuangan/detail/${item.id}`)}} className="p-1.5 text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors border border-transparent hover:border-emerald-200">
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

export default LaporanKeuangan;