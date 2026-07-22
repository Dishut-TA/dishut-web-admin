import React from "react";
import {
  HiOutlineHeart,
  HiOutlineBuildingOffice2,
  HiOutlineBanknotes,
} from "react-icons/hi2";
import { PiPlant } from "react-icons/pi";
import SummaryCard from "./components/SummaryCard";
import TrendDonasiChart from "./components/TrendDonasiChart";
import PerbandinganPendanaanChart from "./components/PerbandinganPendanaanChart";

const DashboardKabid: React.FC = () => {
  return (
    <div className="space-y-6 w-full max-w-300 mx-auto bg-slate-50 min-h-screen">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
          Dashboard Kepala Bidang PDAS
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard
          title="Total Lahan Prioritas"
          value="12,345 Ha"
          icon={<PiPlant className="w-6 h-6" />}
          iconBgColor="bg-emerald-100"
          iconTextColor="text-emerald-700"
        />
        <SummaryCard
          title="Total Donasi Terkumpul"
          value="Rp 0"
          icon={<HiOutlineHeart className="w-6 h-6" />}
          iconBgColor="bg-emerald-100"
          iconTextColor="text-emerald-700"
        />
        <SummaryCard
          title="Total Lahan Pendanaan CSR"
          value="7.890 Ha"
          icon={<HiOutlineBuildingOffice2 className="w-6 h-6" />}
          iconBgColor="bg-emerald-100"
          iconTextColor="text-emerald-700"
        />
        <SummaryCard
          title="Total Lahan Pendanaan APBD"
          value="9.210 Ha"
          icon={<HiOutlineBanknotes className="w-6 h-6" />}
          iconBgColor="bg-emerald-100"
          iconTextColor="text-emerald-700"
        />
      </div>

      <TrendDonasiChart />

      <PerbandinganPendanaanChart />
    </div>
  );
};

export default DashboardKabid;
