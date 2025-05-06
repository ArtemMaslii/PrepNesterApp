'use client';
import {Box, Grid, IconButton, Typography} from "@mui/material";
import {IconSvg} from "@/components/IconSvg";
import React from "react";
import BookIcon from "@mui/icons-material/Book";
import ArticleIcon from '@mui/icons-material/Article';
import {usePathname, useRouter} from "next/navigation";

export const SideBar = ({simplified}: { simplified: boolean }) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = (path) => {
    if (pathname !== path) {
      router.push(path);
    }
  };

  const isOnQuestionBank = pathname === '/prepnester/question';
  const isOnInterviewBank = pathname === '/prepnester/interviews';

  return (
      <>
        <Grid
            size={{xs: 12, sm: 1}}
            display="flex"
            alignItems="center"
            flexDirection="column"
            sx={{borderRight: '1px solid #ccc', height: "100%"}}
        >
          <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              pt={2}
              marginBottom={3}
              sx={{height: '60px', width: '60px'}}
          >
            <IconSvg/>
          </Box>
          {simplified ? null : (
              <>
                <Box display="flex" justifyContent="center" alignItems="center"
                     flexDirection="column"
                     pt={2}>
                  <IconButton onClick={() => handleClick("/prepnester/question")}
                              sx={{
                                backgroundColor: isOnInterviewBank ? "none" : "#f0f0f0",
                                borderRadius: '50%',
                                padding: '10px',
                              }}
                  >
                    <BookIcon
                        sx={{fontSize: "30px", color: isOnQuestionBank ? "#3D54CE" : "#000048"}}/>
                  </IconButton>
                  <Typography
                      sx={{textAlign: "center", fontSize: "12px"}}>Question<br/>Bank</Typography>
                </Box>
                <Box display="flex" justifyContent="center" alignItems="center"
                     flexDirection="column"
                     pt={2}>
                  <IconButton onClick={() => handleClick("/prepnester/interviews")}
                              sx={{
                                backgroundColor: isOnQuestionBank ? "none" : "#f0f0f0",
                                borderRadius: '50%',
                                padding: '10px',
                              }}
                  >
                    <ArticleIcon
                        sx={{fontSize: "30px", color: isOnInterviewBank ? "#3D54CE" : "#000048"}}/>
                  </IconButton>
                  <Typography sx={{textAlign: "center", fontSize: "12px"}}>Interviews</Typography>
                </Box>
              </>
          )}
        </Grid>
      </>
  );
};
