import React, { useEffect } from 'react';
import { HiOutlineXMark } from 'react-icons/hi2';

interface CreateProgramModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateProgramModal: React.FC<CreateProgramModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      
      <div 
        className="w-full max-w-lg bg-white rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
      >
        <div className="flex items-center justify-between p-6 pb-2">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800">
            Buat Program Baru
          </h2>
          <button 
            onClick={onClose}
            className="p-1 rounded-full text-gray-500 hover:bg-gray-100 transition-colors"
          >
            <HiOutlineXMark className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-bold text-gray-800 mb-2">
              Nama Program
            </label>
            <input 
              type="text" 
              placeholder="Contoh: Penanaman Hutan.."
              className="w-full bg-[#EEEEEE] rounded-lg px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
            />
          </div>
          
          <div>
            <label className="block text-sm font-bold text-gray-800 mb-2">
              Lokasi
            </label>
            <input 
              type="text" 
              placeholder="Provinsi / Kabupaten"
              className="w-full bg-[#EEEEEE] rounded-lg px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
            />
          </div>
        </div>

        <div className="p-6 pt-2 flex items-center justify-end gap-4">
          <button 
            onClick={onClose}
            className="px-8 py-2.5 rounded-full bg-[#E0E0E0] text-gray-700 font-semibold text-sm hover:bg-gray-300 transition-colors"
          >
            Batal
          </button>
          <button 
            className="px-8 py-2.5 rounded-full bg-primary text-white font-semibold text-sm hover:bg-[#144a18] transition-colors"
          >
            Ajukan Program
          </button>
        </div>

      </div>
    </div>
  );
};

export default CreateProgramModal;