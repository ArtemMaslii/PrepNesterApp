'use client';

import {useInterviews} from "@/context";
import {Box} from "@mui/material";
import {InterviewHeader, InterviewSorting} from "@/components/interviews";
import {GeneralSearch} from "@/components";
import React, {useCallback, useEffect, useState} from "react";
import {SkeletonLoader} from "@/components/questionBank";
import {Status} from "@/interface/Status";

export default function InterviewSheetPage() {
  const {interviews, interviewLoading, reloadInterviews} = useInterviews()
  const [filters, setFilters] = useState({
    searchTerm: "",
    status: undefined as Status | undefined
  });
  const [prevFilters, setPrevFilters] = useState(filters);

  const loadData = useCallback(async () => {
    try {
      if (JSON.stringify(filters) === JSON.stringify(prevFilters)) {
        return;
      }

      setPrevFilters(filters);
      await reloadInterviews(
          filters.searchTerm,
          filters.status,
      );
    } catch (error) {
      console.error("Error loading data:", error);
    }
  }, [filters, prevFilters, reloadInterviews]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleSearch = useCallback((term: string) => {
    setFilters(prev => ({...prev, searchTerm: term}));
  }, []);

  const handleClearSearch = useCallback(() => {
    setFilters(prev => ({...prev, searchTerm: ""}));
  }, []);

  const handleFilterChange = useCallback((newFilters: {
    status?: Status
  }) => {
    setFilters(prev => ({...prev, ...newFilters}));
  }, []);

  if (interviewLoading) {
    return (
        <Box paddingX="40px" paddingY="20px">
          <InterviewHeader onAddInterviewClick={() => {
          }}/>
          <GeneralSearch
              onSearch={handleSearch}
              onClear={handleClearSearch}
              searchTerm={filters.searchTerm}
          />
          <SkeletonLoader/>
        </Box>
    );
  }

  return (
      <Box paddingX="40px" paddingY="20px">
        <InterviewHeader onAddInterviewClick={() => {
        }}/>
        <GeneralSearch
            onSearch={handleSearch}
            onClear={handleClearSearch}
            searchTerm={filters.searchTerm}
        />
        <InterviewSorting currentFilters={filters} onFilterChange={handleFilterChange}/>
      </Box>
  );
}