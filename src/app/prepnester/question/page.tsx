'use client';

import React, {useCallback, useEffect, useState} from "react";
import {Box} from "@mui/material";
import {useCheatSheets, useQuestions} from "@/context";
import {
  QuestionBankHeader,
  QuestionBankSearch,
  QuestionBankSorting,
  QuestionList,
  SkeletonLoader
} from "@/components/questionBank";
import {CheatSheetList} from "@/components/questionBank/cheatSheets/CheatSheetList";
import {SortBy} from "@/interface/SortBy";

export default function QuestionBank() {
  const {questions, questionsLoading, reloadQuestions} = useQuestions();
  const {cheatSheets, cheatSheetsLoading, reloadCheatSheets} = useCheatSheets();
  const [expandedQuestionIds, setExpandedQuestionIds] = useState<string[]>([]);
  const [showLoading, setShowLoading] = useState(false);
  const [filters, setFilters] = useState({
    searchTerm: "",
    isPublic: true,
    sortBy: SortBy.ASCENDING,
    contentType: 'all' as 'all' | 'questions' | 'cheatSheets'
  });
  const [prevFilters, setPrevFilters] = useState(filters);

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
        <QuestionBankHeader/>
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
        <QuestionBankHeader/>
        <QuestionBankSearch
            onSearch={handleSearch}
            onClear={handleClearSearch}
            searchTerm={filters.searchTerm}
        />
        <QuestionBankSorting
            onFilterChange={handleFilterChange}
            currentFilters={filters}
        />

        {(filters.contentType === 'all' || filters.contentType === 'cheatSheets') && (
            <CheatSheetList cheatSheets={cheatSheets}/>
        )}

        {(filters.contentType === 'all' || filters.contentType === 'questions') && (
            <QuestionList
                questions={questions}
                expandedQuestionIds={expandedQuestionIds}
                toggleQuestionDrawer={toggleQuestionDrawer}
            />
        )}
      </Box>
  );
}