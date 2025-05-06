// components/LikeButton.tsx
'use client';
import {useState} from 'react';
import {IconButton} from '@mui/material';
import {ThumbUp, ThumbUpOutlined} from '@mui/icons-material';
import {useAuth, useUser} from '@/context';
import {addLike, removeLike} from '@/lib/api/likes';

interface LikeButtonProps {
  entityType: 'cheatSheets' | 'questions' | 'questions/sub-questions' | 'questions/comments';
  entityId: string;
  initialLikesCount: number;
  initialIsLiked: boolean;
  onLikeUpdate?: (newCount: number, isLiked: boolean) => void;
}

export const LikeButton = (
    {
      entityType,
      entityId,
      initialLikesCount,
      initialIsLiked,
      onLikeUpdate
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
      <IconButton onClick={handleLike} disabled={isLoading}>
        {isLiked ? (
            <ThumbUp sx={{color: '#3D54CE'}}/>
        ) : (
            <ThumbUpOutlined sx={{color: '#999999'}}/>
        )}
      </IconButton>
  );
};