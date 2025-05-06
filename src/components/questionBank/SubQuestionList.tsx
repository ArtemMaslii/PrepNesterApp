import {Box} from "@mui/material";
import {Question} from "@/interface/Question";
import {SubQuestionListItem} from "@/components/questionBank/SubQuestionListItem";

interface Props {
  subQuestions: Question['subQuestions'];
  categoryTitle: string;
}

export const SubQuestionList = ({subQuestions, categoryTitle}: Props) => (
    <Box mt={2} ml={5} borderLeft="2px solid #DDD" pl={2}>
      {subQuestions.map((sub) => (
          <SubQuestionListItem key={sub.id} id={sub.id} title={sub.title}
                               categoryTitle={categoryTitle} commentsCount={sub.commentsCount}
                               likesCount={sub.likesCount}
                               isLikedByCurrentUser={sub.isLikedByCurrentUser}/>
      ))}
    </Box>
);
