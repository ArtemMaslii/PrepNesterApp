'use client';

import React, {useEffect, useState} from "react";
import {Box} from "@mui/material";
import {useQuestions} from "@/context";
import {
  QuestionBankHeader,
  QuestionBankSearch,
  QuestionList,
  SkeletonLoader
} from "@/components/questionBank";

export default function QuestionBank() {
  const {questions, loading} = useQuestions();
  const [expandedQuestionIds, setExpandedQuestionIds] = useState<string[]>([]);
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (loading) {
      timer = setTimeout(() => {
        setShowLoading(true);
      }, 300); // delay in ms
    } else {
      setShowLoading(false);
    }

    return () => clearTimeout(timer);
  }, [loading]);

  if (showLoading) return (
      <Box paddingX="40px" paddingY="20px">
        <QuestionBankHeader/>
        <QuestionBankSearch/>
        <SkeletonLoader/>
      </Box>
  );

  const toggleQuestionDrawer = (id: string) => {
    setExpandedQuestionIds((prev) =>
        prev.includes(id) ? prev.filter(qId => qId !== id) : [...prev, id]
    );
  };

  return (
      <Box paddingX="40px" paddingY="20px">
        <QuestionBankHeader/>
        <QuestionBankSearch/>
        <QuestionList
            questions={questions}
            expandedQuestionIds={expandedQuestionIds}
            toggleQuestionDrawer={toggleQuestionDrawer}
        />
      </Box>
  );
}
