'use client';

import React, {createContext, useContext, useEffect, useState} from "react";
import {Question} from "@/interface/Question";
import {createQuestion, fetchAllQuestions} from "@/lib/api";
import {useAuth, useUser} from "@/context";
import {SortBy} from "@/interface/SortBy";
import {RequestQuestion} from "@/interface/requestCreateQuestion";

interface QuestionContext {
  questions: Question[];
  questionsLoading: boolean;
  reloadQuestions: (
      isPublic?: boolean,
      sortBy?: SortBy,
      searchTerm?: string,
      pageNum?: number,
      pageSize?: number
  ) => Promise<void>;
  createNewQuestion: (questionData: Omit<RequestQuestion, 'createdBy'>) => Promise<void>;
}

const QuestionContext = createContext<QuestionContext | undefined>(undefined);

export const QuestionProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const {token} = useAuth();
  const {user} = useUser();

  const loadQuestions = async (
      isPublic: boolean = true,
      sortBy: SortBy = SortBy.ASCENDING,
      searchTerm?: string,
      pageNum: number = 0,
      pageSize: number = 25
  ) => {
    setLoading(true);
    try {
      if (token) {
        const data = await fetchAllQuestions(token, isPublic, sortBy, searchTerm, pageNum, pageSize);
        setQuestions(data);
      }
    } catch (error) {
      console.error("Failed to fetch questions", error);
    } finally {
      setLoading(false);
    }
  };

  const createNewQuestion = async (questionData: Omit<RequestQuestion, 'createdBy'>) => {
    try {
      if (!token || !user?.id) {
        throw new Error("Authentication required");
      }

      const requestData: RequestQuestion = {
        ...questionData,
        createdBy: user.id
      };

      const newQuestion = await createQuestion(token, requestData);
      setQuestions(prev => [newQuestion, ...prev]);

      await loadQuestions();
    } catch (error) {
      console.error("Failed to create question:", error);
      throw error;
    }
  };

  useEffect(() => {
    loadQuestions();
  }, [token]);

  return (
      <QuestionContext.Provider
          value={{
            questions,
            questionsLoading: loading,
            reloadQuestions: loadQuestions,
            createNewQuestion
          }}
      >
        {children}
      </QuestionContext.Provider>
  );
};

export const useQuestions = (): QuestionContext => {
  const context = useContext(QuestionContext);
  if (!context) {
    throw new Error("useQuestions must be used within a QuestionProvider");
  }
  return context;
};