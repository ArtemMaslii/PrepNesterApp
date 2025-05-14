'use client';

import React, {createContext, useContext, useEffect, useState} from "react";
import {CheatSheet} from "@/interface/CheatSheet";
import {useAuth, useUser} from "@/context";
import {createCheatSheet, fetchAllCheatSheets, fetchCheatSheetById} from "@/lib/api";
import {SortBy} from "@/interface/SortBy";
import {RequestCheatSheet} from "@/interface/requestCreateCheatSheet";
import {CheatSheetDetails} from "@/interface/cheatSheetDetails";

interface CheatSheetsContext {
  cheatSheets: CheatSheet[];
  cheatSheetDetails: CheatSheetDetails;
  cheatSheetsLoading: boolean;
  reloadCheatSheets: (isPublic?: boolean, sortBy?: SortBy, searchTerm?: string, pageNum?: number, pageSize?: number) => Promise<void>;
  loadCheatSheetDetails: (id: string) => Promise<void>;
  createNewCheatSheet: (cheatSheetData: Omit<RequestCheatSheet, 'createdBy'>) => Promise<void>;
}

const CheatSheetsContext = createContext<CheatSheetsContext | undefined>(undefined);

export const CheatSheetsProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
  const [cheatSheets, setCheatSheets] = useState<CheatSheet[]>([]);
  const [cheatSheetDetails, setCheatSheetDetails] = useState<CheatSheetDetails>(null);
  const [loading, setLoading] = useState(true);
  const {token} = useAuth();
  const {user} = useUser();

  const loadCheatSheets = async (
      isPublic: boolean = true,
      sortBy: SortBy = SortBy.ASCENDING,
      searchTerm?: string,
      pageNum: number = 0,
      pageSize: number = 25
  ) => {
    setLoading(true);
    try {
      if (token) {
        const data = await fetchAllCheatSheets(token, isPublic, sortBy, searchTerm, pageNum, pageSize);
        setCheatSheets(data);
      }
    } catch (error) {
      console.error("Failed to fetch cheat sheets", error);
    } finally {
      setLoading(false);
    }
  };

  const loadCheatSheetById = async (
      id: string
  ) => {
    setLoading(true)
    try {
      if (token) {
        const data = await fetchCheatSheetById(token, id);
        setCheatSheetDetails(data);
      }
    } catch (error) {
      console.error("Failed to fetch cheat sheets", error);
    } finally {
      setLoading(false);
    }
  };

  const createNewCheatSheet = async (cheatSheetData: Omit<RequestCheatSheet, 'createdBy'>) => {
    try {
      if (!token || !user?.id) {
        throw new Error("Authentication required");
      }

      const requestData: RequestCheatSheet = {
        ...cheatSheetData,
        createdBy: user.id
      };

      const newCheatSheet = await createCheatSheet(token, requestData);
      setCheatSheets(prev => [newCheatSheet, ...prev]);

      await loadCheatSheets();
    } catch (error) {
      console.error("Failed to create cheat sheet:", error);
      throw error;
    }
  };

  useEffect(() => {
    loadCheatSheets();
  }, [token]);

  return (
      <CheatSheetsContext.Provider
          value={{
            cheatSheets,
            cheatSheetDetails,
            cheatSheetsLoading: loading,
            reloadCheatSheets: loadCheatSheets,
            loadCheatSheetDetails: loadCheatSheetById,
            createNewCheatSheet
          }}>
        {children}
      </CheatSheetsContext.Provider>
  );
};

export const useCheatSheets = (): CheatSheetsContext => {
  const context = useContext(CheatSheetsContext);
  if (!context) {
    throw new Error("useCheatSheets must be used within a CheatSheetsContext");
  }
  return context;
};
