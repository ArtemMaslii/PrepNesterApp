import {Question} from "@/interface/Question";
import {QuestionListItem} from "./QuestionListItem";

interface Props {
  questions: Question[];
  expandedQuestionIds: string[];
  toggleQuestionDrawer: (id: string) => void;
}

export const QuestionList = ({questions, expandedQuestionIds, toggleQuestionDrawer}: Props) => (
    <>
      {questions.map((question) => (
          <QuestionListItem
              key={question.id}
              question={question}
              isExpanded={expandedQuestionIds.includes(question.id)}
              toggleExpand={() => toggleQuestionDrawer(question.id)}
          />
      ))}
    </>
);
