import {Box, IconButton} from "@mui/material";
import {ChatBubbleOutlineOutlined, ExpandLess, ExpandMore} from "@mui/icons-material";
import {QuestionContentPreview} from "@/components/questionBank";
import {Question} from "@/interface/Question";
import {SubQuestionList} from "./SubQuestionList";
import {LikeButton} from "@/components";
import {useState} from "react";

interface Props {
  question: Question;
  isExpanded: boolean;
  toggleExpand: () => void;
  onLikeUpdate?: (newCount: number) => void;
}

export const QuestionListItem = ({question, isExpanded, toggleExpand, onLikeUpdate}: Props) => {
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
            <QuestionContentPreview
                title={question.title}
                categoryTitle={question.category.title}
                likesCount={currentLikeAmount}
                commentsCount={question.commentsCount}
            />
          </Box>
          <Box display='flex' sx={{gap: '18px'}} alignItems="center">
            <ChatBubbleOutlineOutlined sx={{color: '#999999', height: '20px', width: '20px'}}/>
            <LikeButton entityType="questions" entityId={question.id}
                        initialLikesCount={currentLikeAmount}
                        initialIsLiked={question.isLikedByCurrentUser}
                        onLikeUpdate={(newCount) => handleLikeUpdate(newCount)}/>
          </Box>
        </Box>

        {isExpanded && (
            <SubQuestionList subQuestions={question.subQuestions}
                             categoryTitle={question.category.title}/>
        )}
      </Box>
  );
}
