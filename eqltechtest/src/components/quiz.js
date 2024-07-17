import React, { useState } from 'react';
import { Container, Typography, Button, Box, TextField, Paper, List, ListItem, ListItemText } from '@mui/material';
import { questionsArray } from '../quizQuestions/questions';


// Introduce typescript to ensure stricter typings
// Add tests for this component to ensure questions are displayed after registration
export const Quiz = ({ onQuizComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [input, setInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userAnswerLower = input.trim().toLowerCase();
    const correctAnswerLower = questionsArray[currentQuestion].answer.trim().toLowerCase();
    
    const updatedAnswers = [...userAnswers, { question: questionsArray[currentQuestion].question, answer: input, isCorrect: userAnswerLower === correctAnswerLower }];
    setUserAnswers(updatedAnswers);
    
    const nextChatHistory = [...chatHistory, { question: questionsArray[currentQuestion].question, answer: input }];
    setChatHistory(nextChatHistory);
    
    setInput('');
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questionsArray.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      const score = updatedAnswers.reduce((acc, answer) => {
        if (answer.isCorrect) {
          return acc + 1;
        }
        return acc;
      }, 0);
      localStorage.setItem('score', score);
      onQuizComplete(score, updatedAnswers);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h5" >
          Chat Quiz
        </Typography>
        <List>
          {chatHistory.map((chat, index) => (
            <ListItem key={index}>
              <ListItemText primary={`Q: ${chat.question}`} secondary={`A: ${chat.answer}`} />
            </ListItem>
          ))}
        </List>
      </Paper>
      {currentQuestion < questionsArray.length && (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <Typography variant="h6" gutterBottom>
            {questionsArray[currentQuestion].question}
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
      )}
    </Container>
  );
}
