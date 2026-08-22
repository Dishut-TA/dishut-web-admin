import React from 'react';
import { HiOutlineCloud, HiOutlineArrowRight, HiOutlineArrowLeft, HiDocumentText, HiXMark } from 'react-icons/hi2';
import type { InvestasiFormState } from './index';

interface StepProps {
  data: InvestasiFormState;
  updateData: React.Dispatch<React.SetStateAction<InvestasiFormState>>;
  onNext: () => void;
  onPrev?: () => void;
}

const docsList = [
  { key: 'PROPOSAL_BISNIS', label: 'Dokumen Proposal Bisnis' },
  { key: 'PROPOSAL_BISNIS', label: 'Dokumen Proyeksi Keuangan' },      // Gunakan key yang sama jika backend hanya menerima ini
  { key: 'PROPOSAL_BISNIS', label: 'Dokumen Hukum & Perizinan' }       // atau sesuaikan dengan rule backend
];

const Step3: React.FC<StepProps> = ({ data, updateData, onNext, onPrev }) => {
  const handleFileChange = (index: number, file: File | null) => {
    // Menyimpan dokumen berdasarkan indeks agar unik
    updateData({
      ...data,
      dokumen: {
        ...data.dokumen,
        [index]: file
      }
    });
  };

  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      <p className="text-xs text-gray-500 mb-2 font-medium">Unggah ketiga dokumen pendukung berikut dalam format PDF:</p>
      
      {docsList.map((doc, idx) => {
        const currentFile = data.dokumen[idx];
        return (
          <div key={idx}>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">{doc.label}</label>
            {currentFile ? (
              <div className="flex items-center justify-between px-4 py-3 border border-gray-300 rounded-full bg-gray-50">
                <div className="flex items-center gap-2 overflow-hidden">
                  <HiDocumentText className="w-5 h-5 text-[#185325] shrink-0" />
                  <span className="text-sm font-medium text-gray-700 truncate">{currentFile.name}</span>
                </div>
                <button 
                  onClick={() => handleFileChange(idx, null)}
                  className="p-1 text-gray-400 hover:text-red-500 rounded-full cursor-pointer"
                >
                  <HiXMark className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <label className="flex items-center justify-between w-full px-4 py-3 border border-dashed border-gray-300 rounded-full cursor-pointer hover:bg-gray-50 transition-colors">
                <span className="text-sm text-gray-400">Upload file PDF</span>
                <HiOutlineCloud className="w-5 h-5 text-gray-600" />
                <input 
                  type="file" 
                  accept="application/pdf" 
                  className="hidden" 
                  onChange={(e) => e.target.files && handleFileChange(idx, e.target.files[0])} 
                />
              </label>
            )}
          </div>
        );
      })}

      <div className="flex gap-4 mt-6">
        <button onClick={onPrev} className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-white border border-[#185325] text-[#185325] hover:bg-gray-50 text-sm font-bold rounded-full transition-colors cursor-pointer">
          <HiOutlineArrowLeft className="w-4 h-4 stroke-2" /> Kembali
        </button>
        <button onClick={onNext} className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-[#185325] hover:bg-[#123d1c] text-white text-sm font-bold rounded-full transition-colors shadow-sm cursor-pointer">
          Selanjutnya <HiOutlineArrowRight className="w-4 h-4 stroke-2" />
        </button>
      </div>
    </div>
  );
};

export default Step3;