import React, { useState } from "react";
import {
  HiOutlineExclamationCircle,
  HiOutlineCheckCircle,
  HiOutlineMap,
  HiOutlineGlobeAsiaAustralia,
} from "react-icons/hi2";
import toast from "react-hot-toast";

import VerifikasiDonaturModal from "../DataDonatur/components/VerifikasiDonaturModal";
import StatCard, { type StatData } from "./components/StatCard";
import type { DonaturData } from "@/utils/interface";

interface VerificationData {
  id: number;
  companyName: string;
  detail: string;
}

interface ProgressData {
  id: number;
  title: string;
  collected: string;
  status: "Aktif" | "Selesai" | "Menunggu Verifikasi";
}

// --- MOCK DATA ---
const STATS_DATA: StatData[] = [
  { id: 1, label: "Menunggu Verifikasi", value: 1, icon: HiOutlineExclamationCircle, iconColor: "text-amber-500", bgColor: "bg-amber-50" },
  { id: 2, label: "Bibit Siap Salur", value: 55, icon: HiOutlineCheckCircle, iconColor: "text-[#2E7D32]", bgColor: "bg-[#DCECE0]/50" },
  { id: 3, label: "Total Bibit Tertanam", value: 50, icon: HiOutlineGlobeAsiaAustralia, iconColor: "text-[#185325]", bgColor: "bg-[#DCECE0]/80" },
  { id: 4, label: "Program Aktif", value: 2, icon: HiOutlineMap, iconColor: "text-blue-600", bgColor: "bg-blue-50" },
];

const VERIFICATION_DATA: VerificationData[] = [
  { id: 1, companyName: "PT Hijau Bersama", detail: "500 Bibit - Pemulihan Lahan Kritis Cisadane" },
];

const PROGRESS_DATA: ProgressData[] = [
  { id: 1, title: "Penghijauan Hulu Citarum", collected: "8.500", status: "Aktif" },
  { id: 2, title: "Pemulihan Lahan Kritis Cisadane", collected: "2.000", status: "Aktif" },
  { id: 3, title: "Hutan Kota Ciliwung", collected: "2.000", status: "Selesai" },
  { id: 4, title: "Penanaman Mangrove Pesisir Utara", collected: "0", status: "Menunggu Verifikasi" },
];

const StatusBadge = ({ status }: { status: ProgressData["status"] }) => {
  const styles = {
    Aktif: "bg-[#e2f1e6] text-[#185325] border border-[#C8E0CD]",
    Selesai: "bg-gray-100 text-gray-600 border border-gray-200",
    "Menunggu Verifikasi": "bg-amber-50 text-amber-600 border border-amber-200",
  };
  return (
    <span className={`px-4 py-1.5 text-[11px] font-bold rounded-full whitespace-nowrap shadow-sm ${styles[status]}`}>
      {status}
    </span>
  );
};

const DashboardProgram: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDonatur, setSelectedDonatur] = useState<DonaturData | null>(null);

  const handleOpenVerifikasi = (item: VerificationData) => {
      const detailParts = item.detail.split(" - ");
      const jumlahBibitString = detailParts[0] ? detailParts[0].replace(/\D/g, "") : "0"; 
      const jumlahBibitNumber = parseInt(jumlahBibitString, 10); 
      const programName = detailParts[1] || "-";

      setSelectedDonatur({
        idTransaksi: `TRX-00${item.id}`,
        idDonasi: `TRX-00${item.id}`,
        namaDonatur: item.companyName,
        program: programName,
        jumlahBibit: jumlahBibitNumber,
        status: "Menunggu Verifikasi",
        rincianBibit: [] 
      });
      
      setIsModalOpen(true);
    };

  const handleTerimaDonatur = () => {
    toast.success(`Donasi dari ${selectedDonatur?.namaDonatur} berhasil diverifikasi!`);
    setIsModalOpen(false);
  };

  const handleTolakDonatur = () => {
    toast.error(`Donasi dari ${selectedDonatur?.namaDonatur} ditolak.`);
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="flex flex-col gap-6 w-full max-w-screen-2xl mx-auto pb-8">
        <div className="mb-2">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">
            Dashboard Realisasi Bibit dan Donasi
          </h1>
          <p className="text-sm md:text-base text-gray-500">
            Ringkasan performa program dan status verifikasi donatur.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {STATS_DATA.map((stat) => (
            <StatCard key={stat.id} data={stat} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 pt-2 items-start">
          
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
            <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-[#f0f9f3]">
              <h2 className="font-bold text-gray-800">Donatur Butuh Verifikasi</h2>
              <span className="bg-[#F2C94C] text-gray-800 text-[11px] font-bold px-3 py-1 rounded-full shadow-sm">
                {VERIFICATION_DATA.length} Baru
              </span>
            </div>

            <div className="p-6 flex-1 bg-slate-50/50 min-h-75">
              {VERIFICATION_DATA.length > 0 ? (
                <div className="space-y-4">
                  {VERIFICATION_DATA.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-[#185325]/50 transition-colors"
                    >
                      <div>
                        <h4 className="font-bold text-gray-800">{item.companyName}</h4>
                        <p className="text-sm text-gray-500 mt-1">{item.detail}</p>
                      </div>
                      
                      <button 
                        onClick={() => handleOpenVerifikasi(item)}
                        className="px-5 py-2 bg-[#185325] hover:bg-[#123d1c] text-white text-xs font-bold rounded-full cursor-pointer transition-colors active:scale-95 whitespace-nowrap shadow-sm"
                      >
                        Verifikasi Data
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-gray-400 text-sm font-medium">
                  Tidak ada data verifikasi baru.
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm flex flex-col overflow-hidden">
            <div className="p-6 border-b border-gray-100 bg-white">
              <h2 className="font-bold text-gray-800">Progress Program</h2>
            </div>

            <div className="p-0 overflow-y-auto max-h-100 custom-scrollbar">
              <ul className="divide-y divide-gray-100">
                {PROGRESS_DATA.map((progress) => (
                  <li
                    key={progress.id}
                    className="p-6 hover:bg-gray-50/80 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div>
                      <h4 className="font-bold text-gray-800">{progress.title}</h4>
                      <p className="text-sm text-gray-500 mt-1">
                        Total Terkumpul:{" "}
                        <span className="font-bold text-[#185325]">
                          {progress.collected}
                        </span>{" "}
                        Bibit
                      </p>
                    </div>
                    <div className="shrink-0">
                      <StatusBadge status={progress.status} />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>

      <VerifikasiDonaturModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        donatur={selectedDonatur}
        onTerima={handleTerimaDonatur}
        onTolak={handleTolakDonatur}
      />
    </>
  );
};

export default DashboardProgram;