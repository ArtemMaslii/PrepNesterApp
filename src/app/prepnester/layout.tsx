import {AuthProvider, UserProvider} from '@/context';

export default function RootLayout(
    {
      children,
    }: {
      children: React.ReactNode
    }) {
  return (
      <html lang="en">
      <body>
      <AuthProvider>
        <UserProvider>
          {children}
        </UserProvider>
      </AuthProvider>
      </body>
      </html>
  );
}