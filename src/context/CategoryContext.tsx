'use client';

import React, {createContext, useContext, useEffect, useState} from "react";
import {Category} from "@/interface/Category";
import {fetchAllCategories} from "@/lib/api";
import {useAuth} from "@/context";

interface CategoryContext {
  categories: Category[];
  categoriesLoading: boolean;
  reloadCategories: () => Promise<void>;
}

const CategoryContext = createContext<CategoryContext | undefined>(undefined);

export const CategoryProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const {token} = useAuth();

  const loadCategories = async () => {
    setLoading(true);
    try {
      if (token) {
        const data = await fetchAllCategories(token);
        setCategories(data);
      }
    } catch (error) {
      console.error("Failed to fetch categories", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, [token]);

  return (
      <CategoryContext.Provider
          value={
            {categories, categoriesLoading: loading, reloadCategories: loadCategories}
          }>
        {children}
      </CategoryContext.Provider>
  );
};

export const useCategories = (): CategoryContext => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error("useCategories must be used within a CategoryContext.Provider");
  }
  return context;
};
