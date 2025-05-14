import {useState} from "react";
import {Box, IconButton, Typography} from "@mui/material";
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import {CheatSheetCategoryDetails} from "@/interface/cheatSheetDetails";
import {
  CheatSheetQuestionList
} from "@/components/questionBank/cheatSheetDetails/CheatSheetQuestionList";

interface CheatSheetCategoryProps {
  category: CheatSheetCategoryDetails;
  expandedQuestionIds: string[];
  toggleQuestionDrawer: (id: string) => void;
  onQuestionClick: (id: string, isSubQuestion?: boolean) => void;
}

export const CheatSheetCategory = (
    {
      category,
      expandedQuestionIds,
      toggleQuestionDrawer,
      onQuestionClick
    }: CheatSheetCategoryProps) => {
  const [isCategoryExpanded, setIsCategoryExpanded] = useState(true);

  return (
      <Box sx={{
        padding: '20px',
        marginTop: '20px',
        border: '1px solid #DDDDDD',
        borderRadius: '14px',
      }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" alignItems="center" gap="10px">
            {category.questions.length > 0 && (
                <IconButton onClick={() => setIsCategoryExpanded(!isCategoryExpanded)} size="small">
                  {isCategoryExpanded ? <ExpandLess/> : <ExpandMore/>}
                </IconButton>
            )}
            <Typography variant="h6" sx={{fontWeight: 600}}>
              {category.title}
            </Typography>
          </Box>
        </Box>

        {isCategoryExpanded && category.questions.length > 0 && (
            <CheatSheetQuestionList
                questions={category.questions}
                expandedQuestionIds={expandedQuestionIds}
                toggleQuestionDrawer={toggleQuestionDrawer}
                onQuestionClick={onQuestionClick}
            />
        )}
      </Box>
  );
};