import React from 'react';
import { 
  HiOutlineMapPin, 
  HiOutlineInformationCircle, 
  HiOutlineShieldCheck,
  HiCheckCircle,
  HiXMark,
  HiCheck
} from 'react-icons/hi2';
import { type Report } from '../data'; 

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  report: Report | null;
}

const DetailMonitoringModal: React.FC<ModalProps> = ({ isOpen, onClose, report }) => {
  if (!isOpen || !report || !report.details) return null;

  const { details } = report;

  const handleApprove = () => {
    console.log("Verifikasi Laporan ID:", report.id);
    onClose();
  };

  const handleReject = () => {
    console.log("Tolak Laporan ID:", report.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      <div className="relative bg-white rounded-2xl w-full max-w-3xl shadow-2xl flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
        <div className="flex-none flex items-start justify-between p-6 border-b border-gray-100">
          <div>
            <h2 className="text-xl font-bold text-gray-800">{report.title}</h2>
            <p className="text-sm text-gray-400 font-medium mt-1">ID Laporan: {report.id} • {report.date}</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors"
          >
            <HiXMark className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto custom-scrollbar flex-1 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            <div>
              <div className="flex items-center gap-2 mb-3 text-sm font-bold text-gray-800">
                <HiOutlineMapPin className="w-5 h-5 text-[#185325]" /> Verifikasi Koordinat
              </div>
              <div className="bg-[#EBF3E8] rounded-xl overflow-hidden text-sm border border-[#D5F0DE]">
                <div className="flex justify-between p-3.5 border-b border-white/60">
                  <span className="text-gray-600">Latitude</span>
                  <span className="font-bold text-gray-800">{details.latitude}</span>
                </div>
                <div className="flex justify-between p-3.5">
                  <span className="text-gray-600">Longitude</span>
                  <span className="font-bold text-gray-800">{details.longitude}</span>
                </div>
              </div>
              <div className="mt-3">
                <span className="bg-[#185325] text-white text-[10px] font-bold px-3 py-1.5 rounded-full tracking-wider">
                  Akurasi: {details.accuracy}
                </span>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3 text-sm font-bold text-gray-800">
                <HiOutlineInformationCircle className="w-5 h-5 text-[#185325]" /> Kondisi & Survival Rate
              </div>
              <div className="grid grid-cols-2 gap-3 h-25">
                <div className="bg-[#D5F0DE] rounded-xl p-4 text-center flex flex-col justify-center border border-[#89C78E]/30">
                  <span className="text-[10px] text-green-800 font-bold mb-1 tracking-wider">KESEHATAN</span>
                  <span className="text-xl font-bold text-[#185325] uppercase">{details.healthStatus}</span>
                </div>
                <div className="bg-blue-50 rounded-xl p-4 text-center flex flex-col justify-center border border-blue-200/50">
                  <span className="text-[10px] text-blue-800 font-bold mb-1 tracking-wider">SURVIVAL RATE</span>
                  <span className="text-xl font-bold text-blue-700 uppercase">{details.survivalRate}</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-4 text-sm font-bold text-gray-800">
              <HiOutlineShieldCheck className="w-5 h-5 text-[#185325]" /> Bukti Dokumentasi Lapangan
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center gap-2 group">
                <div className="w-full h-40 lg:h-56 overflow-hidden rounded-xl border border-gray-100 shadow-sm">
                  <img src={details.images.before} alt="Before" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <span className="text-xs font-bold text-gray-500 tracking-widest">KONDISI AWAL (BEFORE)</span>
              </div>
              <div className="flex flex-col items-center gap-2 group">
                <div className="w-full h-40 lg:h-56 overflow-hidden rounded-xl border border-gray-100 shadow-sm">
                  <img src={details.images.during} alt="During" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <span className="text-xs font-bold text-gray-500 tracking-widest">PELAKSANAAN (DURING)</span>
              </div>
            </div>
          </div>

          <div>
            <div className="text-sm font-bold text-gray-800 mb-3">Catatan Kendala Lapangan</div>
            <div className="bg-orange-50 text-orange-800 border border-orange-200 p-4 rounded-xl text-sm font-medium leading-relaxed">
              {details.kendala || "Tidak ada kendala yang dilaporkan."}
            </div>
          </div>
        </div>

        <div className="flex-none p-6 border-t border-gray-100 bg-gray-50/50 rounded-b-2xl">
          {report.status === 'Verified' ? (
            <div className="bg-[#E8EDE9] rounded-xl p-4 flex items-center justify-center gap-3">
              <HiCheckCircle className="w-6 h-6 text-[#185325]" />
              <div>
                <h4 className="font-bold text-[#185325] text-sm">Laporan Telah Diverifikasi</h4>
                <p className="text-xs text-[#185325]/80 font-medium">
                  Oleh {details.verifiedBy} pada {details.verifiedAt}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <button 
                onClick={handleReject}
                className="w-1/3 flex items-center justify-center gap-2 px-6 py-3.5 bg-white border border-red-200 text-red-600 hover:bg-red-50 font-bold text-sm rounded-xl transition-colors"
              >
                <HiXMark className="w-5 h-5" /> Tolak
              </button>
              
              <button 
                onClick={handleApprove}
                className="w-2/3 flex items-center justify-center gap-2 px-6 py-3.5 bg-[#185325] hover:bg-[#123d1c] text-white font-bold text-sm rounded-xl transition-colors shadow-lg shadow-[#185325]/20"
              >
                <HiCheck className="w-5 h-5" /> Verifikasi Laporan Ini
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default DetailMonitoringModal;