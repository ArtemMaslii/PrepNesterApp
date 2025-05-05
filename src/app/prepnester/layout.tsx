'use client';
import {AuthProvider, UserProvider} from '@/context';
import {Box, CssBaseline, Grid} from "@mui/material";
import React from "react";
import {SideBar} from "@/components";
import {usePathname} from "next/navigation";

export default function RootLayout(
    {
      children,
    }: {
      children: React.ReactNode
    }) {
  const pathname = usePathname();
  const simplified = pathname === '/prepnester/signIn';

  return (
      <html lang="en">
      <body>
      <AuthProvider>
        <UserProvider>
          <Box sx={{flexGrow: 1, height: '100vh', width: '100%'}}>
            <CssBaseline/>
            <Grid container sx={{height: '100%'}}>
              <SideBar simplified={simplified}/>
              {children}
            </Grid>
          </Box>
        </UserProvider>
      </AuthProvider>
      </body>
      </html>
  );
}