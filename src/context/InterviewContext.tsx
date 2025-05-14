'use client';

import {Interview} from "@/interface/interviewPreview/Interview";
import {Status} from "@/interface/Status";
import React, {createContext, useContext, useEffect, useState} from "react";
import {fetchAllInterviews} from "@/lib/api";
import {useAuth} from "@/context/AuthContext";

interface InterviewsContext {
  interviews: Interview[];
  interviewLoading: boolean;
  reloadInterviews: (search?: string, status?: Status) => Promise<void>;
}

const InterviewContext = createContext<InterviewsContext | undefined>(undefined);

export const InterviewProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [loading, setLoading] = useState(true);
  const {token} = useAuth();

  const loadInterviews = async (search?: string, status?: Status) => {
    setLoading(true);
    try {
      if (token) {
        const data = await fetchAllInterviews(token, search, status);
        setInterviews(data);
      }
    } catch (error) {
      console.error("Failed to fetch interviews", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInterviews();
  }, [token]);

  return (
      <InterviewContext.Provider
          value={{
            interviews,
            interviewLoading: loading,
            reloadInterviews: loadInterviews
          }}
      >
        {children}
      </InterviewContext.Provider>
  );
};

export const useInterviews = (): InterviewsContext => {
  const context = useContext(InterviewContext);
  if (!context) {
    throw new Error("useInterviews must be used within a InterviewProvider");
  }
  return context;
};