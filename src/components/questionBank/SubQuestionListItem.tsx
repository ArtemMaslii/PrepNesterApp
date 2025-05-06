import {Box} from "@mui/material";
import {QuestionContentPreview} from "@/components/questionBank";
import {ChatBubbleOutlineOutlined, ThumbUpOutlined} from "@mui/icons-material";
import {FC} from "react";

type SubQuestionListItemProps = {
  id: string;
  title: string;
  categoryTitle: string;
  commentsCount: number;
  likesCount: number;
}

export const SubQuestionListItem: FC<SubQuestionListItemProps> =
    ({
       id,
       title,
       categoryTitle,
       commentsCount,
       likesCount
     }) => {
      return (
          <Box
              key={id}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              sx={{padding: '12px 0', borderBottom: '1px solid #EEE'}}
          >
            <Box display='flex' gap="10px" mt="4px">
              <QuestionContentPreview
                  title={title}
                  categoryTitle={categoryTitle}
                  commentsCount={commentsCount}
                  likesCount={likesCount}
              />
            </Box>
            <Box display='flex' sx={{gap: '18px'}}>
              <ChatBubbleOutlineOutlined sx={{color: '#999999', height: '20px', width: '20px'}}/>
              <ThumbUpOutlined sx={{color: '#999999', height: '20px', width: '20px'}}/>
            </Box>
          </Box>
      )
    }