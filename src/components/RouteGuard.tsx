'use client';

import {usePathname, useRouter} from 'next/navigation';
import {useEffect} from 'react';
import {useAuth} from '@/context';

export function RouteGuard({children}: { children: React.ReactNode }) {
  const {token, loading} = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !token && pathname !== '/prepnester/signIn') {
      router.replace('/prepnester/signIn');
    }
  }, [token, loading, pathname]);

  if (loading) return null;

  return <>{children}</>;
}
