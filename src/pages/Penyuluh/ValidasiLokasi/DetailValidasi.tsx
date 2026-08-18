import React from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { mockDatabase } from './data/mockData';
import { FormValidasiView } from './components/FormValidasiView';
import { LihatDetailView } from './components/LihatDetailView';

const DetailValidasi: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const activeId = id || 'TGS-2026-011'; 
  const data = mockDatabase[activeId] || mockDatabase['TGS-2026-011'];
  
  const currentStatus = location.state?.status || data.status;

  return (
    <div className="w-full mx-auto bg-[#F8FAFC] min-h-screen font-sans">
      {currentStatus === 'Selesai' ? (
        <LihatDetailView data={data} navigate={navigate} />
      ) : (
        <FormValidasiView data={data} navigate={navigate} />
      )}
    </div>
  );
};

export default DetailValidasi;