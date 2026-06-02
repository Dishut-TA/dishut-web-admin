import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiOutlineMap, HiArrowLeft } from 'react-icons/hi2';

const NotFound: React.FC = () => {
    const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6 text-center">
      
      <div className="bg-[#EBF3E8] p-6 rounded-full mb-6 shadow-sm border border-[#D5F0DE] animate-bounce-slow">
        <HiOutlineMap className="w-20 h-20 text-[#185325]" strokeWidth={1.5} />
      </div>
      
      <h1 className="text-6xl md:text-8xl font-black text-[#185325] mb-4 tracking-tighter">
        404
      </h1>
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
        Halaman Tidak Ditemukan
      </h2>
      <p className="text-gray-500 mb-8 max-w-md text-sm md:text-base leading-relaxed">
        Sepertinya Anda tersesat di luar area pemetaan. Halaman atau data yang Anda cari mungkin telah dipindahkan atau memang tidak pernah ada.
      </p>
      
      <Link
        to='#'
        onClick={() => {navigate(-1)}}
        className="bg-[#185325] hover:bg-[#113d1b] text-white px-8 py-3.5 rounded-full font-semibold transition-all flex items-center gap-3 shadow-md hover:shadow-lg hover:-translate-y-0.5"
      >
        <HiArrowLeft className="w-5 h-5" />
        Kembali
      </Link>
      
    </div>
  );
};

export default NotFound;