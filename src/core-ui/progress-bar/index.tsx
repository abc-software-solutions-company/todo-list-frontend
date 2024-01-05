import { FC } from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';


interface Iprops {
    progress: number;
}

export const ProgressBar: FC<Iprops> = ({ progress }) => {
  function getProgressColor() {
    if (progress < 30) {
      return 'error';
    } else if (progress < 70) {
      return 'warning';
    } else {
      return 'success';
    }
  }
  
  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgress color={getProgressColor()} variant="determinate" value={progress} />
    </Box>
  );
}
