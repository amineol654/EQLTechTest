import React from 'react';
import { Container, Typography, Box, Button, List, ListItem, ListItemText } from '@mui/material';

// Add tests for this component to ensure correct score is displayed
export const Score = ({ score, userAnswers }) => {
  const wrongAnswers = userAnswers.filter(answer => !answer.isCorrect);

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Your Score
        </Typography>
        <Typography variant="h6">
          You scored {score} out of {userAnswers.length}
        </Typography>
        {/* put wrong answers into a separate component for better readability */}
        {wrongAnswers.length > 0 && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              Incorrect Answers
            </Typography>
            <List>
              {wrongAnswers.map((answer, index) => (
                <ListItem key={index}>
                  <ListItemText primary={`Q: ${answer.question}`} secondary={`Your Answer: ${answer.answer}`} />
                </ListItem>
              ))}
            </List>
          </Box>
        )}
        <Button 
          variant="contained" 
          color="primary" 
          sx={{ mt: 2 }} 
          // use a callback function to reset quiz instead of reloading screen
          onClick={() => window.location.reload()}
        >
          Retake Quiz
        </Button>
      </Box>
    </Container>
  );
}

