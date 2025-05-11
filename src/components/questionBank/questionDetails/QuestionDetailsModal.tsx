'use client';

import React, {useState} from 'react';
import {Box, IconButton, TextField, Typography} from '@mui/material';
import {Comment, QuestionDetails} from "@/interface/questionDetails";
import {CommentItem} from "@/components/questionBank/questionDetails/CommentItem";
import {CustomButton} from "@/components";
import CloseIcon from "@mui/icons-material/Close";
import {Delete as DeleteIcon, Edit as EditIcon} from "@mui/icons-material";
import {useQuestions} from "@/context";

interface QuestionDetailsModal {
  question: QuestionDetails;
  onEdit: (id: string, title: string, isSubQuestion?: boolean) => void;
  onDelete: (id: string, isSubQuestion?: boolean) => void;
  onAddComment: (id: string, body: { message: string, parentId?: string }, isSubQuestion: boolean) => void;
  onClose: () => void;
}

export const QuestionDetailsModal: React.FC<QuestionDetailsModal> = (
    {
      question,
      onEdit,
      onDelete,
      onAddComment,
      onClose
    }
) => {
  const {questions} = useQuestions();
  const [commentText, setCommentText] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(question.title);
  const isQuestion = !questions.map(q => q.id).includes(question.id);

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.trim()) {
      onAddComment(question.id, {message: commentText}, isQuestion);
      setCommentText('');
    }
  };

  const handleSaveEdit = () => {
    onEdit(question.id, editedTitle, isQuestion);
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDelete(question.id, isQuestion);
    onClose();
  }

  const handleAddReply = (replyText: string, parentId: string) => {
    onAddComment(question.id, {message: replyText, parentId}, isQuestion);
  };

  const countTotalComments = (comments: Comment[]): number => {
    return comments.reduce((total, comment) => {
      return total + 1 + (comment.replies ? countTotalComments(comment.replies) : 0);
    }, 0);
  };

  const totalComments = countTotalComments(question.comments);

  const renderComments = (comments: Comment[], depth = 0) => {
    return comments.map((comment) => (
        <CommentItem
            key={comment.id}
            comment={comment}
            depth={depth}
            onAddReply={handleAddReply}
            questionId={question.id}
        />
    ));
  };

  return (
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflow: 'hidden',
        position: 'relative'
      }}>
        <IconButton
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 16,
              top: 16,
              zIndex: 2,
              backgroundColor: 'rgba(255,255,255,0.7)',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.9)'
              }
            }}
        >
          <CloseIcon/>
        </IconButton>
        <Box sx={{
          padding: '60px 24px 6px 24px',
          borderBottom: '1px solid #DDDDDD',
        }}>
          <Box sx={{display: 'flex', mb: 2, gap: '10px', alignItems: 'center'}}>
            <Typography variant="body2" color="text.secondary">
              {new Date(question.createdAt).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </Typography>
            <span style={{color: '#666'}}>•</span>
            <Typography variant="body2" color="text.secondary">
              {question.isPublic ? 'Public' : 'Private'}
            </Typography>
          </Box>

          {isEditing ? (
              <Box sx={{display: 'flex', gap: 1, mb: 3}}>
                <TextField
                    fullWidth
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                    size="small"
                />
                <CustomButton onClick={handleSaveEdit} variant="primary" sx={{p: 2}}>
                  Save
                </CustomButton>
                <CustomButton onClick={() => setIsEditing(false)} variant="secondary" sx={{p: 2}}>
                  Cancel
                </CustomButton>
              </Box>
          ) : (
              <Typography sx={{fontSize: '32px', mb: 3, color: '#000048'}}>
                {question.title}
              </Typography>
          )}

          <Box sx={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between'
          }}>
            <Box display='flex' gap={2}>
              <Typography sx={{fontSize: "20px", color: '#000048'}}>
                Comments {totalComments}
              </Typography>
              <Typography sx={{fontSize: "20px", color: '#000048'}}>
                Likes {question.likesCount}
              </Typography>
            </Box>
            <Box display='inline-flex' gap={2}>
              <IconButton onClick={() => setIsEditing(!isEditing)} size="small">
                <EditIcon fontSize="medium" sx={{color: '#000048'}}/>
              </IconButton>
              <IconButton onClick={() => handleDelete()} size="small">
                <DeleteIcon fontSize="medium" sx={{color: '#000048'}}/>
              </IconButton>
            </Box>
          </Box>
        </Box>

        <Box sx={{
          flex: 1,
          overflowY: 'auto',
          p: 3,
        }}>
          {renderComments(question.comments)}
        </Box>

        <Box component="form" onSubmit={handleCommentSubmit} sx={{
          p: 3,
          borderTop: '1px solid #DDDDDD',
          position: 'sticky',
          bottom: 0,
          backgroundColor: 'background.paper',
          zIndex: 1
        }}>
          <TextField
              fullWidth
              placeholder="Write a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              size="small"
              multiline
              rows={2}
          />
          <CustomButton
              type="submit"
              variant='primary'
              sx={{mt: 1, p: 2}}
          >
            Post Comment
          </CustomButton>
        </Box>
      </Box>
  );
};