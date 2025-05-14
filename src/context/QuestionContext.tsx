'use client';

import React, {createContext, useContext, useEffect, useState} from "react";
import {Question} from "@/interface/Question";
import {
  createCommentForQuestion,
  createCommentForSubQuestion,
  createQuestion,
  deleteQuestion,
  deleteSubQuestion,
  fetchAllQuestions,
  fetchQuestionById,
  fetchSubQuestionById,
  updateCommentForQuestion,
  updateCommentForSubQuestion,
  updateQuestion,
  updateSubQuestion,
} from "@/lib/api";
import {useAuth, useUser} from "@/context";
import {SortBy} from "@/interface/SortBy";
import {RequestQuestion} from "@/interface/requestCreateQuestion";
import {
  QuestionDetails,
  RequestCreateComment,
  RequestUpdateComment
} from "@/interface/questionDetails";
import {RequestUpdateQuestion} from "@/interface/requestUpdateQuestion";

interface QuestionContext {
  questions: Question[];
  questionDetails: QuestionDetails | null;
  questionsLoading: boolean;
  reloadQuestions: (
      isPublic?: boolean,
      sortBy?: SortBy,
      searchTerm?: string,
      pageNum?: number,
      pageSize?: number
  ) => Promise<void>;
  loadQuestionById: (id: string) => Promise<void>;
  loadSubQuestionById: (id: string) => Promise<void>;
  createNewQuestion: (questionData: Omit<RequestQuestion, 'createdBy'>) => Promise<void>;
  updateQuestion: (id: string, title: string) => Promise<void>;
  updateSubQuestion: (id: string, title: string) => Promise<void>;
  deleteQuestion: (id: string) => Promise<void>;
  deleteSubQuestion: (id: string) => Promise<void>;
  createCommentQuestion: (questionId: string, body: Omit<RequestCreateComment, 'createdBy'>) => Promise<void>;
  createCommentSubQuestion: (subQuestionId: string, body: Omit<RequestCreateComment, 'createdBy'>) => Promise<void>;
  updateCommentQuestion: (commentId: string, body: RequestUpdateComment) => Promise<void>;
  updateCommentSubQuestion: (commentId: string, body: RequestUpdateComment) => Promise<void>;
}

const QuestionContext = createContext<QuestionContext | undefined>(undefined);

export const QuestionProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [questionDetails, setQuestionDetails] = useState<QuestionDetails | null>(null);
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

  const loadQuestionById = async (id: string) => {
    setLoading(true);
    try {
      if (token) {
        const question = await fetchQuestionById(token, id);
        setQuestionDetails(question);
      }
    } catch (error) {
      console.error("Failed to fetch question by ID", error);
    } finally {
      setLoading(false);
    }
  }

  const loadSubQuestionById = async (id: string) => {
    setLoading(true);
    try {
      if (token) {
        const subQuestion = await fetchSubQuestionById(token, id);
        setQuestionDetails(subQuestion);
      }
    } catch (error) {
      console.error("Failed to fetch question by ID", error);
    } finally {
      setLoading(false);
    }
  }

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

  const updateQuestionWithTitle = async (id: string, titleToUpdate: string) => {
    try {
      if (!token || !user?.id) {
        throw new Error("Authentication required");
      }

      const requestData: RequestUpdateQuestion = {
        title: titleToUpdate,
        createdBy: user.id
      };

      const newQuestionDetails = await updateQuestion(token, id, requestData);
      setQuestionDetails(newQuestionDetails)

      await loadQuestions()
    } catch (error) {
      console.error("Failed to create question:", error);
      throw error;
    }
  }

  const updateSubQuestionWithTitle = async (id: string, titleToUpdate: string) => {
    try {
      if (!token || !user?.id) {
        throw new Error("Authentication required");
      }

      const requestData: RequestUpdateQuestion = {
        title: titleToUpdate,
        createdBy: user.id
      };

      const newQuestionDetails = await updateSubQuestion(token, id, requestData);
      setQuestionDetails(newQuestionDetails)

      await loadQuestions()
    } catch (error) {
      console.error("Failed to create question:", error);
      throw error;
    }
  }

  const deleteQuestionById = async (id: string) => {
    try {
      if (!token) {
        throw new Error("Authentication required");
      }

      await deleteQuestion(token, id);

      await loadQuestions()
    } catch (error) {
      console.error("Failed to create question:", error);
      throw error;
    }
  }

  const deleteSubQuestionById = async (id: string) => {
    try {
      if (!token) {
        throw new Error("Authentication required");
      }

      await deleteSubQuestion(token, id);

      await loadQuestions()
    } catch (error) {
      console.error("Failed to create question:", error);
      throw error;
    }
  }

  const createQuestionComment = async (questionId: string, body: Omit<RequestCreateComment, 'createdBy'>) => {
    try {
      if (!token || !user?.id) {
        throw new Error("Authentication required");
      }

      const requestData: RequestCreateComment = {
        ...body,
        createdBy: user.id,
      }

      await createCommentForQuestion(token, questionId, requestData);

      await loadQuestionById(questionId);
    } catch (error) {
      console.error("Failed to create question:", error);
      throw error;
    }
  }

  const createSubQuestionComment = async (subQuestionId: string, body: Omit<RequestCreateComment, 'createdBy'>) => {
    try {
      if (!token || !user?.id) {
        throw new Error("Authentication required");
      }

      const requestData: RequestCreateComment = {
        ...body,
        createdBy: user.id,
      }

      await createCommentForSubQuestion(token, subQuestionId, requestData);

      await loadSubQuestionById(subQuestionId);
    } catch (error) {
      console.error("Failed to create question:", error);
      throw error;
    }
  }

  const updateQuestionComment = async (commentId: string, body: RequestUpdateComment) => {
    try {
      if (!token) {
        throw new Error("Autherntication required");
      }

      await updateCommentForQuestion(token, commentId, body);

      await loadQuestionById(questionDetails?.id ?? '');
    } catch (error) {
      console.error("Failed to create question:", error);
      throw error;
    }
  }

  const updateSubQuestionComment = async (commentId: string, body: RequestUpdateComment) => {
    try {
      if (!token) {
        throw new Error("Autherntication required");
      }

      await updateCommentForSubQuestion(token, commentId, body);

      await loadSubQuestionById(questionDetails?.id ?? '');
    } catch (error) {
      console.error("Failed to create question:", error);
      throw error;
    }
  }

  useEffect(() => {
    loadQuestions();
  }, [token]);

  return (
      <QuestionContext.Provider
          value={{
            questions,
            questionDetails,
            questionsLoading: loading,
            reloadQuestions: loadQuestions,
            loadQuestionById,
            loadSubQuestionById,
            createNewQuestion,
            updateQuestion: updateQuestionWithTitle,
            updateSubQuestion: updateSubQuestionWithTitle,
            deleteQuestion: deleteQuestionById,
            deleteSubQuestion: deleteSubQuestionById,
            createCommentQuestion: createQuestionComment,
            createCommentSubQuestion: createSubQuestionComment,
            updateCommentQuestion: updateQuestionComment,
            updateCommentSubQuestion: updateSubQuestionComment,
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