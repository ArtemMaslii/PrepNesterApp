'use client';

import React, {use, useEffect, useState} from "react";
import {useInterviews} from "@/context";
import {Box, Tab, Tabs, Typography} from "@mui/material";
import {
  CheatSheetInterviewTab,
  InterviewDetailsHeader,
  InterviewInfoTab
} from "@/components/interviewDetails";
import {useRouter} from "next/navigation";
import {CustomButton} from "@/components";
import {InterviewUpdateDetails} from "@/interface/interviewDetails";

function TabPanel(props: { children?: React.ReactNode; index: number; value: number }) {
  const {children, value, index, ...other} = props;

  return (
      <div
          role="tabpanel"
          hidden={value !== index}
          id={`interview-tabpanel-${index}`}
          aria-labelledby={`interview-tab-${index}`}
          {...other}
      >
        {value === index && <Box sx={{p: 3}}>{children}</Box>}
      </div>
  );
}

export default function InterviewSheetPage({params}: { params: Promise<{ id: string }> }) {
  const {
    interviewDetails,
    interviewLoading,
    updateInterview,
    loadInterviewDetails
  } = useInterviews();
  const router = useRouter();
  const {id} = use(params);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await loadInterviewDetails(id);
      } catch (err) {
        console.error("Failed to load interview details:", err);
      }
    };

    fetchData();
  }, [id]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleSaveInterview = async (body: InterviewUpdateDetails) => {
    try {
      await updateInterview(id, body);
    } catch (err) {
      console.error("Failed to load interview details:", err);
    } finally {
      router.push('/prepnester/interviews');
    }
  }

  const handleCancelInterview = () => {
    router.push('/prepnester/interviews');
  };

  if (!interviewDetails) {
    return (
        <Box display="flex" justifyContent="space-between" alignContent="center">
          <Box>
            <Typography sx={{fontSize: '30px'}}>No interview details were found</Typography>
            <Typography sx={{fontSize: '18px'}}>
              Please contact support or make sure you're authorized
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" gap="8px">
            <CustomButton variant="secondary" onClick={() => {
              router.back()
            }}>
              <Typography padding="8px">Back</Typography>
            </CustomButton>
          </Box>
        </Box>
    );
  }

  return (
      <Box paddingX="40px" paddingY="20px">
        <InterviewDetailsHeader
            candidateFullName={interviewDetails.candidate.fullName}
            candidatePosition={interviewDetails.openPosition}
        />

        <Box sx={{borderBottom: 1, borderColor: 'divider', mt: 3}}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="interview tabs">
            <Tab label="Interview Info" id="interview-tab-0" aria-controls="interview-tabpanel-0"/>
            <Tab label="Cheat Sheet" id="interview-tab-1" aria-controls="interview-tabpanel-1"/>
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <InterviewInfoTab interviewDetails={interviewDetails}
                            onCancelInterviewClick={handleCancelInterview}
                            onSaveInterviewClick={handleSaveInterview}/>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <CheatSheetInterviewTab id={interviewDetails.cheatSheetId}/>
        </TabPanel>
      </Box>
  );
}