import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import ViewValidasiLokasi from './components/ViewValidasiLokasi';
import ViewPelaksanaan from './components/ViewPelaksanaan';

const DetailPenugasan: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();

  const status = location.state?.status || 'Menunggu Verifikasi';
  
  const defaultJenis = ['1', '3', '5'].includes(id || '') ? 'Validasi Lokasi' : 'Pelaksanaan Penanaman';
  const jenisKegiatan = location.state?.jenisKegiatan || defaultJenis;

  return (
    <div className="min-h-screen bg-[#f8faf9] pb-12 font-sans text-gray-800">
      
      {jenisKegiatan === 'Validasi Lokasi' ? (
        <ViewValidasiLokasi status={status} activeId={id || ''} />
      ) : (
        <ViewPelaksanaan status={status} activeId={id || ''} />
      )}
      
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #cbd5e1; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background-color: #94a3b8; }
      `}} />
    </div>
  );
};

export default DetailPenugasan;