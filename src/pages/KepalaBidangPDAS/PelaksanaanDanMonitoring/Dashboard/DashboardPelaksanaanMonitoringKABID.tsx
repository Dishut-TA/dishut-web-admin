import MapMockup from './components/MapMockup';
import DonutChart from './components/DonutChart';
import TableBerjalan from './components/TableBerjalan';
import RecentActivities from './components/RecentActivities';
import DashboardFilters from './components/DashboardFilters';
import SummaryCards from './components/SummaryCards';
import TableRealisasi from './components/TabRealisasi';

export default function DashboardPelaksanaanMonitoringKabid() {
  return (
    <div className="flex bg-gray-50 font-sans text-gray-800 w-full min-h-screen">
      <main className="flex-1 flex flex-col w-full">
          <DashboardFilters />
          <SummaryCards />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <MapMockup />
            <DonutChart />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <TableRealisasi />
            <TableBerjalan />
          </div>

          <RecentActivities />

      </main>
    </div>
  );
}