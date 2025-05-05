'use client';
import React, {useEffect, useState} from 'react';
import {Box, Button, CssBaseline, Divider, Grid, Typography} from '@mui/material';
import {useRouter} from 'next/navigation';
import {loginUser} from '@/lib/api';
import {useAuth} from '@/context';
import {FormErrorMessage, IconSvg, TextFieldWithError} from '@/components';

export default function LoginModal() {
  const router = useRouter();
  const {token, login} = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [formError, setFormError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (token) {
      router.push('/prepnester');
    }
  }, [token, router]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setFormError('');

    if (!email) {
      setEmailError('Email is required');
      setIsLoading(false);
      return;
    }
    if (!password) {
      setPasswordError('Password is required');
      setIsLoading(false);
      return;
    }

    try {
      const response = await loginUser({email, password});
      login(response.accessToken);

      localStorage.setItem('email', email);

      router.push('/prepnester');
    } catch (error) {
      setFormError('Email or password is not correct');
    } finally {
      setIsLoading(false);
    }
  };

  return (
      <Box sx={{flexGrow: 1, height: '100vh', width: '100%'}}>
        <CssBaseline/>
        <Grid container sx={{height: '100%'}}>
          <Grid size={{xs: 12, sm: 0.8}} display="flex" justifyContent="center"
                sx={{borderRight: '1px solid #ccc'}}>
            <Box display="flex" justifyContent="center" alignItems="center" pt={2}
                 sx={{height: '70px', width: '70px'}}>
              <IconSvg/>
            </Box>
          </Grid>

          <Divider orientation="vertical" flexItem sx={{
            height: '100%',
            boxShadow: '4px 0 6px rgba(0,0,0,0.1)',
            borderRightWidth: '1px'
          }}/>

          <Grid size={{xs: 12, sm: 11}}
                sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2}}>
            <Box sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: '400px'
            }}>
              <Typography component="h1" variant="h3">
                Welcome to PrepNester
              </Typography>
              {formError && <FormErrorMessage message={formError}/>}
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 1}}>
                <TextFieldWithError
                    id="email"
                    label="Email address"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (emailError) setEmailError('');
                    }}
                    error={!!emailError}
                    helperText={emailError}
                    focused={!!email}
                />
                <TextFieldWithError
                    id="password"
                    label="Password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (passwordError) setPasswordError('');
                    }}
                    error={!!passwordError}
                    helperText={passwordError}
                    focused={!!password}
                    isPassword
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{
                      mt: 3,
                      mb: 2,
                      borderRadius: '8px',
                      height: '42px',
                      fontSize: '0.875rem',
                      backgroundColor: '#000048',
                      '&:hover': {backgroundColor: '#000060'},
                    }}
                    disabled={isLoading}
                >
                  Sign in
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
  );
}