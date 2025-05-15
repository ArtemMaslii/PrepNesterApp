'use client';

import {Interview} from "@/interface/interviewPreview/Interview";
import {Status} from "@/interface/Status";
import React, {createContext, useContext, useEffect, useState} from "react";
import {
  createInterview,
  deleteInterview,
  fetchAllInterviews,
  fetchInterviewById,
  updateInterview
} from "@/lib/api";
import {useAuth} from "@/context/AuthContext";
import {
  InterviewCreateDetails,
  InterviewDetails,
  InterviewUpdateDetails
} from "@/interface/interviewDetails";
import {useUser} from "@/context/UserContext";

interface InterviewsContext {
  interviews: Interview[];
  interviewDetails: InterviewDetails | null;
  interviewLoading: boolean;
  reloadInterviews: (search?: string, status?: Status) => Promise<void>;
  loadInterviewDetails: (id: string) => Promise<void>;
  createInterview: (body: Omit<InterviewCreateDetails, 'createdBy'>) => Promise<void>;
  updateInterview: (id: string, body: InterviewUpdateDetails) => Promise<void>;
  deleteInterview: (id: string) => Promise<void>;
}

const InterviewContext = createContext<InterviewsContext | undefined>(undefined);

export const InterviewProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [interviewDetails, setInterviewDetails] = useState<InterviewDetails | null>(null)
  const [loading, setLoading] = useState(false);
  const {token} = useAuth();
  const {user} = useUser()

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

  const loadInterviewById = async (id: string) => {
    setLoading(true);
    try {
      if (token) {
        const data = await fetchInterviewById(token, id);
        setInterviewDetails(data);
      }
    } catch (error) {
      console.error("Failed to fetch interviews", error);
    } finally {
      setLoading(false);
    }
  }

  const createInterviewWithCreatedBy = async (body: Omit<InterviewCreateDetails, 'createdBy'>) => {
    setLoading(true);
    try {
      if (token && user) {
        const requestData: InterviewCreateDetails = {
          ...body,
          createdBy: user.id
        }

        const data = await createInterview(token, requestData);
        await loadInterviews()
      }
    } catch (error) {
      console.error("Failed to fetch interviews", error);
    } finally {
      setLoading(false);
    }
  }

  const updateInterviewById = async (id: string, body: InterviewUpdateDetails) => {
    setLoading(true);
    try {
      if (token) {
        const data = await updateInterview(token, id, body);
        setInterviewDetails(data);
      }
    } catch (error) {
      console.error("Failed to fetch interviews", error);
    } finally {
      setLoading(false);
    }
  }

  const deleteInterviewById = async (id: string) => {
    setLoading(true);
    try {
      if (token) {
        await deleteInterview(token, id);

        await loadInterviews();
      }
    } catch (error) {
      console.error("Failed to fetch interviews", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadInterviews();
  }, [token]);

  return (
      <InterviewContext.Provider
          value={{
            interviews,
            interviewDetails,
            interviewLoading: loading,
            reloadInterviews: loadInterviews,
            loadInterviewDetails: loadInterviewById,
            createInterview: createInterviewWithCreatedBy,
            updateInterview: updateInterviewById,
            deleteInterview: deleteInterviewById,
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