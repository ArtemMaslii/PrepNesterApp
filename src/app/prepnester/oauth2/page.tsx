'use client';

import {useEffect} from 'react';
import {useRouter, useSearchParams} from 'next/navigation';
import {useAuth} from '@/context/AuthContext';

export default function OAuth2SuccessPage() {
  const {loginOAuth2} = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!searchParams) return;

    const token = searchParams.get('token');
    const email = searchParams.get('email');
    if (token && email) {
      loginOAuth2(token, email);
      router.push('/prepnester/question');
    } else {
      router.push('/prepnester/signIn');
    }
  }, [searchParams]);

  return <p>Logging you in...</p>;
};