import {Box, Typography} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import {CustomButton, Search} from "@/components";

export const QuestionBankSearch = () => (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      gap: '8px',
      alignItems: 'center',
      width: '100%',
      height: '44px',
      marginTop: '40px',
    }}>
      <Search/>
      <CustomButton variant='secondary'>
        <CloseIcon sx={{color: "#000048", paddingLeft: '8px'}}/>
        <Typography padding="8px">Clear</Typography>
      </CustomButton>
      <CustomButton variant='primary'>
        <SearchIcon sx={{color: "white", paddingLeft: '8px'}}/>
        <Typography padding="8px">Search</Typography>
      </CustomButton>
    </Box>
);
