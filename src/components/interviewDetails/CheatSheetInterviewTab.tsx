import {Box, Button, Drawer, Typography} from "@mui/material";
import {CheatSheetCategory} from "@/components/questionBank/cheatSheetDetails";
import {QuestionDetailsModal} from "@/components/questionBank/questionDetails";
import React, {useCallback, useEffect, useState} from "react";
import {useCheatSheets, useInterviews, useQuestions} from "@/context";
import {RequestUpdateComment} from "@/interface/questionDetails";
import {CheatSheetInterviewModal} from "./CheatSheetInterviewModal";
import {InterviewUpdateDetails} from "@/interface/interviewDetails";

export const CheatSheetInterviewTab = ({id}: { id: string }) => {
  const [assignmentModalOpen, setAssignmentModalOpen] = useState(false);
  const {interviewDetails, updateInterview} = useInterviews();
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

  const handleAssignClick = useCallback(async (cheatSheetId: string) => {
    if (interviewDetails) {
      const data: InterviewUpdateDetails = {
        candidate: {
          fullName: interviewDetails.candidate.fullName,
          email: interviewDetails.candidate.email,
          phoneNumber: interviewDetails.candidate.phoneNumber
        },
        openPosition: interviewDetails.openPosition,
        departmentName: interviewDetails.department,
        status: interviewDetails.status,
        notes: interviewDetails.notes,
        cheatSheetId: cheatSheetId
      }

      await updateInterview(interviewDetails.id, data)
    }
  }, []);

  useEffect(() => {
    if (id) {
      loadCheatSheetDetails(id);
    }
  }, [id]);

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

  if (!cheatSheetDetails) {
    return <></>
  }

  if (!id) {
    return (
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column'
        }}>
          <Typography sx={{fontSize: '30px', color: '#000048'}}>No interview process
            yet</Typography>
          <Typography sx={{fontSize: '18px', color: '#333333'}}>
            Start interview process, track progress, add notes and manage all related information
            in
            one place
          </Typography>
          <Button
              variant="contained"
              sx={{
                backgroundColor: '#FFFFFF',
                boxShadow: 'none',
                border: '1px solid #DDDDDD',
                borderRadius: '18px',
                marginTop: '50px',
                textDecoration: 'none',
                textTransform: 'none',
                padding: '10px',

              }}
              onClick={() => setAssignmentModalOpen(true)}
          >
            <Typography sx={{fontSize: '16px', color: '#000048'}}>
              Assign Cheat Sheet to the candidate
            </Typography>
          </Button>

          <CheatSheetInterviewModal
              open={assignmentModalOpen}
              onClose={() => setAssignmentModalOpen(true)}
              onAssign={handleAssignClick}
          />
        </Box>
    )
  }

  return (
      <Box sx={{paddingTop: '24px'}}>
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