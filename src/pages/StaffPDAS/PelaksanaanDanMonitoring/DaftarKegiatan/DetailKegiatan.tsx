import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { HiOutlineArrowLeft, HiOutlineMapPin, HiOutlinePrinter } from "react-icons/hi2";
import type { ActivityDetail } from "./types/activity";
import { StatCardAuthor, StatCardBudget, StatCardTarget } from "./components/MetricCards";
import InfoCard from "./components/InfoCard";
import MapPlaceholderCard from "./components/MapPlaceholderCard";
import TimelineSection from "./components/TimelineSection";
import FundingNote from "./components/FundingNote";
import StatusBadge from "./components/StatusBadge";

const DetailKegiatan: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState<ActivityDetail | null>(null);

  useEffect(() => {
    setData({
      id: Number(id),
      title: "Rehabilitasi DAS Cimanuk Hulu",
      wilayahPrioritas: "DAS Cimanuk - Garut",
      location: "Kecamatan Cisitu, Kabupaten Garut",
      jenisProgram: "Program APBD",
      subProgramName: "Rehabilitasi Lahan Kritis",
      tipeIntervensi: "Penanaman Pohon Pelindung",
      kthPelaksana: "KTH Lestari Mandiri",
      jenisKegiatanFisik: "Penanaman & Pemeliharaan",
      targetLuas: 500,
      targetBibit: 125000,
      jenisTanaman: "Mangrove, Sengon, Jabon",
      estimasiAnggaran: 1500000000,
      sumberPendanaan: "APBD Provinsi Jabar 2025",
      startDate: "20 Mei 2025",
      endDate: "20 Des 2025",
      time: "08:00 - 16:00",
      author: "Dina Marlina, S.Hut",
      progress: 65,
      status: "Berjalan",
      deskripsi: "Program rehabilitasi lahan kritis ini difokuskan pada pemulihan tutupan lahan...",
      sdmTambahan: "3 Tenaga Ahli GIS, 10 Buruh Tani Lokal",
      kebutuhanAlat: "Cangkul, Bibit, Pagar Pengaman, GPS Handheld",
      timelineLogs: [
        { id: 1, tanggal: "20 Mei 2025", pesan: "Penandatanganan kontrak kerja", oleh: "Staff PDAS" },
        { id: 2, tanggal: "05 Juni 2025", pesan: "Mobilisasi bibit dan alat", oleh: "KTH Lestari Mandiri" }
      ]
    });
  }, [id]);

  if (!data) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#185325]"></div>
    </div>
  );

  return (
    <div className="flex flex-col gap-8 mx-auto">
      <div className="flex flex-col gap-4">
        <button 
          onClick={() => navigate(-1)} 
          className="group cursor-pointer flex items-center gap-2 w-fit text-sm font-semibold text-primary hover:text-[#185325] transition-colors"
        >
          <div className="p-1.5 rounded-full group-hover:border-[#185325] group-hover:bg-green-50 transition-all">
            <HiOutlineArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
          </div>
          Kembali
        </button>

        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <div>
            <div className="flex items-center gap-4 flex-wrap mb-2.5">
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">{data.title}</h1>
              <StatusBadge status={data.status} />
            </div>
            <p className="text-gray-500 font-medium flex items-center gap-1.5">
              <HiOutlineMapPin className="w-5 h-5 text-gray-400" /> 
              {data.location}
            </p>
          </div>
          
          <div className="flex items-center gap-3 shrink-0">
            <button 
              onClick={() => window.print()} 
              className="px-4 py-2.5 border border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 text-gray-700 rounded-xl text-sm font-semibold flex items-center gap-2 shadow-sm transition-all active:scale-95"
            >
              <HiOutlinePrinter className="w-4 h-4" /> Cetak
            </button>
            {/* <button className="bg-[#185325] hover:bg-[#123d1c] text-white px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 shadow-sm hover:shadow-md transition-all active:scale-95">
              <HiOutlinePencilSquare className="w-4 h-4" /> Edit Program
            </button> */}
          </div>
        </div>
      </div>

      {/* METRICS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <StatCardTarget luas={data.targetLuas} bibit={data.targetBibit} />
        <StatCardBudget budget={data.estimasiAnggaran} source={data.sumberPendanaan} />
        <StatCardAuthor author={data.author} kth={data.kthPelaksana} />
      </div>

      {/* MAIN CONTENT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <InfoCard data={data} />
          <MapPlaceholderCard title={data.title} />
        </div>
        <div className="flex flex-col gap-6">
          <TimelineSection logs={data.timelineLogs} />
          <FundingNote source={data.sumberPendanaan} />
        </div>
      </div>
      
    </div>
  );
};

export default DetailKegiatan;