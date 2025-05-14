import {Box} from "@mui/material";
import {ChatBubbleOutlineOutlined} from "@mui/icons-material";
import {CheatSheetContentPreview} from "./CheatSheetContentPreview"
import {CheatSheet} from "@/interface/CheatSheet";
import FolderIcon from '@mui/icons-material/Folder';
import {LikeButton} from "@/components";
import {useState} from "react";
import {useRouter} from "next/navigation";

interface Props {
  cheatSheet: CheatSheet;
  onLikeUpdate?: (newCount: number) => void;
}

export const CheatSheetListItem = ({cheatSheet, onLikeUpdate}: Props) => {
  const [currentLikeAmount, setCurrentLikeAmount] = useState(cheatSheet.likesCount);
  const router = useRouter();

  const handleLikeUpdate = (newCount: number) => {
    setCurrentLikeAmount(newCount);
    onLikeUpdate?.(newCount);
  };

  const handleClick = () => {
    router.push(`/prepnester/interviewSheet/${cheatSheet.id}`);
  };

  return (
      <Box sx={{
        padding: '20px',
        marginTop: '20px',
        border: '1px solid #DDDDDD',
        borderRadius: '14px',
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: '#FAFAFA',
        }
      }} onClick={handleClick}
      >
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
                likesCount={currentLikeAmount}
                commentsCount={cheatSheet.commentsCount}
            />
          </Box>
          <Box display='flex' sx={{gap: '18px'}} alignItems="center">
            <ChatBubbleOutlineOutlined sx={{color: '#999999', height: '20px', width: '20px'}}/>
            <LikeButton entityType="cheatSheets" entityId={cheatSheet.id}
                        initialLikesCount={currentLikeAmount}
                        initialIsLiked={cheatSheet.isLikedByCurrentUser}
                        onLikeUpdate={(newCount) => handleLikeUpdate(newCount)}/>
          </Box>
        </Box>
      </Box>
  );
}
