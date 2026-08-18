import React, { useState } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { MOCK_DASHBOARD_DATA, type MonitoringRow, type MonitoringStatus, type ViewMode } from '../constants';
import { RekapView, TableView, InputEditView, ReadOnlyView } from './FormViews';

const FormMonitoringPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  
  const activeId = id || 'PRG-2026-0007';
  const activeProgram = MOCK_DASHBOARD_DATA[activeId] || MOCK_DASHBOARD_DATA['PRG-2026-0007'];
  const programStatus = (location.state?.status as MonitoringStatus) || 'Siap Monitoring';
  
  const isTindakLanjut = programStatus === 'Tindak Lanjut';
  const isReadOnly = programStatus === 'Menunggu Evaluasi' || programStatus === 'Selesai';

  const [viewMode, setViewMode] = useState<ViewMode>('rekap');
  const [selectedRow, setSelectedRow] = useState<MonitoringRow | null>(null);

  const handleOpenForm = (mode: 'input' | 'edit', row: MonitoringRow) => {
    setSelectedRow(row);
    setViewMode(mode);
  };

  const handleBackToTable = () => {
    setViewMode('table');
    setSelectedRow(null);
  };

  const handleBackToRekap = () => {
    setViewMode('rekap');
    setSelectedRow(null);
  };

  if (isReadOnly) {
    return <ReadOnlyView activeId={activeId} activeProgram={activeProgram} isTindakLanjut={isTindakLanjut} programStatus={programStatus} navigate={navigate} />;
  }

  switch (viewMode) {
    case 'rekap':
      return <RekapView activeId={activeId} activeProgram={activeProgram} isTindakLanjut={isTindakLanjut} setViewMode={setViewMode} navigate={navigate} />;
    case 'table':
      return <TableView activeId={activeId} activeProgram={activeProgram} isTindakLanjut={isTindakLanjut} handleBackToRekap={handleBackToRekap} handleOpenForm={handleOpenForm} />;
    case 'input':
    case 'edit':
      return <InputEditView activeId={activeId} activeProgram={activeProgram} isTindakLanjut={isTindakLanjut} isEdit={viewMode === 'edit'} selectedRow={selectedRow} handleBackToTable={handleBackToTable} />;
    default:
      return null;
  }
};

export default FormMonitoringPage;