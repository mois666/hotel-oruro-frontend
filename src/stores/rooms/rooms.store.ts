import { create, StateCreator } from "zustand";

import { isAxiosError } from "axios";
import { toast } from "sonner";

import { appDB } from "../../api/appDB";

interface RoomsState {
  rooms: any[];
  room: any[];
}
interface Actions {
  getRooms: (token: string) => Promise<any[]>;
  getRoom: (id: number, token: string) => void;
  createRoom: (room: [], token: string) => void;
  updateRoom: (id: number, room: [], token: string) => void;
  deleteRoom: (id: number, token: string) => void;
}

const storeApi: StateCreator<RoomsState & Actions> = (set, get) => ({
  rooms: [],
  room: [],
  
  getRooms: async (token: string) => {
    // todo:: get categories from api
    try {
      const response = await appDB.get('/rooms', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set({ rooms: response.data as any });
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    }
  },
  getRoom: async (id: number, token: string) => {
    try {
      const response = await appDB.get(`/rooms/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set({ room: response.data as any });
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    }
  },
  createRoom: async (room: [], token: string) => {
    try {
      const response = await appDB.post('/rooms', room, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success(response.data.message);
      get().getRooms(token);
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    }
  },
  updateRoom: async (id: number, room: [], token: string) => {
    try {
      const response = await appDB.put(`/rooms/${id}`, room, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success(response.data.message);
      get().getRooms(token);
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    }
  },
  deleteRoom: async (id: number, token: string) => {
    try {
      const response = await appDB.delete(`/rooms/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success(response.data.message);
      get().getRooms(token);
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    }
  },
});

export const useRoomStore = create<RoomsState & Actions>()(storeApi);
