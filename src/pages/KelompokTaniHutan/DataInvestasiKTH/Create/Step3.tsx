import React from 'react';
import { HiOutlineCloud } from 'react-icons/hi2';
import type { InvestasiFormState } from './index';

interface StepProps {
  data: InvestasiFormState;
  updateData: React.Dispatch<React.SetStateAction<InvestasiFormState>>;
  onNext: () => void;
}

const docsList = [
  'Dokumen Perjanjian Investasi', 'Dokumen Anggaran Dasar Perusahaan',
  'Dokumen Rencana Bisnis', 'Dokumen Proyeksi Keuangan',
  'Dokumen Hukum dan Perizinan', 'Template Perjanjian Investor'
];

const Step3: React.FC<StepProps> = ({ onNext }) => {
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

      <button onClick={onNext} className="w-full py-3.5 mt-6 bg-[#185325] hover:bg-[#123d1c] text-white text-sm font-bold rounded-full transition-colors">
        Selanjutnya &gt;
      </button>
    </div>
  );
};

export default Step3;