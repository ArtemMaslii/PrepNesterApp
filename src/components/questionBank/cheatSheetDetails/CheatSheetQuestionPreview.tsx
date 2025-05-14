import {Box} from "@mui/material";
import {CustomTextField} from "@/components";
import React, {FC} from "react";
import {pluralize} from "@/lib/util";

type QuestionContentPreviewProps = {
  title: string;
  commentsCount: number;
}

export const CheatSheetQuestionPreview: FC<QuestionContentPreviewProps> =
    ({
       title,
       commentsCount,
     }) => {
      return (
          <Box>
            <CustomTextField variant="primary">
              {title}
            </CustomTextField>
            <Box display='flex' sx={{gap: '7px', marginTop: '4px'}}>
              {
                commentsCount > 0 ? (
                    <>
                      <CustomTextField
                          variant="secondary">{pluralize(commentsCount, 'comment', 'comments')}</CustomTextField>
                    </>
                ) : null
              }
            </Box>
          </Box>
      )
    }