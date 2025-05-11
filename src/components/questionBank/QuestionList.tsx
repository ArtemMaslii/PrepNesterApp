import {Question} from "@/interface/Question";
import {QuestionListItem} from "./QuestionListItem";
import {Box} from "@mui/material";

interface Props {
  questions: Question[];
  expandedQuestionIds: string[];
  toggleQuestionDrawer: (id: string) => void;
  onQuestionClick: (id: string, isSubQuestion?: boolean) => void;
}

export const QuestionList = (
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
              question.isPublic ? (
                  <QuestionListItem
                      key={question.id}
                      question={question}
                      isExpanded={expandedQuestionIds.includes(question.id)}
                      toggleExpand={() => toggleQuestionDrawer(question.id)}
                      onQuestionClick={onQuestionClick}
                  />
              ) : null
          ))}
        </Box>
      </Box>
  );
}
