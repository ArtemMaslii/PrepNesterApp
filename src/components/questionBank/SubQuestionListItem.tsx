import {Box} from "@mui/material";
import {QuestionContentPreview} from "@/components/questionBank";
import {ChatBubbleOutlineOutlined} from "@mui/icons-material";
import {FC, useState} from "react";
import {LikeButton} from "@/components";
import {Role} from "@/interface/UserDetails";
import {useUser} from "@/context";

type SubQuestionListItemProps = {
  id: string;
  title: string;
  categoryTitle: string;
  commentsCount: number;
  onQuestionClick: (id: string, isSubQuestion: boolean) => void;
  likesCount: number;
  isLikedByCurrentUser: boolean;
  onLikeUpdate?: (newCount: number) => void;
}

export const SubQuestionListItem: FC<SubQuestionListItemProps> =
    ({
       id,
       title,
       categoryTitle,
       commentsCount,
       likesCount,
       isLikedByCurrentUser,
       onQuestionClick,
     }) => {
      const {user} = useUser()
      const [currentLikeAmount, setCurrentLikeAmount] = useState(likesCount);

      const handleLikeUpdate = (newCount: number) => {
        setCurrentLikeAmount(newCount);
      };

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
              <QuestionContentPreview
                  title={title}
                  categoryTitle={categoryTitle}
                  commentsCount={commentsCount}
                  likesCount={currentLikeAmount}
              />
            </Box>
            {user?.role === Role.ADMIN ? (
                <Box display='flex' sx={{gap: '18px'}} alignItems="center">
                  <ChatBubbleOutlineOutlined
                      sx={{color: '#999999', height: '20px', width: '20px'}}/>
                  <LikeButton entityType="questions/sub-questions" entityId={id}
                              initialLikesCount={currentLikeAmount}
                              initialIsLiked={isLikedByCurrentUser}
                              onLikeUpdate={(newCount) => handleLikeUpdate(newCount)}/>
                </Box>
            ) : null}
          </Box>
      )
    }