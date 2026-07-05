import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  HiOutlineHome, 
  HiOutlineChartBar, 
  HiOutlineComputerDesktop, 
  HiOutlineGlobeAlt,
  HiOutlineArchiveBox, 
  HiOutlineBookmark,
  HiXMark, 
  HiOutlineUser
} from 'react-icons/hi2';
import LOGO from "@/assets/images/LogoSigapFull2.png";
import { useAuth } from '@/context/AuthContext';
import { canManageAccounts } from '@/utils/rbac';
import SingleMenu from './SingleMenu';
import AccordionMenu from './AccordionMenu';
import { ROLE_BASE_PATHS, ROLES } from '@/utils/roles';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const { user } = useAuth();
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const userStr = localStorage.getItem("user");
  let userRole = ROLES.STAFF; 
  
  if (userStr) {
    const userData = JSON.parse(userStr);
    userRole = userData?.peran?.[0]?.nama?.toLowerCase() || ROLES.STAFF;
  }
  
  const toggleMenu = (menuId: string) => {
    setOpenMenu(openMenu === menuId ? null : menuId);
  };

  const basePath = ROLE_BASE_PATHS[userRole] || "/admin/staff";

  useEffect(() => {
    if (location.pathname.includes('/donasi')) setOpenMenu('donasi');
    else if (location.pathname.includes('/monitoring')) setOpenMenu('monitoring');
    else if (location.pathname.includes('/evaluasi')) setOpenMenu('evaluasi');
    else if (location.pathname.includes('/investasi') || location.pathname.includes('/rehabilitasi')) setOpenMenu('rehabilitasi');
    else if (location.pathname.includes('/manajemen-akun')) setOpenMenu('manajemen-akun');
  }, [location.pathname]);

  const navItems = [
    { 
      name: 'Dashboard', 
      path: `${basePath}/dashboard`, 
      icon: <HiOutlineHome className="w-5 h-5" />,
      allowedRoles: Object.values(ROLES) 
    },
    { 
      name: 'Analisis CPI', 
      path: `${basePath}/analisis-cpi`, 
      icon: <HiOutlineChartBar className="w-5 h-5" />,
      allowedRoles: [ROLES.KABID, ROLES.SUPERADMIN, ROLES.STAFF] 
    },
  ];

  const accordionMenus = [
    {
      id: 'donasi',
      title: 'Realisasi Bibit dan Donasi',
      icon: <HiOutlineArchiveBox className="w-5 h-5" />,
      items: [
        { name: 'Dashboard Program', path: `${basePath}/donasi/dashboard`, allowedRoles: [ROLES.KABID, ROLES.SUPERADMIN, ROLES.STAFF] },
        { name: 'Data Program', path: `${basePath}/donasi/program`, allowedRoles: [ROLES.KABID, ROLES.SUPERADMIN, ROLES.STAFF] },
        { name: 'Data Donatur', path: `${basePath}/donasi/donatur`, allowedRoles: [ROLES.STAFF] },
        { name: 'Pelaksanaan Kegiatan', path: `${basePath}/donasi/pelaksanaan-kegiatan`, allowedRoles: [ROLES.STAFF] },
      ],
    },
    {
      id: 'rehabilitasi',
      title: 'Rehabilitasi',
      icon: <HiOutlineBookmark className="w-5 h-5" />,
      items: [
        { name: 'Program APBD', path: `${basePath}/rehabilitasi/program-apbd`, allowedRoles: [ROLES.STAFF] },
        { name: 'Program CSR', path: `${basePath}/rehabilitasi/program-csr`, allowedRoles: [ROLES.STAFF] },
        { name: 'Monitoring dan Riwayat', path: `${basePath}/rehabilitasi/monitoring-riwayat`, allowedRoles: [ROLES.STAFF] },

        { name: 'Program APBD', path: `${basePath}/rehabilitasi/program-apbd`, allowedRoles: [ROLES.KABID, ROLES.SUPERADMIN] },
        { name: 'Program CSR', path: `${basePath}/rehabilitasi/program-csr`, allowedRoles: [ROLES.KABID, ROLES.SUPERADMIN] },
        { name: 'Riwayat Keputusan Validasi', path: `${basePath}/rehabilitasi/riwayat-keputusan`, allowedRoles: [ROLES.KABID, ROLES.SUPERADMIN] },
      ],
    },    
    {
      id: 'monitoring',
      title: 'Pelaksanaan dan Monitoring Program',
      icon: <HiOutlineComputerDesktop className="w-5 h-5" />,
      items: [
        { name: 'Dashboard Pelaksanaan dan Monitoring', path: `${basePath}/monitoring/dashboard`, allowedRoles: [ROLES.KABID, ROLES.SUPERADMIN, ROLES.STAFF] },
        { name: 'Daftar Kegiatan', path: `${basePath}/monitoring/kegiatan`, allowedRoles: [ROLES.KABID, ROLES.SUPERADMIN, ROLES.STAFF] },
        { name: 'Verifikasi Monitoring', path: `${basePath}/monitoring/verifikasi`, allowedRoles: [ROLES.KABID, ROLES.SUPERADMIN, ROLES.STAFF] },
        { name: 'Rekap Monitoring', path: `${basePath}/monitoring/rekap`, allowedRoles: [ROLES.KABID, ROLES.SUPERADMIN, ROLES.STAFF] },
      ],
    },
    {
      id: 'evaluasi',
      title: 'Evaluasi Penanaman Bibit',
      icon: <HiOutlineGlobeAlt className="w-5 h-5" />,
      items: [
        { name: 'Penugasan', path: `${basePath}/evaluasi/penugasan`, allowedRoles: [ROLES.KABID, ROLES.SUPERADMIN] },
        { name: 'Verifikasi Laporan', path: `${basePath}/evaluasi/verifikasi-laporan`, allowedRoles: [ROLES.KABID, ROLES.SUPERADMIN] },
        { name: 'Dashboard Evaluasi', path: `${basePath}/evaluasi/dashboard`, allowedRoles: [ROLES.STAFF] },
        { name: 'Data Evaluasi', path: `${basePath}/evaluasi/data`, allowedRoles: [ROLES.STAFF] },
        { name: 'Tugas Masuk', path: `${basePath}/evaluasi/tugas-masuk`, allowedRoles: [ROLES.STAFF] },
      ],
    },
    {
      id: 'manajemen-akun',
      title: 'Manajemen Akun',
      icon: <HiOutlineUser className="w-5 h-5" />,
      items: [
        { name: 'Data Pengguna', path: `${basePath}/manajemen-akun/data-pengguna`, allowedRoles: [ROLES.KABID, ROLES.SUPERADMIN, ROLES.STAFF] },
        { name: 'Data Peran Pengguna', path: `${basePath}/manajemen-akun/data-peran-pengguna`, allowedRoles: [ROLES.KABID, ROLES.SUPERADMIN, ROLES.STAFF] },
        { name: 'Data Hak Akses', path: `${basePath}/manajemen-akun/data-hak-akses`, allowedRoles: [ROLES.KABID, ROLES.SUPERADMIN, ROLES.STAFF] },
      ],
    },    
  ];

  const filteredNavItems = navItems.filter(item => item.allowedRoles.includes(userRole));
  const filteredAccordionMenus = accordionMenus.map(menu => ({
    ...menu,
    items: menu.items.filter(subItem => subItem.allowedRoles.includes(userRole))
  })).filter(menu => menu.id === "manajemen-akun" ? (canManageAccounts(user) || userRole === ROLES.KABID) : menu.items.length > 0);

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black/40 z-40 md:hidden" onClick={() => setIsOpen(false)} />}
      <aside className={`fixed md:static inset-y-0 left-0 z-50 w-64 bg-greenAdmin flex flex-col transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        
        <div className="flex items-center justify-between px-6 md:justify-center mt-4 mb-6 shrink-0">
          <div className="font-bold text-2xl text-white tracking-widest px-4 py-1 rounded-md">
            <img src={LOGO} alt="SIGAP Logo" />
          </div>
          <button className="md:hidden text-gray-700 hover:bg-[#c4ebd0] p-1 rounded-md" onClick={() => setIsOpen(false)}>
            <HiXMark className="w-6 h-6" />
          </button>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 overflow-y-auto pb-4 custom-scrollbar">
          {filteredNavItems.map((item) => (
            <SingleMenu key={item.name} item={item} setIsOpen={setIsOpen} />
          ))}
          {filteredAccordionMenus.map((menu) => (
            <AccordionMenu key={menu.id} menu={menu} openMenu={openMenu} toggleMenu={toggleMenu} setIsOpen={setIsOpen} />
          ))}
        </nav>

      </aside>
    </>
  );
};

export default Sidebar;