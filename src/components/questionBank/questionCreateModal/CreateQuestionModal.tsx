'use client';

import {useState} from 'react';
import {
  Box,
  Button,
  Collapse,
  Fade,
  FormControl,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography
} from '@mui/material';
import {RequestCategory, RequestSubQuestion} from "@/interface/requestCreateQuestion";
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';

interface SubQuestionWithId extends RequestSubQuestion {
  id: string;
  isRemoving?: boolean;
}

interface CreateQuestionModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: {
    title: string;
    isPublic: boolean;
    category: RequestCategory;
    subQuestions: RequestSubQuestion[];
  }) => Promise<void>;
  categories: RequestCategory[];
}

export const CreateQuestionModal = (
    {
      open,
      onClose,
      onSubmit,
      categories
    }: CreateQuestionModalProps) => {
  const [title, setTitle] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [category, setCategory] = useState<RequestCategory | null>(null);
  const [subQuestions, setSubQuestions] = useState<SubQuestionWithId[]>([]);
  const [pendingSubQuestion, setPendingSubQuestion] = useState('');
  const [showPendingSubQuestion, setShowPendingSubQuestion] = useState(false);

  const selectedStyleColor = {
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
    '& .MuiSelect-icon': {
      color: '#000048',
    },
    '&:hover .MuiSelect-icon': {
      color: '#000048',
    },
    '&.Mui-focused .MuiSelect-icon': {
      color: '#000048',
    },
    '& .MuiPaper-root': {
      borderRadius: '8px',
      boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
      marginTop: '4px',
      '& .MuiMenu-list': {
        padding: 0,
      },
      '& .MuiMenuItem-root': {
        '&:hover': {
          backgroundColor: '#f5f5f5',
        },
      },
    },
  }

  const resetForm = () => {
    setTitle('');
    setIsPublic(true);
    setCategory(null);
    setSubQuestions([]);
    setPendingSubQuestion('');
    setShowPendingSubQuestion(false);
  };

  const handleAddSubQuestionClick = () => {
    if (!showPendingSubQuestion) {
      setShowPendingSubQuestion(true);
    } else if (pendingSubQuestion.trim()) {
      setSubQuestions([...subQuestions, {
        title: pendingSubQuestion,
        id: Date.now().toString()
      }]);
      setPendingSubQuestion('');
    }
  };

  const handleRemoveSubQuestion = (id: string) => {
    setSubQuestions(subQuestions.map(q =>
        q.id === id ? {...q, isRemoving: true} : q
    ));

    setTimeout(() => {
      setSubQuestions(subQuestions.filter(q => q.id !== id));
    }, 300);
  };
  const handleSubmit = async () => {
    if (!title.trim() || !category) return;

    await onSubmit({
      title,
      isPublic,
      category,
      subQuestions: subQuestions.map(({id, isRemoving, ...rest}) => rest),
    });

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
              Add question
            </Typography>

            <Box sx={{marginTop: '30px'}}>
              <Typography mb={1} sx={{color: '#666666'}}>Privacy <span
                  style={{color: '#FA3131'}}>*</span></Typography>
              <FormControl sx={{width: '50%'}}>
                <Select
                    value={isPublic ? 'public' : 'private'}
                    onChange={(e) => setIsPublic(e.target.value === 'public')}
                    sx={{
                      mb: 2,
                      borderRadius: '5px',
                      color: '#000048',
                      height: '50px', ...selectedStyleColor
                    }}
                >
                  <MenuItem value="public" sx={{color: '#000048'}}>Public</MenuItem>
                  <MenuItem value="private" sx={{color: '#000048'}}>Private</MenuItem>
                </Select>
              </FormControl>

              <Typography mb={1} sx={{color: '#666666'}}>Category <span
                  style={{color: '#FA3131'}}>*</span></Typography>
              <FormControl sx={{width: '50%'}}>
                <Select
                    value={category?.title || ''}
                    onChange={(e) => {
                      const selected = categories.find(c => c.title === e.target.value);
                      if (selected) setCategory(selected);
                    }}
                    displayEmpty
                    sx={{
                      mb: 2,
                      borderRadius: '5px',
                      color: '#000048',
                      minWidth: '200px',
                      height: '50px', ...selectedStyleColor
                    }}
                >
                  <MenuItem value="" disabled>
                    Select Category
                  </MenuItem>
                  {categories.map((cat) => (
                      <MenuItem key={cat.title} value={cat.title}
                                sx={{color: '#000048'}}>{cat.title}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Typography mb={1} sx={{color: '#666666'}}>Question <span
                  style={{color: '#FA3131'}}>*</span></Typography>
              <TextField
                  sx={{color: '#000048', minWidth: '600px'}}
                  multiline
                  rows={4}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Title of a question"
              />
            </Box>

            <Box mb={3} marginTop='20px'>
              <Typography mb={1} sx={{color: '#000048'}}>Follow-up Questions</Typography>

              <Box marginTop='10px'>
                {subQuestions.map((q, index) => (
                    <Box display='flex' key={index}>
                      <SubdirectoryArrowRightIcon key={index} sx={{color: '#999999'}}/>
                      <Fade
                          in={!q.isRemoving}
                          timeout={300}
                          key={q.id}
                          unmountOnExit
                      >
                        <Box display="flex" alignItems="center" mb={1} sx={{marginLeft: '10%'}}
                             justifyContent='space-between' width='100%'>
                          <Typography sx={{color: '#666666', width: '90%'}}>
                            Follow up question #{index + 1}: {q.title}
                          </Typography>
                          <Button onClick={() => handleRemoveSubQuestion(q.id)} sx={{
                            borderRadius: '100%',
                            border: '1px solid #999999',
                            minWidth: '0px',
                            height: '32px',
                            width: '32px',
                          }}>
                            <DeleteOutlineIcon sx={{color: '#999999'}}/>
                          </Button>
                        </Box>
                      </Fade>
                    </Box>
                ))}

                <Collapse
                    in={showPendingSubQuestion}
                    timeout={500}
                    easing="cubic-bezier(0.4, 0, 0.2, 1)"
                    sx={{marginLeft: '10%'}}
                >
                  <Box mt={2}>
                    <Typography mb={1} sx={{color: '#000048'}}>
                      Follow up question #{subQuestions.length + 1}
                    </Typography>
                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        value={pendingSubQuestion}
                        sx={{color: '#000048'}}
                        onChange={(e) => setPendingSubQuestion(e.target.value)}
                        placeholder="Text of a follow-up question"
                        autoFocus
                    />
                  </Box>
                </Collapse>

                <Button
                    fullWidth
                    variant="outlined"
                    onClick={handleAddSubQuestionClick}
                    sx={{
                      display: 'flex',
                      mt: 2,
                      textTransform: 'none',
                      color: '#2424D6',
                      alignItems: 'center',
                      justifyContent: 'start',
                      minHeight: '48px',
                      backgroundColor: '#EAF1FF',
                      fontWeight: 400,
                      fontSize: '16px',
                      gap: '5px'
                    }}
                >
                  <AddIcon sx={{color: '#2424D6', width: '22px', height: '22px'}}/>Add Follow-up
                  Question
                </Button>
              </Box>
            </Box>

            <Box
                sx={{borderTop: '1px solid #999999'}}>
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
                    disabled={!title.trim() || !category}
                    sx={{
                      borderColor: '#DDDDDD',
                      borderRadius: '22px',
                      color: '#FFFFFF',
                      backgroundColor: '#000048',
                      textTransform: 'none',
                    }}
                >
                  Add Question
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Modal>
  );
};