'use client';
import {AuthProvider, UserProvider} from '@/context';
import {Box, CssBaseline, Grid} from "@mui/material";
import React from "react";
import {RouteGuard, SideBar, TopBar} from "@/components";
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
          <RouteGuard>
            <CssBaseline/>
            {simplified ? (
                <Box sx={{
                  flexGrow: 1,
                  height: '100vh',
                }}>
                  <Grid container sx={{height: '100%'}}>
                    <SideBar simplified={simplified}/>
                    {children}
                  </Grid>
                </Box>
            ) : (
                <Box
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: '80px 1fr',
                      gridTemplateRows: '90px 1fr',
                      height: '100vh',
                      gridTemplateAreas: `
        "sidebar topbar"
        "sidebar content"
      `,
                    }}
                >
                  <Box
                      sx={{
                        gridArea: 'sidebar',
                        zIndex: 2
                      }}
                  >
                    <SideBar simplified={simplified}/>
                  </Box>
                  <Box
                      sx={{
                        gridArea: 'topbar',
                        zIndex: 1,
                      }}
                  >
                    <TopBar/>
                  </Box>
                  <Box
                      sx={{
                        gridArea: 'content',
                      }}
                  >
                    {children}
                  </Box>
                </Box>
            )}
          </RouteGuard>
        </UserProvider>
      </AuthProvider>
      </body>
      </html>
  );
}