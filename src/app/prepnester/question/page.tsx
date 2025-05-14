'use client';

import React, {useCallback, useEffect, useState} from "react";
import {Box, Drawer} from "@mui/material";
import {useCategories, useCheatSheets, useQuestions} from "@/context";
import {
  QuestionBankHeader,
  QuestionBankSearch,
  QuestionBankSorting,
  QuestionList,
  SkeletonLoader
} from "@/components/questionBank";
import {CheatSheetList} from "@/components/questionBank/cheatSheets/CheatSheetList";
import {SortBy} from "@/interface/SortBy";
import {RequestQuestion} from "@/interface/requestCreateQuestion";
import {CreateQuestionModal} from "@/components/questionBank/questionCreateModal";
import {
  CheatSheetCreateModal
} from "@/components/questionBank/cheatSheetCreateModal/CreateCheatSheetModal";
import {QuestionDetailsModal} from "@/components/questionBank/questionDetails/QuestionDetailsModal";
import {RequestUpdateComment} from "@/interface/questionDetails";

export default function QuestionBank() {
  // Context Hooks
  const {
    questions,
    questionDetails,
    questionsLoading,
    reloadQuestions,
    createNewQuestion,
    loadQuestionById,
    loadSubQuestionById,
    updateQuestion,
    updateSubQuestion,
    deleteQuestion,
    deleteSubQuestion,
    createCommentQuestion,
    createCommentSubQuestion,
    updateCommentQuestion,
    updateCommentSubQuestion,
  } = useQuestions();
  const {cheatSheets, cheatSheetsLoading, reloadCheatSheets} = useCheatSheets();
  const {categories} = useCategories();

  // State Management
  const [expandedQuestionIds, setExpandedQuestionIds] = useState<string[]>([]);
  const [showLoading, setShowLoading] = useState(false);
  const [questionModalOpen, setQuestionModalOpen] = useState(false);
  const [cheatSheetModalOpen, setCheatSheetModalOpen] = useState(false);
  const [questionDetailsOpen, setQuestionDetailsOpen] = useState(false);
  const [filters, setFilters] = useState({
    searchTerm: "",
    isPublic: true,
    sortBy: SortBy.ASCENDING,
    contentType: 'all' as 'all' | 'questions' | 'cheatSheets'
  });
  const [prevFilters, setPrevFilters] = useState(filters);

  const handleQuestionClick = useCallback(async (id: string, isSubQuestion: boolean) => {
    if (!questionDetailsOpen) {
      if (isSubQuestion) {
        await loadSubQuestionById(id);
      } else {
        await loadQuestionById(id);
      }
      setQuestionDetailsOpen(true);
    } else {
      setQuestionDetailsOpen(false);
    }
  }, []);


  // Data Loading
  const loadData = useCallback(async () => {
    try {
      if (JSON.stringify(filters) === JSON.stringify(prevFilters)) {
        return;
      }

      setPrevFilters(filters);

      if (filters.contentType === 'all' || filters.contentType === 'questions') {
        await reloadQuestions(
            filters.isPublic,
            filters.sortBy,
            filters.searchTerm
        );
      }

      if (filters.contentType === 'all' || filters.contentType === 'cheatSheets') {
        await reloadCheatSheets(
            filters.isPublic,
            filters.sortBy,
            filters.searchTerm
        );
      }
    } catch (error) {
      console.error("Error loading data:", error);
    }
  }, [filters, prevFilters, reloadQuestions, reloadCheatSheets]);

  const handleCreateQuestion = async (questionData: Omit<RequestQuestion, 'createdBy'>) => {
    try {
      await createNewQuestion(questionData);
      setQuestionModalOpen(false);
    } catch (error) {
      // Handle error (show toast, etc.)
      console.error("Question creation failed:", error);
    }
  };

  const handleUpdateQuestion = async (id: string, title: string, isSubQuestion?: boolean) => {
    try {
      isSubQuestion ? await updateSubQuestion(id, title) : await updateQuestion(id, title)
    } catch (error) {
      console.error("Question creation failed:", error);
    }
  }

  const handleDeleteQuestion = async (id: string, isSubQuestion?: boolean) => {
    try {
      isSubQuestion ? await deleteSubQuestion(id) : await deleteQuestion(id);
    } catch (error) {
      console.error("Question creation failed:", error);
    }
  }

  const handleCreateComment = async (id: string, body: { message: string; parentId?: string }, isSubQuestion: boolean) => {
    try {
      isSubQuestion ? await createCommentSubQuestion(id, body) : createCommentQuestion(id, body);
    } catch (error) {
      console.error("Question creation failed", error);
    }
  }

  const handleUpdateComment = async (commentId: string, body: RequestUpdateComment, isSubQuestion: boolean) => {
    try {
      isSubQuestion ? await updateCommentSubQuestion(commentId, body) : await updateCommentQuestion(commentId, body);
    } catch (error) {
      console.error("Question creation failed", error);
    }
  }

  // Effects
  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (questionsLoading || cheatSheetsLoading) {
      timer = setTimeout(() => {
        setShowLoading(true);
      }, 300);
    } else {
      setShowLoading(false);
    }

    return () => clearTimeout(timer);
  }, [questionsLoading, cheatSheetsLoading]);


  // Event handlers
  const handleSearch = useCallback((term: string) => {
    setFilters(prev => ({...prev, searchTerm: term}));
  }, []);

  const handleClearSearch = useCallback(() => {
    setFilters(prev => ({...prev, searchTerm: ""}));
  }, []);

  const handleFilterChange = useCallback((newFilters: {
    contentType: 'all' | 'questions' | 'cheatSheets';
    isPublic: boolean;
    sortBy: SortBy;
  }) => {
    setFilters(prev => ({...prev, ...newFilters}));
  }, []);

  const toggleQuestionDrawer = useCallback((id: string) => {
    setExpandedQuestionIds((prev) =>
        prev.includes(id) ? prev.filter(qId => qId !== id) : [...prev, id]
    );
  }, []);

  if (showLoading) return (
      <Box paddingX="40px" paddingY="20px">
        <QuestionBankHeader onAddQuestionClick={() => setQuestionModalOpen(true)}
                            onAddInterviewSheetClick={() => setCheatSheetModalOpen(true)}/>
        <QuestionBankSearch
            onSearch={handleSearch}
            onClear={handleClearSearch}
            searchTerm={filters.searchTerm}
        />
        <QuestionBankSorting onFilterChange={handleFilterChange} currentFilters={filters}/>
        <SkeletonLoader/>
      </Box>
  );

  return (
      <Box paddingX="40px" paddingY="20px">
        <QuestionBankHeader onAddQuestionClick={() => setQuestionModalOpen(true)}
                            onAddInterviewSheetClick={() => setCheatSheetModalOpen(true)}/>
        <QuestionBankSearch
            onSearch={handleSearch}
            onClear={handleClearSearch}
            searchTerm={filters.searchTerm}
        />
        <QuestionBankSorting
            onFilterChange={handleFilterChange}
            currentFilters={filters}
        />

        <CreateQuestionModal
            open={questionModalOpen}
            onClose={() => setQuestionModalOpen(false)}
            onSubmit={handleCreateQuestion}
            categories={categories}
        />

        <CheatSheetCreateModal
            open={cheatSheetModalOpen}
            onClose={() => setCheatSheetModalOpen(false)}
        />

        {(filters.contentType === 'all' || filters.contentType === 'cheatSheets') && (
            <CheatSheetList cheatSheets={cheatSheets}/>
        )}

        {(filters.contentType === 'all' || filters.contentType === 'questions') && (
            <QuestionList
                questions={questions}
                expandedQuestionIds={expandedQuestionIds}
                toggleQuestionDrawer={toggleQuestionDrawer}
                onQuestionClick={handleQuestionClick}
            />
        )}

        <Drawer
            anchor="right"
            open={questionDetailsOpen}
            onClose={() => setQuestionDetailsOpen(false)}
            sx={{
              '& .MuiDrawer-paper': {
                width: '35%',
                boxSizing: 'border-box',
              },
            }}
        >
          {questionDetails && (
              <QuestionDetailsModal
                  question={questionDetails}
                  onEdit={handleUpdateQuestion}
                  onDelete={handleDeleteQuestion}
                  onAddComment={handleCreateComment}
                  onClose={() => setQuestionDetailsOpen(false)}
                  onEditComment={handleUpdateComment}
              />
          )}
        </Drawer>
      </Box>
  );
}