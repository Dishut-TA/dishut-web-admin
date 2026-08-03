import React from 'react';
import { HiOutlineCloud, HiOutlineArrowRight, HiOutlineArrowLeft } from 'react-icons/hi2';
import type { InvestasiFormState } from './index';

interface StepProps {
  data: InvestasiFormState;
  updateData: React.Dispatch<React.SetStateAction<InvestasiFormState>>;
  onNext: () => void;
  onPrev?: () => void;
}

const docsList = [
  'Dokumen Perjanjian Investasi', 'Dokumen Rencana Bisnis', 'Template Perjanjian Investor'
];

const Step3: React.FC<StepProps> = ({ onNext, onPrev }) => {
  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      {docsList.map((doc) => (
        <div key={doc}>
          <label className="block text-xs font-bold text-gray-700 mb-1.5">{doc}</label>
          <label className="flex items-center justify-between w-full px-4 py-3 border border-gray-300 rounded-full cursor-pointer hover:bg-gray-50 transition-colors">
            <span className="text-sm text-gray-400">Upload file</span>
            <HiOutlineCloud className="w-5 h-5 text-gray-600" />
            <input type="file" className="hidden" />
          </label>
        </div>
      ))}

      <div className="flex gap-4 mt-6">
        <button onClick={onPrev} className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-white border border-[#185325] text-[#185325] hover:bg-gray-50 text-sm font-bold rounded-full transition-colors">
          <HiOutlineArrowLeft className="w-4 h-4 stroke-2" /> Kembali
        </button>
        <button onClick={onNext} className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-[#185325] hover:bg-[#123d1c] text-white text-sm font-bold rounded-full transition-colors shadow-sm">
          Selanjutnya <HiOutlineArrowRight className="w-4 h-4 stroke-2" />
        </button>
      </div>
    </div>
  );
};

export default Step3;