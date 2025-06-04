'use client';

import {useCheatSheets, useQuestions} from "@/context";
import React, {use, useCallback, useEffect, useState} from "react";
import {Box, Drawer, Typography} from "@mui/material";
import {CheatSheetCategory} from "@/components/questionBank/cheatSheetDetails";
import {QuestionDetailsModal} from "@/components/questionBank/questionDetails";
import {RequestUpdateComment} from "@/interface/questionDetails";

export default function InterviewSheetPage({params}: { params: Promise<{ id: string }> }) {
  const {
    questionDetails,
    updateQuestion,
    updateSubQuestion,
    deleteQuestion,
    deleteSubQuestion,
    updateCommentQuestion,
    updateCommentSubQuestion,
    createCommentQuestion,
    createCommentSubQuestion,
    loadQuestionById,
    loadSubQuestionById
  } = useQuestions()
  const {cheatSheetDetails, loadCheatSheetDetails} = useCheatSheets();
  const [expandedQuestionIds, setExpandedQuestionIds] = useState<string[]>([]);
  const toggleQuestionDrawer = useCallback((id: string) => {
    setExpandedQuestionIds((prev) =>
        prev.includes(id) ? prev.filter(qId => qId !== id) : [...prev, id]
    );
  }, []);
  const [questionDetailsOpen, setQuestionDetailsOpen] = useState(false);
  const {id} = use(params);

  const handleQuestionClick = useCallback(async (id: string, isSubQuestion?: boolean) => {
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

  useEffect(() => {
    if (id) {
      loadCheatSheetDetails(id);
    }
  }, [id]);

  if (!cheatSheetDetails) {
    return (
        <Box sx={{padding: '24px'}}>
          <Typography variant="h4" sx={{marginBottom: '24px', fontWeight: 700}}>
            Loading Cheat Sheet...
          </Typography>
        </Box>
    );
  }

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

  return (
      <Box sx={{padding: '24px'}}>
        <Typography variant="h4" sx={{marginBottom: '24px', fontWeight: 700}}>
          {cheatSheetDetails.title}
        </Typography>

        {cheatSheetDetails.categories.map((category) => (
            <CheatSheetCategory
                key={category.id}
                category={category}
                expandedQuestionIds={expandedQuestionIds}
                toggleQuestionDrawer={toggleQuestionDrawer}
                onQuestionClick={handleQuestionClick}
            />
        ))}

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