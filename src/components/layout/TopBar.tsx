'use client';
import React from 'react';
import {Avatar, Divider, Grid, IconButton} from '@mui/material';
import {useUser} from "@/context";
import {useRouter} from "next/navigation";

export const TopBar = () => {
  const {user} = useUser()
  const router = useRouter();

  return (
      <Grid container justifyContent="flex-end" alignItems="center"
            sx={{padding: '10px 20px', borderBottom: '1px solid #ccc'}}>
        <Grid>
          <IconButton onClick={() => router.push("/prepnester/me")}>
            <Avatar sx={{width: 40, height: 40}}>{user?.fullName.charAt(0)}</Avatar>
          </IconButton>
        </Grid>

        <Grid xs={11}>
          <Divider/>
        </Grid>
      </Grid>
  );
};
