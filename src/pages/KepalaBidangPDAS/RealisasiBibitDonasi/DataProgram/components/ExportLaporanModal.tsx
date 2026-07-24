import React, { useEffect, useState } from 'react';
import { HiOutlineXMark, HiOutlineArrowDownTray, HiOutlineDocumentText } from 'react-icons/hi2';
import toast from 'react-hot-toast';
import { exportLaporanAPI } from '@/services/report.service'; 
import { useAuth } from '@/context/AuthContext';
import { getDonationProgramsAPI } from '@/services/program-donasi.service'; 

interface ExportLaporanModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ExportLaporanModal: React.FC<ExportLaporanModalProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth(); 
  const [selectedProgram, setSelectedProgram] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [programsData, setProgramsData] = useState<any[]>([]);
  const [isFetchingPrograms, setIsFetchingPrograms] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    
    if (isOpen) {
      fetchProgramsList();
    } else {
      setSelectedProgram('');
      setStartDate('');
      setEndDate('');
    }
    
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const fetchProgramsList = async () => {
    setIsFetchingPrograms(true);
    try {
      const response = await getDonationProgramsAPI();
      setProgramsData(response.payload);
    } catch (error: any) {
      toast.error('Gagal mengambil daftar program donasi.');
    } finally {
      setIsFetchingPrograms(false);
    }
  };

  const handleExport = async () => {
    setIsLoading(true);
    const toastId = toast.loading('Sedang menyiapkan file Excel...');

    try {
      const payload = {
        donation_program_id: selectedProgram === 'semua' ? null : Number(selectedProgram),
        user_id: user?.id, 
        start_date: startDate || null,
        end_date: endDate || null,
        status: "Success",
      };

      const blob = await exportLaporanAPI(payload);

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      
      const fileName = `Laporan_Program_${new Date().getTime()}.xlsx`; 
      link.setAttribute('download', fileName);
      
      document.body.appendChild(link);
      link.click();
      
      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success('Laporan berhasil diunduh!', { id: toastId });
      onClose();

    } catch (error: any) {
      toast.error(error.message, { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-2 text-gray-800">
            <HiOutlineArrowDownTray className="w-6 h-6 text-[#185325]" />
            <h2 className="text-xl font-bold">Export Rekap Laporan</h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer">
            <HiOutlineXMark className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 md:p-8 space-y-5">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Pilih Program Donasi <span className="text-red-500">*</span>
            </label>
            <select 
              value={selectedProgram}
              onChange={(e) => setSelectedProgram(e.target.value)}
              disabled={isFetchingPrograms}
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#009262]/20 focus:border-[#009262] transition-all cursor-pointer disabled:bg-gray-50 disabled:cursor-not-allowed"
            >
              <option value="" disabled>
                {isFetchingPrograms ? 'Memuat daftar program...' : '-- Pilih Program --'}
              </option>
              <option value="semua">Semua Program</option>
              
              {programsData.map((program) => (
                <option key={program.id} value={program.id}>
                  {program.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Tanggal Mulai <span className="text-gray-400 font-normal">(Opsional)</span>
              </label>
              <input 
                type="date" 
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#009262]/20 focus:border-[#009262] transition-all cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Tanggal Akhir <span className="text-gray-400 font-normal">(Opsional)</span>
              </label>
              <input 
                type="date" 
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#009262]/20 focus:border-[#009262] transition-all cursor-pointer"
              />
            </div>
          </div>

        </div>

        <div className="p-6 border-t border-gray-100 flex items-center justify-end gap-3 bg-gray-50/50">
          <button 
            onClick={onClose}
            disabled={isLoading}
            className="px-6 py-2.5 text-sm font-bold text-gray-600 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer disabled:opacity-50"
          >
            Batal
          </button>
          <button 
            disabled={!selectedProgram || isLoading || isFetchingPrograms}
            onClick={handleExport}
            className={`flex items-center gap-2 px-6 py-2.5 text-sm font-bold text-white rounded-xl transition-all shadow-sm ${
              selectedProgram && !isLoading && !isFetchingPrograms ? 'bg-[#009262] hover:bg-[#007a52] active:scale-95 cursor-pointer' : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            {isLoading ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            ) : (
              <HiOutlineDocumentText className="w-5 h-5" />
            )}
            {isLoading ? 'Memproses...' : 'Unduh Laporan Excel'}
          </button>
        </div>

      </div>
    </div>
  );
};

export default ExportLaporanModal;