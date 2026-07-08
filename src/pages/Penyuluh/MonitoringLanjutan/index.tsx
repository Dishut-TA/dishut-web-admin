import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlinePlus, HiOutlinePencilSquare } from 'react-icons/hi2';

interface MonitoringData {
  id: string;
  namaProgram: string;
  mitra: string;
  bibitDitanam: number;
  kondisiLahan: string;
  status: 'DALAM PELAKSANAAN' | 'PERLU PERBAIKAN';
  catatanDinas?: string;
}

const mockData: MonitoringData[] = [
  {
    id: 'MON-001',
    namaProgram: 'Agroforestri Mandiri',
    mitra: 'KTH Tani Maju',
    bibitDitanam: 0,
    kondisiLahan: '-',
    status: 'DALAM PELAKSANAAN',
    catatanDinas: ''
  },
  {
    id: 'MON-002',
    namaProgram: 'Reboisasi Gunung B',
    mitra: 'KTH Lestari',
    bibitDitanam: 150,
    kondisiLahan: 'Cerah, warga antusias',
    status: 'PERLU PERBAIKAN',
    catatanDinas: '*Berkas administrasi dan bukti kuitansi fisik telah diperiksa dan dinyatakan tidak sesuai dengan target penanaman lapangan oleh Staff PDAS.'
  }
];

const MonitoringLanjutanIndex: React.FC = () => {
  const navigate = useNavigate();
  const [data] = useState<MonitoringData[]>(mockData);

  return (
    <div className="flex flex-col gap-6 w-full max-w-screen-2xl mx-auto pb-8">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-1">Monitoring Lanjutan</h1>
          <p className="text-sm text-gray-500">Laporkan progres pertumbuhan bibit secara berkala.</p>
        </div>
        <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold shadow-sm">
          Online
        </span>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse min-w-225">
            <thead className="bg-[#DCECE0] text-[#3A4D3F] text-xs uppercase tracking-wider font-bold">
              <tr>
                <th className="px-6 py-4 whitespace-nowrap">Nama Program</th>
                <th className="px-6 py-4 whitespace-nowrap">Kondisi Terakhir</th>
                <th className="px-6 py-4 whitespace-nowrap">Status & Catatan</th>
                <th className="px-6 py-4 whitespace-nowrap text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-5 whitespace-nowrap">
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-bold text-gray-800">{item.namaProgram}</span>
                      <span className="text-xs font-semibold text-[#185325] bg-[#DCECE0] px-2 py-0.5 rounded-full w-max">
                        {item.mitra}
                      </span>
                    </div>
                  </td>
                  
                  <td className="px-6 py-5">
                    <div className="flex flex-col gap-1 text-sm">
                      <div><span className="text-gray-500">Bibit Ditanam:</span> <span className="font-bold text-gray-800">{item.bibitDitanam}</span></div>
                      <div><span className="text-gray-500">Kondisi:</span> <span className="text-gray-800">{item.kondisiLahan}</span></div>
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex flex-col gap-2 max-w-xs">
                      {item.status === 'DALAM PELAKSANAAN' ? (
                        <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-[10px] font-bold whitespace-nowrap w-max uppercase tracking-wider">
                          DALAM PELAKSANAAN
                        </span>
                      ) : (
                        <span className="px-3 py-1 bg-red-50 text-red-700 rounded-full text-[10px] font-bold whitespace-nowrap w-max uppercase tracking-wider">
                          PERLU PERBAIKAN
                        </span>
                      )}
                      
                      {item.catatanDinas && (
                        <p className="text-[11px] text-red-600 font-medium leading-relaxed italic">
                          {item.catatanDinas}
                        </p>
                      )}
                    </div>
                  </td>

                  <td className="px-6 py-5 whitespace-nowrap text-center">
                    {item.status === 'PERLU PERBAIKAN' ? (
                       <button 
                         onClick={() => navigate(`/admin/penyuluh/monitoring-lanjutan/form/${item.id}?mode=perbaikan`)}
                         className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-full transition-colors active:scale-95 shadow-sm"
                       >
                         <HiOutlinePencilSquare className="w-4 h-4" /> Lapor Perbaikan
                       </button>
                    ) : (
                       <button 
                         onClick={() => navigate(`/admin/penyuluh/monitoring-lanjutan/form/${item.id}?mode=input`)}
                         className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-white border border-[#185325] text-[#185325] hover:bg-[#f0f9f3] text-xs font-bold rounded-full transition-colors active:scale-95 shadow-sm"
                       >
                         <HiOutlinePlus className="w-4 h-4" /> Input Monitoring
                       </button>
                    )}
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

export default MonitoringLanjutanIndex;