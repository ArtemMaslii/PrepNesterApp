'use client';

import {InterviewDetails} from "@/interface/interviewDetails";
import React, {FC, useState} from "react";
import {Status} from "@/interface/Status";
import {
  Box,
  Divider,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography
} from "@mui/material";

interface InterviewInfoTabProps {
  interviewDetails: InterviewDetails
}

export const InterviewInfoTab: FC<InterviewInfoTabProps> = ({interviewDetails}) => {
  const [status, setStatus] = useState<Status>(interviewDetails.status);
  const [candidate, setCandidate] = useState<{
    fullName: string,
    email: string,
    phoneNumber: string,
  }>({
    fullName: interviewDetails.candidate.fullName,
    email: interviewDetails.candidate.email,
    phoneNumber: interviewDetails.candidate.phoneNumber ? '+' + interviewDetails.candidate.phoneNumber : '',
  });
  const [interview, setInterview] = useState<{
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
    // updateInterviewStatus(interviewDetails.id, newStatus);
  };

  const handleInputChange = (field: keyof typeof candidate) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCandidate(prev => ({...prev, [field]: value}));

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

  const handleInputInterviewChange = (field: keyof typeof interview) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInterview(prev => ({...prev, [field]: value}));
  };


  return (
      <Box>
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
              value={candidate.fullName}
              onChange={handleInputChange('fullName')}
              margin="normal"
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
                value={candidate.email}
                onChange={handleInputChange('email')}
                margin="normal"
                fullWidth
                error={!!errors.email}
                helperText={errors.email}
                sx={{mt: 3, height: '30px'}}
            />

            <TextField
                label="Phone number"
                value={candidate.phoneNumber}
                onChange={handleInputChange('phoneNumber')}
                margin="normal"
                fullWidth
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber}
                sx={{mt: 3, height: '30px'}}
            />
          </Box>

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
                  value={interview.openPosition}
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
                  value={interview.department}
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
              <Typography mb={1} sx={{color: '#666666'}}>Notes</Typography>
              <TextField
                  sx={{color: '#000048', minWidth: '780px', borderRadius: '12px'}}
                  multiline
                  rows={4}
                  value={interview.notes}
                  onChange={() => handleInputInterviewChange("notes")}
                  placeholder="Add notes or details about the candidate..."
              />
            </Box>
          </Box>
        </Box>
      </Box>
  );
}