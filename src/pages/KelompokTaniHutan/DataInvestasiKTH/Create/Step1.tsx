import React from 'react';
import { HiOutlineCloud, HiOutlineCalendarDays } from 'react-icons/hi2';
import type { InvestasiFormState } from './index';

interface StepProps {
  data: InvestasiFormState;
  updateData: React.Dispatch<React.SetStateAction<InvestasiFormState>>;
  onNext: () => void;
}

const Step1: React.FC<StepProps> = ({ data, updateData, onNext }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    updateData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-300">
      <div>
        <label className="block text-xs font-bold text-gray-700 mb-1.5">Cover</label>
        <label className="flex flex-col items-center justify-center w-full py-4 border border-gray-300 rounded-full cursor-pointer hover:bg-gray-50 text-gray-500 transition-colors">
          <HiOutlineCloud className="w-5 h-5 mb-1" />
          <span className="text-xs">Upload gambar</span>
          <input type="file" className="hidden" />
        </label>
      </div>

      <Input label="Nama Investasi" name="namaInvestasi" placeholder="Masukan nama investasi" value={data.namaInvestasi} onChange={handleChange} />
      <Input label="Nama KTH" name="namaKTH" placeholder="Masukan nama KTH" value={data.namaKTH} onChange={handleChange} />
      
      <Input label="Target Funding" name="targetFunding" placeholder="0" value={data.targetFunding} onChange={handleChange} prefix="Rp." />
      <Input label="Persentase Keuntungan" name="persentase" placeholder="0" value={data.persentase} onChange={handleChange} suffix="%" />
      
      <div>
        <label className="block text-xs font-bold text-gray-700 mb-1.5">Batas Pengumpulan Dana</label>
        <div className="relative">
          <input type="date" name="batasWaktu" value={data.batasWaktu} onChange={handleChange} className="w-full pl-4 pr-10 py-3 text-sm border border-gray-300 rounded-full focus:ring-1 focus:ring-[#185325] outline-none" />
          <HiOutlineCalendarDays className="absolute right-4 top-3.5 w-5 h-5 text-gray-400 pointer-events-none" />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-700 mb-1.5">Deskripsi</label>
        <textarea name="deskripsi" placeholder="Tulis keterangan wisata" value={data.deskripsi} onChange={handleChange} className="w-full p-4 h-28 text-sm border border-gray-300 rounded-4xl focus:ring-1 focus:ring-[#185325] outline-none resize-none" />
      </div>

      <button onClick={onNext} className="w-full py-3.5 mt-4 bg-[#185325] hover:bg-[#123d1c] text-white text-sm font-bold rounded-full transition-colors">
        Selanjutnya &gt;
      </button>
    </div>
  );
};

const Input = ({ label, prefix, suffix, ...props }: any) => (
  <div>
    <label className="block text-xs font-bold text-gray-700 mb-1.5">{label}</label>
    <div className="relative flex items-center border border-gray-300 rounded-full overflow-hidden focus-within:border-[#185325] focus-within:ring-1 focus-within:ring-[#185325]">
      {prefix && <span className="pl-4 pr-2 text-sm font-bold text-gray-500 bg-gray-50/50 py-3">{prefix}</span>}
      <input className="w-full px-4 py-3 text-sm outline-none bg-transparent" {...props} />
      {suffix && <span className="pr-4 pl-2 text-sm font-bold text-gray-800 bg-gray-50/50 py-3">{suffix}</span>}
    </div>
  </div>
);

export default Step1;