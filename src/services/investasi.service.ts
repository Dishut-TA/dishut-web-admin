import type { CreateProgramInvestasiPayload, ProgramInvestasi } from "@/utils/interface";

const API_URL = import.meta.env.VITE_API_EXAMPLE;

export const getKthProgramsAPI = async (): Promise<ProgramInvestasi[]> => {
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('user_id') || '1'; 

  const response = await fetch(`${API_URL}/kth/programs`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'X-User-Id': userId,
      ...(token && { 'Authorization': `Bearer ${token}` })
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'Gagal memuat data investasi KTH.');
  }

  // Mengambil data baik bentuk array langsung maupun terbungkus dalam paginasi (payload.data)
  const payload = result.payload;
  if (Array.isArray(payload)) {
    return payload;
  }
  if (payload && Array.isArray(payload.data)) {
    return payload.data;
  }
  return [];
};

export const createKthProgramAPI = async (payloadData: CreateProgramInvestasiPayload): Promise<ProgramInvestasi> => {
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('user_id') || '1';

  const response = await fetch(`${API_URL}/kth/programs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-User-Id': userId,
      ...(token && { 'Authorization': `Bearer ${token}` })
    },
    body: JSON.stringify(payloadData),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'Gagal mengajukan program investasi.');
  }

  return result.payload;
};

export const verifyProgramBupmAPI = async (id: string, payload: { status: string, catatan_verifikasi: string }) => {
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('user_id') || '1'; // Sesuai Dummy Auth

  const response = await fetch(`${API_URL}/bupm/programs/${id}/verify`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-User-Id': userId,
      ...(token && { 'Authorization': `Bearer ${token}` })
    },
    body: JSON.stringify(payload),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'Gagal memverifikasi program investasi.');
  }

  return result.payload;
};