import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  HiOutlineArrowLeft, 
  HiOutlineInformationCircle,
  HiOutlineMapPin,
  HiOutlineMagnifyingGlass,
  HiOutlineFunnel,
  HiEllipsisVertical
} from 'react-icons/hi2';
import { PiPlant, PiFileText, PiHourglassHigh, PiCalendarBlank } from 'react-icons/pi';
import InputDataModal from './components/InputDataModal';
import EditDataModal from './components/EditDataModal';

const MOCK_TANAMAN = [
  { id: 'PRG26-0088-001', jenis: 'Rhizophora', geotag: '6.841232° S\n107.564891° E', tinggiAwal: '15 cm', tglAwal: '12 Jun 2026, 08:10', imgAwal: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=100&q=80', imgBaru: null, tglBaru: null, tinggiBaru: '-', kondisi: null, status: null },
  { id: 'PRG26-0088-002', jenis: 'Avicennia', geotag: '6.841315° S\n107.564905° E', tinggiAwal: '18 cm', tglAwal: '12 Jun 2026, 08:11', imgAwal: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=100&q=80', imgBaru: null, tglBaru: null, tinggiBaru: '-', kondisi: null, status: null },
  { id: 'PRG26-0088-006', jenis: 'Sonneratia', geotag: '6.841647° S\n107.564870° E', tinggiAwal: '14 cm', tglAwal: '12 Jun 2026, 08:15', imgAwal: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=100&q=80', imgBaru: 'https://images.unsplash.com/photo-1511497584788-876760111969?w=100&q=80', tglBaru: '26 Jun 2026\n09:12', tinggiBaru: '33 cm', kondisi: 'Sehat', status: 'Hidup' },
  { id: 'PRG26-0088-007', jenis: 'Rhizophora', geotag: '6.841732° S\n107.564912° E', tinggiAwal: '20 cm', tglAwal: '12 Jun 2026, 08:16', imgAwal: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=100&q=80', imgBaru: 'https://images.unsplash.com/photo-1511497584788-876760111969?w=100&q=80', tglBaru: '26 Jun 2026\n09:15', tinggiBaru: '50 cm', kondisi: 'Sehat', status: 'Hidup' },
];

const DetailMonitoringProgram: React.FC = () => {
  const navigate = useNavigate();
  
  // State untuk mengontrol Modal
  const [modalInputOpen, setModalInputOpen] = useState(false);
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const handleOpenInput = (item: any) => { setSelectedItem(item); setModalInputOpen(true); };
  const handleOpenEdit = (item: any) => { setSelectedItem(item); setModalEditOpen(true); };

  // Helper component untuk tag jenis tanaman
  const JenisTag = ({ jenis }: { jenis: string }) => {
    const isRhi = jenis === 'Rhizophora'; const isAvi = jenis === 'Avicennia';
    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold border ${isRhi ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : isAvi ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-orange-50 text-orange-600 border-orange-100'}`}>
        <PiPlant className="w-3 h-3" /> {jenis}
      </span>
    );
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-screen-2xl mx-auto pb-12 animate-in fade-in duration-300">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-gray-800 mt-1">Detail Monitoring Program Rehabilitasi</h1>
      </div>

      {/* Info Program Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col gap-5">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="w-16 h-16 rounded-full bg-[#EBF8F1] text-[#185325] flex items-center justify-center shrink-0">
            <PiPlant className="w-8 h-8" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-8 text-xs w-full mt-1">
            <div className="grid grid-cols-[110px_10px_1fr]"><span className="text-gray-500 font-medium">ID Program</span><span>:</span><span className="font-bold text-gray-800">PRG-2026-0088</span></div>
            <div className="grid grid-cols-[110px_10px_1fr]"><span className="text-gray-500 font-medium">Sumber Dana</span><span>:</span><span className="font-bold text-gray-800">APBD</span></div>
            <div className="grid grid-cols-[110px_10px_1fr]"><span className="text-gray-500 font-medium">Nama Program</span><span>:</span><span className="font-bold text-gray-800">Rehabilitasi Mangrove Karangsong</span></div>
            <div className="grid grid-cols-[110px_10px_1fr]"><span className="text-gray-500 font-medium">Periode Monitoring</span><span>:</span><span className="font-bold text-gray-800">2 dari 4</span></div>
            <div className="grid grid-cols-[110px_10px_1fr]"><span className="text-gray-500 font-medium">Lokasi</span><span>:</span><span className="font-bold text-gray-800">Desa Karangsong, Kec. Indramayu</span></div>
            <div className="grid grid-cols-[110px_10px_1fr]"><span className="text-gray-500 font-medium">Target Tanaman</span><span>:</span><span className="font-bold text-gray-800">2.500 pohon</span></div>
          </div>
        </div>
        <div className="bg-[#F0FDF4] border border-[#DCFCE7] rounded-xl p-3 flex gap-3 items-center">
          <HiOutlineInformationCircle className="w-5 h-5 text-[#00A859] shrink-0" />
          <p className="text-xs font-bold text-[#185325]">Setiap tanaman wajib memiliki 1 foto sebelum pelaksanaan dan 1 foto sesudah monitoring.</p>
        </div>
      </div>

      {/* 4 Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-full"><PiPlant className="w-6 h-6"/></div>
          <div><p className="text-[10px] font-bold text-gray-500">Target Tanaman</p><p className="text-2xl font-bold text-gray-800 leading-none mt-1">2.500</p><p className="text-[10px] font-medium text-gray-500 mt-1">pohon</p></div>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-full"><PiFileText className="w-6 h-6"/></div>
          <div><p className="text-[10px] font-bold text-gray-500">Sudah Diinput</p><p className="text-2xl font-bold text-gray-800 leading-none mt-1">18</p><p className="text-[10px] font-medium text-gray-500 mt-1">pohon</p></div>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-orange-50 text-orange-500 rounded-full"><PiHourglassHigh className="w-6 h-6"/></div>
          <div><p className="text-[10px] font-bold text-gray-500">Belum Diinput</p><p className="text-2xl font-bold text-gray-800 leading-none mt-1">2.482</p><p className="text-[10px] font-medium text-gray-500 mt-1">pohon</p></div>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-full"><PiCalendarBlank className="w-6 h-6"/></div>
          <div><p className="text-[10px] font-bold text-gray-500">Periode Aktif</p><p className="text-2xl font-bold text-gray-800 leading-none mt-1">2 dari 4</p><p className="text-[10px] font-medium text-gray-500 mt-1">Periode</p></div>
        </div>
      </div>

      {/* Main Table Area */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col overflow-hidden">
        <div className="p-5 border-b border-gray-50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h3 className="font-bold text-gray-800">Data Monitoring Tanaman <span className="text-gray-400 font-medium text-sm">(18 Data)</span></h3>
          <div className="flex w-full md:w-auto gap-3">
            <div className="relative w-full md:w-64">
              <HiOutlineMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input type="text" placeholder="Cari ID Tanaman atau Lokasi..." className="w-full pl-9 pr-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-emerald-500" />
            </div>
            <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-xs font-bold text-gray-700 hover:bg-gray-50">
              <HiOutlineFunnel className="w-4 h-4"/> Filter
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs whitespace-nowrap">
            <thead className="text-[10px] font-bold text-gray-500 border-b border-gray-100 text-center uppercase tracking-wider">
              <tr>
                <th className="py-4 pl-6 pr-2">No</th>
                <th className="py-4 px-2 text-left">ID Tanaman</th>
                <th className="py-4 px-2 text-left">Jenis Tanaman</th>
                <th className="py-4 px-2">Geotag / Koordinat</th>
                <th className="py-4 px-2">Tinggi Awal<br/><span className="text-[8px] font-medium text-gray-400">(Saat Tanam)</span></th>
                <th className="py-4 px-2">Foto Sebelum<br/><span className="text-[8px] font-medium text-gray-400">(Pelaksanaan)</span></th>
                <th className="py-4 px-2">Foto Sesudah<br/><span className="text-[8px] font-medium text-gray-400">(Monitoring)</span></th>
                <th className="py-4 px-2">Tinggi Saat Monitoring<br/><span className="text-[8px] font-medium text-gray-400">(Saat Monitoring)</span></th>
                <th className="py-4 px-2">Kondisi Tanaman</th>
                <th className="py-4 px-2">Status</th>
                <th className="py-4 px-2">Tanggal Monitoring</th>
                <th className="py-4 pr-6 pl-2">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {MOCK_TANAMAN.map((item, idx) => (
                <tr key={idx} className="hover:bg-gray-50/50 text-center">
                  <td className="py-3 pl-6 pr-2 font-bold text-gray-700">{idx + 1}</td>
                  <td className="py-3 px-2 font-bold text-gray-800 text-left">{item.id}</td>
                  <td className="py-3 px-2 text-left"><JenisTag jenis={item.jenis} /></td>
                  <td className="py-3 px-2 text-[10px] font-medium text-gray-600 whitespace-pre-line leading-snug"><div className="flex items-center justify-center gap-1"><HiOutlineMapPin className="w-3.5 h-3.5"/> {item.geotag}</div></td>
                  <td className="py-3 px-2 font-bold text-gray-700">{item.tinggiAwal}</td>
                  <td className="py-3 px-2 text-[9px] font-medium text-gray-500">
                    <img src={item.imgAwal} className="w-14 h-8 object-cover rounded mx-auto mb-1" alt="Seblum" />
                    {item.tglAwal}
                  </td>
                  <td className="py-3 px-2 text-[9px] font-medium text-gray-500">
                    {item.imgBaru ? (
                      <><img src={item.imgBaru} className="w-14 h-8 object-cover rounded mx-auto mb-1" alt="Sesudah" />{item.tglBaru}</>
                    ) : (<span className="text-gray-400 block mt-2">-<br/>Belum diinput</span>)}
                  </td>
                  <td className="py-3 px-2 font-bold text-gray-800">{item.tinggiBaru}</td>
                  <td className="py-3 px-2">
                    {item.kondisi ? <span className="text-emerald-600 font-bold">{item.kondisi}</span> : <span className="text-gray-300">-</span>}
                  </td>
                  <td className="py-3 px-2">
                    {item.status ? <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#EBF8F1] text-[#185325] border border-[#C6EBD6]">{item.status}</span> : <span className="text-gray-300">-</span>}
                  </td>
                  <td className="py-3 px-2 text-[10px] whitespace-pre-line text-gray-500 font-medium">
                    {item.tglBaru || '-'}
                  </td>
                  <td className="py-3 pr-6 pl-2">
                    <div className="flex items-center justify-center gap-2">
                      {!item.imgBaru ? (
                        <button onClick={() => handleOpenInput(item)} className="px-3 py-1.5 text-[10px] font-bold border border-emerald-500 text-emerald-600 rounded bg-white hover:bg-emerald-50 transition-colors">Input Data</button>
                      ) : (
                        <button onClick={() => handleOpenEdit(item)} className="px-3 py-1.5 text-[10px] font-bold border border-emerald-500 text-emerald-600 rounded bg-white hover:bg-emerald-50 transition-colors">Edit</button>
                      )}
                      <button className="text-gray-400 hover:text-gray-700"><HiEllipsisVertical className="w-4 h-4"/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer / Pagination */}
        <div className="p-5 border-t border-gray-50 flex justify-between items-center text-xs text-gray-500">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors shadow-sm">
             <HiOutlineArrowLeft className="w-4 h-4 stroke-2" /> Kembali
          </button>
          <div className="flex items-center gap-6">
            <span>Menampilkan 1 - 10 dari 18 data</span>
            <div className="flex gap-1">
              <button className="px-2.5 py-1 rounded border border-gray-200 hover:bg-gray-50">&lt;</button>
              <button className="px-2.5 py-1 rounded bg-[#185325] text-white font-medium">1</button>
              <button className="px-2.5 py-1 rounded border border-gray-200 hover:bg-gray-50 font-medium">2</button>
              <button className="px-2.5 py-1 rounded border border-gray-200 hover:bg-gray-50">&gt;</button>
            </div>
            <div className="flex items-center gap-2">
              Tampilkan <select className="border border-gray-200 rounded px-2 py-1"><option>10</option></select> data per halaman
            </div>
          </div>
        </div>
      </div>

      {/* Render Modals conditionally */}
      {modalInputOpen && <InputDataModal item={selectedItem} onClose={() => setModalInputOpen(false)} />}
      {modalEditOpen && <EditDataModal item={selectedItem} onClose={() => setModalEditOpen(false)} />}
      
    </div>
  );
};

export default DetailMonitoringProgram;