import React from 'react';
import { useNavigate } from 'react-router-dom';
import { mockReports } from './data';
import MonitoringTable from './components/MonitoringTable';

const VerifikasiMonitoring: React.FC = () => {
  const navigate = useNavigate();

  const handleOpenDetail = (id: string | number) => {
    navigate(`/admin/staff/monitoring/verifikasi/detail/${id}`);
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

      <MonitoringTable 
        reports={mockReports} 
        onViewDetail={handleOpenDetail} 
      />
    </div>
  );
};

export default VerifikasiMonitoring;