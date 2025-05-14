import {Box, IconButton} from "@mui/material";
import {ChatBubbleOutlineOutlined, ExpandLess, ExpandMore} from "@mui/icons-material";
import {CheatSheetQuestion} from "@/interface/cheatSheetDetails";
import {
  CheatSheetQuestionPreview
} from "@/components/questionBank/cheatSheetDetails/CheatSheetQuestionPreview";
import {
  CheatSheetSubQuestionList
} from "@/components/questionBank/cheatSheetDetails/CheatSheetSubQuestionList";

interface Props {
  question: CheatSheetQuestion;
  isExpanded: boolean;
  toggleExpand: () => void;
  onQuestionClick: (id: string, isSubQuestion?: boolean) => void;
}

export const CheatSheetQuestionListItem =
    ({
       question,
       isExpanded,
       toggleExpand,
       onQuestionClick,
     }: Props) => {

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
                  <CheatSheetQuestionPreview
                      title={question.title}
                      commentsCount={question.commentsCount}
                  />
                </Box>
              </Box>
              <Box display='flex' sx={{gap: '18px'}} alignItems="center">
                <ChatBubbleOutlineOutlined sx={{color: '#999999', height: '20px', width: '20px'}}/>
              </Box>
            </Box>

            {isExpanded && (
                <CheatSheetSubQuestionList subQuestions={question.subQuestions}
                                           onQuestionClick={onQuestionClick}/>
            )}
          </Box>
      );
    }
