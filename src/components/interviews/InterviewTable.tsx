import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import {Interview} from "@/interface/interviewPreview/Interview";
import {FC} from "react";
import {Status} from "@/interface/Status";
import {useRouter} from "next/navigation";
import {Role} from "@/interface/UserDetails";
import {useUser} from "@/context";

interface InterviewTableProps {
  interviews: Interview[];
  handleDelete: (id: string) => void;
  handleEdit?: (id: string) => void;
}

export const InterviewTable: FC<InterviewTableProps> = (
    {interviews, handleDelete, handleEdit}
) => {
  const {user} = useUser()
  const router = useRouter()

  const getStatusColor = (status: Status): { bgColor: string, color: string } => {
    switch (status) {
      case Status.IN_PROGRESS:
        return {bgColor: "#CFE7D7", color: "#000048"}
      case Status.CANCELLED:
        return {bgColor: "#E5E5E5", color: "#000048"}
      case Status.COMPLETE:
        return {bgColor: "#FFFFFF", color: "#000048"}
    }
  }

  const getStatusText = (status: Status): string => {
    switch (status) {
      case Status.IN_PROGRESS:
        return "In Progress"
      case Status.CANCELLED:
        return "Cancelled"
      case Status.COMPLETE:
        return "Complete"
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  };

  const handleEditClick = (id: string) => {
    router.push(`/prepnester/interviews/${id}`)
    handleEdit ? handleEdit(id) : null;
  }

  if (interviews.length === 0) {
    return (
        <TableContainer component={Paper} sx={{borderRadius: '8px', boxShadow: 'none'}}>
          <Table sx={{minWidth: 650}}>
            <TableHead>
              <TableRow sx={{backgroundColor: '#f5f5f5'}}>
                <TableCell sx={{
                  color: '#666666', fontSize: '13px',
                  paddingLeft: '16px'
                }}>Name</TableCell>
                <TableCell sx={{
                  color: '#666666', fontSize: '13px',
                  paddingLeft: '16px'
                }}>Status</TableCell>
                <TableCell sx={{
                  color: '#666666', fontSize: '13px',
                  paddingLeft: '16px'
                }}>Process Start Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell colSpan={3} align="center" sx={{
                  py: 6,
                  borderBottom: 'none'
                }}>
                  <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 1
                  }}>
                    <Typography variant="body1" color="#000048">
                      No interviews available at this moment
                    </Typography>
                    <Typography variant="body2" color="#666666">
                      Create a new interview to get started
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
    );
  }

  return (
      <TableContainer
          component={Paper}
          sx={{
            borderRadius: '8px',
            boxShadow: 'none',
            '& .MuiTable-root': {
              borderCollapse: 'separate',
            }
          }}>
        <Table sx={{minWidth: 650}} aria-label="interviews table">
          <TableHead>
            <TableRow sx={{backgroundColor: '#f5f5f5'}}>
              <TableCell
                  sx={{color: '#666666', fontSize: '13px', paddingLeft: '16px'}}>Name</TableCell>
              <TableCell
                  sx={{color: '#666666', fontSize: '13px', paddingLeft: '16px'}}>Status</TableCell>
              <TableCell sx={{color: '#666666', fontSize: '13px', paddingLeft: '16px'}}>Process
                Start Date
              </TableCell>
              <TableCell align="right" sx={{
                color: '#666666',
                fontSize: '13px',
                paddingRight: '16px'
              }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {interviews.map((interview) => (
                <TableRow key={interview.id}>
                  <TableCell
                      sx={{
                        color: '#000048',
                        paddingLeft: '16px',
                      }}
                  >
                    {interview.candidateFullName}
                  </TableCell>
                  <TableCell sx={{paddingLeft: '16px'}}>
                    <Box
                        sx={{
                          display: 'inline-block',
                          padding: '4px 8px',
                          borderRadius: '12px',
                          backgroundColor: getStatusColor(interview.status).bgColor,
                          color: getStatusColor(interview.status).color,
                          fontWeight: 'medium'
                        }}
                    >
                      {getStatusText(interview.status)}
                    </Box>
                  </TableCell>
                  <TableCell sx={{color: '#000048', paddingLeft: '16px'}}>
                    {formatDate(interview.createdAt)}
                  </TableCell>
                  <TableCell align="right" sx={{paddingRight: '16px'}}>
                    <Box sx={{display: 'flex', gap: 2, justifyContent: 'flex-end'}}>
                      {user?.role === Role.ADMIN ? (
                          <>
                            <Button
                                variant="text"
                                onClick={() => handleEditClick(interview.id)}
                                sx={{
                                  color: '#000048',
                                  textTransform: 'none',
                                  fontSize: '13px',
                                  minWidth: 0,
                                  padding: '4px 8px'
                                }}
                            >
                              Edit
                            </Button>
                            <Button
                                variant="text"
                                onClick={() => handleDelete(interview.id)}
                                sx={{
                                  color: '#FF5252',
                                  textTransform: 'none',
                                  fontSize: '13px',
                                  minWidth: 0,
                                  padding: '4px 8px'
                                }}
                            >
                              Delete
                            </Button>
                          </>
                      ) : (
                          <Button
                              variant="text"
                              onClick={() => handleEditClick(interview.id)}
                              sx={{
                                color: '#000048',
                                textTransform: 'none',
                                fontSize: '13px',
                                minWidth: 0,
                                padding: '4px 8px'
                              }}
                          >
                            View
                          </Button>
                      )}
                    </Box>
                  </TableCell>
                </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
  )
}