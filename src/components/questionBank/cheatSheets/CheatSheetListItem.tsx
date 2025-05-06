import {Box} from "@mui/material";
import {ChatBubbleOutlineOutlined, ThumbUpOutlined} from "@mui/icons-material";
import {CheatSheetContentPreview} from "./CheatSheetContentPreview"
import {CheatSheet} from "@/interface/CheatSheet";
import FolderIcon from '@mui/icons-material/Folder';

interface Props {
  cheatSheet: CheatSheet;
}

export const CheatSheetListItem = ({cheatSheet}: Props) => (
    <Box sx={{
      padding: '20px',
      marginTop: '20px',
      border: '1px solid #DDDDDD',
      borderRadius: '14px',
    }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box display="flex" alignItems="center" gap="10px">
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid #DDDDDD',
            padding: '12px',
            borderRadius: '10px',
            marginRight: '4px',
          }}>
            <FolderIcon sx={{color: '#3D54CE', height: '28px', width: '28px'}}/>
          </Box>
          <CheatSheetContentPreview
              title={cheatSheet.title}
              likesCount={cheatSheet.likesCount}
              commentsCount={cheatSheet.commentsCount}
          />
        </Box>
        <Box display='flex' sx={{gap: '18px'}}>
          <ChatBubbleOutlineOutlined sx={{color: '#999999', height: '20px', width: '20px'}}/>
          <ThumbUpOutlined sx={{color: '#999999', height: '20px', width: '20px'}}/>
        </Box>
      </Box>
    </Box>
);
