import React, { useState } from 'react';
import { HiXMark, HiOutlineDocumentArrowUp, HiOutlineDocumentText } from 'react-icons/hi2';

interface ModalInputKTHProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalInputKTH: React.FC<ModalInputKTHProps> = ({ isOpen, onClose }) => {
  const [inputMode, setInputMode] = useState<'excel' | 'manual'>('excel');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Data dikirim menggunakan mode: ${inputMode}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-300">
        
        {/* HEADER MODAL */}
        <div className="flex-none flex items-center justify-between p-6 border-b border-gray-100">
          <div>
            <h2 className="text-lg font-bold text-gray-800">Input Data KTH</h2>
            <p className="text-xs text-gray-500 mt-1">Pilih metode pengisian data yang diinginkan.</p>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all active:scale-90">
            <HiXMark className="w-5 h-5 stroke-2" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
          <div className="relative flex bg-gray-100/80 p-1.5 rounded-full mb-8 shadow-inner">
            <div
              className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-primary shadow-md rounded-full transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                inputMode === 'excel' ? 'translate-x-0' : 'translate-x-full'
              }`}
            ></div>

            <button
              type="button"
              onClick={() => setInputMode('excel')}
              className={`relative z-10 flex-1 flex items-center justify-center gap-2 text-xs font-bold py-3 rounded-full transition-colors duration-300 ${
                inputMode === 'excel' ? 'text-white' : 'text-[#185325] hover:text-[#0e3316]'
              }`}
            >
              <HiOutlineDocumentArrowUp className="w-4 h-4 stroke-2" />
              Upload Excel
            </button>

            <button
              type="button"
              onClick={() => setInputMode('manual')}
              className={`relative z-10 flex-1 flex items-center justify-center gap-2 text-xs font-bold py-3 rounded-full transition-colors duration-300 ${
                inputMode === 'manual' ? 'text-white' : 'text-[#185325] hover:text-[#0e3316]'
              }`}
            >
              <HiOutlineDocumentText className="w-4 h-4 stroke-2" />
              Input Manual
            </button>
          </div>

          <form onSubmit={handleSubmit} className="relative">
            <div className={`grid transition-all duration-500 ease-in-out ${inputMode === 'excel' ? 'grid-rows-[1fr] opacity-100 translate-x-0 scale-100' : 'grid-rows-[0fr] opacity-0 -translate-x-4 scale-95 pointer-events-none'}`}>
              <div className="overflow-hidden">
                <div className="p-6 border-2 border-dashed border-[#185325]/30 bg-[#f8fbf9] rounded-2xl text-center group hover:border-[#185325] transition-colors duration-300">
                  <div className="w-12 h-12 bg-[#EBF8F1] rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                    <HiOutlineDocumentArrowUp className="w-6 h-6 text-[#185325]" />
                  </div>
                  <label className="block text-sm font-bold text-gray-800 mb-3">Pilih Dokumen Excel</label>
                  <input 
                    type="file" 
                    accept=".xlsx, .xls"
                    tabIndex={inputMode === 'excel' ? 0 : -1}
                    className="w-full max-w-62.5 mx-auto block text-xs text-gray-600 cursor-pointer focus:outline-none file:mr-4 file:py-2 file:px-4 file:border-0 file:text-xs file:font-bold file:rounded-full file:bg-[#185325] file:text-white hover:file:bg-[#123d1c] file:transition-colors file:cursor-pointer" 
                  />
                  <p className="text-[10px] text-gray-500 mt-4 bg-white px-3 py-1.5 rounded-lg border border-gray-200 inline-block">
                    *Gunakan template Excel KTH yang sudah disediakan.
                  </p>
                </div>
              </div>
            </div>

            <div className={`grid transition-all duration-500 ease-in-out ${inputMode === 'manual' ? 'grid-rows-[1fr] opacity-100 translate-x-0 scale-100' : 'grid-rows-[0fr] opacity-0 translate-x-4 scale-95 pointer-events-none'}`}>
              <div className="overflow-hidden">
                <div className="space-y-4 p-1">
                  
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5 ml-1">Cabang Dinas Kehutanan</label>
                    <select tabIndex={inputMode === 'manual' ? 0 : -1} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm bg-gray-50/50 hover:bg-gray-50 outline-none focus:ring-2 focus:ring-[#185325]/20 focus:border-[#185325] transition-all cursor-pointer">
                      <option>-- Pilih CDK --</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5 ml-1">Kabupaten/Kota</label>
                      <select tabIndex={inputMode === 'manual' ? 0 : -1} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm bg-gray-50/50 hover:bg-gray-50 outline-none focus:ring-2 focus:ring-[#185325]/20 focus:border-[#185325] transition-all cursor-pointer">
                        <option>-- Pilih Kab/Kota --</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5 ml-1">Kecamatan</label>
                      <select tabIndex={inputMode === 'manual' ? 0 : -1} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm bg-gray-50/50 hover:bg-gray-50 outline-none focus:ring-2 focus:ring-[#185325]/20 focus:border-[#185325] transition-all cursor-pointer">
                        <option>-- Pilih Kec --</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5 ml-1">Desa/Kelurahan</label>
                    <select tabIndex={inputMode === 'manual' ? 0 : -1} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm bg-gray-50/50 hover:bg-gray-50 outline-none focus:ring-2 focus:ring-[#185325]/20 focus:border-[#185325] transition-all cursor-pointer">
                      <option>-- Pilih Desa/Kelurahan --</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5 ml-1">Nama Kelompok & Ketua</label>
                    <div className="flex gap-4">
                      <input tabIndex={inputMode === 'manual' ? 0 : -1} type="text" placeholder="Nama KTH" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm bg-gray-50/50 hover:bg-gray-50 outline-none focus:ring-2 focus:ring-[#185325]/20 focus:border-[#185325] transition-all" />
                      <input tabIndex={inputMode === 'manual' ? 0 : -1} type="text" placeholder="Nama Ketua" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm bg-gray-50/50 hover:bg-gray-50 outline-none focus:ring-2 focus:ring-[#185325]/20 focus:border-[#185325] transition-all" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5 ml-1">Jenis Usaha</label>
                    <select tabIndex={inputMode === 'manual' ? 0 : -1} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm bg-gray-50/50 hover:bg-gray-50 outline-none focus:ring-2 focus:ring-[#185325]/20 focus:border-[#185325] transition-all cursor-pointer">
                      <option>-- Pilih Jenis Usaha --</option>
                    </select>
                  </div>

                </div>
              </div>
            </div>

            <div className="pt-6 mt-2 border-t border-gray-100">
              <button 
                type="submit" 
                className="w-full bg-[#185325] hover:bg-[#123d1c] text-white py-3.5 rounded-full text-sm font-bold transition-all hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:scale-95 flex items-center justify-center gap-2"
              >
                Submit Data {inputMode === 'excel' ? 'Excel' : 'Manual'}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalInputKTH;