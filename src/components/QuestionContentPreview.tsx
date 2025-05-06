import {Box} from "@mui/material";
import {CustomTextField} from "./CustomTextField";
import React, {FC} from "react";

type QuestionContentPreviewProps = {
  title: string;
  categoryTitle: string;
  commentsCount: number;
  likesCount: number;
}

export const QuestionContentPreview: FC<QuestionContentPreviewProps> =
    ({
       title,
       categoryTitle,
       commentsCount,
       likesCount
     }) => {
      return (
          <Box>
            <CustomTextField variant="primary">
              {title}
            </CustomTextField>
            <Box display='flex' sx={{gap: '7px', marginTop: '4px'}}>
              <CustomTextField
                  variant="secondary">{categoryTitle}</CustomTextField>
              <CustomTextField variant="secondary">•</CustomTextField>
              <CustomTextField
                  variant="secondary">{commentsCount} comments</CustomTextField>
              <CustomTextField variant="secondary">•</CustomTextField>
              <CustomTextField
                  variant="secondary">{likesCount} likes</CustomTextField>
            </Box>
          </Box>
      )
    }