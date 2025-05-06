'use client';

import React, {createContext, useContext, useEffect, useState} from "react";
import {CheatSheet} from "@/interface/CheatSheet";
import {useAuth} from "@/context";
import {fetchAllCheatSheets} from "@/lib/api";

interface CheatSheetsProvider {
  cheatSheets: CheatSheet[];
  cheatSheetsLoading: boolean;
  reloadCheatSheets: () => Promise<void>;
}

const CheatSheetsContext = createContext<CheatSheetsProvider | undefined>(undefined);

export const CheatSheetsProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
  const [cheatSheets, setCheatSheets] = useState<CheatSheet[]>([]);
  const [loading, setLoading] = useState(true);
  const {token} = useAuth();

  const loadCheatSheets = async () => {
    setLoading(true);
    try {
      if (token) {
        const data = await fetchAllCheatSheets(token);
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

export const useCheatSheets = (): CheatSheetsProvider => {
  const context = useContext(CheatSheetsContext);
  if (!context) {
    throw new Error("useCheatSheets must be used within a CheatSheetsProvider");
  }
  return context;
};
