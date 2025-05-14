'use client';

import React, {useState} from "react";
import {Comment, RequestUpdateComment} from "@/interface/questionDetails";
import {Avatar, Box, Button, TextField, Typography} from "@mui/material";
import {CommentLikeButton, CustomButton} from "@/components";
import {useUser} from "@/context";

export const CommentItem: React.FC<{
  comment: Comment;
  depth: number;
  onAddReply: (comment: string, parentId: string) => void;
  onEditComment: (commentId: string, body: RequestUpdateComment) => void;
}> = ({comment, depth, onAddReply, onEditComment}) => {
  const [replyText, setReplyText] = useState('');
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [currentLikeAmount, setCurrentLikeAmount] = useState(comment.likesCount);
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(comment.message);
  const [isSaving, setIsSaving] = useState(false);
  const {user} = useUser()

  const handleLikeUpdate = (newCount: number) => {
    setCurrentLikeAmount(newCount);
  };

  const handleReplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (replyText.trim()) {
      onAddReply(replyText, comment.id);
      setReplyText('');
      setShowReplyForm(false);
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await onEditComment(comment.id, {
        message: editedText,
        createdBy: comment.createdBy,
        updatedBy: user?.id || ''
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update comment:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancelEdit = () => {
    setEditedText(comment.message);
    setIsEditing(false);
  };

  return (
      <Box sx={{
        mb: 2,
        display: 'flex',
        ml: `${depth * 4}px`,
        transition: 'margin 0.2s ease',
      }}>
        <Avatar sx={{width: 40, height: 40, mr: 2, flexShrink: 0}}>
          {comment.createdByName ? comment.createdByName.charAt(0).toUpperCase() : 'A'}
        </Avatar>
        <Box sx={{flex: 1}}>
          <Box sx={{
            border: '1px solid #ddd',
            p: 2,
            borderRadius: '10px',
            backgroundColor: '#F1F2F5',
          }}>
            <Typography fontWeight="bold" sx={{mb: 1, color: '#000048'}}>
              {comment.createdByName ?? 'Anonymous'} • {new Date(comment.createdAt).toLocaleDateString()}
            </Typography>

            {isEditing ? (

                    <form onSubmit={handleEditSubmit}>
                      <TextField
                          fullWidth
                          value={editedText}
                          onChange={(e) => setEditedText(e.target.value)}
                          multiline
                          rows={3}
                          autoFocus
                          sx={{mb: 1}}
                      />
                      <Box display="flex" gap={1}>
                        <CustomButton
                            type="submit"
                            variant="primary"
                            disabled={isSaving || !editedText.trim()}
                            sx={{p: 1}}
                        >
                          {isSaving ? 'Saving...' : 'Save'}
                        </CustomButton>
                        <CustomButton
                            variant="secondary"
                            onClick={handleCancelEdit}
                            sx={{p: 1}}
                        >
                          Cancel
                        </CustomButton>
                      </Box>
                    </form>
                )
                : (
                    <Typography variant="body1" sx={{mb: 1, color: '#000048'}}>
                      {comment.message}
                    </Typography>
                )
            }
          </Box>

          <Box display='flex' gap={2} alignItems='center' sx={{mt: 1}}>
            {!comment.parentId && !isEditing && (
                <>
                  <Button
                      size="small"
                      onClick={() => setShowReplyForm(!showReplyForm)}
                      sx={{
                        minWidth: 0,
                        padding: 0,
                        color: '#666666',
                        textTransform: "none",
                        textDecoration: 'underline',
                        '&:hover': {
                          textDecoration: 'underline',
                          backgroundColor: 'transparent'
                        }
                      }}
                  >
                    Reply
                  </Button>
                  <span>•</span>
                </>
            )}
            {comment.createdBy === user?.id ? (
                !isEditing && (
                    <>
                      <Button
                          size="small"
                          onClick={() => setIsEditing(true)}
                          sx={{
                            minWidth: 0,
                            padding: 0,
                            color: '#666666',
                            textTransform: "none",
                            textDecoration: 'underline',
                            '&:hover': {
                              textDecoration: 'underline',
                              backgroundColor: 'transparent'
                            }
                          }}
                      >
                        Edit
                      </Button>
                      <span>•</span>
                    </>
                )) : null
            }

            <CommentLikeButton
                entityType='questions/comments'
                entityId={comment.id}
                initialLikesCount={currentLikeAmount}
                initialIsLiked={comment.isLikedByCurrentUser}
                onLikeUpdate={(newCount) => handleLikeUpdate(newCount)}
            />

            {comment.updatedByName && (
                <>
                  <span>•</span>
                  <Typography variant="body2" sx={{color: '#666666'}}>
                    Edited {new Date(comment.updatedAt).toLocaleDateString()}
                  </Typography>
                </>
            )}
          </Box>

          {/* Rest of your component remains the same */}
          {showReplyForm && (
              <Box component="form" onSubmit={handleReplySubmit} sx={{mt: 2}}>
                <TextField
                    fullWidth
                    placeholder="Write a reply..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    size="small"
                    multiline
                    rows={2}
                    sx={{borderRadius: '10px'}}
                />
                <Box sx={{display: 'flex', gap: 1, mt: 1}}>
                  <CustomButton type="submit" variant='primary' sx={{p: 2}}>
                    Post Reply
                  </CustomButton>
                  <CustomButton variant='secondary' onClick={() => setShowReplyForm(false)}
                                sx={{p: 2}}>
                    Cancel
                  </CustomButton>
                </Box>
              </Box>
          )}

          {comment.replies && comment.replies.length > 0 && (
              <Box sx={{mt: 2}}>
                {comment.replies.map((reply) => (
                    <CommentItem
                        key={reply.id}
                        comment={reply}
                        depth={depth + 1}
                        onAddReply={onAddReply}
                        onEditComment={onEditComment}
                    />
                ))}
              </Box>
          )}
        </Box>
      </Box>
  );
};