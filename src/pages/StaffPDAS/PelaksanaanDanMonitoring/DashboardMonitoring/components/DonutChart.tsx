export default function DonutChart() {
  return (
    <div className="lg:col-span-1 bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex flex-col">
      <h3 className="font-bold text-gray-900 mb-6 text-sm">Rekapitulasi Berdasarkan Sumber Program</h3>
      
      <div className="flex-1 flex flex-col items-center justify-center relative mb-4">
        <div className="relative w-44 h-44 rounded-full flex items-center justify-center bg-gray-100 shadow-sm" style={{
            background: 'conic-gradient(#059669 0% 37.5%, #2563eb 37.5% 79.2%, #7c3aed 79.2% 100%)'
        }}>
          <div className="w-28 h-28 bg-white rounded-full flex flex-col items-center justify-center shadow-inner">
            <span className="text-2xl font-bold text-gray-900">24</span>
            <span className="text-[10px] font-medium text-gray-500">Program</span>
          </div>
        </div>
      </div>

      <div className="space-y-3 px-4">
        <div className="flex items-start gap-3">
          <div className="w-3 h-3 rounded-full bg-green-600 mt-1 shrink-0"></div>
          <div>
            <p className="text-xs font-bold text-gray-900">Donasi</p>
            <p className="text-[10px] text-gray-500">9 Program (37,5%)</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="w-3 h-3 rounded-full bg-blue-600 mt-1 shrink-0"></div>
          <div>
            <p className="text-xs font-bold text-gray-900">APBD</p>
            <p className="text-[10px] text-gray-500">10 Program (41,7%)</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="w-3 h-3 rounded-full bg-purple-600 mt-1 shrink-0"></div>
          <div>
            <p className="text-xs font-bold text-gray-900">CSR</p>
            <p className="text-[10px] text-gray-500">5 Program (20,8%)</p>
          </div>
        </div>
      </div>
    </div>
  );
}