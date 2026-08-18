import React from 'react';
import { useParams } from 'react-router-dom';
import ViewSelesai from './components/ViewSelesai';
import ViewMenungguVerifikasi from './components/ViewMenungguVerifikasi';

const DetailPenugasan: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const isSelesai = id === '4' || id === '5' || id === '8';

  return (
    <div className="min-h-screen bg-[#f8faf9] pb-12 font-sans text-gray-800">
      {isSelesai ? (
        <ViewSelesai />
      ) : (
        <ViewMenungguVerifikasi />
      )}
      
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #e2e8f0; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background-color: #cbd5e1; }
      `}} />
    </div>
  );
};

export default DetailPenugasan;