'use client';

import {InterviewDetails, InterviewUpdateDetails} from "@/interface/interviewDetails";
import React, {FC, useState} from "react";
import {Status} from "@/interface/Status";
import {
  Box,
  Divider,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Tooltip,
  Typography
} from "@mui/material";
import {CustomButton} from "@/components";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import {useUser} from "@/context";
import {Role} from "@/interface/UserDetails";

interface InterviewInfoTabProps {
  interviewDetails: InterviewDetails,
  onCancelInterviewClick: () => void;
  onSaveInterviewClick: (body: InterviewUpdateDetails) => void;
}

export const InterviewInfoTab: FC<InterviewInfoTabProps> = (
    {
      interviewDetails,
      onCancelInterviewClick,
      onSaveInterviewClick
    }
) => {
  const [status, setStatus] = useState<Status>(interviewDetails.status);
  const {user} = useUser()
  const [copied, setCopied] = useState(false);
  const [candidateDto, setCandidateDto] = useState<{
    fullName: string,
    email: string,
    phoneNumber: string,
    rawPassword: string
  }>({
    fullName: interviewDetails.candidate.fullName,
    email: interviewDetails.candidate.email,
    phoneNumber: interviewDetails.candidate.phoneNumber ? '+' + interviewDetails.candidate.phoneNumber : '+',
    rawPassword: interviewDetails.candidate.rawPassword
  });
  const [interviewDto, setInterviewDto] = useState<{
    openPosition: string,
    department: string,
    status: Status,
    notes: string,
  }>({
    openPosition: interviewDetails.openPosition,
    department: interviewDetails.department,
    status: interviewDetails.status,
    notes: interviewDetails.notes ? interviewDetails.notes : '',
  });
  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
  });

  const handleStatusChange = (event: SelectChangeEvent) => {
    const newStatus = event.target.value as Status;
    setStatus(newStatus);
    setInterviewDto(prev => ({...prev, status: newStatus}));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(candidateDto.rawPassword);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    const data: InterviewUpdateDetails = {
      candidate: {
        fullName: candidateDto.fullName,
        email: candidateDto.email,
        phoneNumber: candidateDto.phoneNumber.slice(1),
      },
      openPosition: interviewDto.openPosition,
      departmentName: interviewDto.department,
      status: interviewDto.status,
      notes: interviewDto.notes,
      cheatSheetId: interviewDetails.cheatSheetId
    };

    if (hasNotChanged(data)) {
      return
    }

    onSaveInterviewClick(data);
  }

  const handleCancel = () => {
    setInterviewDto({
      openPosition: interviewDetails.openPosition,
      department: interviewDetails.department,
      status: interviewDetails.status,
      notes: interviewDetails.notes ? interviewDetails.notes : '',
    });
    setCandidateDto({
      fullName: interviewDetails.candidate.fullName,
      email: interviewDetails.candidate.email,
      phoneNumber: interviewDetails.candidate.phoneNumber ? '+' + interviewDetails.candidate.phoneNumber : '',
      rawPassword: interviewDetails.candidate.rawPassword
    });
    onCancelInterviewClick();
  }

  const hasNotChanged = (data: InterviewUpdateDetails) => {
    return data.candidate.fullName === interviewDetails.candidate.fullName
        && data.candidate.email === interviewDetails.candidate.email
        && data.candidate.phoneNumber === interviewDetails.candidate.phoneNumber
        && data.openPosition === interviewDetails.openPosition
        && data.departmentName === interviewDetails.department
        && data.status === interviewDetails.status
        && data.notes === interviewDetails.notes
  }

  const handleInputChange = (field: keyof typeof candidateDto) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCandidateDto(prev => ({...prev, [field]: value}));

    if (field === 'email' && value && !/^\S+@\S+\.\S+$/.test(value)) {
      setErrors(prev => ({...prev, email: 'Invalid email format'}));
    } else if (field === 'phoneNumber' && value && !/^\+?\d+$/.test(value)) {
      setErrors(prev => ({...prev, phoneNumber: 'Invalid phone number'}));
    } else {
      setErrors(prev => ({...prev, [field]: ''}));
    }
  };

  const getStatusColor = (status: Status): { bgColor: string, color: string, border?: string } => {
    switch (status) {
      case Status.IN_PROGRESS:
        return {bgColor: "#CFE7D7", color: "#000048"}
      case Status.CANCELLED:
        return {bgColor: "#E5E5E5", color: "#000048"}
      case Status.COMPLETE:
        return {bgColor: "#FFFFFF", color: "#000048", border: '1px solid #DDDDDD'}
    }
  }

  const handleInputInterviewChange = (field: keyof typeof interviewDto) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInterviewDto(prev => ({...prev, [field]: value}));
  };


  return (
      <Box>
        <Box display="flex" alignItems="center" justifyContent="flex-end" gap="8px">
          {user?.role === Role.ADMIN ? (
              <>
                <CustomButton variant="secondary" onClick={handleCancel}>
                  <CloseIcon sx={{color: "#000048"}}/>
                  <Typography padding="8px">Cancel</Typography>
                </CustomButton>
                <CustomButton variant="primary" onClick={handleSave}>
                  <AddIcon sx={{color: "white"}}/>
                  <Typography padding="8px">Save</Typography>
                </CustomButton>
              </>
          ) : (
              <CustomButton variant="secondary" onClick={handleCancel}>
                <ArrowBackIcon sx={{color: "#000048"}}/>
                <Typography padding="8px">Back</Typography>
              </CustomButton>
          )}
        </Box>
        <Divider sx={{my: 3}}/>
        <Typography
            gutterBottom
            sx={{fontWeight: 'bold', mb: 3, color: '#000048', fontSize: '24px', lineHeight: '32px'}}
        >
          Basic info
        </Typography>

        <Box display='inline-flex' flexDirection='column' gap='24px'>
          <TextField
              label={
                <Box display='flex' gap='5px' sx={{color: '#666666'}}>
                  Full Name
                  <span style={{color: '#FA3131'}}>*</span>
                </Box>
              }
              value={candidateDto.fullName}
              onChange={handleInputChange('fullName')}
              margin="normal"
              disabled={user?.role !== Role.ADMIN}
              fullWidth
              error={!!errors.fullName}
              helperText={errors.fullName}
              sx={{
                minWidth: '780px',
                height: '30px',
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#DDDDDD',
                  },
                  '&:hover fieldset': {
                    borderColor: '#DDDDDD',
                  },
                },
              }}
          />
          <Box sx={{display: 'flex', gap: '24px', alignItems: 'start', justifyContent: 'start'}}>
            <TextField
                label={
                  <Box display='flex' gap='5px' sx={{color: '#666666'}}>
                    Email
                    <span style={{color: '#FA3131'}}>*</span>
                  </Box>
                }
                value={candidateDto.email}
                disabled={user?.role !== Role.ADMIN}
                onChange={handleInputChange('email')}
                margin="normal"
                fullWidth
                error={!!errors.email}
                helperText={errors.email}
                sx={{mt: 3, height: '30px'}}
            />

            <TextField
                label="Phone number"
                value={candidateDto.phoneNumber}
                onChange={handleInputChange('phoneNumber')}
                disabled={user?.role !== Role.ADMIN}
                margin="normal"
                fullWidth
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber}
                sx={{mt: 3, height: '30px'}}
            />
          </Box>
          {user?.role === Role.ADMIN ? (
              <TextField
                  label={
                    <Box display="flex" gap="5px" sx={{color: '#666666'}}>
                      Password
                      <span style={{color: '#FA3131'}}>*</span>
                    </Box>
                  }
                  type="password"
                  value={candidateDto.rawPassword}
                  margin="normal"
                  fullWidth
                  InputProps={{
                    readOnly: true,
                    endAdornment: (
                        <InputAdornment position="end">
                          <Tooltip title={copied ? 'Copied' : 'Copy password'} arrow>
                            <IconButton
                                onClick={handleCopy}
                                edge="end"
                                aria-label="copy password"
                            >
                              <ContentCopyIcon/>
                            </IconButton>
                          </Tooltip>
                        </InputAdornment>
                    ),
                  }}
                  sx={{
                    minWidth: '780px',
                    height: '30px',
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#DDDDDD',
                      },
                      '&:hover fieldset': {
                        borderColor: '#DDDDDD',
                      },
                    },
                  }}
              />
          ) : null}

          <Divider sx={{my: 5}}/>
        </Box>

        <Typography
            gutterBottom
            sx={{fontWeight: 'bold', mb: 3, color: '#000048', fontSize: '24px', lineHeight: '32px'}}
        >
          Position
        </Typography>

        <Box display='inline-flex' flexDirection='column' gap='24px' sx={{mb: 3}}>
          <Box display='inline-flex' flexDirection='column' gap='24px'>
            <Box sx={{display: 'flex', gap: '24px', alignItems: 'start'}}>
              <TextField
                  label={
                    <Box display='flex' gap='5px' sx={{color: '#666666'}}>
                      Open Position
                      <span style={{color: '#FA3131'}}>*</span>
                    </Box>
                  }
                  value={interviewDto.openPosition}
                  disabled={user?.role !== Role.ADMIN}
                  onChange={handleInputInterviewChange('openPosition')}
                  margin="normal"
                  fullWidth
                  sx={{
                    minWidth: '380px',
                    height: '30px',
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#DDDDDD',
                      },
                      '&:hover fieldset': {
                        borderColor: '#DDDDDD',
                      },
                    },
                  }}
              />
              <TextField
                  label={
                    <Box display='flex' gap='5px' sx={{color: '#666666'}}>
                      Department
                      <span style={{color: '#FA3131'}}>*</span>
                    </Box>
                  }
                  value={interviewDto.department}
                  disabled={user?.role !== Role.ADMIN}
                  onChange={handleInputInterviewChange('department')}
                  margin="normal"
                  fullWidth
                  sx={{
                    minWidth: '380px',
                    height: '30px',
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#DDDDDD',
                      },
                      '&:hover fieldset': {
                        borderColor: '#DDDDDD',
                      },
                    },
                  }}
              />
            </Box>

            <Box sx={{marginTop: '24px'}}>
              <Box display='flex' gap='5px' sx={{
                mb: 1,
              }}>
                Process status
                <span style={{color: '#FA3131'}}>*</span>
              </Box>
              <Select
                  value={status as any}
                  onChange={handleStatusChange}
                  disabled={user?.role !== Role.ADMIN}
                  sx={{
                    padding: '4px 8px',
                    width: '380px',
                    height: '50px',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#DDDDDD',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#DDDDDD',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#DDDDDD',
                      borderWidth: '1px',
                    },
                    '& .MuiSelect-select': {
                      padding: '4px 8px',
                      borderRadius: '12px',
                      backgroundColor: getStatusColor(status).bgColor,
                      color: getStatusColor(status).color,
                      border: getStatusColor(status).border ? getStatusColor(status).border : 'none'
                    },
                  }}
              >
                <MenuItem value={Status.IN_PROGRESS}>In Progress</MenuItem>
                <MenuItem value={Status.COMPLETE}>Complete</MenuItem>
                <MenuItem value={Status.CANCELLED}>Cancelled</MenuItem>
              </Select>
            </Box>

            <Divider sx={{my: 2}}/>

            <Typography
                gutterBottom
                sx={{
                  fontWeight: 'bold',
                  color: '#000048',
                  fontSize: '24px',
                  lineHeight: '32px'
                }}
            >
              Additional Info
            </Typography>

            <Box sx={{marginTop: '5px'}}>
              <TextField
                  label={
                    <Box display='flex' gap='5px' sx={{color: '#666666'}}>
                      Notes
                    </Box>
                  }
                  value={interviewDto.notes}
                  disabled={user?.role !== Role.ADMIN}
                  onChange={handleInputInterviewChange('notes')}
                  margin="normal"
                  fullWidth
                  multiline
                  rows={4}
                  placeholder="Add notes or details about the candidate..."
                  sx={{
                    minWidth: '780px',
                    borderRadius: '12px',
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#DDDDDD',
                      },
                      '&:hover fieldset': {
                        borderColor: '#DDDDDD',
                      },
                    },
                  }}
              />
            </Box>
          </Box>
        </Box>
        <Divider sx={{my: 5}}/>
        <Box display="flex" alignItems="center" justifyContent="flex-end" gap="8px">
          {user?.role === Role.ADMIN ? (
              <>
                <CustomButton variant="secondary" onClick={handleCancel}>
                  <CloseIcon sx={{color: "#000048"}}/>
                  <Typography padding="8px">Cancel</Typography>
                </CustomButton>
                <CustomButton variant="primary" onClick={handleSave}>
                  <AddIcon sx={{color: "white"}}/>
                  <Typography padding="8px">Save</Typography>
                </CustomButton>
              </>
          ) : (
              <CustomButton variant="secondary" onClick={handleCancel}>
                <ArrowBackIcon sx={{color: "#000048"}}/>
                <Typography padding="8px">Back</Typography>
              </CustomButton>
          )}
        </Box>
      </Box>
  );
}