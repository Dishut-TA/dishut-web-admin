import React, { useEffect } from 'react';
import { HiXMark } from 'react-icons/hi2';

interface InputModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const InputKegiatanModal: React.FC<InputModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      <div className="relative bg-[#F8FAFC] w-full max-w-lg rounded-2xl shadow-2xl flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-6 border-b border-gray-200/60 bg-white rounded-t-2xl">
          <div className="w-6"></div> 
          <h2 className="text-lg font-bold text-gray-800">Input Kegiatan Baru</h2>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-800 transition-colors">
            <HiXMark className="w-6 h-6" strokeWidth={2} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto custom-scrollbar flex-1 bg-white rounded-b-2xl">
          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-4">
            
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-700">Nama Kegiatan</label>
              <input type="text" placeholder="Contoh: Pemeliharaan Blok A" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#185325] focus:border-[#185325]" />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-700">Lokasi</label>
              <input type="text" placeholder="Contoh: Desa Sukamaju" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#185325] focus:border-[#185325]" />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-700">Pelaksana</label>
              <input type="text" placeholder="Nama Pelaksana" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#185325] focus:border-[#185325]" />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-700">Status</label>
              <select className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#185325] focus:border-[#185325] bg-white appearance-none cursor-pointer">
                <option value="berjalan">Berjalan</option>
                <option value="selesai">Selesai</option>
                <option value="bermasalah">Bermasalah</option>
              </select>
            </div>

            <div className="flex items-center gap-3 mt-6">
              <button type="button" onClick={onClose} className="flex-1 border border-gray-300 text-gray-700 font-semibold py-2.5 rounded-full hover:bg-gray-50 transition-colors">
                Batal
              </button>
              <button type="submit" className="flex-1 bg-[#185325] text-white font-semibold py-2.5 rounded-full hover:bg-[#113d1b] transition-colors">
                Simpan
              </button>
            </div>
            
          </form>
        </div>

      </div>
    </div>
  );
};

export default InputKegiatanModal;