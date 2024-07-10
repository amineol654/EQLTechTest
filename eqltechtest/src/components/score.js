import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';

const Score = ({ score }) => {
  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Your Score
        </Typography>
        <Typography variant="h6">
          You scored {score} out of 5
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          sx={{ mt: 2 }} 
          onClick={() => window.location.reload()}
        >
          Retake Quiz
        </Button>
      </Box>
    </Container>
  );
}

export default Score;
