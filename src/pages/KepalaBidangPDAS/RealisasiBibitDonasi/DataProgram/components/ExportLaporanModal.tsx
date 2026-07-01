import React, { useEffect, useState } from 'react';
import { HiOutlineXMark, HiOutlineArrowDownTray, HiOutlineDocumentText } from 'react-icons/hi2';

interface ExportLaporanModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ExportLaporanModal: React.FC<ExportLaporanModalProps> = ({ isOpen, onClose }) => {
  const [selectedProgram, setSelectedProgram] = useState('');

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-2 text-gray-800">
            <HiOutlineArrowDownTray className="w-6 h-6 text-[#185325]" />
            <h2 className="text-xl font-bold">Export Rekap Laporan</h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors">
            <HiOutlineXMark className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 space-y-5">
          
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Pilih Program Donasi <span className="text-red-500">*</span>
            </label>
            <select 
              value={selectedProgram}
              onChange={(e) => setSelectedProgram(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#009262]/20 focus:border-[#009262] transition-all cursor-pointer"
            >
              <option value="" disabled>-- Pilih Program --</option>
              <option value="1">Penghijauan Hulu Citarum</option>
              <option value="2">Pemulihan Lahan Kritis Cisadane</option>
              <option value="semua">Semua Program</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Tanggal Mulai <span className="text-gray-400 font-normal">(Opsional)</span>
              </label>
              <input 
                type="date" 
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#009262]/20 focus:border-[#009262] transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Tanggal Akhir <span className="text-gray-400 font-normal">(Opsional)</span>
              </label>
              <input 
                type="date" 
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#009262]/20 focus:border-[#009262] transition-all"
              />
            </div>
          </div>

        </div>

        <div className="p-6 border-t border-gray-100 flex items-center justify-end gap-3 bg-gray-50/50">
          <button 
            onClick={onClose}
            className="px-6 py-2.5 text-sm font-bold text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
          >
            Batal
          </button>
          <button 
            disabled={!selectedProgram}
            className={`flex items-center gap-2 px-6 py-2.5 text-sm font-bold text-white rounded-xl transition-all shadow-sm ${
              selectedProgram ? 'bg-[#009262] hover:bg-[#007a52] active:scale-95 cursor-pointer' : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            <HiOutlineDocumentText className="w-5 h-5" /> Tampilkan Laporan Rekap
          </button>
        </div>

      </div>
    </div>
  );
};

export default ExportLaporanModal;