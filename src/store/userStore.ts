import { create } from 'zustand';
import { getUsers } from '../services/Auth';
import type { User } from "../interfaces/userInterface";

interface UserState {
  users: User[];
  fetchUsers: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  users: [],
  fetchUsers: async () => {
    try {
      const usersData = await getUsers();
      set({ users: usersData });
    } catch (err) {
      console.error('Error:', err);
    }
}}));