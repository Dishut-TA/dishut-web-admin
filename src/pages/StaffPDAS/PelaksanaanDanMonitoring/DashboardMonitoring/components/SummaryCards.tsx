import { HiOutlineChartPie } from 'react-icons/hi2';
import { PiPlant, PiTree, PiLeaf } from 'react-icons/pi';

export default function SummaryCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {/* Card 1 */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm flex flex-col relative h-30">
        <div className="flex items-center w-full flex-1">
          <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center shrink-0">
            <PiLeaf className="w-6 h-6 text-green-700" />
          </div>
          <div className="flex-1 flex flex-col items-center text-center">
            <p className="text-[11px] font-bold text-gray-600 mb-0.5">Total Program</p>
            <p className="text-3xl font-bold text-[#0f172a] leading-none">24</p>
            <p className="text-[10px] text-gray-400 mt-1">Program</p>
          </div>
        </div>
        <div className="absolute bottom-3 left-5 text-[10px] font-medium text-gray-500 border-t border-gray-100 pt-2 w-[calc(100%-40px)] flex gap-2">
          <span>17 Berjalan</span> <span>•</span> <span>3 Selesai</span>
        </div>
      </div>

      {/* Card 2 */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm flex items-center h-30">
        <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center shrink-0">
          <PiTree className="w-6 h-6 text-orange-500" />
        </div>
        <div className="flex-1 flex flex-col items-center text-center">
          <p className="text-[11px] font-bold text-gray-600 mb-0.5">Total Target Tanaman</p>
          <p className="text-3xl font-bold text-[#0f172a] leading-none">125.450</p>
          <p className="text-[10px] text-gray-400 mt-1">Pohon</p>
        </div>
      </div>

      {/* Card 3 */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm flex items-center h-30">
        <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center shrink-0">
          <PiPlant className="w-6 h-6 text-purple-700" />
        </div>
        <div className="flex-1 flex flex-col items-center text-center">
          <p className="text-[11px] font-bold text-purple-800 mb-0.5">Total Realisasi Tanaman</p>
          <p className="text-3xl font-bold text-[#0f172a] leading-none">68.230</p>
          <p className="text-[10px] text-gray-400 mt-1">Pohon</p>
        </div>
      </div>

      {/* Card 4 */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm flex items-center h-30">
        <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
          <HiOutlineChartPie className="w-6 h-6 text-blue-600" />
        </div>
        <div className="flex-1 flex flex-col items-center text-center">
          <p className="text-[11px] font-bold text-blue-800 mb-0.5">Persentase Realisasi</p>
          <p className="text-3xl font-bold text-[#0f172a] leading-none">54,38%</p>
          <p className="text-[10px] text-gray-400 mt-1">dari Target</p>
        </div>
      </div>
    </div>
  );
}