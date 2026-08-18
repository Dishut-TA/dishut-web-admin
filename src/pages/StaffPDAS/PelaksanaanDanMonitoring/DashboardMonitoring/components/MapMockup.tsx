import { HiOutlineMapPin, HiOutlineSquares2X2, HiOutlineInformationCircle } from 'react-icons/hi2';

export default function MapMockup() {
  return (
    <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col p-5">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-gray-900">Peta Sebaran Program Rehabilitasi</h3>
        <div className="flex gap-4 text-xs font-bold">
          <span className="flex items-center gap-1.5"><HiOutlineMapPin className="w-4 h-4 text-green-700"/> Donasi</span>
          <span className="flex items-center gap-1.5"><HiOutlineMapPin className="w-4 h-4 text-blue-600"/> APBD</span>
          <span className="flex items-center gap-1.5"><HiOutlineMapPin className="w-4 h-4 text-purple-600"/> CSR</span>
        </div>
      </div>
      
      <div className="w-full h-70 bg-green-50 rounded-lg relative overflow-hidden border border-gray-200">
        <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center opacity-60"></div>
        
        <div className="absolute top-4 left-4 bg-white rounded shadow-sm border border-gray-200 flex flex-col overflow-hidden">
          <button className="w-8 h-8 flex items-center justify-center font-bold text-gray-600 border-b border-gray-200 hover:bg-gray-50">+</button>
          <button className="w-8 h-8 flex items-center justify-center font-bold text-gray-600 border-b border-gray-200 hover:bg-gray-50">-</button>
          <button className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-50"><HiOutlineSquares2X2 className="w-4 h-4"/></button>
        </div>

        <HiOutlineMapPin className="absolute top-[20%] left-[30%] w-6 h-6 text-green-700 fill-green-500 drop-shadow-md" />
        <HiOutlineMapPin className="absolute top-[40%] left-[25%] w-6 h-6 text-purple-700 fill-purple-500 drop-shadow-md" />
        <HiOutlineMapPin className="absolute top-[60%] left-[35%] w-6 h-6 text-blue-700 fill-blue-500 drop-shadow-md" />
        <HiOutlineMapPin className="absolute top-[35%] left-[50%] w-6 h-6 text-green-700 fill-green-500 drop-shadow-md" />
        <HiOutlineMapPin className="absolute top-[50%] left-[45%] w-6 h-6 text-purple-700 fill-purple-500 drop-shadow-md" />
        <HiOutlineMapPin className="absolute top-[30%] left-[65%] w-6 h-6 text-blue-700 fill-blue-500 drop-shadow-md" />
        <HiOutlineMapPin className="absolute top-[70%] left-[55%] w-6 h-6 text-purple-700 fill-purple-500 drop-shadow-md" />
        <HiOutlineMapPin className="absolute top-[45%] left-[75%] w-6 h-6 text-green-700 fill-green-500 drop-shadow-md" />
        <HiOutlineMapPin className="absolute top-[25%] left-[80%] w-6 h-6 text-blue-700 fill-blue-500 drop-shadow-md" />

        <span className="absolute top-[45%] left-[45%] text-[10px] font-bold text-gray-800 drop-shadow-sm">Cipatat</span>
        <span className="absolute top-[30%] left-[50%] text-[10px] font-bold text-gray-800 drop-shadow-sm">Cikalongwetan</span>
        <span className="absolute top-[40%] left-[75%] text-[10px] font-bold text-gray-800 drop-shadow-sm">Cisarua</span>
      </div>
      <div className="mt-3 text-[10px] text-gray-500 flex items-center gap-1.5 font-medium">
        <HiOutlineInformationCircle className="w-4 h-4 text-green-600" /> Klik marker pada peta untuk melihat detail program.
      </div>
    </div>
  );
}