import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { HiOutlineChevronLeft, HiOutlinePencilSquare } from 'react-icons/hi2';
import toast from 'react-hot-toast';
import { getLaporanDanaByIdAPI } from '@/services/laporan-dana.service';

const STORAGE_URL = "http://127.0.0.1:8000/storage/";

const DetailLaporanDana: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch data laporan dana berdasarkan ID
  useEffect(() => {
    const fetchDetail = async () => {
      try {
        if (id) {
          const res = await getLaporanDanaByIdAPI(id);
          setData(res.data || res.payload || res);
        }
      } catch (error: any) {
        toast.error("Gagal memuat detail laporan dana.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(Number(val || 0));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Terverifikasi': return 'text-[#2E7D32]'; 
      case 'Menunggu Verifikasi': return 'text-yellow-600';
      case 'Revisi': return 'text-red-600'; 
      default: return 'text-gray-800';
    }
  };

  const getFileName = (path: string) => path ? path.split('/').pop() : null;

  const InfoRow = ({ label, value, isStatus = false, isCatatan = false }: { label: string, value: string, isStatus?: boolean, isCatatan?: boolean }) => (
    <div className="grid grid-cols-[160px_20px_1fr] md:grid-cols-[200px_20px_1fr] mb-4 text-sm">
      <span className="text-gray-500">{label}</span>
      <span className="text-gray-500">:</span>
      <span className={`font-semibold 
        ${isStatus ? getStatusColor(value) : 'text-gray-800'} 
        ${isCatatan && value && value !== '-' ? 'italic text-red-600' : ''}` // Beri warna merah pada teks catatan revisi
      }>
        {value || '-'}
      </span>
    </div>
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-48 text-[#185325] font-bold">
        <span className="w-6 h-6 border-2 border-[#185325] border-t-transparent rounded-full animate-spin mr-3"></span> 
        Memuat detail laporan...
      </div>
    );
  }

  if (!data) return <div className="text-center text-gray-500 py-10">Data tidak ditemukan.</div>;

  const sisaDana = Number(data.dana_disalurkan) - Number(data.dana_direalisasikan);

  return (
    <div className="flex flex-col gap-6 w-full mx-auto pb-12 px-4 sm:px-0 animate-in fade-in duration-300">
      <div className="flex items-center justify-between">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-1.5 text-sm font-bold text-gray-800 hover:text-[#185325] transition-colors cursor-pointer"
        >
          <HiOutlineChevronLeft className="w-4 h-4 stroke-2" /> Kembali
        </button>

        {data.status === 'Revisi' && (
          <button 
            onClick={() => navigate(`/admin/kth/rehabilitasi/laporan-dana/edit/${data.id}`)}
            className="flex items-center gap-2 px-5 py-2.5 bg-red-100 text-red-800 hover:bg-red-200 text-sm font-bold rounded-full transition-colors cursor-pointer shadow-sm active:scale-95"
          >
            <HiOutlinePencilSquare className="w-5 h-5" /> Revisi Laporan
          </button>
        )}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10">
        <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-8">
          Detail Laporan #{data.sumber_dana}-{data.id}
        </h1>
        
        <div className="mb-10">
          <h3 className="text-base font-bold text-gray-800 mb-6 border-b border-gray-100 pb-3">Informasi Program</h3>
          <InfoRow label="Nama Program" value={data.nama_program} />
          <InfoRow label="Tahap" value={data.tahap} />
          <InfoRow label="Sumber Dana" value={data.sumber_dana} />
          <InfoRow label="Tanggal Laporan" value={data.tanggal_pengeluaran} />
          <InfoRow label="Dana Disalurkan" value={formatRupiah(data.dana_disalurkan)} />
          <InfoRow label="Total Direalisasi" value={formatRupiah(data.dana_direalisasikan)} />
          <InfoRow label="Sisa Dana" value={formatRupiah(sisaDana)} />
          <InfoRow label="Status" value={data.status} isStatus />
          {data.catatan && <InfoRow label="Catatan Revisi" value={data.catatan} isCatatan />}
        </div>

        <div className="mb-10">
          <h3 className="text-base font-bold text-gray-800 mb-6 border-b border-gray-100 pb-3">Rincian Penggunaan Dana</h3>
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left text-sm mb-4 border-b border-gray-200">
              <thead className="border-y border-gray-200 text-gray-600 uppercase text-xs tracking-wider">
                <tr>
                  <th className="py-4 font-semibold px-2">KEGIATAN</th>
                  <th className="py-4 font-semibold text-center">TANGGAL</th>
                  <th className="py-4 font-semibold text-center">NOMINAL</th>
                  <th className="py-4 font-semibold text-center">BUKTI TRANSAKSI</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {data.rincian?.map((rin: any) => (
                  <tr key={rin.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-2 text-gray-800 font-semibold">{rin.kategori_kegiatan}</td>
                    <td className="py-4 text-gray-600 text-center">{data.tanggal_pengeluaran}</td>
                    <td className="py-4 text-gray-600 text-center">{formatRupiah(rin.nominal)}</td>
                    <td className="py-4 text-center">
                      {rin.bukti_transaksi_path ? (
                        <a 
                          href={`${STORAGE_URL}${rin.bukti_transaksi_path}`} 
                          target="_blank" 
                          rel="noreferrer"
                          className="text-[#185325] italic hover:text-[#113d1c] font-medium hover:underline transition-colors"
                        >
                          {getFileName(rin.bukti_transaksi_path) || 'Lihat Bukti'}
                        </a>
                      ) : (
                        <span className="text-gray-400 italic">Tidak ada</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h3 className="text-base font-bold text-gray-800 mb-6 border-b border-gray-100 pb-3">Ringkasan Dana</h3>
          <div className="grid grid-cols-[160px_20px_1fr] md:grid-cols-[200px_20px_1fr] mb-3 text-sm">
            <span className="text-gray-600">Dana Disalurkan</span>
            <span className="text-gray-600">:</span>
            <span className="text-gray-800 font-semibold">{formatRupiah(data.dana_disalurkan)}</span>
          </div>
          <div className="grid grid-cols-[160px_20px_1fr] md:grid-cols-[200px_20px_1fr] mb-3 text-sm">
            <span className="text-gray-600">Total Realisasi</span>
            <span className="text-gray-600">:</span>
            <span className="text-gray-800 font-semibold">{formatRupiah(data.dana_direalisasikan)}</span>
          </div>
          <div className="grid grid-cols-[160px_20px_1fr] md:grid-cols-[200px_20px_1fr] text-sm">
            <span className="text-gray-600">Sisa Dana</span>
            <span className="text-gray-600">:</span>
            <span className={`font-semibold ${sisaDana < 0 ? 'text-red-600' : 'text-gray-800'}`}>
              {formatRupiah(sisaDana)}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DetailLaporanDana;