import {CheatSheetQuestionListItem} from "./CheatSheetQuestionListItem";
import {Box} from "@mui/material";
import {CheatSheetQuestion} from "@/interface/cheatSheetDetails";

interface Props {
  questions: CheatSheetQuestion[];
  expandedQuestionIds: string[];
  toggleQuestionDrawer: (id: string) => void;
  onQuestionClick: (id: string, isSubQuestion?: boolean) => void;
}

export const CheatSheetQuestionList = (
    {
      questions,
      expandedQuestionIds,
      toggleQuestionDrawer,
      onQuestionClick
    }: Props
) => {

  return (
      <Box display="flex" gap={2}>
        <Box flex={1}>
          {questions.map((question) => (
              <CheatSheetQuestionListItem
                  key={question.id}
                  question={question}
                  isExpanded={expandedQuestionIds.includes(question.id)}
                  toggleExpand={() => toggleQuestionDrawer(question.id)}
                  onQuestionClick={onQuestionClick}
              />
          ))}
        </Box>
      </Box>
  );
}