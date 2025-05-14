import {Box} from "@mui/material";
import {CheatSheetQuestionPreview} from "./CheatSheetQuestionPreview";
import {ChatBubbleOutlineOutlined} from "@mui/icons-material";
import {FC} from "react";

type SubQuestionListItemProps = {
  id: string;
  title: string;
  commentsCount: number;
  onQuestionClick: (id: string, isSubQuestion: boolean) => void;
}

export const CheatSheetSubQuestionListItem: FC<SubQuestionListItemProps> =
    ({
       id,
       title,
       commentsCount,
       onQuestionClick,
     }) => {

      return (
          <Box
              key={id}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              sx={{padding: '12px 0', borderBottom: '1px solid #EEE'}}
          >
            <Box onClick={() => {
              onQuestionClick(id, true);
            }} sx={{cursor: 'pointer'}} display='flex'
                 gap="10px" mt="4px">
              <CheatSheetQuestionPreview
                  title={title}
                  commentsCount={commentsCount}
              />
            </Box>
            <Box display='flex' sx={{gap: '18px'}} alignItems="center">
              <ChatBubbleOutlineOutlined sx={{color: '#999999', height: '20px', width: '20px'}}/>
            </Box>
          </Box>
      )
    }