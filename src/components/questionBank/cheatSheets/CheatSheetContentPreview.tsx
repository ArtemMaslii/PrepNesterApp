import {Box} from "@mui/material";
import {CustomTextField} from "@/components";
import React, {FC} from "react";
import {pluralize} from "@/lib/util";

type CheatSheetContentPreviewProps = {
  title: string;
  commentsCount: number;
  likesCount: number;
}

export const CheatSheetContentPreview: FC<CheatSheetContentPreviewProps> =
    ({
       title,
       commentsCount,
       likesCount
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
              {
                likesCount > 0 ? (
                    <>
                      {commentsCount > 0 ?
                          <CustomTextField variant="secondary">•</CustomTextField> : null}
                      <CustomTextField
                          variant="secondary">{pluralize(likesCount, 'like', 'likes')}</CustomTextField>
                    </>
                ) : null
              }
            </Box>
          </Box>
      )
    }