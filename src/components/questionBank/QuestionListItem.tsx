import {Box, IconButton} from "@mui/material";
import {ChatBubbleOutlineOutlined, ExpandLess, ExpandMore} from "@mui/icons-material";
import {QuestionContentPreview} from "@/components/questionBank";
import {Question} from "@/interface/Question";
import {SubQuestionList} from "./SubQuestionList";
import {LikeButton} from "@/components";
import {useState} from "react";
import {Role} from "@/interface/UserDetails";
import {useUser} from "@/context";

interface Props {
  question: Question;
  isExpanded: boolean;
  toggleExpand: () => void;
  onQuestionClick: (id: string, isSubQuestion?: boolean) => void;
  onLikeUpdate?: (newCount: number) => void;
}

export const QuestionListItem =
    ({
       question,
       isExpanded,
       toggleExpand,
       onQuestionClick,
       onLikeUpdate
     }: Props) => {
      const {user} = useUser();
      const [currentLikeAmount, setCurrentLikeAmount] = useState(question.likesCount);

      const handleLikeUpdate = (newCount: number) => {
        setCurrentLikeAmount(newCount);
        onLikeUpdate?.(newCount);
      };

      return (
          <Box sx={{
            padding: '20px',
            marginTop: '20px',
            border: '1px solid #DDDDDD',
            borderRadius: '14px',
          }}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Box display="flex" alignItems="center" gap="10px">
                {question.subQuestions.length > 0 && (
                    <IconButton onClick={toggleExpand} size="small">
                      {isExpanded ? <ExpandLess/> : <ExpandMore/>}
                    </IconButton>
                )}
                <Box onClick={() => onQuestionClick(question.id)} sx={{cursor: 'pointer'}}>
                  <QuestionContentPreview
                      title={question.title}
                      categoryTitle={question.category.title}
                      likesCount={currentLikeAmount}
                      commentsCount={question.commentsCount}
                  />
                </Box>
              </Box>
              {user?.role === Role.ADMIN ? (
                  <Box display='flex' sx={{gap: '18px'}} alignItems="center">
                    <ChatBubbleOutlineOutlined
                        sx={{color: '#999999', height: '20px', width: '20px'}}/>
                    <LikeButton entityType="questions" entityId={question.id}
                                initialLikesCount={currentLikeAmount}
                                initialIsLiked={question.isLikedByCurrentUser}
                                onLikeUpdate={(newCount) => handleLikeUpdate(newCount)}/>
                  </Box>
              ) : null}
            </Box>

            {isExpanded && (
                <SubQuestionList subQuestions={question.subQuestions}
                                 categoryTitle={question.category.title}
                                 onQuestionClick={onQuestionClick}/>
            )}
          </Box>
      );
    }
