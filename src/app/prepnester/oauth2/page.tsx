'use client';

import {useEffect} from 'react';
import {useRouter, useSearchParams} from 'next/navigation';
import {useAuth} from '@/context/AuthContext';

export default function OAuth2SuccessPage() {
  const {login} = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!searchParams) return;

    const token = searchParams.get('token');
    if (token) {
      login(token);
      router.push('/prepnester/question');
    } else {
      router.push('/login');
    }
  }, [searchParams, login, router]);

  return <p>Logging you in...</p>;
};