import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  HiChevronRight, 
  HiOutlineInformationCircle,
  HiCheck,
  HiChevronDown,
  HiOutlineCamera,
  HiXMark,
  HiOutlineMapPin,
  HiOutlineArrowRight,
  HiOutlineArrowLeft,
  HiOutlineAdjustmentsHorizontal,
  HiOutlineBars3,
  HiEllipsisVertical,
  HiOutlineArrowPath,
  HiOutlineDocumentArrowDown,
  HiOutlineDocumentText,
  HiOutlineCheckCircle,
  HiOutlinePhoto,
  HiOutlineUserGroup,
  HiOutlinePlus,
  HiOutlinePencil,
  HiOutlineClock,
  HiOutlineSquare2Stack,
  HiOutlineCalendar,
  HiOutlineUser,
  HiCheckCircle,
  HiOutlineMap,
  HiOutlineEye,
  HiChevronLeft
} from 'react-icons/hi2';
import { PiLeaf, PiPlant, PiTree } from 'react-icons/pi';
import { BiMapAlt } from 'react-icons/bi';

const PelaksanaanWizard: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<number>(2);
  const [isAgreed, setIsAgreed] = useState<boolean>(false);

  const nextStep = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 2) setCurrentStep(currentStep - 1);
    else navigate(-1); 
  };

  const handleSubmit = () => {
    navigate('/admin/penyuluh/pelaksanaan-penanaman');
  };

  const renderStepper = () => {
    const steps = [
      { num: 1, title: 'Informasi Penugasan', status: 'Selesai' },
      { num: 2, title: 'Pembentukan Poligon PU', status: currentStep === 2 ? 'Sedang dikerjakan' : currentStep > 2 ? 'Selesai' : 'Belum dimulai' },
      { num: 3, title: 'Input Tanaman per PU', status: currentStep === 3 ? 'Sedang dikerjakan' : currentStep > 3 ? 'Selesai' : 'Belum dimulai' },
      { num: 4, title: 'Dokumentasi Kegiatan', status: currentStep === 4 ? 'Sedang dikerjakan' : currentStep > 4 ? 'Selesai' : 'Belum dimulai' },
      { num: 5, title: 'Review & Kirim', status: currentStep === 5 ? 'Sedang dikerjakan' : 'Belum dimulai' },
    ];

    return (
      <div className="flex items-center w-full mb-6 overflow-x-auto custom-scrollbar pb-2">
        {steps.map((step, index) => {
          const isCompleted = step.status === 'Selesai';
          const isActive = currentStep === step.num;
          
          return (
            <React.Fragment key={step.num}>
              <div className={`flex items-center gap-3 shrink-0 ${!isCompleted && !isActive ? 'opacity-50' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold border-2 
                  ${isCompleted ? 'bg-[#008A4B] border-[#008A4B] text-white' : 
                    isActive ? 'bg-[#008A4B] border-[#008A4B] text-white' : 
                    'bg-white border-gray-300 text-gray-400'}`}
                >
                  {isCompleted ? <HiCheck className="w-5 h-5" /> : step.num}
                </div>
                <div className="flex flex-col">
                  <span className={`text-sm font-bold ${isActive ? 'text-[#008A4B]' : 'text-slate-900'}`}>{step.title}</span>
                  <span className={`text-xs font-medium ${isActive ? 'text-[#008A4B]' : 'text-slate-500'}`}>{step.status}</span>
                </div>
              </div>
              {index < steps.length - 1 && (
                <HiOutlineArrowRight className="w-5 h-5 text-gray-300 mx-4 shrink-0" />
              )}
            </React.Fragment>
          );
        })}
      </div>
    );
  };

  const renderStep2 = () => (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-24">
      <div className="lg:col-span-3 space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
          <div className="flex justify-between items-center mb-4">
             <h3 className="font-bold text-slate-900">Informasi Kegiatan</h3>
             <HiOutlineInformationCircle className="w-4 h-4 text-slate-400" />
          </div>
          <div className="space-y-3 text-xs">
            <div className="flex"><span className="w-2/5 text-slate-500">ID Penugasan</span><span className="w-3/5 text-emerald-700 font-bold">TGS-2026-018</span></div>
            <div className="flex"><span className="w-2/5 text-slate-500">ID Program</span><span className="w-3/5 text-slate-900 font-medium">PRG-2026-0021</span></div>
            <div className="flex"><span className="w-2/5 text-slate-500">Program</span><span className="w-3/5 text-slate-900 font-medium">Rehabilitasi DAS Cimanuk</span></div>
            <div className="flex"><span className="w-2/5 text-slate-500">Lokasi</span><span className="w-3/5 text-slate-900 font-medium">Desa Mandalakasih,<br/>Kec. Pameungpeuk,<br/>Kab. Garut</span></div>
            <div className="flex"><span className="w-2/5 text-slate-500">KTH</span><span className="w-3/5 text-slate-900 font-medium">KTH Lestari</span></div>
            <div className="flex"><span className="w-2/5 text-slate-500">Jenis Kegiatan</span><span className="w-3/5 text-slate-900 font-medium">Penanaman</span></div>
            <div className="flex"><span className="w-2/5 text-slate-500">Jenis Tanaman</span><span className="w-3/5 text-slate-900 font-medium">Mangrove Rhizophora</span></div>
            <div className="flex"><span className="w-2/5 text-slate-500">Target Bibit</span><span className="w-3/5 text-slate-900 font-medium">600 bibit</span></div>
            <div className="flex"><span className="w-2/5 text-slate-500">Jumlah PU</span><span className="w-3/5 text-slate-900 font-medium">12 PU</span></div>
            <div className="flex"><span className="w-2/5 text-slate-500">Target per PU</span><span className="w-3/5 text-slate-900 font-medium">50 bibit</span></div>
            <div className="flex"><span className="w-2/5 text-slate-500">Periode</span><span className="w-3/5 text-slate-900 font-medium">18 Jun 2026 - 03 Jul 2026<br/><span className="text-red-500 font-bold text-[10px]">(1 hari lagi)</span></span></div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
          <div className="flex justify-between items-center mb-4">
             <h3 className="font-bold text-slate-900">Ringkasan PU</h3>
             <HiOutlineDocumentText className="w-4 h-4 text-slate-400" />
          </div>
          <div className="space-y-2 text-xs border-b border-slate-100 pb-4 mb-4">
            <div className="flex justify-between"><span className="text-slate-500 flex items-center gap-2"><BiMapAlt className="w-4 h-4"/> Total PU</span><span className="font-bold text-blue-600">12</span></div>
            <div className="flex justify-between"><span className="text-slate-500 flex items-center gap-2"><HiOutlineCheckCircle className="w-4 h-4"/> PU Selesai</span><span className="font-bold text-emerald-600">0</span></div>
            <div className="flex justify-between"><span className="text-slate-500 flex items-center gap-2"><HiOutlineArrowPath className="w-4 h-4"/> PU Dalam Proses</span><span className="font-bold text-orange-500">1</span></div>
            <div className="flex justify-between"><span className="text-slate-500 flex items-center gap-2"><HiOutlineClock className="w-4 h-4"/> PU Belum Dibuat</span><span className="font-bold text-blue-600">11</span></div>
          </div>
          <div className="grid grid-cols-2 gap-4 text-xs mb-3">
             <div><span className="text-slate-500 block mb-1">Luas Total (Target)</span><span className="font-bold text-blue-700 text-sm">2,40 ha</span></div>
             <div><span className="text-slate-500 block mb-1">Luas Terpetakan</span><span className="font-bold text-emerald-600 text-sm">0,18 ha</span></div>
          </div>
          <div className="flex justify-between items-end mb-1 text-[10px]"><span className="text-slate-500">Persentase</span><span className="font-bold text-emerald-600">8%</span></div>
          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-emerald-500" style={{ width: '8%' }}></div></div>
        </div>
      </div>

      {/* TENGAH: Peta Lokasi Kegiatan */}
      <div className="lg:col-span-6 space-y-4">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
          <div className="px-5 py-4 border-b border-slate-100 flex justify-between items-center bg-white">
            <h3 className="font-bold text-slate-900">Peta Lokasi Kegiatan</h3>
            <BiMapAlt className="w-5 h-5 text-slate-400" />
          </div>
          <div className="w-full h-100 bg-slate-100 relative bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800')] bg-cover bg-center">
            {/* Dark Overlay for map */}
            <div className="absolute inset-0 bg-black/20"></div>
            
            {/* Mock Polygon */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
               <polygon points="150,80 350,120 400,250 250,350 100,250" fill="rgba(16, 185, 129, 0.4)" stroke="white" strokeWidth="2" strokeDasharray="5,5" />
               <circle cx="150" cy="80" r="6" fill="#10B981" stroke="white" strokeWidth="2" />
               <circle cx="350" cy="120" r="6" fill="#10B981" stroke="white" strokeWidth="2" />
               <circle cx="400" cy="250" r="6" fill="#10B981" stroke="white" strokeWidth="2" />
               <circle cx="250" cy="350" r="6" fill="#10B981" stroke="white" strokeWidth="2" />
               <circle cx="100" cy="250" r="6" fill="#10B981" stroke="white" strokeWidth="2" />
            </svg>

            {/* Info tooltip on map */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-900/80 backdrop-blur text-white p-3 rounded-lg text-center z-20 shadow-lg border border-slate-700/50">
               <p className="font-bold text-sm mb-0.5">PU 1</p>
               <p className="text-[10px] text-orange-400 font-semibold mb-1">Sedang dibuat</p>
               <p className="text-[10px]">Perkiraan luas: 0,18 ha</p>
            </div>

            {/* Map Controls */}
            <div className="absolute right-4 top-4 flex flex-col gap-2 z-20">
              <div className="bg-white rounded shadow-sm flex flex-col overflow-hidden">
                <button className="p-2 border-b border-slate-100 hover:bg-slate-50 text-slate-700 font-bold">+</button>
                <button className="p-2 hover:bg-slate-50 text-slate-700 font-bold">-</button>
              </div>
              <button className="bg-white p-2 rounded shadow-sm hover:bg-slate-50 text-slate-700">
                <HiOutlineMapPin className="w-4 h-4" />
              </button>
              <button className="bg-white p-2 rounded shadow-sm hover:bg-slate-50 text-slate-700">
                <HiOutlineSquare2Stack className="w-4 h-4" />
              </button>
            </div>

            {/* Actions on Map */}
            <div className="absolute bottom-4 right-4 flex gap-2 z-20">
               <button className="bg-white text-slate-700 px-4 py-2 rounded-lg text-xs font-bold shadow hover:bg-slate-50">Batalkan PU</button>
               <button className="bg-[#008A4B] text-white px-4 py-2 rounded-lg text-xs font-bold shadow hover:bg-emerald-800">Simpan PU 1</button>
            </div>
            
            <div className="absolute bottom-4 left-4 text-white text-[10px] font-medium drop-shadow-md">
               50 m | 
            </div>
          </div>
          
          <div className="p-4 bg-white border-t border-slate-100">
             <h4 className="text-xs font-bold text-slate-800 mb-3">Cara Menggambar Poligon</h4>
             <div className="grid grid-cols-5 gap-2 text-center text-[9px] font-medium text-slate-600">
                <div><div className="w-10 h-10 bg-emerald-50 text-emerald-600 mx-auto rounded mb-1 flex items-center justify-center"><HiOutlineMapPin className="w-5 h-5"/></div>1. Klik pada peta untuk menambahkan titik awal</div>
                <div><div className="w-10 h-10 bg-emerald-50 text-emerald-600 mx-auto rounded mb-1 flex items-center justify-center"><PiTree className="w-5 h-5"/></div>2. Klik titik berikutnya untuk membentuk sisi poligon</div>
                <div><div className="w-10 h-10 bg-emerald-50 text-emerald-600 mx-auto rounded mb-1 flex items-center justify-center"><HiOutlineAdjustmentsHorizontal className="w-5 h-5"/></div>3. Minimal 3 titik untuk membentuk poligon</div>
                <div><div className="w-10 h-10 bg-emerald-50 text-emerald-600 mx-auto rounded mb-1 flex items-center justify-center"><HiOutlineCheckCircle className="w-5 h-5"/></div>4. Klik titik awal untuk menutup poligon</div>
                <div><div className="w-10 h-10 bg-emerald-50 text-emerald-600 mx-auto rounded mb-1 flex items-center justify-center"><HiOutlineDocumentArrowDown className="w-5 h-5"/></div>5. Simpan PU yang telah dibuat</div>
             </div>
          </div>
        </div>
      </div>

      {/* KANAN: Daftar PU */}
      <div className="lg:col-span-3">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col h-145">
           <div className="p-4 border-b border-slate-100">
              <button className="w-full py-2 border border-[#008A4B] text-[#008A4B] rounded-lg text-xs font-bold flex justify-center items-center gap-1 hover:bg-emerald-50 transition-colors">
                <HiOutlinePlus className="w-4 h-4"/> Tambah PU <HiChevronDown className="w-3 h-3 ml-2"/>
              </button>
           </div>
           <div className="p-4 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-sm font-bold text-slate-800">Daftar PU (12)</h3>
              <HiOutlineInformationCircle className="w-4 h-4 text-slate-400" />
           </div>
           <div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
              {/* Item PU 1 Sedang Dibuat */}
              <div className="flex items-center justify-between p-3 bg-orange-50 border border-orange-100 rounded-lg">
                 <div className="flex items-center gap-3">
                    <HiOutlineBars3 className="w-4 h-4 text-slate-400" />
                    <span className="text-xs font-bold text-slate-800">PU 1</span>
                    <span className="text-[9px] bg-orange-100 text-orange-600 px-1.5 py-0.5 rounded font-bold">Sedang Dibuat</span>
                 </div>
                 <div className="flex items-center gap-3">
                    <span className="text-[10px] font-medium text-slate-600">0,18 ha</span>
                    <HiOutlinePencil className="w-4 h-4 text-slate-500 cursor-pointer hover:text-slate-800" />
                 </div>
              </div>
              {/* Items PU Belum Dibuat */}
              {[2,3,4,5,6,7,8,9,10,11,12].map(num => (
                <div key={num} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg border border-transparent border-b-slate-100 last:border-b-transparent">
                   <div className="flex items-center gap-3">
                      <HiOutlineBars3 className="w-4 h-4 text-slate-300" />
                      <span className="text-xs font-medium text-slate-600">PU {num}</span>
                      <span className="text-[9px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded font-bold">Belum Dibuat</span>
                   </div>
                   <div className="flex items-center gap-3">
                      <span className="text-[10px] text-slate-400">-</span>
                      <HiEllipsisVertical className="w-4 h-4 text-slate-400 cursor-pointer" />
                   </div>
                </div>
              ))}
           </div>
           <div className="p-4 border-t border-slate-100">
              <button className="w-full py-2.5 border border-slate-200 text-slate-700 rounded-lg text-xs font-bold flex justify-center items-center gap-2 hover:bg-slate-50 transition-colors shadow-sm">
                <HiOutlineDocumentText className="w-4 h-4"/> Lihat Ringkasan Semua PU
              </button>
           </div>
        </div>
      </div>
    </div>
  );

  // ==========================================================================
  // STEP 3: INPUT DATA TANAMAN PER PU
  // ==========================================================================
  const renderStep3 = () => (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-24">
      {/* Kolom Kiri: Info PU */}
      <div className="lg:col-span-3 space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
          <h3 className="font-bold text-slate-900 mb-4">Informasi PU Aktif</h3>
          <span className="inline-block px-3 py-1 bg-[#008A4B] text-white text-xs font-bold rounded mb-4 shadow-sm">PU 5</span>
          
          <div className="space-y-3 text-xs">
            <div className="flex gap-4">
              <span className="w-1/3 text-slate-500">Lokasi</span>
              <span className="w-2/3 text-slate-900 font-medium leading-relaxed">Desa Mandalakasih,<br/>Kec. Pameungpeuk,<br/>Kab. Garut</span>
            </div>
            <div className="flex gap-4">
              <span className="w-1/3 text-slate-500">KTH</span>
              <span className="w-2/3 text-slate-900 font-medium">KTH Lestari</span>
            </div>
            <div className="flex gap-4">
              <span className="w-1/3 text-slate-500">Jenis Kegiatan<br/>Program</span>
              <span className="w-2/3 text-slate-900 font-medium leading-relaxed">Penanaman<br/>Mangrove</span>
            </div>
            <div className="flex gap-4">
              <span className="w-1/3 text-slate-500">Jenis Tanaman</span>
              <span className="w-2/3 text-slate-900 font-medium leading-relaxed">Rhizophora apiculata,<br/>Avicennia marina</span>
            </div>
          </div>

          <hr className="my-4 border-slate-100" />
          
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-500">Target di PU ini</span>
              <span className="font-bold text-slate-900">50 tanaman</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Sudah Input</span>
              <span className="font-bold text-slate-900">12 tanaman</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Sisa Target</span>
              <span className="font-bold text-slate-900">38 tanaman</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
          <h3 className="font-bold text-slate-900 mb-4 text-sm">Progress Input PU 5</h3>
          <div className="flex justify-between items-end mb-2">
            <span className="text-xs font-bold text-[#008A4B]">12 <span className="text-slate-500 font-normal">/ 50 tanaman</span></span>
            <span className="text-xs font-bold text-slate-900">24%</span>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mb-5">
            <div className="h-full bg-[#008A4B] rounded-full" style={{ width: '24%' }}></div>
          </div>
          <button className="w-full py-2.5 border border-[#008A4B] text-[#008A4B] rounded-lg font-bold text-xs hover:bg-emerald-50 flex justify-center items-center gap-2 transition-colors shadow-sm">
            <HiOutlineArrowPath className="w-4 h-4" /> Ganti PU
          </button>
        </div>
      </div>

      {/* Kolom Tengah: Form Input */}
      <div className="lg:col-span-5 space-y-6">
        {/* INFO BANNER */}
        <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-xl p-4 flex items-start gap-3 text-xs text-[#166534] shadow-sm">
          <HiOutlineInformationCircle className="w-5 h-5 text-[#008A4B] shrink-0 mt-0.5" />
          <p className="leading-relaxed">Setiap tanaman wajib difoto, diambil koordinatnya, dan diisi tinggi tanamannya. Pastikan data akurat karena akan digunakan untuk monitoring dan evaluasi.</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-900">Tambah Data Tanaman</h3>
            <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded text-[10px] font-bold">Tanaman ke-13 <span className="font-normal text-slate-500">dari 50</span></span>
          </div>

          <form className="space-y-5">
            <div>
              <label className="block text-[11px] font-bold text-slate-800 mb-2">1. Jenis Tanaman <span className="text-red-500">*</span></label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <PiLeaf className="h-4 w-4 text-[#008A4B]" />
                </div>
                <select className="w-full pl-9 pr-10 py-2.5 border border-slate-300 rounded-lg text-xs focus:ring-[#008A4B] focus:border-[#008A4B] appearance-none bg-white font-semibold text-slate-900 shadow-sm">
                  <option>Rhizophora apiculata</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <HiChevronDown className="h-4 w-4 text-slate-400" />
                </div>
              </div>
              <button type="button" className="text-blue-600 text-[10px] font-bold mt-2 flex items-center gap-1 hover:underline">
                + Tambah jenis tanaman baru
              </button>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-800 mb-2">2. Tinggi Tanaman <span className="text-red-500">*</span></label>
              <div className="relative">
                <input type="number" defaultValue="45" className="w-full pl-3 pr-12 py-2.5 border border-slate-300 rounded-lg text-xs font-semibold text-slate-900 focus:ring-[#008A4B] focus:border-[#008A4B] shadow-sm" />
                <div className="absolute inset-y-0 right-0 px-3 border-l border-slate-300 flex items-center bg-slate-50 rounded-r-lg">
                  <span className="text-slate-500 text-[11px] font-medium">cm</span>
                </div>
              </div>
              <p className="text-[10px] text-slate-500 mt-1.5">Ukur dari pangkal batang (di atas permukaan tanah) sampai ujung daun tertinggi.</p>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-800 mb-2">3. Foto Tanaman <span className="text-red-500">*</span></label>
              <div className="grid grid-cols-2 gap-4 mb-3">
                <div className="relative rounded-lg overflow-hidden border border-slate-200 h-28 group">
                  <img src="https://images.unsplash.com/photo-1621360841013-c76831f13885?q=80&w=600" alt="Mangrove" className="w-full h-full object-cover" />
                  <button type="button" className="absolute top-1.5 right-1.5 bg-white rounded-full p-1 text-red-500 shadow border border-slate-100 hover:bg-red-50">
                    <HiXMark className="w-3.5 h-3.5" />
                  </button>
                </div>
                <button type="button" className="rounded-lg border border-dashed border-slate-300 bg-slate-50 flex flex-col items-center justify-center h-28 hover:bg-slate-100 transition-colors">
                  <HiOutlineCamera className="w-6 h-6 text-slate-400 mb-1.5" />
                  <span className="text-xs font-bold text-slate-700">Ambil Foto</span>
                  <span className="text-[9px] text-slate-400 mt-0.5">atau klik untuk upload</span>
                  <span className="text-[8px] text-slate-400 mt-1">Format: JPG, JPEG, PNG<br/>Maks. 5MB</span>
                </button>
              </div>
              <div className="bg-yellow-50 border border-yellow-100 text-yellow-800 text-[10px] px-3 py-2.5 rounded-lg flex items-start gap-2">
                <HiOutlineInformationCircle className="w-4 h-4 text-yellow-600 shrink-0 mt-0.5" />
                <p className="leading-relaxed">Pastikan foto jelas, menampilkan seluruh tanaman dan kondisi sekitarnya.</p>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-800 mb-2">4. Koordinat Lokasi (Otomatis) <span className="text-red-500">*</span></label>
              <div className="grid grid-cols-2 gap-4 mb-3">
                <div>
                  <span className="block text-[10px] text-slate-500 mb-1">Latitude</span>
                  <input type="text" readOnly value="-7.6321456" className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-xs bg-slate-50 font-semibold text-slate-700 shadow-sm" />
                </div>
                <div>
                  <span className="block text-[10px] text-slate-500 mb-1">Longitude</span>
                  <input type="text" readOnly value="107.6587921" className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-xs bg-slate-50 font-semibold text-slate-700 shadow-sm" />
                </div>
              </div>
              <button type="button" className="w-full py-2.5 border border-[#008A4B] text-[#008A4B] rounded-lg font-bold text-xs hover:bg-emerald-50 flex justify-center items-center gap-2 transition-colors shadow-sm">
                <HiOutlineMapPin className="w-4 h-4" /> Perbarui Lokasi
              </button>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-800 mb-2">5. Catatan (Opsional)</label>
              <textarea rows={2} placeholder="Contoh: Tanaman tumbuh baik, akar kuat..." className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-xs focus:ring-[#008A4B] focus:border-[#008A4B] resize-none shadow-sm"></textarea>
              <div className="text-right text-[10px] text-slate-400 mt-1">0 / 250</div>
            </div>

            <div className="flex gap-3 justify-end pt-4 border-t border-slate-100">
              <button type="button" className="px-5 py-2.5 text-slate-600 font-bold text-xs hover:bg-slate-50 rounded-lg transition-colors border border-slate-200 shadow-sm bg-white">
                Batal
              </button>
              <button type="button" className="px-5 py-2.5 bg-white border border-[#008A4B] text-[#008A4B] font-bold text-xs hover:bg-emerald-50 rounded-lg transition-colors flex items-center gap-2 shadow-sm">
                <HiCheck className="w-4 h-4" /> Simpan Tanaman
              </button>
              <button type="button" className="px-5 py-2.5 bg-[#008A4B] text-white font-bold text-xs hover:bg-emerald-800 rounded-lg transition-colors shadow-sm">
                Simpan & Tambah Berikutnya
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Kolom Kanan: Daftar & Ringkasan */}
      <div className="lg:col-span-4 space-y-6">
        
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-slate-900 text-sm">Daftar Tanaman di PU 5</h3>
            <div className="flex gap-2">
              <button className="px-2.5 py-1.5 border border-slate-300 rounded-md text-[10px] font-bold flex items-center gap-1 hover:bg-slate-50 shadow-sm text-slate-700">
                <HiOutlineAdjustmentsHorizontal className="w-3.5 h-3.5" /> Filter
              </button>
              <button className="p-1.5 border border-slate-300 rounded-md hover:bg-slate-50 text-slate-600 shadow-sm">
                <HiOutlineBars3 className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <p className="text-xs font-bold text-[#008A4B] mb-4">12 <span className="font-normal text-slate-500">dari 50 tanaman</span></p>

          <div className="space-y-4 mb-4">
            {/* Daftar Item Mock */}
            {[
              { id: 1, name: 'Rhizophora apiculata', time: '16 Jun 2026, 08:15', coords: '-7.631234, 107.658123', height: '40 cm', img: 'https://images.unsplash.com/photo-1621360841013-c76831f13885?q=80&w=100' },
              { id: 2, name: 'Avicennia marina', time: '16 Jun 2026, 08:18', coords: '-7.631567, 107.658234', height: '35 cm', img: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=100' },
              { id: 3, name: 'Rhizophora apiculata', time: '16 Jun 2026, 08:22', coords: '-7.631789, 107.658345', height: '45 cm', img: 'https://images.unsplash.com/photo-1621360841013-c76831f13885?q=80&w=100' },
              { id: 4, name: 'Sonneratia alba', time: '16 Jun 2026, 08:24', coords: '-7.631901, 107.658456', height: '38 cm', img: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=100' },
              { id: 5, name: 'Rhizophora apiculata', time: '16 Jun 2026, 08:27', coords: '-7.632012, 107.658567', height: '42 cm', img: 'https://images.unsplash.com/photo-1621360841013-c76831f13885?q=80&w=100' },
            ].map((item) => (
              <div key={item.id} className="flex gap-3 items-start border-b border-slate-100 pb-4 last:border-0 last:pb-0">
                <div className="w-5 h-5 rounded text-[#008A4B] font-bold text-[10px] flex items-center justify-center shrink-0 mt-1">{item.id}</div>
                <img src={item.img} className="w-12 h-12 rounded object-cover border border-slate-200" alt="Plant" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-slate-900 truncate">{item.name}</p>
                  <p className="text-[9px] text-slate-500 flex items-center gap-1 mt-1"><PiLeaf className="w-3 h-3 text-[#008A4B]"/> {item.time}</p>
                  <p className="text-[9px] text-slate-500 truncate mt-0.5">{item.coords}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <button className="text-slate-400 hover:text-slate-600"><HiEllipsisVertical className="w-4 h-4"/></button>
                  <div className="text-center mt-1">
                    <p className="text-[9px] text-slate-500">Tinggi</p>
                    <p className="text-xs font-bold text-[#008A4B]">{item.height}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button className="w-full py-2.5 border border-[#008A4B] text-[#008A4B] rounded-lg text-xs font-bold flex justify-center items-center gap-2 hover:bg-emerald-50 transition-colors shadow-sm">
             <HiOutlineBars3 className="w-4 h-4"/> Lihat Semua Tanaman
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
          <h3 className="font-bold text-slate-900 mb-4 text-sm">Ringkasan Input PU 5</h3>
          <div className="grid grid-cols-4 gap-2 mb-4">
            <div className="border border-slate-100 bg-slate-50 rounded-lg p-2 text-center shadow-sm">
              <p className="text-[9px] text-slate-500 mb-1 leading-tight font-medium">Target Tanaman</p>
              <p className="text-base font-black text-slate-900">50</p>
            </div>
            <div className="border border-slate-100 bg-slate-50 rounded-lg p-2 text-center shadow-sm">
              <p className="text-[9px] text-slate-500 mb-1 leading-tight font-medium">Sudah Input</p>
              <p className="text-base font-black text-slate-900">12</p>
            </div>
            <div className="border border-slate-100 bg-slate-50 rounded-lg p-2 text-center shadow-sm">
              <p className="text-[9px] text-slate-500 mb-1 leading-tight font-medium">Belum Input</p>
              <p className="text-base font-black text-slate-900">38</p>
            </div>
            <div className="border border-slate-100 bg-slate-50 rounded-lg p-2 text-center shadow-sm">
              <p className="text-[9px] text-slate-500 mb-1 leading-tight font-medium">Kelengkapan Data</p>
              <p className="text-base font-black text-slate-900">100%</p>
            </div>
          </div>
          <div className="flex items-start gap-2 text-[10px] text-blue-700 bg-blue-50 p-3 rounded-lg border border-blue-100">
            <HiOutlineInformationCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <p className="leading-relaxed">Pastikan semua tanaman memiliki foto, koordinat, dan tinggi tanaman sebelum melanjutkan.</p>
          </div>
        </div>
      </div>
    </div>
  );

  // ==========================================================================
  // STEP 4: DOKUMENTASI KEGIATAN
  // ==========================================================================
  const renderStep4 = () => (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-24">
       {/* Kolom Kiri: Info */}
       <div className="lg:col-span-3 space-y-6">
         <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
           <h3 className="font-bold text-slate-900 mb-4">Informasi Kegiatan</h3>
           <span className="inline-block px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold rounded-full mb-5">TGS-2026-018</span>
           
           <div className="space-y-3 text-xs">
             <div className="flex gap-3"><span className="w-1/3 text-slate-500">Program</span><span className="w-2/3 text-slate-900 font-medium">Rehabilitasi DAS Cimanuk</span></div>
             <div className="flex gap-3"><span className="w-1/3 text-slate-500">Kegiatan</span><span className="w-2/3 text-slate-900 font-medium">Penanaman Mangrove</span></div>
             <div className="flex gap-3"><span className="w-1/3 text-slate-500">Lokasi</span><span className="w-2/3 text-slate-900 font-medium leading-relaxed">Desa Mandalakasih,<br/>Kec. Pameungpeuk,<br/>Kab. Garut</span></div>
             <div className="flex gap-3"><span className="w-1/3 text-slate-500">KTH</span><span className="w-2/3 text-slate-900 font-medium">KTH Lestari</span></div>
             <div className="flex gap-3"><span className="w-1/3 text-slate-500">Periode</span><span className="w-2/3 text-slate-900 font-medium">18 Jun 2026 - 03 Jul 2026</span></div>
             <div className="flex gap-3"><span className="w-1/3 text-slate-500">Penyuluh</span><span className="w-2/3 text-slate-900 font-medium">Rina Herlina, S.Hut.</span></div>
           </div>
         </div>

         <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
           <h3 className="font-bold text-slate-900 mb-4 text-sm">Ringkasan Input</h3>
           <div className="space-y-3 text-xs mb-5">
              <div className="flex justify-between"><span className="text-slate-500">Jumlah PU</span><span className="font-bold text-slate-900">12 PU</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Target Tanaman</span><span className="font-bold text-slate-900">600 tanaman</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Sudah Input Tanaman</span><span className="font-bold text-slate-900">512 tanaman</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Dokumentasi Tanaman</span><span className="font-bold text-slate-900">512 foto</span></div>
           </div>
           
           <div className="flex justify-between items-end mb-2">
             <span className="text-xs text-slate-500">Kelengkapan Data</span>
             <span className="text-sm font-bold text-slate-900">95%</span>
           </div>
           <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mb-6">
             <div className="h-full bg-[#008A4B] rounded-full" style={{ width: '95%' }}></div>
           </div>
           <button className="w-full py-2.5 border border-slate-200 text-slate-700 rounded-lg font-bold text-xs hover:bg-slate-50 flex justify-center items-center gap-2 transition-colors shadow-sm">
             <HiOutlineBars3 className="w-4 h-4" /> Lihat Detail Input
           </button>
         </div>
       </div>

       {/* Kolom Tengah: Form Tambah Dokumentasi */}
       <div className="lg:col-span-5 space-y-6">
         {/* INFO BANNER */}
         <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-xl p-4 flex items-start gap-3 text-xs text-[#166534] shadow-sm mb-6">
            <HiOutlineInformationCircle className="w-5 h-5 text-[#008A4B] shrink-0 mt-0.5" />
            <p className="leading-relaxed">Upload foto kegiatan yang menggambarkan proses pelaksanaan penanaman, kondisi lokasi, dan partisipasi masyarakat (jika ada).</p>
         </div>

         <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
           <h3 className="font-bold text-slate-900 mb-6 text-base">Tambah Dokumentasi Kegiatan</h3>
           
           <form className="space-y-6">
              <div>
                 <label className="block text-xs font-bold text-slate-800 mb-3">1. Jenis Dokumentasi <span className="text-red-500">*</span></label>
                 <div className="flex flex-wrap gap-2">
                    <button type="button" className="px-3 py-1.5 bg-emerald-50 text-[#008A4B] border border-[#008A4B] text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-sm">
                      <PiPlant className="w-4 h-4" /> Proses Penanaman
                    </button>
                    <button type="button" className="px-3 py-1.5 bg-white text-slate-600 border border-slate-300 text-xs font-semibold rounded-lg flex items-center gap-1.5 hover:bg-slate-50 transition-colors">
                      <HiOutlineMapPin className="w-4 h-4" /> Kondisi Lokasi
                    </button>
                    <button type="button" className="px-3 py-1.5 bg-white text-slate-600 border border-slate-300 text-xs font-semibold rounded-lg flex items-center gap-1.5 hover:bg-slate-50 transition-colors">
                      <HiOutlineUserGroup className="w-4 h-4" /> Partisipasi Masyarakat
                    </button>
                    <button type="button" className="px-3 py-1.5 bg-white text-slate-600 border border-slate-300 text-xs font-semibold rounded-lg flex items-center gap-1.5 hover:bg-slate-50 transition-colors">
                      <HiEllipsisVertical className="w-4 h-4" /> Lainnya
                    </button>
                 </div>
              </div>

              <div>
                 <label className="block text-xs font-bold text-slate-800 mb-3">2. Foto Dokumentasi <span className="text-red-500">*</span></label>
                 <button type="button" className="w-full h-36 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 flex flex-col items-center justify-center hover:bg-slate-100 transition-colors mb-4">
                    <HiOutlineCamera className="w-8 h-8 text-slate-400 mb-2" />
                    <span className="text-sm font-bold text-slate-700">Klik untuk ambil foto</span>
                    <span className="text-xs text-slate-500 mt-1">atau seret file ke sini</span>
                    <span className="text-[10px] text-slate-400 mt-2">Format: JPG, JPEG, PNG | Maks. 10MB</span>
                    <div className="mt-3 px-4 py-1.5 bg-white border border-[#008A4B] text-[#008A4B] text-xs font-bold rounded-lg shadow-sm flex items-center gap-1.5">
                       <HiOutlineCamera className="w-3.5 h-3.5" /> Ambil Foto
                    </div>
                 </button>

                 <p className="text-xs font-bold text-slate-700 mb-2 mt-6">Contoh foto yang baik</p>
                 <div className="grid grid-cols-4 gap-3">
                    <div className="text-center">
                       <div className="w-full aspect-4/3 rounded-lg overflow-hidden relative mb-1.5 border border-emerald-500 shadow-sm">
                          <img src="https://images.unsplash.com/photo-1621360841013-c76831f13885?q=80&w=150" className="w-full h-full object-cover" alt="Contoh 1"/>
                          <div className="absolute top-1 right-1 bg-emerald-500 rounded-full p-0.5 text-white"><HiCheck className="w-3 h-3"/></div>
                       </div>
                       <p className="text-[9px] text-slate-600 leading-tight">Proses penanaman terlihat jelas</p>
                    </div>
                    <div className="text-center">
                       <div className="w-full aspect-4/3 rounded-lg overflow-hidden relative mb-1.5 border border-emerald-500 shadow-sm">
                          <img src="https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=150" className="w-full h-full object-cover" alt="Contoh 2"/>
                          <div className="absolute top-1 right-1 bg-emerald-500 rounded-full p-0.5 text-white"><HiCheck className="w-3 h-3"/></div>
                       </div>
                       <p className="text-[9px] text-slate-600 leading-tight">Tanaman dan kondisi lingkungan terlihat</p>
                    </div>
                    <div className="text-center">
                       <div className="w-full aspect-4/3 rounded-lg overflow-hidden relative mb-1.5 border border-emerald-500 shadow-sm">
                          <img src="https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=150" className="w-full h-full object-cover" alt="Contoh 3"/>
                          <div className="absolute top-1 right-1 bg-emerald-500 rounded-full p-0.5 text-white"><HiCheck className="w-3 h-3"/></div>
                       </div>
                       <p className="text-[9px] text-slate-600 leading-tight">Lokasi dapat diidentifikasi</p>
                    </div>
                    <div className="text-center">
                       <div className="w-full aspect-4/3 rounded-lg overflow-hidden relative mb-1.5 border border-emerald-500 shadow-sm">
                          <img src="https://images.unsplash.com/photo-1517022812141-23620dba5c23?q=80&w=150" className="w-full h-full object-cover" alt="Contoh 4"/>
                          <div className="absolute top-1 right-1 bg-emerald-500 rounded-full p-0.5 text-white"><HiCheck className="w-3 h-3"/></div>
                       </div>
                       <p className="text-[9px] text-slate-600 leading-tight">Partisipasi masyarakat (jika ada)</p>
                    </div>
                 </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-2">3. Keterangan Foto <span className="text-red-500">*</span></label>
                <textarea rows={3} placeholder="Jelaskan kegiatan pada foto ini..." className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-xs focus:ring-[#008A4B] focus:border-[#008A4B] resize-none shadow-sm"></textarea>
                <div className="text-right text-[10px] text-slate-400 mt-1">0 / 250</div>
              </div>

              <div className="flex gap-3 justify-between pt-2">
                <button type="button" className="px-6 py-2.5 text-slate-600 font-bold text-xs hover:bg-slate-50 rounded-lg transition-colors border border-slate-200 shadow-sm bg-white">
                  Batal
                </button>
                <button type="button" className="px-6 py-2.5 bg-[#008A4B] text-white font-bold text-xs hover:bg-emerald-800 rounded-lg transition-colors shadow-sm">
                  Simpan Dokumentasi
                </button>
              </div>
           </form>
         </div>
       </div>

       {/* Kolom Kanan: Daftar Dokumentasi */}
       <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
             <div className="flex justify-between items-center mb-5">
                <h3 className="font-bold text-slate-900 text-sm">Dokumentasi Kegiatan (8)</h3>
                <button className="px-2.5 py-1.5 border border-slate-300 rounded-md text-[10px] font-bold flex items-center gap-1 hover:bg-slate-50 shadow-sm text-slate-700">
                  <HiOutlineAdjustmentsHorizontal className="w-3.5 h-3.5" /> Filter
                </button>
             </div>
             
             <div className="grid grid-cols-2 gap-3 mb-4">
                {[
                  { id: 1, label: 'Proses Penanaman', time: '16 Jun 2026, 08:15', img: 'https://images.unsplash.com/photo-1621360841013-c76831f13885?q=80&w=200' },
                  { id: 2, label: 'Kondisi Lokasi', time: '16 Jun 2026, 08:20', img: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=200' },
                  { id: 3, label: 'Proses Penanaman', time: '16 Jun 2026, 08:28', img: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=200' },
                  { id: 4, label: 'Partisipasi Masyarakat', time: '16 Jun 2026, 08:35', img: 'https://images.unsplash.com/photo-1517022812141-23620dba5c23?q=80&w=200' },
                  { id: 5, label: 'Kondisi Lokasi', time: '16 Jun 2026, 08:42', img: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=200' },
                  { id: 6, label: 'Proses Penanaman', time: '16 Jun 2026, 08:48', img: 'https://images.unsplash.com/photo-1621360841013-c76831f13885?q=80&w=200' },
                  { id: 7, label: 'Partisipasi Masyarakat', time: '16 Jun 2026, 08:55', img: 'https://images.unsplash.com/photo-1517022812141-23620dba5c23?q=80&w=200' },
                  { id: 8, label: 'Kondisi Lokasi', time: '16 Jun 2026, 09:02', img: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=200' },
                ].map(item => (
                   <div key={item.id} className="border border-slate-200 rounded-lg overflow-hidden bg-white shadow-sm flex flex-col">
                      <div className="h-20 w-full relative">
                         <img src={item.img} className="w-full h-full object-cover" alt={item.label} />
                         <div className="absolute top-1.5 left-1.5 w-4 h-4 bg-white/90 rounded text-[#008A4B] font-bold text-[9px] flex items-center justify-center shadow-sm">{item.id}</div>
                      </div>
                      <div className="p-2 flex-1 flex flex-col">
                         <div className="flex justify-between items-start mb-1">
                           <p className="text-[10px] font-bold text-slate-800 leading-tight">{item.label}</p>
                           <button className="text-slate-400 hover:text-slate-600"><HiEllipsisVertical className="w-3 h-3"/></button>
                         </div>
                         <p className="text-[8px] text-slate-500 mt-auto">{item.time}</p>
                      </div>
                   </div>
                ))}
             </div>

             <button className="w-full py-2.5 border border-[#008A4B] text-[#008A4B] rounded-lg text-xs font-bold flex justify-center items-center gap-2 hover:bg-emerald-50 transition-colors shadow-sm">
                <HiOutlinePhoto className="w-4 h-4"/> Lihat Semua Dokumentasi
             </button>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
            <h3 className="font-bold text-slate-900 mb-4 text-sm">Ringkasan Dokumentasi</h3>
            <div className="grid grid-cols-4 gap-2 mb-4">
              <div className="border border-slate-100 bg-slate-50 rounded-lg p-2 text-center shadow-sm">
                <p className="text-[8px] text-slate-500 mb-1 font-medium">Total Foto</p>
                <p className="text-sm font-black text-slate-900">8 <span className="text-[9px] font-normal text-slate-500">foto</span></p>
              </div>
              <div className="border border-slate-100 bg-slate-50 rounded-lg p-2 text-center shadow-sm">
                <p className="text-[8px] text-slate-500 mb-1 font-medium">Proses Penanaman</p>
                <p className="text-sm font-black text-slate-900">4 <span className="text-[9px] font-normal text-slate-500">foto</span></p>
              </div>
              <div className="border border-slate-100 bg-slate-50 rounded-lg p-2 text-center shadow-sm">
                <p className="text-[8px] text-slate-500 mb-1 font-medium">Kondisi Lokasi</p>
                <p className="text-sm font-black text-slate-900">3 <span className="text-[9px] font-normal text-slate-500">foto</span></p>
              </div>
              <div className="border border-slate-100 bg-slate-50 rounded-lg p-2 text-center shadow-sm">
                <p className="text-[8px] text-slate-500 mb-1 font-medium">Partisipasi Masyarakat</p>
                <p className="text-sm font-black text-slate-900">1 <span className="text-[9px] font-normal text-slate-500">foto</span></p>
              </div>
            </div>
            <div className="flex items-start gap-2 text-[10px] text-blue-700 bg-blue-50 p-3 rounded-lg border border-blue-100">
              <HiOutlineInformationCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <p className="leading-relaxed">Dokumentasi yang lengkap membantu validasi dan monitoring hasil pelaksanaan kegiatan.</p>
            </div>
          </div>
       </div>
    </div>
  );

  // ==========================================================================
  // STEP 5: REVIEW & KIRIM
  // ==========================================================================
  const renderStep5 = () => (
    <div className="flex flex-col gap-6 w-full max-w-300 mx-auto pb-24">
      {/* Top Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
         {/* Informasi Kegiatan */}
         <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
            <h3 className="font-bold text-slate-900 mb-4 text-sm">Informasi Kegiatan</h3>
            <div className="space-y-3 text-xs">
              <div className="flex"><span className="w-2/5 text-slate-500 flex items-center gap-1.5"><HiOutlineDocumentText className="w-3.5 h-3.5"/> ID Penugasan</span><span className="w-3/5 text-emerald-600 font-bold">TGS-2026-018</span></div>
              <div className="flex"><span className="w-2/5 text-slate-500 flex items-center gap-1.5"><PiPlant className="w-3.5 h-3.5"/> Program</span><span className="w-3/5 text-slate-900 font-medium">Rehabilitasi DAS Cimanuk</span></div>
              <div className="flex"><span className="w-2/5 text-slate-500 flex items-center gap-1.5"><PiTree className="w-3.5 h-3.5"/> Kegiatan</span><span className="w-3/5 text-slate-900 font-medium">Penanaman Mangrove</span></div>
              <div className="flex items-start"><span className="w-2/5 text-slate-500 flex items-center gap-1.5 mt-0.5"><HiOutlineMapPin className="w-3.5 h-3.5"/> Lokasi</span><span className="w-3/5 text-slate-900 font-medium leading-relaxed">Desa Mandalakasih,<br/>Kec. Pameungpeuk,<br/>Kab. Garut</span></div>
              <div className="flex"><span className="w-2/5 text-slate-500 flex items-center gap-1.5"><HiOutlineUserGroup className="w-3.5 h-3.5"/> KTH</span><span className="w-3/5 text-slate-900 font-medium">KTH Lestari</span></div>
              <div className="flex"><span className="w-2/5 text-slate-500 flex items-center gap-1.5"><HiOutlineCalendar className="w-3.5 h-3.5"/> Periode</span><span className="w-3/5 text-slate-900 font-medium">18 Juni 2026 - 03 Juli 2026</span></div>
              <div className="flex"><span className="w-2/5 text-slate-500 flex items-center gap-1.5"><HiOutlineUser className="w-3.5 h-3.5"/> Penyuluh</span><span className="w-3/5 text-slate-900 font-medium">Rina Herlina, S.Hut.</span></div>
            </div>
         </div>

         {/* Status Kelengkapan Data */}
         <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
            <h3 className="font-bold text-slate-900 mb-4 text-sm">Status Kelengkapan Data</h3>
            <div className="space-y-4 text-xs mb-5">
              <div className="flex items-start gap-3">
                 <HiCheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5"/>
                 <div className="flex-1"><p className="font-bold text-slate-800">Poligon PU</p><p className="text-[9px] text-slate-500 mt-0.5">Semua PU telah dibuat</p></div>
                 <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded font-bold text-[10px]">10 / 10 PU</span>
              </div>
              <div className="flex items-start gap-3">
                 <HiCheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5"/>
                 <div className="flex-1"><p className="font-bold text-slate-800">Data Tanaman</p><p className="text-[9px] text-slate-500 mt-0.5">Data tanaman telah diinput</p></div>
                 <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded font-bold text-[10px]">500 / 500</span>
              </div>
              <div className="flex items-start gap-3">
                 <HiCheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5"/>
                 <div className="flex-1"><p className="font-bold text-slate-800">Foto Tanaman</p><p className="text-[9px] text-slate-500 mt-0.5">Foto setiap tanaman tersedia</p></div>
                 <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded font-bold text-[10px]">500 / 500</span>
              </div>
              <div className="flex items-start gap-3">
                 <HiCheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5"/>
                 <div className="flex-1"><p className="font-bold text-slate-800">Koordinat Tanaman</p><p className="text-[9px] text-slate-500 mt-0.5">Titik koordinat telah tersimpan</p></div>
                 <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded font-bold text-[10px]">500 / 500</span>
              </div>
              <div className="flex items-start gap-3">
                 <HiCheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5"/>
                 <div className="flex-1"><p className="font-bold text-slate-800">Dokumentasi Kegiatan</p><p className="text-[9px] text-slate-500 mt-0.5">Dokumentasi kegiatan tersedia</p></div>
                 <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded font-bold text-[10px]">8 / 8</span>
              </div>
            </div>
            <div>
               <div className="flex justify-between items-end mb-1 text-[10px]"><span className="text-slate-500 font-bold">Kelengkapan Data</span><span className="font-black text-slate-900 text-sm">100%</span></div>
               <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mb-2"><div className="h-full bg-emerald-500" style={{ width: '100%' }}></div></div>
               <p className="text-center text-[10px] font-bold text-emerald-600 mt-2">Semua data lengkap dan siap dikirim</p>
            </div>
         </div>

         {/* Rekap Realisasi & Jenis */}
         <div className="col-span-1 md:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
               <h3 className="font-bold text-slate-900 mb-4 text-sm">Rekap Realisasi Penanaman</h3>
               <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                  <div>
                    <p className="text-[10px] text-slate-500 font-medium mb-1">Target Bibit</p>
                    <h3 className="text-2xl font-black text-slate-900">500</h3>
                    <p className="text-[10px] text-slate-400">tanaman</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 font-medium mb-1">Realisasi</p>
                    <h3 className="text-2xl font-black text-slate-900">502</h3>
                    <p className="text-[10px] text-slate-400">tanaman</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 font-medium mb-1">Selisih</p>
                    <h3 className="text-2xl font-black text-emerald-600">+2</h3>
                    <p className="text-[10px] text-slate-400">tanaman</p>
                  </div>
               </div>
               <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 border border-slate-100 rounded-lg p-3 text-center">
                    <p className="text-[10px] text-slate-500 font-medium mb-0.5">Jumlah PU</p>
                    <h4 className="text-lg font-black text-slate-900">10</h4>
                    <p className="text-[10px] text-slate-400">PU</p>
                  </div>
                  <div className="bg-slate-50 border border-slate-100 rounded-lg p-3 text-center">
                    <p className="text-[10px] text-slate-500 font-medium mb-0.5">Luas Total PU</p>
                    <h4 className="text-lg font-black text-slate-900">5,23</h4>
                    <p className="text-[10px] text-slate-400">Ha</p>
                  </div>
               </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
               <h3 className="font-bold text-slate-900 mb-4 text-sm">Rekap Berdasarkan Jenis Tanaman</h3>
               <table className="w-full text-left text-xs">
                 <thead className="text-slate-500 border-b border-slate-100">
                   <tr><th className="py-2 font-medium">Jenis Tanaman</th><th className="py-2 font-medium text-right">Jumlah (tanaman)</th></tr>
                 </thead>
                 <tbody className="divide-y divide-slate-50 font-semibold text-slate-700">
                   <tr><td className="py-2.5">Rhizophora apiculata</td><td className="py-2.5 text-right">350</td></tr>
                   <tr><td className="py-2.5">Avicennia marina</td><td className="py-2.5 text-right">100</td></tr>
                   <tr><td className="py-2.5">Sonneratia alba</td><td className="py-2.5 text-right">52</td></tr>
                   <tr className="bg-emerald-50/50"><td className="py-2.5 text-emerald-700 font-bold px-2">Total</td><td className="py-2.5 text-right text-emerald-700 font-bold px-2">502</td></tr>
                 </tbody>
               </table>
            </div>
         </div>
      </div>

      {/* Tabel Daftar PU */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
         <div className="px-5 py-4 border-b border-slate-100 flex justify-between items-center bg-white">
           <h3 className="text-sm font-bold text-slate-900">Daftar PU dan Rekap Realisasi</h3>
           <button className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-bold text-[#008A4B] border border-[#008A4B] rounded-lg hover:bg-emerald-50 transition-colors shadow-sm">
              <HiOutlineMap className="w-3.5 h-3.5" /> Lihat Peta PU
           </button>
         </div>
         <div className="overflow-x-auto p-4">
           <table className="w-full text-center text-[11px]">
             <thead className="bg-[#DCECE0] text-[#3A4D3F] text-xs uppercase tracking-wider font-bold">
               <tr>
                 <th className="py-3 px-3 text-left">No.</th>
                 <th className="py-3 px-3 text-left">Kode PU</th>
                 <th className="py-3 px-3">Luas (Ha)</th>
                 <th className="py-3 px-3">Target (tanaman)</th>
                 <th className="py-3 px-3">Realisasi (tanaman)</th>
                 <th className="py-3 px-3">Selisih</th>
                 <th className="py-3 px-3">Status Kelengkapan</th>
                 <th className="py-3 px-3">Aksi</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
               {[
                 { no: 1, kode: 'PU-01', luas: '0,52', target: 50, realisasi: 50, selisih: 0 },
                 { no: 2, kode: 'PU-02', luas: '0,48', target: 50, realisasi: 50, selisih: 0 },
                 { no: 3, kode: 'PU-03', luas: '0,55', target: 50, realisasi: 52, selisih: '+2', color: 'text-emerald-600' },
                 { no: 4, kode: 'PU-04', luas: '0,47', target: 50, realisasi: 50, selisih: 0 },
                 { no: 5, kode: 'PU-05', luas: '0,51', target: 50, realisasi: 50, selisih: 0 },
               ].map((item) => (
                 <tr key={item.no} className="hover:bg-slate-50 transition-colors">
                   <td className="py-3 px-3 text-left">{item.no}</td>
                   <td className="py-3 px-3 text-left font-bold text-slate-900">{item.kode}</td>
                   <td className="py-3 px-3">{item.luas}</td>
                   <td className="py-3 px-3">{item.target}</td>
                   <td className="py-3 px-3 font-bold text-slate-900">{item.realisasi}</td>
                   <td className={`py-3 px-3 font-bold ${item.color || 'text-slate-500'}`}>{item.selisih}</td>
                   <td className="py-3 px-3">
                     <div className="flex items-center justify-center gap-2">
                       <span className="flex items-center gap-1 text-[9px] text-emerald-700 font-bold"><HiCheckCircle className="w-3.5 h-3.5 text-emerald-500"/> Poligon</span>
                       <span className="flex items-center gap-1 text-[9px] text-emerald-700 font-bold"><HiCheckCircle className="w-3.5 h-3.5 text-emerald-500"/> Tanaman</span>
                       <span className="flex items-center gap-1 text-[9px] text-emerald-700 font-bold"><HiCheckCircle className="w-3.5 h-3.5 text-emerald-500"/> Foto</span>
                       <span className="flex items-center gap-1 text-[9px] text-emerald-700 font-bold"><HiCheckCircle className="w-3.5 h-3.5 text-emerald-500"/> Koordinat</span>
                       <span className="flex items-center gap-1 text-[9px] text-emerald-700 font-bold"><HiCheckCircle className="w-3.5 h-3.5 text-emerald-500"/> Dokumentasi</span>
                     </div>
                   </td>
                   <td className="py-3 px-3">
                     <button className="p-1.5 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors mx-auto block"><HiOutlineEye className="w-4 h-4"/></button>
                   </td>
                 </tr>
               ))}
             </tbody>
           </table>
           <div className="flex justify-center mt-4 pb-2">
             <div className="flex items-center gap-2 text-xs">
               <button className="p-1.5 rounded-md border border-slate-200 bg-white text-slate-400 hover:bg-slate-50"><HiChevronLeft className="w-3.5 h-3.5" /></button>
               <button className="px-2.5 py-1 rounded-md bg-[#008A4B] text-white font-bold">1</button>
               <button className="px-2.5 py-1 rounded-md bg-white text-slate-600 font-bold hover:bg-slate-50 border border-transparent">2</button>
               <button className="p-1.5 rounded-md border border-slate-200 bg-white text-slate-400 hover:bg-slate-50"><HiChevronRight className="w-3.5 h-3.5" /></button>
             </div>
           </div>
         </div>
      </div>

      {/* Confirmation Checkbox */}
      <div className="bg-[#F0FDF4] rounded-xl border border-[#BBF7D0] p-5 mb-2">
         <label className="flex items-start gap-4 cursor-pointer">
            <div className={`w-6 h-6 rounded flex items-center justify-center shrink-0 mt-0.5 border-2 transition-colors ${isAgreed ? 'bg-[#008A4B] border-[#008A4B]' : 'bg-white border-emerald-300'}`}>
               {isAgreed && <HiCheck className="w-4 h-4 text-white" />}
            </div>
            <input type="checkbox" className="hidden" checked={isAgreed} onChange={() => setIsAgreed(!isAgreed)} />
            <p className="text-sm text-[#166534] font-medium leading-relaxed">
              Saya memastikan data pelaksanaan telah sesuai dengan kondisi lapangan dan siap dikirim untuk dilakukan pemeriksaan oleh Staff PDAS.
            </p>
         </label>
      </div>

    </div>
  );

  return (
    <div className="w-full bg-[#F8FAFC] min-h-screen font-sans text-slate-800 pb-24">
      <div className="max-w-350 mx-auto">
        
        <div className="mb-6 flex items-center gap-3">
           <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center border border-emerald-100">
             <PiPlant className="w-5 h-5 text-[#008A4B]" />
           </div>
           <div>
             <h1 className="text-2xl font-bold text-slate-900 mb-0.5">
               {currentStep === 2 && 'Pembentukan Area Penanaman (PU)'}
               {currentStep === 3 && 'Input Data Tanaman'}
               {currentStep === 4 && 'Dokumentasi Kegiatan'}
               {currentStep === 5 && 'Review & Kirim Hasil Pelaksanaan'}
             </h1>
             <p className="text-xs text-slate-500">
               {currentStep === 2 && 'Bagi lokasi kegiatan menjadi beberapa Petak Ukur (PU) sesuai jumlah yang telah ditentukan.'}
               {currentStep === 3 && 'Input data setiap tanaman yang telah ditanam pada PU terpilih.'}
               {currentStep === 4 && 'Upload dokumentasi kegiatan penanaman sebagai bukti pelaksanaan di lapangan.'}
               {currentStep === 5 && 'Periksa kembali kelengkapan data sebelum mengirim hasil pelaksanaan kegiatan kepada Staff PDAS.'}
             </p>
           </div>
        </div>

        {renderStepper()}

        {/* Render Form Berdasarkan Step */}
        {currentStep === 2 && renderStep2()}
        {currentStep === 3 && renderStep3()}
        {currentStep === 4 && renderStep4()}
        {currentStep === 5 && renderStep5()}

      </div>

      {/* BOTTOM ACTION BAR (Sticky) */}
      <div className="flex justify-between items-center z-40">
         <button onClick={prevStep} className="px-6 py-2.5 bg-white border border-slate-300 text-slate-700 font-bold text-sm hover:bg-slate-50 rounded-full flex items-center gap-2 shadow-sm transition-colors">
           <HiOutlineArrowLeft className="w-4 h-4" /> {currentStep === 5 ? 'Kembali Periksa' : 'Kembali'}
         </button>
         
         <div className="flex items-center gap-3">
            <button className="px-6 py-2.5 border border-slate-300 text-slate-700 font-bold text-sm hover:bg-slate-50 rounded-full flex items-center gap-2 shadow-sm transition-colors bg-white">
              <HiOutlineDocumentArrowDown className="w-4 h-4" /> Simpan Draft
            </button>
            
            {currentStep < 5 ? (
              <button 
                onClick={nextStep} 
                className="px-6 py-2.5 bg-[#008A4B] text-white font-bold text-sm hover:bg-emerald-800 rounded-full flex items-center gap-2 shadow-sm transition-colors"
              >
                {currentStep === 2 && 'Lanjutkan ke Input Tanaman'}
                {currentStep === 3 && 'Lanjut ke Dokumentasi Kegiatan'}
                {currentStep === 4 && 'Lanjut ke Review & Kirim'}
                <HiOutlineArrowRight className="w-4 h-4 stroke-2" />
              </button>
            ) : (
              <button
                onClick={handleSubmit} 
                disabled={!isAgreed}
                className={`px-8 py-2.5 font-bold text-sm rounded-full flex items-center gap-2 shadow-sm transition-colors ${isAgreed ? 'bg-primary text-white hover:bg-emerald-800' : 'bg-emerald-200 text-emerald-50 cursor-not-allowed'}`}
              >
                Kirim Hasil Pelaksanaan <HiOutlineArrowRight className="w-4 h-4 stroke-2" />
              </button>
            )}
         </div>
      </div>
    </div>
  );
};

export default PelaksanaanWizard;