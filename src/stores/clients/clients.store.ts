import { create, StateCreator } from "zustand";

import { isAxiosError } from "axios";
import { toast } from "sonner";

import { appDB } from "../../api/appDB";

interface ClientsState {
  clients: any[];
  client: [];
}
interface Actions {
  getClients: (token: string) => void;
  getClient: (id: number, token: string) => void;
  createClient: (client: [], token: string) => void;
  updateClient: (id: number, client: [], token: string) => void;
  deleteClient: (id: number, token: string) => void;
}

const storeApi: StateCreator<ClientsState & Actions> = (set, get) => ({
  clients: [],
  client: [],
  
  getClients: async (token: string) => {
    // todo:: get categories from api
    try {
      const response = await appDB.get('/clients', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set({ clients: response.data as any });
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    }
  },
  getClient: async (id: number, token: string) => {
    try {
      const response = await appDB.get(`/clients/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set({ client: response.data});
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    }
  },
  createClient: async (client: [], token: string) => {
    try {
      const response = await appDB.post('/clients', client, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success(response.data.message);
      get().getClients(token);
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    }
  },
  updateClient: async (id: number, client: [], token: string) => {
    try {
      const response = await appDB.put(`/clients/${id}`, client, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success(response.data.message);
      get().getClients(token);
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    }
  },
  deleteClient: async (id: number, token: string) => {
    try {
      const response = await appDB.delete(`/clients/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success(response.data.message);
      get().getClients(token);
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    }
  },
});

export const useClientStore = create<ClientsState & Actions>()(storeApi);
