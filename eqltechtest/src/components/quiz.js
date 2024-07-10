import React, { useState } from 'react';
import { Container, Typography, Button, Box, TextField } from '@mui/material';

const questions = [
  { question: 'What is 2 + 2?', answer: '4' },
  { question: 'What is the capital of France?', answer: 'Paris' },
  { question: 'What is the largest planet in our solar system?', answer: 'Jupiter' },
  { question: 'Who wrote "To Kill a Mockingbird"?', answer: 'Harper Lee' },
  { question: 'What is the square root of 64?', answer: '8' },
];

const Quiz = ({ onQuizComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserAnswers([...userAnswers, input]);
    setInput('');
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      const score = userAnswers.reduce((acc, answer, index) => {
        if (answer.toLowerCase() === questions[index].answer.toLowerCase()) {
          return acc + 1;
        }
        return acc;
      }, 0);
      localStorage.setItem('score', score);
      onQuizComplete(score);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          {questions[currentQuestion].question}
        </Typography>
        <TextField
          label="Your Answer"
          fullWidth
          margin="normal"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Submit
        </Button>
      </Box>
    </Container>
  );
}

export default Quiz;
