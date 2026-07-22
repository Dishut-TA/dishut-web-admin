import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  HiOutlineMagnifyingGlass,
  HiOutlinePlus,
  HiOutlineEye,
} from "react-icons/hi2";
import toast from "react-hot-toast";
import {
  getBibitsAPI,
  getSeedSpecificationsAPI,
  type BibitResponseData,
} from "@/services/bibit.service";

interface MappedBibitData extends BibitResponseData {
  rentangHargaFormat: string;
}

const IndexBibit: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [bibitData, setBibitData] = useState<MappedBibitData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  // const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchData();
  }, []);

  const formatRupiah = (angka: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(angka);
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [bibitRes, spekRes] = await Promise.all([
        getBibitsAPI(),
        getSeedSpecificationsAPI(),
      ]);

      const bibits = bibitRes.payload;
      const specs = spekRes.payload;

      const mergedData: MappedBibitData[] = bibits.map((bibit) => {
        const relatedSpecs = specs.filter((spec) => spec.seed_id === bibit.id);

        let rentangHarga = "Belum diatur";

        if (relatedSpecs.length > 0) {
          const prices = relatedSpecs.map((s) => Number(s.price));

          const minPrice = Math.min(...prices);
          const maxPrice = Math.max(...prices);

          if (minPrice === maxPrice) {
            rentangHarga = formatRupiah(minPrice);
          } else {
            rentangHarga = `${formatRupiah(minPrice)} - ${formatRupiah(maxPrice)}`;
          }
        }

        return {
          ...bibit,
          rentangHargaFormat: rentangHarga,
        };
      });

      setBibitData(mergedData);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredData = bibitData.filter(
    (item) =>
      item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.kode.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="flex flex-col gap-6 w-full max-w-screen-2xl mx-auto pb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Manajemen Data Bibit & Harga
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Kelola master data bibit beserta spesifikasi harga per tinggi
            tanaman.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative w-full sm:w-64">
            <HiOutlineMagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Cari bibit atau kode bibit..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-xl text-sm focus:ring-[#009262] focus:border-[#009262] outline-none shadow-sm transition-all"
            />
          </div>
          <button
            onClick={() => navigate("/admin/staff/donasi/bibit/create")}
            className="bg-primary text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-[#123d1c] hover:shadow-lg hover:-translate-y-0.5 transition-all"
          >
            <HiOutlinePlus className="w-4 h-4" strokeWidth={2.5} /> Tambah Bibit
          </button>
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-gray-100 overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left whitespace-nowrap">
            <thead className="bg-[#DCECE0]/50 text-[#3A4D3F] text-xs uppercase tracking-wider font-bold border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Kode</th>
                <th className="px-6 py-4">Nama Spesies / Bibit</th>
                <th className="px-6 py-4">Kategori</th>
                <th className="px-6 py-4">Rentang Harga</th>
                <th className="px-6 py-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center gap-3">
                      <span className="w-8 h-8 border-4 border-gray-200 border-t-[#185325] rounded-full animate-spin"></span>
                      <p className="text-sm font-bold text-gray-500">
                        Memuat data bibit dan harga...
                      </p>
                    </div>
                  </td>
                </tr>
              ) : filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-emerald-50/30 transition-colors"
                  >
                    <td className="px-6 py-4 text-xs font-bold text-gray-500">
                      {item.kode}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-bold text-gray-800">
                        {item.nama}
                      </div>
                      <div className="text-[11px] text-gray-500 mt-0.5 max-w-xs truncate">
                        {item.deskripsi}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                          item.kategori.toLowerCase().includes("kehutanan")
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-orange-100 text-orange-800"
                        }`}
                      >
                        {item.kategori}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-sm font-bold text-[#185325]">
                      {item.rentangHargaFormat}
                    </td>

                    <td className="px-6 py-4 flex justify-center">
                      <button
                        onClick={() =>
                          navigate(
                            `/admin/staff/donasi/bibit/detail/${item.id}`,
                          )
                        }
                        className="p-2 text-gray-400 hover:text-[#185325] hover:bg-[#DCECE0] rounded-xl transition-all"
                        title="Lihat Detail"
                      >
                        <HiOutlineEye className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <p className="text-sm font-bold text-gray-500">
                      Tidak ada data bibit yang ditemukan.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default IndexBibit;
