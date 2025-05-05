'use client';

import {Box, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import {CustomButton, Search} from "@/components";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from '@mui/icons-material/Close';
import {Question} from "@/interface/Question";
import {useAuth} from "@/context";
import {fetchAllQuestions} from "@/lib/api";

export default function QuestionBank() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const {token} = useAuth();

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        if (token) {
          const data = await fetchAllQuestions(token);
          setQuestions(data);
        }
      } catch (error) {
        console.error("Failed to fetch questions", error);
      } finally {
        setLoading(false);
      }
    };

    loadQuestions();
  }, [token]);

  return (
      <Box paddingX="40px" paddingY="20px">
        <Box display="flex" justifyContent="space-between" alignContent="center">
          <Box>
            <Typography variant="h4">Question Bank</Typography>
            <Typography>Discover, create and improve existing interview questions and
              build interview
              templates.</Typography>
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
            <SearchIcon
                sx={{color: "white", paddingLeft: '8px'}}/>
            <Typography padding="8px">Search</Typography>
          </CustomButton>
        </Box>
        {questions.map((question => (
            <Box key={question.id} sx={{
              padding: '20px',
              marginTop: '20px',
              border: '1px solid #DDDDDD',
              borderRadius: '8px',
            }}>
              <Typography variant="h6">{question.title}</Typography>
              <Typography>{question.id}</Typography>
            </Box>
        )))}
      </Box>
  );
}
