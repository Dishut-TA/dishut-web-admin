import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { HiOutlineChevronLeft, HiOutlineDocumentArrowDown, HiOutlineCheckBadge, HiOutlineMapPin } from 'react-icons/hi2';
import toast from 'react-hot-toast';
import { getDetailPenugasanKabidAPI } from '@/services/evaluasi.service';

const DetailInisiasiPenugasan: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [detailData, setDetailData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const result = await getDetailPenugasanKabidAPI(id || '');
        setDetailData(result);
      } catch (error: any) {
        toast.error(error.message || 'Gagal memuat detail penugasan.');
      } finally {
        setIsLoading(false);
      }
    };
    if (id) fetchDetail();
  }, [id]);

  if (isLoading) {
    return <div className="p-10 text-center text-gray-500 animate-pulse">Memuat detail dokumen...</div>;
  }

  if (!detailData) {
    return <div className="p-10 text-center text-red-500">Data tidak ditemukan.</div>;
  }

  return (
    <div className="flex flex-col gap-6 w-full mx-auto pb-12 animate-in fade-in duration-300">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm font-bold text-gray-700 hover:text-[#185325] self-start transition-colors">
        <HiOutlineChevronLeft className="w-4 h-4" strokeWidth={2.5} /> Kembali
      </button>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-gray-100 pb-6">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">Detail Penugasan Evaluasi</h1>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#DCECE0] text-[#185325] text-xs font-bold rounded-full uppercase tracking-wider">
              <HiOutlineCheckBadge className="w-4 h-4" /> {detailData.status_surat || 'TELAH DITUGASKAN'}
            </span>
          </div>
          <div className="text-left md:text-right">
            <p className="text-xs text-gray-500 font-medium">ID Penugasan</p>
            <p className="text-sm font-bold text-gray-800">{id}</p>
          </div>
        </div>

        <div className="mb-10">
          <h3 className="text-sm font-bold text-[#185325] uppercase tracking-wider mb-4">Informasi Surat & Program</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8 bg-gray-50 border border-gray-100 rounded-2xl p-6">
            <div>
              <p className="text-xs text-gray-500 font-medium mb-1">Nomor Surat Tugas</p>
              <p className="text-sm font-bold text-gray-800">{detailData.nomor_surat || detailData.noSurat}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium mb-1">Tanggal Surat</p>
              <p className="text-sm font-bold text-gray-800">{detailData.tanggal_surat || detailData.tanggalSurat}</p>
            </div>
            <div className="md:col-span-2 border-t border-gray-200 pt-4">
              <p className="text-xs text-gray-500 font-medium mb-1">Program Rehabilitasi</p>
              <p className="text-sm font-bold text-gray-800">{detailData.nama_proyek || detailData.program}</p>
              <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
                <HiOutlineMapPin className="w-4 h-4 text-[#185325]" /> {detailData.lokasi} ({detailData.luas_ha || detailData.luas} Hektar)
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium mb-1">Periode Evaluasi</p>
              <p className="text-sm font-bold text-gray-800">{detailData.periode_evaluasi || detailData.periode}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium mb-1">Dokumen Surat Tugas</p>
              {detailData.file_surat_url ? (
                <a href={detailData.file_surat_url} target="_blank" rel="noreferrer" className="text-sm font-bold text-blue-600 hover:text-blue-800 underline flex items-center gap-1">
                  <HiOutlineDocumentArrowDown className="w-4 h-4" /> Unduh Lampiran
                </a>
              ) : (
                <span className="text-sm text-gray-500">-</span>
              )}
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium mb-1">Periode Evaluasi Mulai</p>
              <p className="text-sm font-bold text-gray-800">{detailData.tanggal_mulai || detailData.tanggal_awal}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium mb-1">Periode Evaluasi Selesai</p>
              <p className="text-sm font-bold text-gray-800">{detailData.tanggal_selesai || detailData.tanggal_akhir}</p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold text-[#185325] uppercase tracking-wider mb-4">Susunan Tim Penilai Lapangan</h3>
          <div className="overflow-hidden border border-gray-200 rounded-xl">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#f8fbf9] text-gray-600 font-semibold border-b border-gray-200">
                <tr>
                  <th className="px-5 py-3">Nama Anggota</th>
                  <th className="px-5 py-3">Email</th>
                  <th className="px-5 py-3 text-center">Peran</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {detailData.tim_penilai?.map((anggota: any, idx: number) => (
                  <tr key={idx} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-4 font-bold text-gray-800">{anggota.nama}</td>
                    <td className="px-5 py-4 text-gray-600">{anggota.email}</td>
                    <td className="px-5 py-4 text-center">
                      <span className={`px-3 py-1 rounded-md text-xs font-bold ${
                        anggota.peran === 'Ketua Tim' ? 'bg-[#DCECE0] text-[#185325]' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {anggota.peran}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DetailInisiasiPenugasan;