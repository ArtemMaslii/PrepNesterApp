'use client';

import {useInterviews} from "@/context";
import {Box} from "@mui/material";
import {CreateInterviewModal, InterviewHeader, InterviewSorting} from "@/components/interviews";
import {GeneralSearch} from "@/components";
import React, {useCallback, useEffect, useState} from "react";
import {SkeletonLoader} from "@/components/questionBank";
import {Status} from "@/interface/Status";
import {InterviewTable} from "@/components/interviews/InterviewTable";
import {InterviewCreateDetails} from "@/interface/interviewDetails";
import {useRouter} from "next/navigation";

export default function InterviewSheetPage() {
  const {
    interviews,
    interviewDetails,
    interviewLoading,
    reloadInterviews,
    createInterview,
    deleteInterview
  } = useInterviews()
  const [filters, setFilters] = useState({
    searchTerm: "",
    status: undefined as Status | undefined
  });
  const [prevFilters, setPrevFilters] = useState(filters);
  const [showLoading, setShowLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter()

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

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (interviewLoading) {
      timer = setTimeout(() => {
        setShowLoading(true);
      }, 300);
    } else {
      setShowLoading(false);
    }

    return () => clearTimeout(timer);
  }, [interviewLoading]);

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

  if (showLoading) {
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

  const handleCreateQuestion = async (data: Omit<InterviewCreateDetails, 'createdBy'>) => {
    try {
      await createInterview(data);
      setModalOpen(false);
    } catch (error) {
      console.error("Question creation failed:", error);
    }
  };

  const handleDeleteInterview = async (id: string) => {
    try {
      await deleteInterview(id);
    } catch (error) {
      console.error("Question creation failed:", error);
    }
  }

  return (
      <Box paddingX="40px" paddingY="20px">
        <InterviewHeader onAddInterviewClick={() => setModalOpen(true)}/>
        <GeneralSearch
            onSearch={handleSearch}
            onClear={handleClearSearch}
            searchTerm={filters.searchTerm}
        />
        <InterviewSorting currentFilters={filters} onFilterChange={handleFilterChange}/>
        <InterviewTable
            interviews={interviews}
            handleDelete={handleDeleteInterview}
        />

        <CreateInterviewModal open={modalOpen} onClose={() => setModalOpen(false)}
                              onSubmit={handleCreateQuestion}/>
      </Box>
  );
}