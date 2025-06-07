'use client';
import React, {useEffect, useState} from 'react';
import {Box, Button, Divider, Grid, Typography} from '@mui/material';
import {useRouter} from 'next/navigation';
import {loginUser} from '@/lib/api';
import {useAuth} from '@/context';
import {FormErrorMessage, TextFieldWithError} from '@/components';
import {OAuthLoginButton} from "@/components/OAuthLoginButton";

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
      router.push('/prepnester/question');
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

      router.push('/prepnester/question');
    } catch (error) {
      setFormError('Email or password is not correct');
    } finally {
      setIsLoading(false);
    }
  };

  return (
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
            {formError && <FormErrorMessage message={formError}/>}
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  borderRadius: '24px',
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
          <Divider sx={{width: '100%', mb: 2}}/>
          <Box sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            maxWidth: '400px'
          }}>
            <OAuthLoginButton/>
          </Box>
        </Box>
      </Grid>
  );
}