'use client';

import React, {useState} from 'react';
import {Box, Button, Modal, TextField, Typography} from '@mui/material';
import {InterviewCreateDetails} from "@/interface/interviewDetails";

interface CreateInterviewModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<InterviewCreateDetails, 'createdBy'>) => Promise<void>;
}

export const CreateInterviewModal = (
    {
      open,
      onClose,
      onSubmit,
    }: CreateInterviewModalProps) => {
  const [fullName, setFullName] = useState('');
  const [openPosition, setOpenPosition] = useState('');
  const [department, setDepartment] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [notes, setNotes] = useState('');

  const resetForm = () => {
    setFullName('');
    setOpenPosition('');
    setDepartment('');
    setEmail('');
    setPhoneNumber('');
    setNotes('');
  };

  const handleSubmit = async () => {
    if (!fullName.trim() || !openPosition.trim() || !department.trim() || !email.trim()) return;

    const data: Omit<InterviewCreateDetails, 'createdBy'> = {
      candidateFullName: fullName,
      email: email,
      phoneNumber: phoneNumber,
      openPosition: openPosition,
      department: department,
      notes: notes
    }

    await onSubmit(data);

    // Reset form
    resetForm();
    onClose();
  };

  return (
      <Modal open={open} onClose={() => {
        onClose();
        resetForm();
      }}>
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          minWidth: 600,
          maxWidth: '80vw',
          maxHeight: '90vh',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          overflow: 'auto',
        }}>
          <Box sx={{
            overflowY: 'auto',
            flex: 1,
            pr: 2,
            marginX: '20px'
          }}>
            <Typography sx={{fontSize: '32px', color: '#000048'}}>
              New Interview
            </Typography>

            <TextField
                label={
                  <Box display='flex' gap='5px' sx={{color: '#666666'}}>
                    Candidate Full Name
                    <span style={{color: '#FA3131'}}>*</span>
                  </Box>
                }
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
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

            <Box sx={{
              marginTop: '30px',
              display: 'flex',
              justifyContent: 'space-between',
              gap: '24px',
            }}>
              <TextField
                  label={
                    <Box display='flex' gap='5px' sx={{color: '#666666'}}>
                      Open position
                      <span style={{color: '#FA3131'}}>*</span>
                    </Box>
                  }
                  value={openPosition}
                  onChange={(e) => setOpenPosition(e.target.value)}
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
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
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
            <Box sx={{
              marginTop: '30px',
              display: 'flex',
              justifyContent: 'space-between',
              gap: '24px',
            }}>
              <TextField
                  label={
                    <Box display='flex' gap='5px' sx={{color: '#666666'}}>
                      Email
                      <span style={{color: '#FA3131'}}>*</span>
                    </Box>
                  }
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                      Phone number
                    </Box>
                  }
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
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

            <Box marginTop={4}>
              <TextField
                  label={
                    <Box display='flex' gap='5px' sx={{color: '#666666'}}>
                      Notes
                    </Box>
                  }
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  margin="normal"
                  fullWidth
                  multiline
                  rows={4}
                  placeholder="Add notes or details about the candidate..."
                  sx={{
                    minWidth: '700px',
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

            <Box sx={{marginTop: '10px'}} display="flex" justifyContent="flex-end" gap={2}>
              <Button variant="outlined" onClick={() => {
                onClose();
                resetForm();
              }}
                      sx={{
                        borderColor: '#DDDDDD',
                        borderRadius: '22px',
                        color: '#000048',
                        textTransform: 'none',
                      }}>
                Cancel
              </Button>
              <Button
                  variant="contained"
                  onClick={handleSubmit}
                  disabled={!fullName.trim() || !openPosition.trim() || !department.trim() || !email.trim()}
                  sx={{
                    borderColor: '#DDDDDD',
                    borderRadius: '22px',
                    color: '#FFFFFF',
                    backgroundColor: '#000048',
                    textTransform: 'none',
                  }}
              >
                Add Candidate
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
  );
};