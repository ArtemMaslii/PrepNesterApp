'use client';

import React, {createContext, useContext, useEffect, useState} from "react";
import {CheatSheet} from "@/interface/CheatSheet";
import {useAuth} from "@/context";
import {fetchAllCheatSheets} from "@/lib/api";
import {SortBy} from "@/interface/SortBy";

interface CheatSheetsContext {
  cheatSheets: CheatSheet[];
  cheatSheetsLoading: boolean;
  reloadCheatSheets: (isPublic?: boolean, sortBy?: SortBy, searchTerm?: string, pageNum?: number, pageSize?: number) => Promise<void>;
}

const CheatSheetsContext = createContext<CheatSheetsContext | undefined>(undefined);

export const CheatSheetsProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
  const [cheatSheets, setCheatSheets] = useState<CheatSheet[]>([]);
  const [loading, setLoading] = useState(true);
  const {token} = useAuth();

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

  useEffect(() => {
    loadCheatSheets();
  }, [token]);

  return (
      <CheatSheetsContext.Provider
          value={{cheatSheets, cheatSheetsLoading: loading, reloadCheatSheets: loadCheatSheets}}>
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
