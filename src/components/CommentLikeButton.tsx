'use client';
import React, {useState} from 'react';
import {Button} from '@mui/material';
import {useAuth, useUser} from '@/context';
import {addLike, removeLike} from '@/lib/api/likes';

interface LikeButtonProps {
  entityType: 'cheatSheets' | 'questions' | 'questions/sub-questions' | 'questions/comments';
  entityId: string;
  initialLikesCount: number;
  initialIsLiked: boolean;
  onLikeUpdate?: (newCount: number, isLiked: boolean) => void;
}

export const CommentLikeButton = (
    {
      entityType,
      entityId,
      initialLikesCount,
      initialIsLiked,
      onLikeUpdate,
    }: LikeButtonProps) => {
  const {token} = useAuth();
  const {user} = useUser();
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [likesCount, setLikesCount] = useState(initialLikesCount);
  const [isLoading, setIsLoading] = useState(false);

  const handleLike = async () => {
    if (!token || !user?.id || isLoading) return;

    setIsLoading(true);
    try {
      if (isLiked) {
        await removeLike(entityType, entityId, user.id, token);
        setLikesCount(prev => prev - 1);
      } else {
        await addLike(entityType, entityId, user.id, token);
        setLikesCount(prev => prev + 1);
      }
      setIsLiked(!isLiked);
      onLikeUpdate?.(isLiked ? likesCount - 1 : likesCount + 1, !isLiked);
    } catch (error) {
      console.error('Failed to update like:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
      <Button
          size="small"
          onClick={() => handleLike()}
          sx={{
            minWidth: 0,
            padding: 0,
            color: isLiked ? '#000048' : '#666666',
            textTransform: "none",
            textDecoration: 'underline',
            '&:hover': {
              textDecoration: 'underline',
              backgroundColor: 'transparent'
            }
          }}
      >
        {isLiked ? 'Liked' : 'Like'}
      </Button>
  );
};