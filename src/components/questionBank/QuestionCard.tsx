import React, {FC} from "react";
import {Box} from "@mui/material";
import {CustomTextField} from "@/components";
import {ChatBubbleOutlineOutlined, ThumbUpOutlined} from "@mui/icons-material";
import {Question} from "@/interface/Question";

type QuestionCardProps = {
  question: Question;
}

export const QuestionCard: FC<QuestionCardProps> = ({question}) => {
  return (
      <Box key={question.id} sx={{
        padding: '20px',
        marginTop: '20px',
        border: '1px solid #DDDDDD',
        borderRadius: '14px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <Box>
          <CustomTextField variant='primary'>{question.title}</CustomTextField>
          <Box display='flex' sx={{gap: '7px'}}>
            <CustomTextField variant='secondary'>{question.category.title}</CustomTextField>
            <CustomTextField variant='secondary'>•</CustomTextField>
            <CustomTextField
                variant='secondary'>{question.commentsCount} comments</CustomTextField>
            <CustomTextField variant='secondary'>•</CustomTextField>
            <CustomTextField variant='secondary'>{question.likesCount} likes</CustomTextField>
          </Box>
        </Box>
        <Box display='flex' sx={{gap: '18px'}}>
          <ChatBubbleOutlineOutlined sx={{color: '#999999', height: '20px', width: '20px'}}/>
          <ThumbUpOutlined sx={{color: '#999999', height: '20px', width: '20px'}}/>
        </Box>
      </Box>
  )
}