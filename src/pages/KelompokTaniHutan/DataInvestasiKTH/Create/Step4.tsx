import React, { useState } from 'react';
import { HiOutlineChevronDown, HiOutlineChevronUp } from 'react-icons/hi2';
import type { InvestasiFormState } from './index';

interface StepProps {
  data: InvestasiFormState;
  onNext: () => void;
}

const Step4: React.FC<StepProps> = ({ data, onNext }) => {
  const [showAllMilestones, setShowAllMilestones] = useState(false);
  const displayedMilestones = showAllMilestones ? data.milestones : data.milestones.slice(0, 2);
  const hasMoreMilestones = data.milestones.length > 2;

  const hitungPersentaseInvestor = (persentaseKTH: string) => {
    const kth = parseInt(persentaseKTH) || 0;
    return `${100 - kth}%`;
  };

  const docsList = [
    'Dokumen Perjanjian Investasi', 'Dokumen Rencana Bisnis', 
    'Dokumen Proyeksi Keuangan', 'Dokumen Hukum dan Perizinan', 
    'Template Perjanjian Investor'
  ];

  return (
    <div className="animate-in fade-in duration-300">
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="w-full md:w-56 h-36 bg-gray-200 rounded-xl shrink-0 flex items-center justify-center text-gray-400 text-xs overflow-hidden">
          <img src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800&auto=format&fit=crop" alt="Cover" className="w-full h-full object-cover" />
        </div>
        <div className="flex flex-col justify-center gap-2 text-sm w-full">
          <h2 className="text-xl font-bold text-gray-800">{data.namaInvestasi || 'Proyek Pembangunan...'}</h2>
          <div className="grid grid-cols-[140px_auto] gap-y-2 mt-2 font-medium text-xs">
            <span className="text-gray-500">KTH</span> 
            <span className="text-[#185325] font-bold">: {data.namaKTH || 'Rimba Nusantara'}</span>
            
            <span className="text-gray-500">Target Funding</span> 
            <span className="text-[#185325] font-bold">: Rp. {data.targetFunding || '0'}</span>
            
            <span className="text-gray-500">Persentase Keuntungan</span> 
            <span className="text-gray-800 font-bold">: {data.persentase || '0'}%</span>
            
            <span className="text-gray-500">Tenggat Waktu</span> 
            <span className="text-orange-500 font-bold">: {data.batasWaktu || '-'}</span>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <p className="text-sm text-gray-500 leading-relaxed text-justify">
          {data.deskripsi || 'Lorem ipsum dolor sit amet consectetur. Faucibus faucibus urna nulla amet at nascetur...'}
        </p>
      </div>

      <div className="mb-8">
        <h3 className="font-bold text-gray-800 mb-2">Pembagian Keuntungan</h3>
        <p className="text-sm text-gray-500 text-justify leading-relaxed mb-4">
          Keuntungan akan dibagi rata sesuai dengan kesepakatan tertulis persentase saat pendaftaran program.
        </p>
        <div className="text-sm font-bold text-gray-800 space-y-2">
          <div className="flex"><span className="w-24 text-gray-500 font-medium">KTH</span> <span>: {data.persentase || '0'}%</span></div>
          <div className="flex"><span className="w-24 text-gray-500 font-medium">Investor</span> <span>: {hitungPersentaseInvestor(data.persentase)}</span></div>
        </div>
      </div>

      <div className="mb-8 border-b border-gray-100 pb-8">
        <h3 className="font-bold text-gray-800 mb-6">Milestone</h3>
        
        {displayedMilestones.map((m, idx) => (
          <div key={m.id} className={`mb-6 last:mb-0 text-sm ${idx !== 0 ? 'pt-6 border-t border-gray-50' : ''}`}>
            <div className="flex mb-1.5"><span className="w-36 shrink-0 text-gray-500">Nama Milestone</span> <span className="w-4 shrink-0">:</span> <span className="font-bold text-gray-800">{m.nama}</span></div>
            <div className="flex mb-1.5"><span className="w-36 shrink-0 text-gray-500">Batas Milestone</span> <span className="w-4 shrink-0">:</span> <span className="text-gray-800">{m.batas}</span></div>
            <div className="flex"><span className="w-36 shrink-0 text-gray-500">Deskripsi</span> <span className="w-4 shrink-0">:</span> <span className="text-gray-500 leading-relaxed text-justify">{m.deskripsi || 'Tidak ada deskripsi.'}</span></div>
          </div>
        ))}
        
        {hasMoreMilestones && (
          <button onClick={() => setShowAllMilestones(!showAllMilestones)} className="flex items-center justify-center gap-2 w-full mt-4 text-xs font-bold text-gray-500 hover:text-gray-800 transition-colors">
            {showAllMilestones ? 'Tutup Milestone' : 'Lihat Milestone Lainnya'} 
            {showAllMilestones ? <HiOutlineChevronUp className="w-4 h-4" /> : <HiOutlineChevronDown className="w-4 h-4" />}
          </button>
        )}
      </div>

      <div className="mb-12">
        <h3 className="font-bold text-gray-800 mb-4">Dokumen Pendukung</h3>
        <div className="text-sm space-y-3">
          {docsList.map((doc, idx) => (
            <div key={idx} className="flex">
              <span className="w-56 shrink-0 text-gray-500">{doc}</span>
              <span className="w-4 shrink-0">:</span>
              <span className="font-bold underline text-gray-800 hover:text-[#185325] cursor-pointer">
                {doc.replace(/\s+/g, '')}.pdf
              </span>
            </div>
          ))}
        </div>
      </div>

      <button onClick={onNext} className="w-full py-3.5 bg-[#185325] hover:bg-[#123d1c] text-white text-sm font-bold rounded-full transition-colors shadow-sm">
        Selanjutnya &gt;
      </button>

    </div>
  );
};

export default Step4;