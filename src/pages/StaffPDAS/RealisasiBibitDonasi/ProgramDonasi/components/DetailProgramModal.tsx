import type { ProgramData } from '@/utils/interface';
import React, { useEffect } from 'react';
import { HiOutlineXMark } from 'react-icons/hi2';

type StatusProgram = 'Aktif' | 'Selesai' | 'Menunggu Verifikasi';

interface DetailProgramModalProps {
  isOpen: boolean;
  onClose: () => void;
  program: ProgramData | null;
}

const DetailProgramModal: React.FC<DetailProgramModalProps> = ({ 
  isOpen, 
  onClose, 
  program 
}) => {
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

  if (!isOpen || !program) return null;

  const getStatusStyle = (status: StatusProgram) => {
    switch (status) {
      case 'Aktif': return 'bg-[#2E7D32] text-white';
      case 'Selesai': return 'bg-gray-200 text-gray-600';
      case 'Menunggu Verifikasi': return 'bg-[#F2C94C] text-gray-800';
      default: return 'bg-gray-200 text-gray-600';
    }
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('id-ID').format(num);
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header Modal */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-800">
            Detail Program
          </h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <HiOutlineXMark className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 md:p-8 space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">Nama Program</h3>
              <p className="text-base font-semibold text-gray-800">{program.nama}</p>
            </div>

            <div>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">Lokasi</h3>
              <p className="text-sm font-medium text-gray-700">{program.lokasi}</p>
            </div>

            <div>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Status</h3>
              <span className={`inline-block px-4 py-1 text-[11px] font-bold rounded-full ${getStatusStyle(program.status)}`}>
                {program.status}
              </span>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-6">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Jenis Bibit Disetujui</h3>
            <div className="flex flex-wrap gap-2">
                                      {program.jenisBibit && program.jenisBibit.length > 0 ? (
                program.jenisBibit.map((bibit, index) => (
                  <div 
                    key={index} 
                    className="flex items-center justify-between gap-3 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg shadow-sm"
                  >
                    <span className="text-sm font-semibold text-gray-700">
                      {bibit.nama}
                    </span>
                    <span className="bg-[#e2f1e6] text-[#185325] px-2 py-0.5 rounded text-xs font-bold">
                      {formatNumber(bibit.jumlah)}
                    </span>
                  </div>
                ))
              ) : (
                <span className="text-sm text-gray-400 italic">Belum ada jenis bibit yang ditentukan.</span>
              )}
            </div>
          </div>

        </div>

        <div className="bg-[#f0f9f3] p-6 border-t border-[#e2f1e6] flex flex-col md:flex-row justify-between items-center gap-4">
           <span className="text-sm font-semibold text-[#185325]">Total Bibit Terkumpul:</span>
           <span className="text-2xl font-black text-[#185325]">
             {program.terkumpul} <span className="text-base font-bold">Bibit</span>
           </span>
        </div>

      </div>
    </div>
  );
};

export default DetailProgramModal;