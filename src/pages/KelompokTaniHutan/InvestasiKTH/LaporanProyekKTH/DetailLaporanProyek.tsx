import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineChevronLeft } from 'react-icons/hi2';

type StatusLaporan = 'Menunggu Verifikasi' | 'Revisi' | 'Diverifikasi';

const InfoRow = ({
  label,
  value,
  valueColor = "text-gray-800",
  isItalic = false,
  isLink = false,
}: {
  label: string;
  value: React.ReactNode;
  valueColor?: string;
  isItalic?: boolean;
  isLink?: boolean;
}) => (
  <div className="grid grid-cols-[160px_20px_1fr] items-start text-sm">
    <span className="text-gray-500">{label}</span>
    <span className="text-gray-500">:</span>
    <span 
      className={`font-medium ${valueColor} ${isItalic ? 'italic text-gray-600' : ''} ${isLink ? 'underline cursor-pointer hover:text-gray-600' : ''}`}
    >
      {value}
    </span>
  </div>
);

const SectionTitle = ({ title }: { title: string }) => (
  <h2 className="text-base font-bold text-gray-800 mb-4 mt-8">{title}</h2>
);

const DetailLaporanProyekKTH: React.FC = () => {
  const navigate = useNavigate();
  const [statusLaporan, setStatusLaporan] = useState<StatusLaporan>('Menunggu Verifikasi');

  const getStatusDisplay = () => {
    if (statusLaporan === 'Menunggu Verifikasi') return { text: 'Menunggu Verifikasi', color: 'text-orange-500' };
    if (statusLaporan === 'Revisi') return { text: 'Revisi', color: 'text-red-500' };
    if (statusLaporan === 'Diverifikasi') return { text: 'Diverifikasi', color: 'text-emerald-600' };
    return { text: '', color: '' };
  };

  const statusDisplay = getStatusDisplay();

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto pb-20 animate-in fade-in duration-300 relative">
      
      {/* 🔴 DEV-ONLY TOGGLER: Boleh dihapus jika sudah diintegrasikan dengan API / Backend asli */}
      <div className="absolute top-0 right-0 flex gap-2 z-50">
        {(['Menunggu Verifikasi', 'Revisi', 'Diverifikasi'] as StatusLaporan[]).map((s) => (
          <button 
            key={s} 
            onClick={() => setStatusLaporan(s)} 
            className={`text-[10px] font-bold px-3 py-1.5 rounded-lg border shadow-sm transition-colors ${
              statusLaporan === s ? 'bg-gray-800 text-white border-gray-800' : 'bg-white text-gray-500 hover:bg-gray-50'
            }`}
          >
            Tes {s}
          </button>
        ))}
      </div>
      {/* 🔴 END DEV-ONLY TOGGLER */}

      <div className="relative mb-10 flex items-center justify-center">
        <button 
          onClick={() => navigate(-1)} 
          className="absolute left-0 flex items-center gap-2 text-sm font-bold text-[#185325] hover:underline"
        >
          <HiOutlineChevronLeft className="stroke-2" /> Kembali
        </button>
        <h1 className="text-2xl font-bold text-gray-800 mt-8 md:mt-0">Detail Laporan Proyek</h1>
      </div>

      <div className="px-4 sm:px-0">
        <h2 className="text-base font-bold text-gray-800 mb-4">Informasi Laporan</h2>
        <div className="flex flex-col gap-3">
          <InfoRow label="Nama Investasi" value="Ekowisata Kebun Stroberi" />
          <InfoRow label="Periode Laporan" value="24 Agustus 2025" />
          <InfoRow label="Status" value={statusDisplay.text} valueColor={statusDisplay.color} />
          
          {statusLaporan === 'Revisi' && (
            <InfoRow 
              label="Catatan" 
              value="Dokumentasi milestone belum lengkap, mohon tambahkan foto terbaru." 
              isItalic={true} 
            />
          )}
          {statusLaporan === 'Diverifikasi' && (
            <InfoRow label="Catatan" value="-" />
          )}
        </div>

        <SectionTitle title="Informasi Milestone" />
        <div className="flex flex-col gap-3">
          <InfoRow label="Nama Milestone" value="Milestone 1" />
          <InfoRow label="Batas Milestone" value="22/04/2024" />
          <InfoRow 
            label="Status" 
            value={
              <span className="flex items-center gap-1 text-emerald-600">
                Tercapai <span className="font-bold">✓</span>
              </span>
            } 
          />
          <InfoRow label="Dokumen Milestone" value="RencanaProyekPembangunanEkowisata.pdf" isLink={true} valueColor="text-gray-800" />
          <InfoRow 
            label="Deskripsi" 
            value="Lorem ipsum dolor sit amet consectetur. Faucibus faucibus urna nulla amet at nascetur. Enim aliquam sed nibh bibendum. Pulvinar nec risus et vulputate consequat tortor. Quisque tristique in dapibus laoreet eu augue. Maecenas quam eget habitant non. Lobortis lobortis dui phasellus sodales consectetur faucibus mauris eros odio. Diam tortor massa et venenatis ornare tristique nulla." 
            valueColor="text-gray-500 font-normal leading-relaxed text-justify"
          />
        </div>

        <SectionTitle title="Penggunaan Dana" />
        <div className="flex flex-col gap-3">
          <InfoRow label="Dana Terpakai" value="Rp 27.000.000" />
          <InfoRow label="Sisa Dana" value="Rp 3.000.000" />
        </div>

        <SectionTitle title="Dokumen Perkembangan" />
        <div className="flex flex-col gap-3">
          <span className="text-sm text-gray-800 font-medium underline cursor-pointer hover:text-gray-600 w-fit">
            dokumen_pendukung.pdf
          </span>
        </div>
        
        {statusLaporan === 'Menunggu Verifikasi' && (
          <div className="flex flex-col sm:flex-row gap-4 mt-12">
            <button className="flex-1 py-3.5 bg-red-600 text-white text-sm font-bold rounded-full hover:bg-red-700 transition-colors shadow-sm active:scale-95">
              Hapus Laporan
            </button>
            <button className="flex-1 py-3.5 bg-[#185325] text-white text-sm font-bold rounded-full hover:bg-[#123d1c] transition-colors shadow-sm active:scale-95">
              Edit Laporan
            </button>
          </div>
        )}

        {statusLaporan === 'Revisi' && (
          <div className="flex mt-12">
            <button className="w-full py-3.5 bg-[#185325] text-white text-sm font-bold rounded-full hover:bg-[#123d1c] transition-colors shadow-sm active:scale-95">
              Edit Laporan
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default DetailLaporanProyekKTH;