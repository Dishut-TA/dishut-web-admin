import { HiOutlineTrophy, HiOutlineInformationCircle } from 'react-icons/hi2';
import { BAR_CHART_DATA } from '../data/mockData';

export default function BarChart() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-gray-900 text-sm flex items-center gap-2">
           <HiOutlineTrophy className="w-5 h-5 text-green-700" />
           Total Realisasi Terbanyak per CDK (I - IX)
        </h3>
        <div className="flex items-center gap-1.5 text-xs font-bold text-gray-600">
          <div className="w-3 h-3 bg-green-800 rounded-sm"></div>
          Realisasi (Pohon)
        </div>
      </div>

      <div className="relative h-48 w-full flex items-end justify-between px-2 gap-2 border-b-2 border-gray-100 pb-1 mt-2">
        <div className="absolute left-0 top-0 bottom-1 w-10 flex flex-col justify-between text-[10px] text-gray-400 font-medium pb-5">
           <span>20.000</span>
           <span>15.000</span>
           <span>10.000</span>
           <span>5.000</span>
           <span>0</span>
        </div>
        
        <div className="flex-1 flex justify-between items-end h-full ml-12 pt-4">
          {BAR_CHART_DATA.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center justify-end h-full group">
              <span className="text-[10px] font-bold text-gray-700 mb-1 opacity-0 group-hover:opacity-100 transition-opacity">
                {item.value.toLocaleString('id-ID')}
              </span>
              <div 
                className="w-6 md:w-8 bg-green-800 rounded-t-sm hover:bg-green-700 transition-colors" 
                style={{ height: `${(item.value / 20000) * 100}%` }}
              ></div>
              <span className="text-[10px] font-bold text-gray-600 mt-2">{item.cdk}</span>
            </div>
          ))}
        </div>
      </div>
      <p className="text-center text-[10px] font-bold text-gray-500 mt-1">CDK</p>

      <div className="mt-6 text-[10px] text-gray-500 flex items-center gap-1.5 font-medium">
        <HiOutlineInformationCircle className="w-4 h-4 text-green-600" />
        Data berdasarkan total realisasi tanaman pada periode yang dipilih.
      </div>
    </div>
  );
}