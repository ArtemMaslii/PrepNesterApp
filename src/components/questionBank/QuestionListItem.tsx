import {Box, IconButton} from "@mui/material";
import {
  ChatBubbleOutlineOutlined,
  ExpandLess,
  ExpandMore,
  ThumbUpOutlined
} from "@mui/icons-material";
import {QuestionContentPreview} from "@/components";
import {Question} from "@/interface/Question";
import {SubQuestionList} from "./SubQuestionList";

interface Props {
  question: Question;
  isExpanded: boolean;
  toggleExpand: () => void;
}

export const QuestionListItem = ({question, isExpanded, toggleExpand}: Props) => (
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
              likesCount={question.likesCount}
              commentsCount={question.commentsCount}
          />
        </Box>
        <Box display='flex' sx={{gap: '18px'}}>
          <ChatBubbleOutlineOutlined sx={{color: '#999999', height: '20px', width: '20px'}}/>
          <ThumbUpOutlined sx={{color: '#999999', height: '20px', width: '20px'}}/>
        </Box>
      </Box>

      {isExpanded && (
          <SubQuestionList subQuestions={question.subQuestions}
                           categoryTitle={question.category.title}/>
      )}
    </Box>
);
