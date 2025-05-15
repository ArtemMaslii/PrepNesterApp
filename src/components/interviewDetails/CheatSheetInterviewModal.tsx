import {useCheatSheets} from "@/context";
import {Box, Button, List, ListItem, ListItemButton, Modal, Typography} from "@mui/material";

interface CheatSheetInterviewModalProps {
  open: boolean;
  onClose: () => void;
  onAssign: (cheatSheetId: string) => void;
}

export const CheatSheetInterviewModal = (
    {
      open,
      onClose,
      onAssign
    }: CheatSheetInterviewModalProps) => {
  const {cheatSheets} = useCheatSheets();

  return (
      <Modal open={open} onClose={onClose}>
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 1
        }}>
          <Typography variant="h6" sx={{mb: 2}}>
            Select a Cheat Sheet to Assign
          </Typography>

          <List>
            {cheatSheets.map((cheatSheet) => (
                <ListItem key={cheatSheet.id} disablePadding>
                  <ListItemButton onClick={() => onAssign(cheatSheet.id)}>
                    {cheatSheet.title}
                  </ListItemButton>
                </ListItem>
            ))}
          </List>

          <Button
              onClick={onClose}
              sx={{mt: 2}}
              fullWidth
              variant="outlined"
          >
            Cancel
          </Button>
        </Box>
      </Modal>
  );
}
