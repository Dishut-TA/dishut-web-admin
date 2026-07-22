import { useState } from 'react';
import { type Report, mockReports } from './data';
import MonitoringTable from './components/MonitoringTable';
import DetailMonitoringModal from './components/DetailMonitoringModal';

const VerifikasiMonitoring = () => {
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenDetail = (report: Report) => {
    setSelectedReport(report);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedReport(null), 200);
  };

  return (
    <div className="flex flex-col gap-6 w-full mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-1">
            Verifikasi Monitoring
          </h1>
          <p className="text-gray-500 text-sm">
            Tinjau, otorisasi, dan validasi data progres lapangan berbasis koordinat.
          </p>
        </div>
      </div>

      {/* Komponen Tabel Utama */}
      <MonitoringTable 
        reports={mockReports} 
        onViewDetail={handleOpenDetail} 
      />

      {/* Komponen Modal Interaktif */}
      <DetailMonitoringModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        report={selectedReport} 
      />

    </div>
  );
};

export default VerifikasiMonitoring;