import {Box, Skeleton} from '@mui/material';

export const SkeletonLoader = () => {
  return (
      <Box paddingX="40px" paddingY="20px">
        {[...Array(4)].map((_, index) => (
            <Box
                key={index}
                sx={{
                  padding: '20px',
                  marginTop: '20px',
                  border: '1px solid #DDDDDD',
                  borderRadius: '14px',
                }}
            >
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box display="flex" alignItems="center" gap="10px">
                  <Skeleton variant="circular" width={24} height={24}/>
                  <Box>
                    <Skeleton variant="text" width={200} height={30}/>
                    <Skeleton variant="text" width={120} height={20}/>
                  </Box>
                </Box>
                <Box display="flex" gap="18px">
                  <Skeleton variant="rectangular" width={20} height={20}/>
                  <Skeleton variant="rectangular" width={20} height={20}/>
                </Box>
              </Box>
            </Box>
        ))}
      </Box>
  );
};
