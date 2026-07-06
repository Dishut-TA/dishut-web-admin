import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { HiOutlineChevronLeft } from 'react-icons/hi2';
import MilestoneSection from './components/MilestoneSection';
import RevisionModal from './components/RevisionModal';
import ApprovalModal from './components/ApprovalModal';
import toast from 'react-hot-toast';

const DetailInvestasiKABIDBUPM: React.FC = () => {
  const navigate = useNavigate();
  const [showRevisionModal, setShowRevisionModal] = useState(false);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const location = useLocation();
  const isValidasiMode = location.pathname.includes('/validasi');

  // --- MOCK DATA ---
  const projectData = {
    title: 'Proyek Pembangunan Ekowisata Kebun Stroberi',
    kth: 'Rimba Nusantara',
    targetFunding: 'Rp. 100.000.000',
    persentase: '40%',
    tenggatWaktu: '20 Agustus 2024',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800&auto=format&fit=crop',
    deskripsiUmum: 'Lorem ipsum dolor sit amet consectetur. Faucibus faucibus urna nulla amet at nascetur. Enim aliquam sed nibh bibendum. Pulvinar nec risus et vulputate consequat tortor. Quisque tristique in dapibus laoreet eu augue. Maecenas quam eget habitant non. Lobortis lobortis dui phasellus sodales consectetur faucibus mauris eros odio. Diam tortor massa et venenatis ornare tristique nulla.',
    pembagianKeuntungan: {
      kth: '60%',
      investor: '40%'
    },
    milestones: [
      { id: 1, nama: 'Milestone 1', batas: '22/04/2024', status: 'Tercapai' as const, dokumen: 'RencanaProyekPembangunanEkowisata.pdf', deskripsi: 'Lorem ipsum dolor sit amet consectetur...' },
      { id: 2, nama: 'Milestone 2', batas: '22/04/2024', status: 'Belum Dimulai' as const, dokumen: '-', deskripsi: 'Lorem ipsum dolor sit amet consectetur...' },
      { id: 3, nama: 'Milestone 3', batas: '22/05/2024', status: 'Belum Dimulai' as const, dokumen: '-', deskripsi: 'Tahap penyelesaian akhir dan serah terima.' },
      { id: 4, nama: 'Milestone 4', batas: '22/06/2024', status: 'Belum Dimulai' as const, dokumen: '-', deskripsi: 'Evaluasi operasional bulan pertama.' }
    ],
    dokumen: [
      { label: 'Dokumen Perjanjian Investasi', file: 'PerjanjianInvestor.pdf' },
      { label: 'Dokumen Rencana Bisnis', file: 'RencanaProyekPembangunanEkowisata.pdf' },
      { label: 'Dokumen Proyeksi Keuangan', file: 'ProyeksiKeuanganEkowisata.pdf' },
      { label: 'Dokumen Hukum dan Perizinan', file: 'HukumDanPerizinanInvestasi.pdf' },
      { label: 'Template Perjanjian Investor', file: 'DokumenPerjanjian.pdf' },
    ]
  };

  const handleRevisionSubmit = (alasan: string) => {
    setShowRevisionModal(false);
    toast.error('Proposal dikembalikan untuk revisi.');
    navigate(-1);
  };

  const handleApprovalSubmit = () => {
    setShowApprovalModal(false);
    toast.success('Investasi berhasil disetujui!');
    navigate(-1);
  };

  return (
    <div className="flex flex-col gap-6 w-full mx-auto pb-12">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm font-bold text-[#185325] hover:underline self-start">
        <HiOutlineChevronLeft className="w-4 h-4" strokeWidth={2.5} /> Kembali
      </button>

        <h1 className="text-2xl font-bold text-gray-800 mb-8">
          {isValidasiMode ? 'Konfirmasi Pembuatan Investasi Baru' : 'Detail Data Investasi'}
        </h1>
        
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <img src={projectData.image} alt="Project" className="w-full md:w-64 h-40 object-cover rounded-xl shadow-sm" />
          <div className="flex flex-col justify-center gap-2 text-sm">
            <h2 className="text-xl font-bold text-gray-800">{projectData.title}</h2>
            <div className="grid grid-cols-[140px_auto] gap-y-2 mt-2 font-medium">
              <span className="text-gray-500">KTH</span>
              <span className="text-[#185325] font-bold">: {projectData.kth}</span>
              <span className="text-gray-500">Target Funding</span>
              <span className="text-[#185325] font-bold">: {projectData.targetFunding}</span>
              <span className="text-gray-500">Persentase Keuntungan</span>
              <span className="text-gray-800">: {projectData.persentase}</span>
              <span className="text-gray-500">Tenggat Waktu</span>
              <span className="text-orange-500">: {projectData.tenggatWaktu}</span>
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-500 text-justify leading-relaxed mb-8">
          {projectData.deskripsiUmum}
        </p>

        <div className="mb-8">
          <h3 className="font-bold text-gray-800 mb-2">Pembagian Keuntungan</h3>
          <p className="text-sm text-gray-500 text-justify leading-relaxed mb-4">
            {projectData.deskripsiUmum} 
          </p>
          <div className="text-sm font-bold text-gray-800 space-y-2">
            <div className="flex"><span className="w-24 text-gray-500 font-medium">KTH</span> <span>: {projectData.pembagianKeuntungan.kth}</span></div>
            <div className="flex"><span className="w-24 text-gray-500 font-medium">Investor</span> <span>: {projectData.pembagianKeuntungan.investor}</span></div>
          </div>
        </div>

        <MilestoneSection milestones={projectData.milestones} />

        <div className="mb-12">
          <h3 className="font-bold text-gray-800 mb-4">Dokumen Pendukung</h3>
          <div className="text-sm space-y-3">
            {projectData.dokumen.map((doc, idx) => (
              <div key={idx} className="flex">
                <span className="w-56 shrink-0 text-gray-500">{doc.label}</span>
                <span className="w-4 shrink-0">:</span>
                <span className="font-bold underline text-gray-800 cursor-pointer hover:text-[#185325]">
                  {doc.file}
                </span>
              </div>
            ))}
          </div>
        </div>

        {isValidasiMode && (
          <div className="flex flex-col sm:flex-row gap-4 border-t border-gray-100 pt-8 mt-8">
            <button 
              onClick={() => setShowRevisionModal(true)}
              className="flex-1 py-3.5 bg-[#FF0000] hover:bg-red-700 text-white font-bold rounded-full transition-colors shadow-sm"
            >
              Tolak dan Revisi
            </button>
            <button 
              onClick={() => setShowApprovalModal(true)}
              className="flex-1 py-3.5 bg-[#185325] hover:bg-[#123d1c] text-white font-bold rounded-full transition-colors shadow-sm"
            >
              Setujui Investasi Baru
            </button>
          </div>
        )}


      {isValidasiMode && (
        <>
          <RevisionModal 
            isOpen={showRevisionModal} 
            onClose={() => setShowRevisionModal(false)} 
            onSubmit={handleRevisionSubmit} 
          />
          <ApprovalModal 
            isOpen={showApprovalModal} 
            onClose={() => setShowApprovalModal(false)} 
            onConfirm={handleApprovalSubmit} 
          />
        </>
      )}

    </div>
  );
};

export default DetailInvestasiKABIDBUPM;