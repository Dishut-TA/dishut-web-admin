import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineArrowLeft, HiOutlineInformationCircle, HiOutlineDocumentText, HiOutlineClipboardDocumentCheck } from 'react-icons/hi2';

const DetailHasilValidasi: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-6xl mx-auto pb-12">
      <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
        <h1 className="text-2xl font-bold text-gray-800">Detail Hasil Validasi Lapangan</h1>
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 text-sm font-bold rounded-xl hover:bg-gray-50 transition-colors shadow-sm"
        >
          <HiOutlineArrowLeft className="w-4 h-4" /> Kembali ke Daftar
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* KOLOM KIRI (Informasi Data) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Card 1: Informasi Lokasi */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-[#185325] font-bold flex items-center gap-2 mb-4 border-b border-gray-50 pb-3">
              <HiOutlineInformationCircle className="w-5 h-5" /> Informasi Lokasi
            </h3>
            <div className="grid grid-cols-[150px_10px_1fr] gap-y-3 text-sm">
              <div className="text-gray-500 font-medium">Nama Lokasi</div><div>:</div><div className="font-bold text-gray-800">Hulu DAS Sungai Mamberamo</div>
              <div className="text-gray-500 font-medium">Sumber Lokasi</div><div>:</div><div className="font-medium text-gray-800">Analisis CPI</div>
              <div className="text-gray-500 font-medium">Penyuluh</div><div>:</div><div className="font-medium text-gray-800">Siti Nurhaliza</div>
              <div className="text-gray-500 font-medium">Tanggal Validasi</div><div>:</div><div className="font-medium text-gray-800">20 Mei 2025</div>
              <div className="text-gray-500 font-medium flex items-center">Status Sementara</div><div>:</div>
              <div><span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-md text-xs font-bold">Data Diterima</span></div>
            </div>
          </div>

          {/* Card 2: Data Awal Lokasi */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-[#185325] font-bold flex items-center gap-2 mb-4 border-b border-gray-50 pb-3">
              <HiOutlineDocumentText className="w-5 h-5" /> Data Awal Lokasi
            </h3>
            <div className="grid grid-cols-[150px_10px_1fr] gap-y-3 text-sm">
              <div className="text-gray-500 font-medium">Koordinat awal</div><div>:</div><div className="font-medium text-gray-800">2.345678° S, 138.765432° E</div>
              <div className="text-gray-500 font-medium">Luas awal</div><div>:</div><div className="font-medium text-gray-800">125,50 Ha</div>
              <div className="text-gray-500 font-medium">Status kekritisan</div><div>:</div><div className="font-medium text-gray-800">Kritis</div>
              <div className="text-gray-500 font-medium">Rekomendasi</div><div>:</div><div className="font-medium text-gray-800">Rehabilitasi Hutan dan Lahan</div>
            </div>
          </div>

          {/* Card 3: Hasil Validasi Lapangan */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-[#185325] font-bold flex items-center gap-2 mb-4 border-b border-gray-50 pb-3">
              <HiOutlineClipboardDocumentCheck className="w-5 h-5" /> Hasil Validasi Lapangan
            </h3>
            <div className="grid grid-cols-[150px_10px_1fr] gap-y-3 text-sm">
              <div className="text-gray-500 font-medium">Kondisi lahan</div><div>:</div><div className="font-medium text-gray-800">Lereng curam dengan erosi ringan</div>
              <div className="text-gray-500 font-medium">Kondisi vegetasi</div><div>:</div><div className="font-medium text-gray-800">Vegetasi jarang, semak belukar</div>
              <div className="text-gray-500 font-medium">Koordinat (rata-rata)</div><div>:</div><div className="font-medium text-gray-800">2.346123° S, 138.766210° E</div>
              <div className="text-gray-500 font-medium">Geotagging status</div><div>:</div>
              <div className="text-green-600 font-bold flex items-center gap-1">✓ Valid</div>
              <div className="text-gray-500 font-medium">Kendala lapangan</div><div>:</div><div className="font-medium text-gray-800">Akses jalan rusak saat musim hujan</div>
              <div className="text-gray-500 font-medium">Catatan peninjauan</div><div>:</div>
              <div className="font-medium text-gray-800 leading-relaxed">Lokasi sesuai dengan indikasi awal, perlu intervensi vegetasi dan konservasi tanah.</div>
            </div>
          </div>

        </div>

        {/* KOLOM KANAN (Visual & Media) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Map Card */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-gray-800 font-bold mb-4">Peta Lokasi</h3>
            <div className="w-full h-72 rounded-xl overflow-hidden relative border border-gray-200">
              <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=600&auto=format&fit=crop" alt="Map satellite" className="w-full h-full object-cover" />
              {/* Overlay Polygon Simulasi */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-40 bg-blue-500/30 border-2 border-blue-200 relative rotate-6 rounded-sm">
                  <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-white border border-blue-500 rounded-full"></div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center shadow-lg border-2 border-white">📍</div>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-3 right-3 bg-white/90 px-3 py-1.5 rounded-lg text-[10px] font-bold shadow-sm">
                2.346123° S, 138.766210° E
              </div>
            </div>
          </div>

          {/* Photo Gallery Card */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-gray-800 font-bold">Dokumentasi Lapangan</h3>
              <a href="#" className="text-sm font-bold text-blue-600 hover:underline">Lihat Semua</a>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="h-28 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                <img src="https://images.unsplash.com/photo-1418065460487-3e41a6c8e1e4?q=80&w=300&auto=format&fit=crop" alt="Doc 1" className="w-full h-full object-cover" />
              </div>
              <div className="h-28 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                <img src="https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=300&auto=format&fit=crop" alt="Doc 2" className="w-full h-full object-cover" />
              </div>
              <div className="h-28 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                <img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=300&auto=format&fit=crop" alt="Doc 3" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DetailHasilValidasi;