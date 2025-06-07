import {CustomButton} from "@/components/CustomButton";

export const OAuthLoginButton = () => {
  const handleLogin = () => {
    window.location.href = 'http://localhost:8080/oauth2/authorization/google';
  };

  return (
      <CustomButton variant='secondary' onClick={handleLogin} sx={{
        mt: 3,
        mb: 2,
        width: '100%',
        borderRadius: '24px',
        height: '42px',
        fontSize: '0.875rem',
      }}>
        Continue with Google
      </CustomButton>
  );
};