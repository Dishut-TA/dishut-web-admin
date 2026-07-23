import React, { useState, useEffect, useRef } from 'react';
import { 
  HiOutlineChevronLeft, 
  HiOutlineDocumentDuplicate, 
  HiOutlineCloud,
  HiCheck
} from 'react-icons/hi2';
import { FiChevronDown } from 'react-icons/fi';

type PaymentTab = 'QR' | 'VA';

const PendanaanProgram: React.FC = () => {
  const [step, setStep] = useState<1 | 2>(1);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedBank, setSelectedBank] = useState<string>('');
  const [activeTab, setActiveTab] = useState<PaymentTab>('QR');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const banks = [
    { id: 'bri', name: 'Bank Rakyat Indonesia (BRI)', code: 'BRI', color: 'bg-blue-600' },
    { id: 'bca', name: 'Bank Central Asia (BCA)', code: 'BCA', color: 'bg-blue-800' },
    { id: 'bni', name: 'Bank Negara Indonesia (BNI)', code: 'BNI', color: 'bg-orange-500' },
    { id: 'mandiri', name: 'Bank Mandiri', code: 'MDR', color: 'bg-blue-900' },
  ];

  // Tutup dropdown jika klik di luar area
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ===========================================================================
  // TAMPILAN LANGKAH 1: PILIH METODE PEMBAYARAN
  // ===========================================================================
  if (step === 1) {
    return (
      <div className="min-h-screen bg-[#F8F9F8] pt-10 pb-20 px-5 font-sans">
        <div className="max-w-3xl mx-auto">
          <button className="flex items-center gap-2 text-sm font-bold text-gray-800 hover:text-[#185325] transition-colors mb-10 cursor-pointer">
            <HiOutlineChevronLeft className="w-4 h-4 stroke-2" /> Kembali
          </button>

          <div className="max-w-xl mx-auto">
            <h1 className="text-2xl md:text-3xl font-bold text-[#185325] text-center mb-10">
              Pendanaan Program
            </h1>

            <div className="space-y-4 mb-8">
              <div className="grid grid-cols-[160px_20px_1fr] md:grid-cols-[200px_20px_1fr] text-lg font-semibold text-[#185325]">
                <span>Nama Program</span>
                <span>:</span>
                <span>Rehabilitasi Lahan Subang</span>
              </div>
              <div className="grid grid-cols-[160px_20px_1fr] md:grid-cols-[200px_20px_1fr] text-lg font-semibold text-[#185325]">
                <span>Nominal Pendanaan</span>
                <span>:</span>
                <span>Rp 80.000.000</span>
              </div>
            </div>

            <div className="mb-6 relative" ref={dropdownRef}>
              <label className="block text-sm font-bold text-[#185325] mb-2">
                Pilih Metode Pembayaran
              </label>
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`w-full flex justify-between items-center bg-transparent border-2 ${isDropdownOpen || selectedBank ? 'border-[#185325]' : 'border-gray-300'} rounded-full px-5 py-3.5 text-sm outline-none transition-colors cursor-pointer`}
              >
                <span className={selectedBank ? "text-gray-800 font-medium" : "text-gray-400"}>
                  {selectedBank ? banks.find(b => b.id === selectedBank)?.name : "Pilih metode..."}
                </span>
                <FiChevronDown className={`text-xl ${isDropdownOpen ? 'rotate-180' : ''} text-[#185325] transition-transform`} />
              </button>

              {isDropdownOpen && (
                <div className="absolute top-[calc(100%+8px)] left-0 w-full bg-white rounded-2xl shadow-xl border border-gray-100 z-50 overflow-hidden py-2 animate-[fadeIn_0.2s_ease-out]">
                  {banks.map((bank) => {
                    const isSelected = selectedBank === bank.id;
                    return (
                      <div 
                        key={bank.id} 
                        onClick={() => { setSelectedBank(bank.id); setIsDropdownOpen(false); }}
                        className={`flex items-center justify-between px-5 py-3.5 text-sm cursor-pointer transition-colors mx-2 rounded-xl
                          ${isSelected ? "bg-[#DCECE0]/70 text-[#185325] font-bold" : "text-gray-700 hover:bg-gray-50"}`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-5 flex items-center justify-center rounded-[3px] text-[9px] font-bold text-white ${bank.color}`}>
                            {bank.code}
                          </div>
                          <span>{bank.name}</span>
                        </div>
                        {isSelected && <HiCheck className="w-5 h-5 text-[#185325]" />}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {selectedBank && (
              <div className="animate-[fadeIn_0.3s_ease-out]">
                <button 
                  onClick={() => setStep(2)}
                  className="w-full bg-[#185325] hover:bg-[#123d1c] text-white font-bold rounded-full py-4 transition-colors cursor-pointer shadow-md active:scale-[0.98]"
                >
                  Lanjutkan Pembayaran
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9F8] pt-10 pb-20 px-5 font-sans">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl md:text-[28px] font-bold text-[#185325] text-center mb-12">
          Pembayaran Program Rehabilitasi
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          <div>
            <div className="mb-8">
              <h2 className="text-xl font-bold text-[#185325] flex items-center gap-2 mb-3">
                Order ID <span className="text-[#8D6E63] font-normal text-lg">#91902478hwdo8ahd</span>
              </h2>
              <p className="text-sm text-[#185325] mb-4">
                Selesaikan pembayaran dalam <span className="font-bold">00.15.39</span>
              </p>
              <p className="text-sm text-[#185325] mb-2">
                Lakukan pembayaran untuk menyelesaikan pesanan kamu
              </p>
              <div className="flex items-center gap-3 mt-4">
                <span className="text-sm text-[#185325]">Total Bayar</span>
                <span className="text-2xl md:text-3xl font-bold text-[#185325]">Rp. 80.000.000</span>
              </div>
            </div>

            <div>
              <h3 className="text-sm text-[#185325] mb-2">Panduan Pembayaran</h3>
              <ol className="list-decimal list-inside text-sm text-[#185325] space-y-1.5">
                {activeTab === 'QR' ? (
                  <>
                    <li>Buka aplikasi pembayaran QRIS yang mendukung</li>
                    <li>Unduh atau pindai atau download QRIS di layar kamu</li>
                    <li>Konfirmasi pembayaran di aplikasi</li>
                    <li>Pembayaran Berhasil</li>
                  </>
                ) : (
                  <>
                    <li>Buka aplikasi pembayaran VA yang mendukung</li>
                    <li>Salin nomor VA di layar kamu</li>
                    <li>Konfirmasi pembayaran di aplikasi</li>
                    <li>Pembayaran Berhasil</li>
                  </>
                )}
              </ol>
            </div>
          </div>

          {/* Kanan: Tab QR & VA */}
          <div className="flex flex-col items-center">
            
            {/* Toggle Switch */}
            <div className="flex w-64 rounded-full border border-gray-300 p-1 bg-transparent mb-8">
              <button
                onClick={() => setActiveTab('QR')}
                className={`flex-1 py-2 rounded-full text-sm font-semibold transition-colors cursor-pointer
                  ${activeTab === 'QR' ? 'bg-[#98D69A] text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                QR
              </button>
              <button
                onClick={() => setActiveTab('VA')}
                className={`flex-1 py-2 rounded-full text-sm font-semibold transition-colors cursor-pointer
                  ${activeTab === 'VA' ? 'bg-[#98D69A] text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                VA
              </button>
            </div>

            {/* Konten Tab Aktif */}
            <div className="w-full flex flex-col items-center animate-[fadeIn_0.3s_ease-out]">
              {activeTab === 'QR' ? (
                <>
                  <p className="text-sm text-[#185325] mb-4">Pindai atau Download QR</p>
                  <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-6">
                    {/* Placeholder QR Code Menggunakan API Publik agar terlihat realistis */}
                    <img 
                      src="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=PembayaranRehabilitasiLahanSubang" 
                      alt="QR Code" 
                      className="w-56 h-56 object-contain"
                    />
                  </div>
                  <button className="flex items-center justify-center gap-2 w-64 py-3 rounded-full border border-[#185325] text-[#185325] font-semibold text-sm hover:bg-[#185325] hover:text-white transition-colors cursor-pointer">
                    Download QR <HiOutlineCloud className="w-5 h-5" />
                  </button>
                </>
              ) : (
                <div className="w-full flex flex-col items-center mt-4">
                  <p className="text-sm text-[#185325] mb-3">Virtual Account</p>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl font-bold text-[#185325]">
                      1824718923743183
                    </span>
                    <button className="text-[#185325] hover:text-gray-600 transition-colors cursor-pointer" title="Salin VA">
                      <HiOutlineDocumentDuplicate className="w-5 h-5" />
                    </button>
                  </div>
                  <p className="text-[11px] text-[#185325] text-center max-w-62.5 mb-8 leading-relaxed">
                    Lakukan pembayaran ke no VA diatas sesuai nominal isi saldo yaitu sebesar <span className="font-bold">Rp</span>
                  </p>
                  
                  <button 
                    onClick={() => {
                      alert("Pembayaran Selesai!");
                      setStep(1); 
                    }}
                    className="w-full max-w-75 bg-[#185325] hover:bg-[#123d1c] text-white font-bold rounded-full py-3.5 transition-colors cursor-pointer shadow-md active:scale-[0.98]"
                  >
                    Selesai
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default PendanaanProgram;