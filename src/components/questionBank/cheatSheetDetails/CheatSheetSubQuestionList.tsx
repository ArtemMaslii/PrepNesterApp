import {Box} from "@mui/material";
import {CheatSheetSubQuestion} from "@/interface/cheatSheetDetails";
import {CheatSheetSubQuestionListItem} from "./CheatSheetSubQuestionListItem";

interface Props {
  subQuestions: CheatSheetSubQuestion[];
  onQuestionClick: (id: string, isSubQuestion: boolean) => void;
}

export const CheatSheetSubQuestionList = ({subQuestions, onQuestionClick}: Props) => (
    <Box mt={2} ml={5} borderLeft="2px solid #DDD" pl={2}>
      {subQuestions.map((sub) => (
          <CheatSheetSubQuestionListItem
              key={sub.id}
              onQuestionClick={onQuestionClick}
              id={sub.id}
              title={sub.title}
              commentsCount={sub.commentsCount}/>
      ))}
    </Box>
);
