import {Box, Typography} from "@mui/material";
import {CustomButton} from "@/components";
import AddIcon from "@mui/icons-material/Add";

export const QuestionBankHeader = () => (
    <Box display="flex" justifyContent="space-between" alignContent="center">
      <Box>
        <Typography sx={{fontSize: '30px'}}>Question Bank</Typography>
        <Typography sx={{fontSize: '18px'}}>
          Discover, create and improve existing interview questions and build interview templates.
        </Typography>
      </Box>
      <Box display="flex" alignItems="center" gap="8px">
        <CustomButton variant="secondary">
          <AddIcon sx={{color: "#000048"}}/>
          <Typography padding="8px">Add Interview Sheet</Typography>
        </CustomButton>
        <CustomButton variant="primary">
          <AddIcon sx={{color: 'white'}}/>
          <Typography padding="8px">Add Question</Typography>
        </CustomButton>
      </Box>
    </Box>
);
