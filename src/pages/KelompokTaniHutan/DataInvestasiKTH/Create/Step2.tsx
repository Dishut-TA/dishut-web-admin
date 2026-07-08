import React, { useState } from 'react';
import { HiOutlinePencil, HiOutlineTrash, HiOutlineChevronUp, HiOutlinePlus, HiXMark, HiOutlineCalendarDays } from 'react-icons/hi2';
import type { InvestasiFormState } from './index';

interface StepProps {
  data: InvestasiFormState;
  updateData: React.Dispatch<React.SetStateAction<InvestasiFormState>>;
  onNext: () => void;
}

const Step2: React.FC<StepProps> = ({ data, updateData, onNext }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newMilestone, setNewMilestone] = useState({ nama: '', batas: '', deskripsi: '' });

  const handleAddMilestone = () => {
    if (!newMilestone.nama || !newMilestone.batas) return;
    const newId = data.milestones.length ? Math.max(...data.milestones.map(m => m.id)) + 1 : 1;
    updateData({ ...data, milestones: [...data.milestones, { ...newMilestone, id: newId }] });
    setNewMilestone({ nama: '', batas: '', deskripsi: '' }); 
    setIsModalOpen(false); 
  };

  const removeMilestone = (id: number) => {
    updateData({ ...data, milestones: data.milestones.filter(m => m.id !== id) });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="space-y-4">
        {data.milestones.map((m) => (
          <div key={m.id} className="p-5 border border-gray-100 rounded-2xl bg-white shadow-sm flex flex-col gap-3 relative">
            <div className="pr-12">
              <p className="text-[10px] text-gray-400 font-bold tracking-wider uppercase mb-1">Nama Milestone</p>
              <p className="text-base font-bold text-gray-800">{m.nama}</p>
            </div>
            <div className="flex gap-4 text-xs font-medium">
              <span className="text-gray-500">Batas Milestone</span>
              <span className="text-gray-800">{m.batas}</span>
            </div>
            
            <div className="absolute top-5 right-5 flex gap-3">
              <button className="text-gray-400 hover:text-gray-800 transition-colors"><HiOutlinePencil className="w-4.5 h-4.5" /></button>
              <button onClick={() => removeMilestone(m.id)} className="text-[#FF5C5C] hover:text-red-700 transition-colors"><HiOutlineTrash className="w-4.5 h-4.5" /></button>
            </div>
            
            <button className="mx-auto mt-2 text-gray-400 hover:text-gray-600">
              <HiOutlineChevronUp className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>

      <button onClick={() => setIsModalOpen(true)} className="flex items-center justify-center gap-2 w-full py-2 text-sm font-bold text-[#185325] hover:opacity-80 transition-opacity">
        Tambah Milestone <HiOutlinePlus className="w-4 h-4" strokeWidth={2.5} />
      </button>

      <button onClick={onNext} className="w-full py-3.5 bg-[#185325] hover:bg-[#123d1c] text-white text-sm font-bold rounded-full transition-colors">
        Selanjutnya &gt;
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-[#f8fbf9] w-full max-w-lg rounded-2xl shadow-xl border border-gray-200 overflow-hidden zoom-in-95">
            <div className="relative p-6 text-center border-b border-gray-200">
              <h2 className="text-lg font-bold text-[#185325]">Buat Milestone</h2>
              <button onClick={() => setIsModalOpen(false)} className="absolute right-6 top-6 text-gray-500 hover:text-gray-800 bg-white border border-gray-200 rounded-full p-1 shadow-sm">
                <HiXMark className="w-4 h-4" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">Nama Milestone</label>
                <input 
                  type="text" 
                  placeholder="Masukan nama milestone" 
                  value={newMilestone.nama} 
                  onChange={(e) => setNewMilestone({...newMilestone, nama: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-[#185325]"
                />
              </div>
              
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">Batas Milestone</label>
                <div className="relative">
                  <input 
                    type="date" 
                    value={newMilestone.batas} 
                    onChange={(e) => setNewMilestone({...newMilestone, batas: e.target.value})}
                    className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-[#185325]"
                  />
                  <HiOutlineCalendarDays className="absolute right-4 top-3.5 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">Deskripsi</label>
                <textarea 
                  placeholder="Tulis keterangan wisata" 
                  value={newMilestone.deskripsi} 
                  onChange={(e) => setNewMilestone({...newMilestone, deskripsi: e.target.value})}
                  className="w-full h-28 px-4 py-3 border border-gray-300 rounded-4xl text-sm focus:outline-none focus:ring-1 focus:ring-[#185325] resize-none"
                />
              </div>

              <button onClick={handleAddMilestone} className="w-full mt-4 py-3 bg-[#185325] hover:bg-[#123d1c] text-white text-sm font-bold rounded-full transition-colors shadow-sm">
                Tambah Milestone
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Step2;