import {Box} from "@mui/material";
import {CustomTextField} from "@/components";
import React, {FC} from "react";
import {pluralize} from "@/lib/util";

type QuestionContentPreviewProps = {
  title: string;
  categoryTitle: string;
  commentsCount: number;
  likesCount?: number;
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
              {
                commentsCount > 0 ? (
                    <>
                      <CustomTextField variant="secondary">•</CustomTextField>
                      <CustomTextField
                          variant="secondary">{pluralize(commentsCount, 'comment', 'comments')}</CustomTextField>
                    </>
                ) : null
              }
              {
                likesCount && likesCount > 0 ? (
                    <>
                      <CustomTextField variant="secondary">•</CustomTextField>
                      <CustomTextField
                          variant="secondary">{pluralize(likesCount, 'like', 'likes')}</CustomTextField>
                    </>
                ) : null
              }
            </Box>
          </Box>
      )
    }