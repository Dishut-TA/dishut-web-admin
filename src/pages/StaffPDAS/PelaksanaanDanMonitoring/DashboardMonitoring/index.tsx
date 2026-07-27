import React from 'react';
import {
  HiOutlineClipboardDocumentList,
  HiOutlineCheckCircle,
  HiOutlinePresentationChartLine,
  HiOutlineExclamationCircle,
  HiOutlineClock,
  HiOutlineDocumentArrowDown,
  HiOutlineMapPin,
  HiOutlineDocumentText,
  HiArrowRight,
  HiOutlineInformationCircle,
  HiOutlineShieldCheck
} from 'react-icons/hi2';
import { PiPlant } from 'react-icons/pi';

const DashboardMonitoring: React.FC = () => {
  const topStats = [
    { value: '24', label: 'Lokasi Menunggu\nValidasi', icon: <HiOutlineMapPin size={24} />, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { value: '16', label: 'Lokasi\nTervalidasi', icon: <HiOutlineClipboardDocumentList size={24} />, color: 'text-blue-600', bg: 'bg-blue-50' },
    { value: '48', label: 'Kegiatan\nBerjalan', icon: <HiOutlineCheckCircle size={24} />, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { value: '18', label: 'Kegiatan Siap\nMonitoring', icon: <HiOutlinePresentationChartLine size={24} />, color: 'text-orange-500', bg: 'bg-orange-50' },
    { value: '7', label: 'Perlu Tindak\nLanjut', icon: <HiOutlineExclamationCircle size={24} />, color: 'text-red-600', bg: 'bg-red-50' },
    { value: '9', label: 'Laporan Menunggu\nPersetujuan', icon: <HiOutlineDocumentText size={24} />, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  ];

  const barData = [
    { name: 'CDK Cimanuk', total: 36, validasi: 6, berjalan: 18, monitoring: 8, tindak: 4 },
    { name: 'CDK Citarum', total: 28, validasi: 5, berjalan: 14, monitoring: 6, tindak: 3 },
    { name: 'CDK Ciliwung', total: 21, validasi: 4, berjalan: 10, monitoring: 4, tindak: 3 },
    { name: 'CDK Citanduy', total: 15, validasi: 3, berjalan: 7, monitoring: 3, tindak: 2 },
    { name: 'CDK Cisangkuy', total: 12, validasi: 2, berjalan: 5, monitoring: 3, tindak: 2 },
  ];

  return (
    <div className="flex flex-col gap-6 w-full max-w-screen-2xl mx-auto pb-8">
      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-1">
            Dashboard Monitoring
          </h1>
          <p className="text-gray-500 text-sm">
            Ringkasan status kegiatan monitoring berbasis bukti
          </p>
        </div>
        
        <div className="flex gap-3">
          <div className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl border border-gray-200 shadow-sm text-sm font-medium text-gray-600 whitespace-nowrap">
            <HiOutlineClock className="w-4 h-4 text-gray-400" />
            <span>Update terakhir: 28 April 2026</span>
          </div>
          <button className="bg-[#185325] hover:bg-[#123d1c] text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-colors flex items-center gap-2 shadow-sm cursor-pointer">
            <HiOutlineDocumentArrowDown className="w-5 h-5" />
            Ekspor Rekap
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {topStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 lg:p-5 flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="flex flex-col sm:flex-row sm:items-start gap-3">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${stat.bg} ${stat.color}`}>
                {stat.icon}
              </div>
              <div className="mt-1 sm:mt-0">
                <h3 className="text-2xl font-bold text-gray-800 leading-none mb-1.5">{stat.value}</h3>
                <p className="text-[11px] text-gray-500 font-bold whitespace-pre-line leading-tight">{stat.label}</p>
              </div>
            </div>
            
            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center gap-1">
              <a href="#" className={`text-[11px] font-bold flex items-center gap-1 hover:opacity-70 transition-opacity ${stat.color}`}>
                Lihat Detail <HiArrowRight />
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 xl:col-span-2">
          
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8 gap-4">
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              Kegiatan per CDK <HiOutlineInformationCircle className="text-gray-400" />
            </h2>
            <select className="border border-gray-200 text-sm rounded-lg px-4 py-2 outline-none font-bold text-gray-600 bg-white cursor-pointer">
              <option>Semua CDK</option>
            </select>
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-6 mb-8 text-[11px] font-bold text-gray-600 uppercase">
            <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-sm bg-emerald-500"></span> Validasi</div>
            <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-sm bg-blue-500"></span> Berjalan</div>
            <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-sm bg-orange-400"></span> Monitoring</div>
            <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-sm bg-red-500"></span> Tindak Lanjut</div>
          </div>

          <div className="relative h-64 flex mt-4 pl-4 sm:pl-8">
            <div className="absolute -left-2 sm:-left-4 top-1/2 -rotate-90 text-[10px] font-bold text-gray-400 -translate-y-1/2 uppercase tracking-wider">
              Jumlah Kegiatan
            </div>

            <div className="flex flex-col justify-between h-full text-[11px] font-bold text-gray-400 pr-3 pb-6">
              <span>40</span><span>30</span><span>20</span><span>10</span><span>0</span>
            </div>

            <div className="flex-1 flex justify-around items-end pb-6 border-b border-gray-200 relative">
              <div className="absolute inset-0 flex flex-col justify-between pb-6 pointer-events-none">
                <div className="w-full border-t border-gray-100 border-dashed"></div>
                <div className="w-full border-t border-gray-100 border-dashed"></div>
                <div className="w-full border-t border-gray-100 border-dashed"></div>
                <div className="w-full border-t border-gray-100 border-dashed"></div>
                <div className="w-full"></div>
              </div>

              {barData.map((d, i) => (
                <div key={i} className="relative flex flex-col items-center w-8 sm:w-12 z-10 h-full justify-end group">
                  <span className="text-xs font-bold text-gray-800 mb-1">{d.total}</span>
                  
                  <div className="w-full flex flex-col justify-end rounded-t-md overflow-hidden hover:opacity-90 transition-opacity" style={{ height: `${(d.total / 40) * 100}%` }}>
                    <div className="bg-emerald-500 w-full flex items-center justify-center text-[10px] text-white font-bold" style={{ height: `${(d.validasi / d.total) * 100}%` }}>{d.validasi}</div>
                    <div className="bg-blue-500 w-full flex items-center justify-center text-[10px] text-white font-bold" style={{ height: `${(d.berjalan / d.total) * 100}%` }}>{d.berjalan}</div>
                    <div className="bg-orange-400 w-full flex items-center justify-center text-[10px] text-white font-bold" style={{ height: `${(d.monitoring / d.total) * 100}%` }}>{d.monitoring}</div>
                    <div className="bg-red-500 w-full flex items-center justify-center text-[10px] text-white font-bold" style={{ height: `${(d.tindak / d.total) * 100}%` }}>{d.tindak}</div>
                  </div>
                  
                  <span className="absolute -bottom-7 text-[10px] sm:text-xs font-bold text-gray-500 whitespace-nowrap text-center">
                    {d.name.replace('CDK ', 'CDK\n')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 xl:col-span-1 flex flex-col">
          <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-8">
            <PiPlant className="text-emerald-600" size={22} /> Ringkasan Bibit
          </h2>
          
          <div className="flex flex-col sm:flex-row xl:flex-col items-center justify-center gap-10 flex-1">
            
            <div className="flex flex-col items-center">
              <div 
                className="relative w-44 h-44 rounded-full flex items-center justify-center" 
                style={{ background: 'conic-gradient(#22c55e 92.5%, #f1f5f9 0)' }}
              >
                <div className="w-36 h-36 bg-white rounded-full flex flex-col items-center justify-center z-10 shadow-inner">
                  <span className="font-bold text-2xl text-gray-800 leading-none">18.500</span>
                  <span className="text-xs font-bold text-gray-500 text-center mt-1.5 leading-tight">dari 20.000<br/>bibit</span>
                </div>
              </div>
              <div className="mt-6 text-center">
                <span className="text-2xl font-bold text-gray-800">92,5%</span><br/>
                <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">Capaian Target</span>
              </div>
            </div>

            <div className="flex flex-col gap-5 w-full sm:w-auto xl:w-full">
              
              <div className="flex items-center gap-4 bg-gray-50/50 p-3 rounded-xl border border-gray-100">
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                  <PiPlant size={22} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Total Target Bibit</p>
                  <p className="text-base font-bold text-gray-800">20.000 <span className="text-xs font-semibold text-gray-500">bibit</span></p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-gray-50/50 p-3 rounded-xl border border-gray-100">
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                  <PiPlant size={22} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Total Bibit Tertanam</p>
                  <p className="text-base font-bold text-gray-800">18.500 <span className="text-xs font-semibold text-gray-500">bibit</span></p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-gray-50/50 p-3 rounded-xl border border-gray-100">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 shrink-0">
                  <HiOutlineShieldCheck size={22} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Sisa Target</p>
                  <p className="text-base font-bold text-gray-800">1.500 <span className="text-xs font-semibold text-gray-500">bibit</span></p>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default DashboardMonitoring;