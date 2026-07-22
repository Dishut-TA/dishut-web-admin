const API_URL = import.meta.env.VITE_API_MASTER_URL;

export interface DonationProgramPayload {
  analysis_result_id: number | null;
  kth_id: number;
  seed_specification_id: number;
  name: string;
  location: string;
  total_seeds_collected: number;
  total_seeds_realized: number;
  status: string;
}

export interface DonationProgramResponseData {
  id: number;
  analysis_result_id: number | null;
  kth_id: number;
  seed_specification_id: number;
  name: string;
  location: string;
  total_seeds_collected: number;
  total_seeds_realized: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface GetDonationProgramsResponse {
  payload: DonationProgramResponseData[];
}

export const createDonationProgramAPI = async (payload: DonationProgramPayload) => {
  try {
    const token = localStorage.getItem('token');
    
    const response = await fetch(`${API_URL}/donation-programs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Terjadi kesalahan saat menyimpan program donasi.');
    }

    return data;
  } catch (error: any) {
    throw new Error(error.message || 'Gagal terhubung ke server.');
  }
};

export const getDonationProgramsAPI = async (): Promise<GetDonationProgramsResponse> => {
  try {
    const token = localStorage.getItem('token');
    
    const response = await fetch(`${API_URL}/donation-programs`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Gagal mengambil data program donasi dari server.');
    }

    return data;
  } catch (error: any) {
    throw new Error(error.message || 'Gagal terhubung ke server.');
  }
};